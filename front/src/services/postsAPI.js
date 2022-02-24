import axios from "axios";

export const findAll = () => {
    return axios.get("https://localhost:8000/api/posts").then(({ data }) => data["hydra:member"]);
};
