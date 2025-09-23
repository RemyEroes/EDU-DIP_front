import { useState, useEffect } from "react";
import axios from "axios";

function useFetchWithAuth(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Pas de token trouvé");
          setLoading(false);
          return;
        }

        const url = import.meta.env.VITE_API_URL + '/' + endpoint;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ...deps]);

  // log quand data change
  useEffect(() => {
    if (data !== null) console.log("Nouvelle data:", data);
  }, [data]);

  return { data, loading, error };
}

export default useFetchWithAuth;