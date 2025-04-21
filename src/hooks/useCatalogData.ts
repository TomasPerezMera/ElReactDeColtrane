import { useEffect, useState } from 'react';

interface CatalogItem {
    id: number;
    name: string;
    year: number;
    price: number;
    amount: number;
    source: string;
    description: string;
}

let cachedCatalog: CatalogItem[] | null = null;

export function useCatalogData() {
    const [catalog, setCatalog] = useState<CatalogItem[]>(cachedCatalog || []);
    const [loading, setLoading] = useState(!cachedCatalog);

useEffect(() => {
    if (!cachedCatalog) {
        fetch('/ElReactDeColtrane/catalog.json')
        .then((res) => res.json())
        .then((data) => {
            cachedCatalog = data;
            setCatalog(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Failed to fetch catalog', err);
            setLoading(false);
        });
    }
}, []);

    return { catalog, loading };
}
