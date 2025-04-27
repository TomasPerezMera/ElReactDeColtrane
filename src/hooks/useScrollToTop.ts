import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// the Key changes are targeted to ensure triggering the scroll on each page visit,
// which proved to be very inconsistent otherwise during testing.

    export function useScrollToTop() {
    const { key } = useLocation();
    useLayoutEffect(() => {

    window.scrollTo(0, 0);
    }, [key]);
}