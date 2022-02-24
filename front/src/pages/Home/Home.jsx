import { useState, useEffect } from "react";
import { findAll } from "../../services/postsAPI.js";
import Post from "../../components/Post/Post.jsx";
import PhoneInfos from "../../components/PhoneInfos/PhoneInfos";
import Header from "../../components/Header/Header";
import Stories from "../../components/Stories/Stories";
import Navbar from "../../components/Navbar/Navbar";
import Push from "../../components/Push/Push";
import "./Home.css";
import Loader from "../../components/Loader/Loader.jsx";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const test = async () => {
            const data = await findAll();
            setPosts(data);
            setLoading(false);
        };
        test();
    }, []);

    return (
        <>
            <div className="top">
                <PhoneInfos />
                <Header />
            </div>
            <Stories />
            <div className="Home">{!loading ? posts?.map((p, index) => <Post key={index} post={p} />) : <Loader />}</div>
            <Push />
            <Navbar />
        </>
    );
};

export default Home;
