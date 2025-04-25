import { Dropdown } from 'primereact/dropdown';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavDropdown() {
    const navigate = useNavigate();
    const location = useLocation();

    const routes = [
    { label: 'Inicio', value: '/home' },
    { label: 'Catalogo', value: '/catalog' },
    { label: 'Carrito', value: '/cartDisplay' },
    ];

    const dropdownValue = routes.some(route => route.value === location.pathname)
    ? location.pathname
    : null;

    const handleChange = (e: DropdownChangeEvent) => {
        navigate(e.value);
    };

    return (
        <Dropdown
            value={dropdownValue}
            options={routes}
            onChange={handleChange}
            className="navItem"
            placeholder="Navegar"/>
    );
};