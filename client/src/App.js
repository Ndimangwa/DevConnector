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
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import {store} from './store';

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
            <Route element={<ProtectedRoute/>}>
              <Route exact path='/dashboard' element={<Dashboard/>}/>
              <Route exact path='/create-profile' element={<CreateProfile/>}/>
              <Route exact path='/edit-profile' element={<CreateProfile/>}/>
              <Route exact path='/add-experience' element={<AddExperience/>}/>
              <Route exact path='/add-education' element={<AddEducation/>}/>
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