// CastCard.js
import React from 'react';

const CastCard = ({ cast }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {cast.map((actor, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <img
                        src={actor.image} // Assuming actor object has an image property
                        alt={`${actor.name} profile`}
                        className="rounded-t-lg h-40 w-full object-cover mb-2" // Set height and cover for image
                    />
                    <h4 className="text-lg font-semibold mb-2">{actor.name}</h4> {/* Ensure actor.name is used */}
                    <p className="text-gray-600">Character: {actor.character}</p> {/* Use the correct character property */}
                </div>
            ))}
        </div>
    );
};

export default CastCard;
