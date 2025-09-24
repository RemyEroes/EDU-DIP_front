import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './quizz.scss';
import axios from "axios";

export default function Quizz() {
    const {id} = useParams();

    const [quizz, setQuizz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([])
    const [quizzAnswers, setQuizzAnswers] = useState({}); // { [questionId]: answerId }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError("Vous n'êtes pas connecté.");
            setLoading(false);
            return;
        }

        if (!id) {
            setError("Aucun identifiant de quizz fourni dans l'URL.");
            setLoading(false);
            return;
        }

        const fetchQuizz = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/quizz-without-correction/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || `Erreur ${res.status}`);
                }

                const data = await res.json();
                setQuizz(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizz();
    }, [id]);

    useEffect(() => {
        if (quizz && Array.isArray(quizz.questions)) {
            setQuestions(quizz.questions);
        } else {
            setQuestions([]);
        }
    }, [quizz]);

    const handleSelect = (questionId, answerId) => {

        setQuizzAnswers((prev) => ({...prev, [questionId]: answerId}));

    };

    const handleSubmit = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const resultats = JSON.stringify(quizzAnswers);
        const finalJson = {
            user_id: user,
            quizz_id: id,
            resultats: resultats,
        }
        await axios.post(``, {finalJson});
    }

    if (loading) return <div>Chargement du quizz...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!quizz) return <div>Quizz introuvable</div>;

    return (
        <div className="quizz">
            <h1 className="quizz__title">Quizz</h1>
            <h2 className="quizz__subtitle">{quizz.name}</h2>

            {questions.length === 0 ? (
                <p>Aucune question pour ce quizz.</p>
            ) : (
                <ol className="quizz__questions">
                    {questions.map((q) => {
                        const proposals = q.answers.filter((a) => (a.question_id===q.id));
                        return (
                            <li key={q.id} className="quizz__question">
                                <div className="quizz__question-text">{q.title}</div>
                                {proposals.length > 0 ? (
                                    <ul className="quizz__answers">
                                        {proposals.map((a) => {
                                            const name = `q_${q.id}`;
                                            return (
                                                <li key={a.id} className="quizz__answer">
                                                    <label className="quizz__label">
                                                        <input type="radio" name={name} value={String(a.id)} checked={quizzAnswers[q.id] === a.id} onChange={() => handleSelect(q.id, a.id)}
                                                            className="quizz__radio"
                                                        />
                                                        {a.title}
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <div className="quizz__muted">Aucune réponse proposée</div>
                                )}
                            </li>
                        );
                    })}
                </ol>
            )}

            <button type="button" className="quizz__submit" onClick={handleSubmit}>
                Valider
            </button>
        </div>
    );
}


