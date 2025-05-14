import { useEffect, useState } from 'react';
import { CatalogItem } from '../context/CartContext';
import { getAllBooks } from '../services/firebase-service';

// Using a cache to avoid unnecessary fetches.
let cachedCatalog: CatalogItem[] | null = null;

export function useCatalogData() {
    const [catalog, setCatalog] = useState<CatalogItem[]>(cachedCatalog || []);
    const [loading, setLoading] = useState(!cachedCatalog);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (cachedCatalog) {
            return;
        }

        let isMounted = true;

        const fetchCatalog = async () => {
            try {
                const booksData = await getAllBooks();
                const catalogData = booksData.map(book => ({
                    id: Number(book.id),
                    name: book.name,
                    price: book.price,
                    quantity: 0,
                    source: book.source,
                    description: book.description,
                    available: book.available,
                    featured: book.featured,
                }));

                // Only updates state if the component is still mounted.
                if (isMounted) {
                    cachedCatalog = catalogData as CatalogItem[];
                    setCatalog(catalogData as CatalogItem[]);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching catalog from Firebase:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setLoading(false);
                }
            }
        };

        fetchCatalog();

        // Cleanup function to handle component unmounting during fetch.
        return () => {
            isMounted = false;
        };
    }, []);

    // Function to refresh the cache, only if needed.
    const refreshCatalog = async () => {
        setLoading(true);
        try {
            const booksData = await getAllBooks();
            const catalogData = booksData.map(book => ({
                id: Number(book.id),
                name: book.name,
                price: book.price,
                quantity: 0,
                source: book.source,
                description: book.description,
                available: book.available,
                featured: book.featured,
            }));

            cachedCatalog = catalogData as CatalogItem[];
            setCatalog(catalogData as CatalogItem[]);
            setError(null);
        } catch (err) {
            console.error('Error refreshing catalog:', err);
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    };

    return { catalog, loading, error, refreshCatalog };
}