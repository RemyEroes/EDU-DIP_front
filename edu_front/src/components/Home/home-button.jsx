import {useNavigate} from 'react-router-dom';

export default function HomeButton() {
    const navigate = useNavigate();

    function handleBackToHome() {
        navigate('/');
    }

    return (
        <div>
            <button type="button" onClick={handleBackToHome} className="btn">Accueil</button>
        </div>
    )
}
