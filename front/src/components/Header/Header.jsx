import { Link } from "react-router-dom";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import "./Header.css";

const Header = () => {
    return (
        <div className="Header">
            <div className="title">
                <h1>Instakilos</h1>
            </div>
            <div className="actions">
                <div className="add">
                    <BiMessageSquareAdd />
                </div>
                <div className="like">
                    <BsHeart />
                </div>
                <Link to="/messages">
                    <div className="messenger">
                        <FiSend />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
