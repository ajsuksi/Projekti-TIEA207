import { useState, useMemo } from "react";

/**
 * @param {*} markers kaikki markerit kartalla
 * @returns palauttaa filtteröinti muuttujat tyypin, maksullisuuden ja maksutavan mukaan. 
 */

export function useFilterMarkers(markers) {
  const [filters, setFilters] = useState({
    vainIlmaiset: false,
    vainMaksulliset: false,
    valitutTyypit: [],
    valitutMaksutavat: [],
  });

  //ilmaisten suodatus
  const handleFreeChange = (e) => {
    setFilters((prev) => ({ ...prev, vainIlmaiset: e.target.checked }));
  };

  //maksullisten suodatus
   const handleCostsChange = (e) => {
    setFilters((prev) => ({ ...prev, vainMaksulliset: e.target.checked }));
  };

  //tyyppi suodatus
  const handleTypeChange = (tyyppi) => (e) => {
    setFilters((prev) => ({
      ...prev,
      valitutTyypit: e.target.checked
        ? [...prev.valitutTyypit, tyyppi]
        : prev.valitutTyypit.filter((t) => t !== tyyppi),
    }));
  };

  //Maksutavan suodatus
  const handlePaymentMethodChange = (maksutapa) => (e) => {
    setFilters((prev) => ({
      ...prev,
      valitutMaksutavat: e.target.checked
        ? [...prev.valitutMaksutavat, maksutapa]
        : prev.valitutMaksutavat.filter((m) => m !== maksutapa),
    }));
  };

  const availableTypes = [...new Set(markers.map((p) => p.tyyppi))];

  const availablePaymentMethods = [
    ...new Set(markers.flatMap((p) => p.maksutapa || []))
  ];

//Filtteröinti
  const filteredPlaces = markers.filter((place) => {
      if (filters.vainIlmaiset && !place.isFree) return false;
      if(filters.vainMaksulliset && place.isFree) return false;
      if (filters.valitutTyypit.length > 0 && !filters.valitutTyypit.includes(place.tyyppi)) return false;
      if (filters.valitutMaksutavat.length > 0) {
      const placeMethods = place.maksutapa || [];
      if (!filters.valitutMaksutavat.some((method) => placeMethods.includes(method))) return false;
      }
      return true; 
    });

  return {
    filters,
    handleFreeChange,
    handleTypeChange,
    handleCostsChange,
    handlePaymentMethodChange,
    availablePaymentMethods,
    availableTypes,
    filteredPlaces,
  };
};
