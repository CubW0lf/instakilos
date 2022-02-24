import { useState, useEffect } from "react";
import axios from "axios";
import "./StoryItem.css";

const StoryItem = ({ item }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`https://localhost:8000${item.creator}`).then(({ data }) => {
            setUser(data);
        });
    }, [item.creator]);
    return (
        <div className="StoryItem">
            <div className="bg">
                <img src={user?.avatar} alt={user?.pseudo} />
            </div>
            <span>{user?.pseudo}</span>
        </div>
    );
};

export default StoryItem;
