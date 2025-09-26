import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './user.scss';
import HomeButton from "../Home/home-button.jsx";

export default function User() {
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Vous n'êtes pas connecté.");
            setLoading(false);
            return;
        }

        if (!id) {
            setError("Aucun identifiant d'utilisateur fourni dans l'URL.");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || `Erreur ${res.status}`);
                }

                const data = await res.json();
                setUser(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!user) return <div>Cet utilisateur n'existe pas</div>;
console.log(user);
    const classes = Array.isArray(user.classes) ? user.classes : [];

    // "Matières" ne sont pas renvoyées par l'API actuelle.
    // On tente plusieurs clés possibles et on gère le cas d'absence.
    const matieres = user.subjects;
console.log(matieres);
    return (
        <>
            <div className="user-profile">
                <h2 className="user-profile__title">Profil</h2>

                <p className="user-profile__field">
                    <strong>Nom:</strong> {user.last_name || '—'}
                </p>
                <p className="user-profile__field">
                    <strong>Prénom:</strong> {user.first_name || '—'}
                </p>

                <div className="user-profile__section">
                    <strong>Classe(s):</strong>
                    {classes.length > 0 ? (
                        <ul className='user-profile__list'>
                            {classes.map((c) => (
                                <li key={c.id}>
                                    {/*{c.name} {c.level ? `(Niveau: ${c.level})` : ''}*/}
                                    <Link to={`/class/${c.id}`} > {c.name} {c.level ? `(Niveau: ${c.level})` : ''} </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span> Aucune classe associée</span>
                    )}
                </div>

                <div className="user-profile__section">
                    <strong>Matières:</strong>
                    {Array.isArray(matieres) && matieres.length > 0 ? (
                        <ul className='user-profile__list'>
                            {matieres.map((m, idx) => (
                                <li key={idx}>{typeof m === 'string' ? m : m?.name || JSON.stringify(m)}</li>
                            ))}
                        </ul>
                    ) : (
                        <span> Aucune matière renseignée</span>
                    )}
                </div>
            </div>
            <HomeButton/>
        </>
    );
}
