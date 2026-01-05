import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {login} from '../../actions/auth';

const Login = () => {
  //Hooks should be at the top
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Hook Loaded
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  //from redux
  const {isAuthenticated} = useSelector(state => state.auth);
  //Destructing
  const { email, password } = formData;
  //onChange
  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  //form submitting
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({email, password}));
  }
  //Now use Effect
  useEffect(() => {
    if (isAuthenticated)  {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign In Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
}
export default Login;
