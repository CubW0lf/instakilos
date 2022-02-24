import axios from "axios";

export const createNew = (credentials) => {
    return axios.post(`https://localhost:8000/api/messages`, credentials).then(({ data }) => data);
};
