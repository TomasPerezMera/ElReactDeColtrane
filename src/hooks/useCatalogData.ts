import { useEffect, useState } from 'react';
import { CatalogItem } from '../context/CartContext';

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
                    const response = await fetch('/ElReactDeColtrane/catalog.json');

                    if (!response.ok) {
                        throw new Error(`Failed to fetch catalog: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();

                    // Only updates state if the component is still mounted.
                    if (isMounted) {
                        cachedCatalog = data;
                        setCatalog(data);
                        setLoading(false);
                    }
                } catch (err) {
                    console.error('Error fetching catalog:', err);
                    if (isMounted) {
                        setError(err instanceof Error ? err : new Error(String(err)));
                        setLoading(false);
                    }
                }
            };
            fetchCatalog();
            // Cleanup function to handle component unmounting during fetch
            return () => {
                isMounted = false;
            };
        }, []);
    return { catalog, loading, error };
}
