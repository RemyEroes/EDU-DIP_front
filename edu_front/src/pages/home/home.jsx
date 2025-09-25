import React, {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import './home.scss';
import HomeButton from "../../components/Home/home-button.jsx";

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            setError("Vous n'êtes pas connecté.");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                })
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}))
                    throw new Error(data.message || `Erreur ${res.status}`);
                }
                const data = await res.json();
                setUser(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [])

    const isProfessor = useMemo(() => {
        if (!user) return false

        const role = user.role;

        if (typeof role === 'string') return role.toLowerCase().includes('prof');

        if (typeof role === 'object' && role !== null) {
            return (role.name || role.label || '').toLowerCase().includes('prof')
        }

        return false
    }, [user])

    if (loading) return <div className="home__loading">Chargement...</div>
    if (error) return <div className="home__error">Erreur: {error}</div>

    const firstName = user?.first_name;
    const lastName = user?.last_name;

    return (
        <div className="home">
            <h1 className="home__title">
                Bonjour {firstName} {lastName}
            </h1>

            <nav className="home__menu">
                {isProfessor ? (
                    <>
                        <Link to="/classes" className="home__link">
                            Liste des classes
                        </Link>
                        <Link to="/class" className="home__link">
                            Créer une classe
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={`/users/${user.id}`} className="home__link">
                            Accéder à ma classe
                        </Link>
                    </>
                )}
                <Link to="/quizz" className="home__link">
                    Liste des quizz
                </Link>
            </nav>
        </div>
    )
}
