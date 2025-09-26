import React from 'react';
import { useParams, Link } from 'react-router-dom';
import HomeButton from "../Home/home-button.jsx";
import useFetchWithAuth from "../../hooks/useFetchWithAuth";

export default function ClasseDetail() {
  const { id } = useParams();
  // const { data, loading, error } = useFetchWithAuth(`classes/${id}`, [id]);
    const { data, loading, error } = useFetchWithAuth(`apitest`, [id]);


    const getStudents = (classe) => {
    if (!classe) return [];
    // Try common keys and shapes
    const direct = classe.people;
    if (Array.isArray(direct) && direct.length) return direct;
    if (Array.isArray(classe.users)) {
      return classe.users.filter((u) => (u.role || u.type || '').toString().toLowerCase().includes('student') || (u.is_student === true));
    }
    return [];
  };

  const getSubjects = (classe) => {
    if (!classe) return [];
    const subjects = classe.subjects;
    return Array.isArray(subjects) ? subjects : [];
  };

  const renderStudent = (s, idx) => {
    if (!s || typeof s !== 'object') return <li key={idx}>{String(s)}</li>;
    const name = [s.first_name, s.last_name].filter(Boolean).join(' ');
    const label = name || s.username || s.email || s.name || `Élève ${s.id ?? idx}`;
    return (
      <li key={s.id ?? idx}>
        {label}
        {s.id ? (
          <>
            {' '}
            <Link to={`/users/${s.id}`}>Voir</Link>
          </>
        ) : null}
      </li>
    );
  };

  const renderSubject = (m, idx) => {
    if (typeof m === 'string') return <li key={idx}>{m}</li>;
    if (!m || typeof m !== 'object') return <li key={idx}>{String(m)}</li>;
    const label = m.name || m.nom || m.label || `Matière ${m.id ?? idx}`;
    return <li key={m.id ?? idx}>{label}</li>;
  };

  return (
    <>
      <h2>Détail de la classe</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      {!loading && !error && (
        <div>
          {data && (data.name || data.nom) ? (
            <h3>{data.name || data.nom}</h3>
          ) : null}

          <section>
            <h4>Élèves</h4>
            {(() => {
              const students = getStudents(data);
              if (students.length === 0) return <p>Aucun élève dans cette classe.</p>;
              return <ul>{students.map(renderStudent)}</ul>;
            })()}
          </section>

          <section>
            <h4>Matières</h4>
            {(() => {
              const subjects = getSubjects(data);
              if (subjects.length === 0) return <p>Aucune matière associée.</p>;
              return <ul>{subjects.map(renderSubject)}</ul>;
            })()}
          </section>
        </div>
      )}
      <HomeButton />
    </>
  );
}
