import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { setup, isAuthenticated } from "./services/authAPI.js";
import { ProtectedRoute } from "./protected/ProtectedRoute.js";
import userContext from "./contexts/userContext.js";
import uxContext from "./contexts/uxContext.js";
import Home from "./pages/Home/Home";
import Messages from "./pages/Messages/Messages";
import Messenger from "./pages/Messenger/Messenger";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile.jsx";
import "./App.css";

function App() {
    const [api, setApi] = useState("");
    const [token, setToken] = useState("");
    const [flash, setFlash] = useState("");
    const [flashType, setFlashType] = useState("");
    const [authenticated, setAuthenticated] = useState(isAuthenticated);
    const [user, setUser] = useState(null);

    const deleteFlash = () => {
        setFlash("");
    };

    const handleFlash = (type, text, duration) => {
        setFlashType(type);
        setFlash(text);
        setTimeout(deleteFlash, duration);
    };

    useEffect(() => {
        setup();
        setApi("https://localhost:8000");
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        if (token !== "") {
            axios
                .get(`${api}/api/me`)
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => console.log(error));
        }
    }, [token, api]);

    return (
        <uxContext.Provider value={{ api, handleFlash, flash, flashType }}>
            <userContext.Provider value={{ user, setUser, authenticated, setAuthenticated }}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={authenticated ? <Home /> : <Login />} />

                        <Route path="/" element={<ProtectedRoute />}>
                            <Route path="messages" element={<Messages />} />
                            <Route path="messenger/:id" element={<Messenger />} />
                            <Route path="register" element={<Register />} />
                            <Route path="profile/:id" element={<Profile />} />
                        </Route>
                    </Routes>
                </div>
            </userContext.Provider>
        </uxContext.Provider>
    );
}

export default App;
