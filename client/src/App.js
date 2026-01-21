import { Fragment, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import {store} from './store';
import Posts from './components/posts/Posts';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {
  useEffect(() => {
    //[] => componentDidMount()
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Landing/>}/>
        </Routes>
        <section className="container">
          <Alert/>
          <Routes>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/profiles' element={<Profiles/>}/>
            <Route exact path='/profile/:id' element={<Profile/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route exact path='/dashboard' element={<Dashboard/>}/>
              <Route exact path='/create-profile' element={<CreateProfile/>}/>
              <Route exact path='/edit-profile' element={<CreateProfile/>}/>
              <Route exact path='/add-experience' element={<AddExperience/>}/>
              <Route exact path='/add-education' element={<AddEducation/>}/>
              <Route exact path='/posts' element={<Posts/>}/>
            </Route>
          </Routes>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
/*
<section className="container">
        <Routes>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Routes>
        </section>
*/