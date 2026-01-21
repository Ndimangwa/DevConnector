import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  key,
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth
}) => {
    const dispatch = useDispatch();
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          {text}
        </p>
        <p class="post-date">Posted on { moment(date).format('YYYY/MMM/DD') }</p>
        <button onClick={e => dispatch(addLike(_id))} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>
          { likes.length > 0 && (
            <span>{likes.length}</span>
          ) }
        </button>
        <button onClick={e => dispatch(removeLike(_id))} type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion { comments.length > 0 && (
            <span class="comment-count">{comments.length}</span>
          ) }
        </Link>
        {! auth.loading && user === auth.user._id && (
            <button onClick={e => dispatch(deletePost(_id)) } type="button" class="btn btn-danger">
                <i class="fas fa-times"></i>
            </button>
        ) }
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default PostItem;
