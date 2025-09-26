import React from 'react';
import { Link } from 'react-router-dom';
import HomeButton from "../Home/home-button.jsx";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import './quizz-list.scss';

export default function ListQuizz() {
  const { data, loading, error } = useFetchWithAuth('quizz');

  const renderList = () => {
    if (!data) return null;
    if (Array.isArray(data)) {
      if (data.length === 0) return <p>Aucun quizz trouvé.</p>;
      return (
        <ul className="quizz__menu">
          {data.map((q) => {
            const key = q.id ?? JSON.stringify(q);
            const label = q.name || q.title || q.nom || `Quizz ${q.id ?? ''}`;
            return (
              <li key={key}>
                {q.id ? (
                  <Link to={`/quizz-without-correction/${q.id}`} className="quizz__link">{label}</Link>
                ) : (
                  label
                )}
              </li>
            );
          })}
        </ul>
      );
    }
    return <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <>
      <h2>Liste des quizz</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      {!loading && !error && renderList()}
      <HomeButton />
    </>
  );
}
