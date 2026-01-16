import {Fragment, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    //destructuring
    const {company, title, location, from, to, current, description} = formData;
    //onChange Listener
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                dispatch(addExperience(formData, navigate));
            }}>
                <div className="form-group">
                <input value={title} onChange={e => onChange(e)} type="text" placeholder="* Job Title" name="title" required />
                </div>
                <div className="form-group">
                <input value={company} onChange={e => onChange(e)} type="text" placeholder="* Company" name="company" required />
                </div>
                <div className="form-group">
                <input value={location} onChange={e => onChange(e)} type="text" placeholder="Location" name="location" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input value={from} onChange={e => onChange(e)} type="date" name="from" />
                </div>
                <div className="form-group">
                <p><input type="checkbox" checked={current} name="current" value={current} onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(! toDateDisabled);
                }} />{' '} Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input disabled={ toDateDisabled ? 'disabled' : '' } value={to} onChange={e => onChange(e)} type="date" name="to" />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description}
                    onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
}

export default AddExperience;
