import { Link } from "react-router-dom";
import { createNew } from "../../services/membersAPI";
import { useState, useContext } from "react";
import uxContext from "../../contexts/uxContext";
import "./Register.css";

const Register = () => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [newUser, setNewUser] = useState(null);

    const { flash, flashType, handleFlash } = useContext(uxContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === verifyPassword) {
            try {
                const data = await createNew(pseudo, password);
                if (data.pseudo) {
                    setNewUser(data.pseudo);
                }
            } catch (error) {
                handleFlash("alert", "Ce compte existe déjà ou une erreur inattendue est survenue", 3000);
            }
        } else {
            handleFlash("alert", "Vos mots de passe ne correspondent pas.", 3000);
        }
        if (newUser !== null) {
            handleFlash("valid", `Merci ${newUser} votre Inscription à bien été prise en compte.`, 5000);
        }
    };

    return (
        <div className="Register">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Votre Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                <input
                    type="password"
                    placeholder="Votre Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Verifiez votre mot de passe"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
                <button type="submit">S'inscrire</button>
            </form>
            <Link to="/">Se Connecter</Link>
            {flash !== "" && <span className={`flash ${flashType}`}>{flash}</span>}
        </div>
    );
};

export default Register;
