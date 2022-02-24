import { useState, useEffect } from "react";
import { findAll } from "../../services/storiesAPI";
import StoryItem from "../StoryItem/StoryItem";
import "./Stories.css";

const Stories = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const test = async () => {
            const data = await findAll();
            setStories(data);
        };
        test();
    }, []);

    return (
        <div className="Stories">
            {stories.map((s) => (
                <StoryItem key={s.id} item={s} />
            ))}
            <hr />
        </div>
    );
};

export default Stories;
