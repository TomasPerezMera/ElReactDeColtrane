interface CatalogItem {
    id: number;
    name: string;
    year: number;
    price: number;
    amount: number;
    source: string;
    description: string;
}

interface ItemCardProps {
    item: CatalogItem;
    precioARS: (precio: number) => string;
}

export default function ItemCard({ item, precioARS }: ItemCardProps) {
    return (
        <div key={item.id} className='albumContainer'>
            <div className="albumFront">
                <img src={`/ElReactDeColtrane/${item.source}`} alt={item.name} height="250" width="250" className='albumImage' />
            </div>
            <div className="albumDescription">
                <span>{item.description}</span>
            </div>
            <h2 id="albumTitle-${albumItem.id}" className="albumTitle">
                {item.name}
            </h2>
            <h2 className="price">
                ${precioARS(item.price)}
            </h2>
            <div className="botonesContainer">
                <button type="button" className="decrease-btn" data-id="{album.id}">-</button>
                <button type="button" className="item-counter" data-id="{album.id}" disabled>{item.amount}</button>
                <button type="button" className="increase-btn" data-id="{album.id}">+</button>
            </div>
        </div>
    );
}