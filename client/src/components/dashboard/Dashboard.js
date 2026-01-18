//import {Fragment} from 'react';
import {useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  //distructuring
  const {profile, loading} = useSelector((state) => state.profile);
  const {user} = useSelector((state) => state.auth);
  useEffect(() => {
    //componentDidMount
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return loading && profile === null ? <Spinner/> : 
  (<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'>
      <i className='fas fa-user'></i>
      Welcome { user && user.name }
    </p>
    { profile !== null ? 
      (<Fragment>
        <DashboardActions/>
        <Experience experience={profile.experience}/>
        <Education education={profile.education}/>
        <div className='my-2'>
          <button className='btn btn-danger' onClick={() => dispatch(deleteAccount())}>
            <i className='fas fa-user-minus'></i>
            Delete My Account
          </button>
        </div>
      </Fragment>) : 
      (<Fragment>
        <p>You have not setup a profile, please add some info.</p>
        <Link className='btn btn-primary my-1' to='/create-profile'>Create Profile</Link>
      </Fragment>) }
  </Fragment>);
}

export default Dashboard;