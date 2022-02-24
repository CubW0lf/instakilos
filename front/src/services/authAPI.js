import axios from "axios";
import jwtDecode from "jwt-decode";

export const authenticate = (credentials) => {
    return axios
        .post(`https://localhost:8000/api/login`, credentials)
        .then(({ data }) => data.token)
        .then((token) => {
            window.localStorage.setItem("token", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            axios.defaults.headers["accept"] = "application/ld+json";
        });
};

export const logout = () => {
    window.localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
    delete axios.defaults.headers["accept"];
};

export const setup = () => {
    const token = window.localStorage.getItem("token");

    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            axios.defaults.headers["accept"] = "application/ld+json";
        } else {
            logout();
        }
    } else {
        logout();
    }
};

export const isAuthenticated = () => {
    const token = window.localStorage.getItem("token");

    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
