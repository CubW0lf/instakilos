import "./FeedItem.css";

const FeedItem = ({ post }) => {
    return (
        <div className="FeedItem">
            <img src={post.imageUrl} alt={"post"} />
        </div>
    );
};

export default FeedItem;
