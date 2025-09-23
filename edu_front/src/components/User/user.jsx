import {useParams,} from 'react-router-dom';

export default function User() {
    const {user} = useParams();

    if (!user) {
        return <div>Cet utilisateur n'existe pas</div>;
    }

    const matieres = user.matieres;


    return (
        <div style={{padding: '1rem'}}>
            <h2>Profil</h2>
            <p><strong>Nom:</strong> {user.nom}</p>
            <p><strong>Prénom:</strong> {user.prenom}</p>
            <p><strong>Classe:</strong> {user.classe}</p>

            <div>
                <strong>Matières:</strong>
                {matieres.length > 0 ? (
                    <ul>
                        {matieres.map((matiere, id) => (
                            <li key={id}>{matiere}</li>
                        ))}
                    </ul>
                ) : (
                    <span> Aucune matière renseignée</span>
                )}
            </div>
        </div>
    );
}
