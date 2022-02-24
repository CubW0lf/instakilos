import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import uxContext from "../../contexts/uxContext";
// import userContext from "../../contexts/userContext";
import axios from "axios";
import PhoneInfos from "../../components/PhoneInfos/PhoneInfos";
import { BsChevronLeft } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiUserPin } from "react-icons/bi";
import { FiBell, FiUserPlus } from "react-icons/fi";
import { MdOutlineGridOn, MdOutlineVideoLabel } from "react-icons/md";
import { VscPlay } from "react-icons/vsc";
import Stories from "../../components/Stories/Stories";
import "./Profile.css";
import FeedItem from "../../components/FeedItem/FeedItem";

const Profile = () => {
    const [member, setMember] = useState([]);
    const [posts, setPosts] = useState([]);
    // const [conversations, setConversations] = useState([]);

    const { id } = useParams("id");

    // const { user } = useContext(userContext);
    const { api } = useContext(uxContext);

    useEffect(() => {
        if (api) {
            axios.get(`${api}/api/members/${id}`).then(({ data }) => {
                setMember(data);
            });
            axios.get(`${api}/api/posts`).then(({ data }) => {
                setPosts(data["hydra:member"]);
            });
        }
    }, [api, id]);

    const handleConversation = () => {
        // conversations.map(c => )
    };

    return (
        <>
            <PhoneInfos />
            <div className="Profile">
                <header className="profile-header">
                    <Link to="/">
                        <BsChevronLeft />
                    </Link>
                    <span className="slug">{member.pseudo}</span>
                    <div>
                        <FiBell /> <HiDotsHorizontal />
                    </div>
                </header>
                <div className="profile-infos">
                    <img src={member.avatar} alt={member.pseudo} className="avatar" />
                    <span className="publications">
                        <b>184</b>publication
                    </span>
                    <span className="subscribers">
                        <b>2</b>abonnés
                    </span>
                    <span className="subscribtions">
                        <b>300</b>abonnement
                    </span>
                </div>
                <div className="bio">
                    <p>{member.pseudo}</p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur voluptates ratione aliquid id
                        fugit dolor reprehenderit, itaque facere? Dolores nisi numquam sed sunt ab ipsum debitis,
                        voluptatibus ad quas incidunt.
                    </p>
                </div>
                <div className="social">
                    <button className="action">S'abonner</button>
                    <button className="action" onClick={handleConversation}>
                        Ecrire
                    </button>
                    <button className="action">
                        <FiUserPlus />
                    </button>
                </div>
                <div className="featured_stories">
                    <Stories />
                </div>
                <div className="feed_type_icons">
                    <div className="feed_type">
                        <MdOutlineGridOn />
                    </div>
                    <div className="feed_type">
                        <MdOutlineVideoLabel />
                    </div>
                    <div className="feed_type">
                        <VscPlay />
                    </div>
                    <div className="feed_type">
                        <BiUserPin />
                    </div>
                </div>
                <div className="feed">
                    {posts?.map((p) => (
                        <FeedItem key={p.id} post={p} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Profile;
