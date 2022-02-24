import axios from "axios";

export const findAll = () => {
    return axios.get("https://localhost:8000/api/conversations").then(({ data }) => data["hydra:member"]);
};

export const find = (id) => {
    return axios.get(`https://localhost:8000/api/conversations/${id}`).then(({ data }) => data);
};
