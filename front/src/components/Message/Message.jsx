import "./Message.css";

const Message = ({ item, user, friend }) => {
    return item && user && friend ? (
        <div className={`Message ${item?.fromMember["@id"] === user["@id"] ? "me" : ""}`}>
            {item.fromMember["@id"] !== user["@id"] && <img src={friend?.avatar} alt={friend?.pseudo} className="avatar" />}
            <div className="content">{item.content}</div>
        </div>
    ) : (
        ""
    );
};

export default Message;
