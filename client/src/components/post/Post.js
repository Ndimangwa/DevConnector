import React, {useEffect, Fragment} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPost} from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);
    const {loading, post} = useSelector(state => state.post);
    const auth = useSelector(state => state.auth);
  return loading || post === null ? <Spinner/> : <Fragment>
    <Link to='/posts'>Back to Post</Link>
    <PostItem post={post} showActions={false}/>
    <CommentForm postId={post._id}/>
    <div className='comments'>
      {post.comments.map(comment => <CommentItem
        key={comment._id}
        comment={comment}
        postId={post._id}
        auth={auth}
      />)}
    </div>
  </Fragment>;
}

export default Post
