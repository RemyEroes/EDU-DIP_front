import { useState } from "react";
import axios from "axios";

function usePostWithAuth(endpoint, method = "POST") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const postData = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const url = import.meta.env.VITE_API_URL + "/" + endpoint;

            let res;

            switch (method.toUpperCase()) {
                case "POST":
                    res = await axios.post(url, data, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    break;
                case "DELETE":
                    // For DELETE, axios expects data to be in the config object
                    res = await axios.delete(url, {
                        headers: { Authorization: `Bearer ${token}` },
                        data: data,
                    });
                    break;
                case "PUT":
                    res = await axios.put(url, data, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    break;
                default:
                    throw new Error(`Méthode HTTP non supportée: ${method}`);
            }


            setResponse(res.data);
        } catch (err) {
            console.error("Erreur axios:", err);
            setError(err.response?.data?.message || err.message || "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return { postData, response, loading, error };
}

export default usePostWithAuth;