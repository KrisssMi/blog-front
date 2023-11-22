import Moment from "react-moment";
import { deleteComment } from "../../functions/post";

export default function Comment({ comment, post, user, delComment }) {
  const deleteHandler = async () => {
    try {
      const res = await deleteComment(post._id, comment._id, user.token);

      if (res.status === 200) {
        delComment(comment._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment">
      <img src={comment.commentBy.picture} alt="" className="comment_img" />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          <div className="comment_text">{comment.comment}</div>
          {(user.role == "Admin" ||
            post.user._id == user.id ||
            comment.commentBy._id == user.id) && (
            <button onClick={deleteHandler}>delete</button>
          )}
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
