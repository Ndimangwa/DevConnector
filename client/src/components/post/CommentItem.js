import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  key,
  comment: { _id, text, name, avatar, user, date },
  postId,
  auth,
}) => {
  const dispatch = useDispatch();
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">Posted on {moment(date).format("YYYY/MMM/DD")}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            onClick={(e) => dispatch(deleteComment(postId, _id))}
          >
            <i className="fas fa-times"></i> 
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

export default CommentItem;
