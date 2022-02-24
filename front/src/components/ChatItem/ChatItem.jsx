import { useEffect, useState, useContext } from "react";
import { find } from "../../services/conversationsAPI.js";
import userContext from "../../contexts/userContext";
import { FiCamera } from "react-icons/fi";
import "./ChatItem.css";

const ChatItem = ({ item }) => {
    const [conversation, setConversation] = useState(null);
    const [friend, setFriend] = useState(null);

    const { user } = useContext(userContext);

    useEffect(() => {
        const test = async () => {
            const data = await find(item.id);
            setConversation(data);
        };
        test();
    }, [item]);

    useEffect(() => {
        setFriend(conversation?.members.filter((m) => m.pseudo !== user.pseudo)[0]);
    }, [conversation, user.pseudo]);

    return (
        <div className="ChatItem">
            <div className="left">
                <img src={friend?.avatar} alt={friend?.pseudo} />
                <div className="infos">
                    <span className="pseudo">{friend?.pseudo}</span>
                    <span className="online">En Ligne il y a 1 heures</span>
                </div>
            </div>
            <FiCamera className="camera" />
        </div>
    );
};

export default ChatItem;
