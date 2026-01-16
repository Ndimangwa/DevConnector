import {Fragment, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    //destructuring
    const {school, degree, fieldofstudy, from, to, current, description} = formData;
    //onChange Listener
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school you have attended degree or diploma
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                dispatch(addEducation(formData, navigate));
            }}>
                <div className="form-group">
                <input value={degree} onChange={e => onChange(e)} type="text" placeholder="* Degree/Diploma" name="degree" required />
                </div>
                <div className="form-group">
                <input value={school} onChange={e => onChange(e)} type="text" placeholder="* School/College/University" name="school" required />
                </div>
                <div className="form-group">
                <input value={fieldofstudy} onChange={e => onChange(e)} type="text" placeholder="Field of Study" name="fieldofstudy" required/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input value={from} onChange={e => onChange(e)} type="date" name="from" />
                </div>
                <div className="form-group">
                <p><input type="checkbox" checked={current} name="current" value={current} onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(! toDateDisabled);
                }} />{' '} Current School</p>
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
                    placeholder="Education Description"
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

export default AddEducation;
