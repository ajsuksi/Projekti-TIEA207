import { useState, useMemo } from "react";

{/*Kartalla näkyvien markkereiden filtteröinti maksullisuuden ja tyypin mukaan*/}

export function useFilterMarkers(markers) {
  const [filters, setFilters] = useState({
    vainIlmaiset: false,
    valitutTyypit: [],
  });

  const handleFreeChange = (e) => {
    setFilters((prev) => ({ ...prev, vainIlmaiset: e.target.checked }));
  };

  const handleTypeChange = (tyyppi) => (e) => {
    setFilters((prev) => ({
      ...prev,
      valitutTyypit: e.target.checked
        ? [...prev.valitutTyypit, tyyppi]
        : prev.valitutTyypit.filter((t) => t !== tyyppi),
    }));
  };

  const availableTypes = [...new Set(markers.map((p) => p.tyyppi))];

  const filteredPlaces = markers.filter((place) => {
      if (filters.vainIlmaiset && !place.isFree) return false;
      if (filters.valitutTyypit.length > 0 && !filters.valitutTyypit.includes(place.tyyppi))
        return false;
      return true;
    });

  return {
    filters,
    handleFreeChange,
    handleTypeChange,
    availableTypes,
    filteredPlaces,
  };
};
