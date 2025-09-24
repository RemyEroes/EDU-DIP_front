// import { useState, useEffect } from "react";
// import axios from "axios";

// function usePostWithAuth(endpoint, data, deps = []) {
//     const [loading, setLoading] = useState(false); // Initialisé à false pour éviter un état de chargement inutile
//     const [error, setError] = useState(null);
//     const [response, setResponse] = useState(null); // Ajout d'un état pour stocker la réponse

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             setResponse(null);

//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     throw new Error("Pas de token trouvé");
//                 }

//                 const url = import.meta.env.VITE_API_URL + '/' + endpoint;
//                 const res = await axios.post(url, data, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setResponse(res.data); // Stocke la réponse dans l'état
//             } catch (err) {
//                 setError(err.response?.data?.message || err.message || "Erreur inconnue");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [endpoint, data, ...deps]); // Ajout de `data` dans les dépendances pour refléter les changements

//     return { loading, error, response }; // Retourne également la réponse
// }

// export default usePostWithAuth;

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