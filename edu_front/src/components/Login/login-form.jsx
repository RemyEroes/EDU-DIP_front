import './login-form.scss';


export default function LoginForm() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="username" >Nom d'utilisateur</label>
            <input type="text" id="username" placeholder="Nom d'utilisateur"/>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="Mot de passe"/>
            <button type="submit" className="btn" >Se connecter</button>
        </form>
    )
}
