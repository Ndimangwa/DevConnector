import {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profile';

const Profiles = () => {
    const dispatch = useDispatch();
    const {profiles, loading} = useSelector((state) => state.profile);
    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);
  return (
    <Fragment>
      {loading ? <Spinner/> :
        <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'></i>
                Browse and Connect with Developers
            </p>
            <div className='profiles'>
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))
                ) : (<h4>No Profile Found</h4>)}
            </div>
        </Fragment>
        }
    </Fragment>
  );
}

export default Profiles;
