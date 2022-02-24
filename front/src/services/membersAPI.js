import axios from "axios";

export const findAll = () => {
    return axios.get("https://localhost:8000/api/members").then(({ data }) => data["hydra:member"]);
};

export const createNew = (name, mdp) => {
    return axios
        .post(`https://localhost:8000/api/members`, {
            pseudo: name,
            roles: [],
            password: mdp,
            avatar: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
        })
        .then(({ data }) => data);
};
