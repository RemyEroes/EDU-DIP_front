import HomeButton from "../Home/home-button.jsx";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import { Link } from "react-router-dom";
import './classe-list.scss';

export default function ClasseList() {
    const { data, loading, error } = useFetchWithAuth('classes');

    const renderList = () => {
        if (!data) return null;
        if (Array.isArray(data)) {
            if (data.length === 0) return <p>Aucune classe trouvée.</p>;
            return (
                <ul className="classe__menu">
                    {data.map((classe) => {
                        return (
                            <li key={classe.id} >
                                {classe.id ? (
                                    <Link to={`/class/${classe.id}`} className="classe__link">{classe.name}</Link>
                                ) : (
                                    classe.name
                                )}
                            </li>
                        );
                    })}
                </ul>
            );
        }

    };

    return (
        <>
            <h2>Liste des classes</h2>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
            {!loading && !error && renderList()}
            <HomeButton />
        </>
    );
}
