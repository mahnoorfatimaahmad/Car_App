"use client";
import React, { createContext, useEffect, useState } from "react";

// Create Context
const CarContext = createContext();

export function CarProvider({ children, inventoryData = [] }) {
  const [inventory, setInventory] = useState([]);
  const [forFilteredInventory, setForFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inventoryData.length) {
      console.log("Inventory in context:", inventoryData);
      localStorage.setItem("inventory", JSON.stringify(inventoryData));
      setInventory(inventoryData);
      setForFilteredInventory(inventoryData);
    }
    setLoading(false);
  }, [inventoryData]);

  return (
    <CarContext.Provider
      value={{
        inventory,
        setInventory,
        forFilteredInventory,
        setForFilteredInventory,
        loading,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export const useCarContext = () => React.useContext(CarContext);
