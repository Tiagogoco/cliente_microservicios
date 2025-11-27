import { Link } from "react-router-dom";
import React from "react";

const HotelListItem = ({ hotel }) => {
  return (
    // Contenedor de la card
    <div className="card card-compact bg-base-100 shadow-xl border border-gray-100">
      {/* Imagen (usando un placeholder por ahora) */}
      <figure className="h-48">
        <img
          src={
            hotel.imageUrl ||
            "https://via.placeholder.com/300x150?text=Hotel+Image"
          }
          alt={hotel.name}
          className="object-cover w-full h-full"
        />
      </figure>

      {/* Contenido de la Card */}
      <div className="card-body">
        {/* Nombre del Hotel */}
        <h2 className="card-title text-lg">{hotel.name}</h2>
        {/* Precio */}
        <p className="text-xl font-bold text-gray-700">
          ${hotel.price}{" "}
          <span className="text-sm font-normal text-gray-500">/ noche</span>
        </p>

        {/* Botón Ver detalles */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/hotel/${hotel.id}`} className="btn btn-primary w-full">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelListItem;
