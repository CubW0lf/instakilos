import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services/authAPI.js";
import { Link } from "react-router-dom";
import uxContext from "../../contexts/uxContext";
import userContext from "../../contexts/userContext.js";
import "./Login.css";

const Login = () => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    const { flash, flashType, handleFlash } = useContext(uxContext);
    const { setAuthenticated } = useContext(userContext);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authenticate({ pseudo: pseudo, password: password });
            setAuthenticated(true);
            navigate("/");
        } catch (error) {
            handleFlash("alert", "Vos identifiants ne correspondent pas", 3000);
        }
    };

    return (
        <div className="Login">
            <h1>Bienvenue sur Instakilos</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Votre Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                <input
                    type="password"
                    placeholder="Votre mot de Passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Se Connecter</button>
            </form>
            {flash !== "" && <span className={`flash ${flashType}`}>{flash}</span>}
            <Link to="/register">S'inscrire</Link>
        </div>
    );
};

export default Login;
