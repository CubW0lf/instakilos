import { Link } from "react-router-dom";
import PhoneInfos from "../../components/PhoneInfos/PhoneInfos";
import { BsBookmark, BsChevronLeft } from "react-icons/bs";
import { AiOutlineVideoCamera, AiOutlineInfoCircle } from "react-icons/ai";
import "./MessengerHeader.css";

const MessengerHeader = ({ friend }) => {
    return (
        <div className="MessengerHeader">
            <PhoneInfos />
            <header className="messenger-header">
                <div className="left">
                    <Link to="/messages">
                        <BsChevronLeft />
                    </Link>
                    <div className="avatar">
                        <img src={friend?.avatar} alt={friend?.pseudo} />
                    </div>
                    <div className="pseudos">
                        <span>{friend?.pseudo}</span>
                        <span>{friend?.pseudo}</span>
                    </div>
                </div>
                <div className="actions">
                    <AiOutlineVideoCamera />
                    <BsBookmark />
                    <AiOutlineInfoCircle />
                </div>
            </header>
        </div>
    );
};

export default MessengerHeader;
