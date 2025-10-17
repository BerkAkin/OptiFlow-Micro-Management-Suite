import React from "react";

const OpenStreetMapView: React.FC = () => {
    const latitude = 40.764494;
    const longitude = 29.939471;
    const zoom = 15;
    const delta = 0.03;

    const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - delta
        }%2C${latitude - delta}%2C${longitude + delta}%2C${latitude + delta}&layer=mapnik&marker=${latitude}%2C${longitude}#map=${zoom}/${latitude}/${longitude}`;

    return (
        <div className="border border-gray-300">
            <iframe width="100%" height="300" src={iframeSrc} ></iframe>


        </div>
    );
};

export default OpenStreetMapView;
