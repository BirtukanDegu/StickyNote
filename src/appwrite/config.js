import { Client, Databases, Storage } from "appwrite";
 
const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);
 
const databases = new Databases(client);
const storage = new Storage(client);

const collections = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_NOTES_ID,
        dbId: import.meta.env.VITE_DATABASE_ID
    },
];
 
export { client, databases, collections, storage };