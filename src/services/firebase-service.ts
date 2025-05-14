import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    query,
    where,
} from "firebase/firestore";

// Firebase configuration.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Client data types
export interface ClientData {
    name: string;
    surname: string;
    dni: string;
    email: string;
    address: string;
    id?: string;
}

// Book data types
export interface BookData {
    id?: string;
    available: boolean;
    featured: boolean;
    name: string;
    price: number;
    source: string;
    description: string;
}

// Fetch all books from the "libros" collection.
export const getAllBooks = async (): Promise<BookData[]> => {
    try {
        const booksCollection = collection(db, "libros");
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        })) as BookData[];
        return booksList;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};


// Fetch books by availability.
export const getAvailableBooks = async (): Promise<BookData[]> => {
    try {
        const booksCollection = collection(db, "libros");
        const q = query(booksCollection, where("available", "==", true));
        const querySnapshot = await getDocs(q);
        const booksList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as BookData[];
        return booksList;
    } catch (error) {
    console.error("Error fetching available books:", error);
    throw error;
    }
};


// Fetch featured books.
export const getFeaturedBooks = async (): Promise<BookData[]> => {
    try {
        const booksCollection = collection(db, "libros");
        const q = query(booksCollection, where("featured", "==", true));
        const querySnapshot = await getDocs(q);
        const booksList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as BookData[];
    return booksList;
    } catch (error) {
    console.error("Error fetching featured books:", error);
    throw error;
    }
};

// Get a single book by ID.
export const getBookById = async (bookId: string): Promise<BookData | null> => {
    try {
        const bookDocRef = doc(db, "libros", bookId);
        const bookSnapshot = await getDoc(bookDocRef);
    if (bookSnapshot.exists()) {
        return { id: bookSnapshot.id, ...bookSnapshot.data() } as BookData;
    } else {
        console.log("No such book exists!");
        return null;
    }
    } catch (error) {
        console.error("Error fetching book:", error);
        throw error;
    }
};

// Save client data to the "clientLog" collection.
export const saveClientData = async (clientData: ClientData): Promise<string> => {
    try {
        const clientLogCollection = collection(db, "clientLog");
        const docRef = await addDoc(clientLogCollection, {
        ...clientData,
        createdAt: new Date()
        });
    console.log("Client data saved with ID: ", docRef.id);
    return docRef.id;
    } catch (error) {
        console.error("Error saving client data:", error);
        throw error;
    }
};

// Get all client data [for future Database History Display implementation].
export const getAllClients = async (): Promise<ClientData[]> => {
    try {
        const clientsCollection = collection(db, "clientLog");
        const clientsSnapshot = await getDocs(clientsCollection);
        const clientsList = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        })) as ClientData[];
        return clientsList;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};