import React, { useState } from "react";
import Layout from "../../components/ui/Layout";
import HotelTab from "./HotelTab";
import RoomTab from "./RoomTab";
import RateTab from "./RateTab";

const InventoryManagement = () => {
  // Estado para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState("hotels");

  const tabs = [
    { id: "hotels", label: "Hoteles" },
    { id: "rooms", label: "Habitaciones" },
    { id: "rates", label: "Tarifas" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return <RoomTab />;
      case "rates":
        return <RateTab />;
      case "hotels":
      default:
        return <HotelTab />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Inventario y Gestión de Hoteles
        </h1>

        {/* Pestañas de DaisyUI */}
        <div role="tablist" className="tabs tabs-boxed mb-8">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Contenido de la Pestaña Activa */}
        <div className="bg-white p-8 shadow-xl rounded-lg border border-gray-200">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default InventoryManagement;
