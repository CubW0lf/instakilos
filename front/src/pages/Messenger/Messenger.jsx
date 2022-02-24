import { find } from "../../services/conversationsAPI.js";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import userContext from "../../contexts/userContext";
import { createNew } from "../../services/messagesAPI.js";
import { io } from "socket.io-client";
import { MdCameraAlt } from "react-icons/md";
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlinePicture, AiFillPlusCircle } from "react-icons/ai";

import MessengerHeader from "../../components/MessengerHeader/MessengerHeader";
import "./Messenger.css";
import Message from "../../components/Message/Message.jsx";

const Messenger = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState(null);

    const { user } = useContext(userContext);
    const { id } = useParams("id");

    useEffect(() => {
        setSocket(io("http://localhost:5000"));
    }, []);

    useEffect(() => {
        socket?.on("message", (data) => {
            setMessages((oldstate) => [...oldstate, data]);
        });
    }, [socket]);

    useEffect(() => {
        const set = async () => {
            const data = await find(id);
            setConversation(data);
        };
        set();
    }, [id]);

    useEffect(() => {
        if (conversation !== null) {
            setFriend(conversation.members?.filter((m) => m.pseudo !== user?.pseudo)[0]);
            setMessages(conversation?.messages);
        }
    }, [conversation, user?.pseudo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            fromMember: `/api/members/${user.id}`,
            toMember: friend["@id"],
            conversation: `/api/conversations/${conversation.id}`,
            content: message,
        };

        const data = await createNew(credentials);
        if (data) {
            socket?.emit("message", {
                fromMember: user,
                toMember: friend,
                conversation: `/api/conversations/${conversation.id}`,
                content: message,
            });
        }
        setMessage("");
    };

    return (
        <div className="Messenger">
            <MessengerHeader friend={friend} />
            <div className="messages">
                {messages?.length !== 0 &&
                    messages?.map((m, index) => <Message key={index} item={m} user={user} friend={friend} />)}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="left">
                    <MdCameraAlt className="picture" />
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Votre message..."
                    />
                </div>
                <div className="actions">
                    <HiOutlineMicrophone />
                    <AiOutlinePicture />
                    <AiFillPlusCircle />
                </div>
            </form>
        </div>
    );
};

export default Messenger;
