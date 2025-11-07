import { useRef, useEffect, useState, useContext } from "react";
import { setNewOffset } from "../utils/setNewOffset";
import { autoGrow } from "../utils/autoGrow";
import { setZIndex } from "../utils/setZIndex";
import { bodyParser } from "../utils/bodyParser";
import { db } from "../appwrite/databases";
import {
  uploadImageToBucket,
  deleteImageFromBucket,
  getFileViewUrl,
} from "../appwrite/storage"; 
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";
import formatDate from "../utils/formatDate";
import Attach from "../icons/Attach";

const NoteCard = ({ note }) => {
  const { setSelectedNote } = useContext(NoteContext);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const [position, setPositon] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const [displayDate, setDisplayDate] = useState(
    note.updated_at || note.$createdAt
  );

  const parseImages = () => {
    if (!note.images) return [];
    try {
      return typeof note.images === "string"
        ? JSON.parse(note.images)
        : note.images;
    } catch (e) {
      console.warn("Failed to parse note.images", e);
      return note.images || [];
    }
  };

  const [images, setImages] = useState(parseImages());

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  useEffect(() => {
    setDisplayDate(note.updated_at || note.$createdAt);
  }, [note.updated_at, note.$createdAt]);

  const saveData = async (key, value) => {
    setSaving(true);
    const newUpdatedAt = new Date().toISOString();

    const payload = {
      updated_at: newUpdatedAt,
    };

    if (key === "images") {
      payload.images = value; 
    } else {
      payload[key] = JSON.stringify(value); 
    }

    try {
      await db.notes.update(note.$id, payload);
      setDisplayDate(newUpdatedAt);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setSaving(false);
  };

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSaving(true);

    try {
      const uploadedIds = [];
      for (const file of files) {
        const res = await uploadImageToBucket(file);
        uploadedIds.push(res.$id); 
      }

      const newImages = [...images, ...uploadedIds];
      setImages(newImages);

      await saveData("images", newImages); 
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async (fileId) => {
    const remaining = images.filter((id) => id !== fileId);
    setImages(remaining);

    setSaving(true);
    try {
      await deleteImageFromBucket(fileId);
      await saveData("images", remaining);
    } finally {
      setSaving(false);
    }
  };

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setZIndex(cardRef.current);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPositon(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />

        {saving ? (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText, fontSize: "12px" }}>
              Saving...
            </span>
          </div>
        ) : (
          <p>{formatDate(displayDate)}</p>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
        />

        <div className="note-images" style={{ marginTop: 8 }}>
          {images && images.length > 0 && (
            <div
              className="image-grid"
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {images.map((fileId) => (
                <div key={fileId} style={{ position: "relative" }}>
                  <img
                    src={getFileViewUrl(fileId)}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  <button
                    onClick={() => handleRemoveImage(fileId)}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: colors.colorBody,
                      color: "black",
                      border: "none",
                      borderRadius: 4,
                      padding: "2px 6px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <label style={{ cursor: "pointer", color: "black" }}>
            <Attach />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesSelected}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
