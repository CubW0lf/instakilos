import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import userContext from "../../contexts/userContext";
import { IoIosArrowBack } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import ChatItem from "../../components/ChatItem/ChatItem";
import "./Messages.css";

const Messages = () => {
    const [conversations, setConversations] = useState([]);

    const { user } = useContext(userContext);

    useEffect(() => {
        setConversations(user?.conversations);
    }, [user]);

    return (
        <div className="Messages">
            <header>
                <Link to="/">
                    <div className="left">
                        <IoIosArrowBack />
                        <span>{user?.pseudo}</span>
                    </div>
                </Link>
                <div className="right">
                    <FaListUl />
                    <BiEdit />
                </div>
            </header>
            <section>
                <div className="search">
                    <div className="input">
                        <BsSearch />
                        Rechercher
                        <GiSettingsKnobs />
                    </div>
                </div>
                <div className="boxes">
                    <div className="main active">Principal</div>
                    <div className="general">Général</div>
                    <div className="request">Demandes</div>
                </div>
                <div className="list">
                    {conversations?.length !== 0
                        ? conversations?.map((c) => (
                              <Link key={c.id} to={`/messenger/${c.id}`}>
                                  <ChatItem item={c} />
                              </Link>
                          ))
                        : "Pas de conversations à afficher"}
                </div>
            </section>
        </div>
    );
};

export default Messages;
