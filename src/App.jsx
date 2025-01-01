import { Toaster } from "sonner";
import NotesProvider from "./context/NoteContext";
import NotesPage from "./pages/NotesPage";

function App() {

  return (
    <div id='app' className="custom-scroll">
      <NotesProvider>
        <Toaster position="bottom-right" richColors closeButton />
        <NotesPage/>
      </NotesProvider>
    </div>
  )
}

export default App
