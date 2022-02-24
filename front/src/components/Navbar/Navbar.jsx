import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../contexts/userContext";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiMoviePlay, BiShoppingBag } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
    const { user } = useContext(userContext);
    return (
        <nav className="Navbar">
            <Link to="/">
                <AiFillHome />
            </Link>
            <BsSearch />
            <BiMoviePlay />
            <BiShoppingBag />
            <img src={user?.avatar} className="avatar" alt={user?.pseudo} />
        </nav>
    );
};

export default Navbar;
