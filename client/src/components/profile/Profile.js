import {Fragment, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getProfileById(id));
    }, [dispatch, id]);
    const { profile, loading } = useSelector(state => state.profile);
    const auth = useSelector(state => state.auth);
  return (
    <Fragment>
        { profile === null || loading ? <Spinner/> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
            { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
            ) }
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
            </div>
        </Fragment> }
    </Fragment>
  );
}

export default Profile;
