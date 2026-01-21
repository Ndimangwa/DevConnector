import React, { useEffect, Fragment } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';

const Posts = () => {
    const {posts, loading} = useSelector((state) => state.post);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
  return loading ? <Spinner/> : (<Fragment>
    <h1 className='large text-primary'>Posts</h1>
    <p className='lead'>
        <i className='fas fa-user'></i>{' '}
        Welcome to the Community
    </p>
    {/* Now Post List */}
    <div className='posts'>
        { posts.map(post => (
            <PostItem key={post._id} post={post} auth={auth}/>
        )) }
    </div>
  </Fragment>);
}

export default Posts
