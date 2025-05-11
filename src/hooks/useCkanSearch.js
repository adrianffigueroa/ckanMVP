// src/hooks/useCkanSearch.js
import { useState, useEffect } from "react";
import { searchDatasets } from "@/services/ckan";

export function useCkanSearch(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    searchDatasets(query)
      .then(setData)
      .catch((err) => {
        console.error("Error buscando datasets:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading, error };
}
