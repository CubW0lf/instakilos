import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import uxContext from "../../contexts/uxContext";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiMessageRounded } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import "./Post.css";

const Post = ({ post }) => {
    const [like, setLike] = useState(false);
    const [creator, setCreator] = useState(null);

    const { api } = useContext(uxContext);

    useEffect(() => {
        axios.get(`${api}${post.creator}`).then(({ data }) => {
            setCreator(data);
        });
    }, [api, post.creator]);

    return (
        <article className="Post">
            <header>
                <div className="left">
                    <img src={creator?.avatar} alt={creator?.pseudo} className="avatar" />
                    <div className="infos">
                        <Link to={`/profile/${creator?.id}`}>
                            <h2>{creator?.pseudo}</h2>
                        </Link>
                        <span>{post?.place}</span>
                    </div>
                </div>
                <div className="options">...</div>
            </header>
            <img src={post?.imageUrl} alt={creator?.pseudo} className="picture" />
            <footer>
                <div className="actions">
                    <ul>
                        <li onClick={() => setLike(!like)}>{like ? <FcLike /> : <AiOutlineHeart />}</li>
                        <li>
                            <BiMessageRounded />
                        </li>
                        <li>
                            <FiSend />
                        </li>
                    </ul>
                </div>
                <div className="bookmark">
                    <BsBookmark />
                </div>
            </footer>
        </article>
    );
};

export default Post;
