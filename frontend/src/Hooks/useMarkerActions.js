  import { useState } from "react";


  export function useMarkerActions(setMarkers, setNotice){
    const [editingMarker, setEditingMarker] = useState(null);
  
  //Poistaa markerin
  const handleRemove = async (markerId) => {
    if (!markerId) {
      setMarkers((prev) => prev.filter((m) => m._id !== markerId));
      return;
    }
    
    if (window.confirm("Haluatko varmasti poistaa parkkipaikan?")){      
      try {
        const response = await fetch(`http://localhost:3001/api/places/${markerId}`, {
          method: "DELETE",
        });
        if(!response.ok) throw new Error("Tietokannasta poisto epäonnistui");
        setMarkers((prev) => prev.filter((m) => m._id !== markerId));        
        console.log("Paikka poistettu onnistuneesti");
      } catch (error) {
        console.error("Virhe poistossa:", error);
        alert("Paikan poistaminen epäonnistui");
      }
    }
  };

  //valitse maksutavan
  const handleChange = (index, field, value) => {
    setMarkers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  //Asettaa markerin muokkaustilaan
  const handleEdit = (marker) => {
    setEditingMarker(marker);
  };

  //Muokattavan markerin kenttien päivitys
  const handleEditingChange = (field, value) => {
    const updated = { ...editingMarker, [field]: value };
    setEditingMarker(updated);
    //Päivitä myös markers-tilaa, jotta muutokset säilyvät
    setMarkers((prev) =>
      prev.map((m) => m._id === updated._id ? updated : m)
    );
  };

return {
    editingMarker,
    setEditingMarker,
    handleRemove,
    handleChange,
    handleEdit,
    handleEditingChange,

};
}