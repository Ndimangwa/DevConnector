import { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  const onLogout = (e) => {
    dispatch(logout());
  }
  //authLinks
  const authLinks = (
      <ul>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user'>{' '}</i>
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a href="#!" onClick={e => onLogout(e)}>
            <i className='fas fa-sign-out-alt'>{' '}</i>
            <spam class="hide-sm">Logout</spam>
          </a>
        </li>
      </ul>
  );
  //guestLinks
  const guestLinks = (
    <ul>
        <li><a href="#!">Developers</a></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {! loading && (<Fragment>
        {isAuthenticated ? authLinks : guestLinks}
      </Fragment>)}
    </nav>
  );
}

export default Navbar;
