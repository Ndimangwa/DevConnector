import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
  return (
    <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave a comment ...</h3>
        </div>
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            dispatch(addComment(postId, {text}));
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Write a comment"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentForm
