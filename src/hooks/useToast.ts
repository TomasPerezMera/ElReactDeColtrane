import { toast } from 'react-toastify';

// Custom hook to call consistent toasts.

export default function useToast(message: string, time: number) {
    return (
        toast(message, {
        style: {
            background: "linear-gradient(to right, #2551a8, #72419d)",
            '--toastify-toast-width': '320px',
            '--toastify-toast-min-height': '70px',
            '--toastify-toast-max-height': '70px',
            'fontSize': 'clamp(0.8rem, 2vw, 0.9rem)',
        } as React.CSSProperties,
        position: "top-left",
        closeOnClick: true,
        pauseOnHover: false,
        autoClose: time || 2000,
        })
    );
}