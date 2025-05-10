import { toast } from 'react-toastify';

export default function useToast() {
    return (message: string, time: number) => {
    toast(message, {
        style: {
            background: "linear-gradient(to right, #2551a8, #72419d)",
        },
        position: "top-right",
        closeOnClick: false,
        autoClose: time || 2000,
        });
    }
}