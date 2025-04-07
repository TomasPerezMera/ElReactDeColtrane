import React, { useState, useEffect } from 'react';

function Catalog() {
    const [catalogData, setCatalogData] = useState([]);

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch('/ElReactDeColtrane/catalog.json')
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => setCatalogData(data))
        .catch((error) => console.error('Error fetching catalog:', error));
    }, []);

    return (
        <div>
        {catalogData.map((item) => (
            <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            {/* You can add more item details here */}
            </div>
        ))}
        </div>
    );
}

export default Catalog;