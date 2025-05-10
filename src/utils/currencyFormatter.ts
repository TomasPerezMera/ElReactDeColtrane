// Custom utility function to format catalog item's currency to ARS.

export const precioARS = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(price);
}