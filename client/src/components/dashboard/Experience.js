import {Fragment} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deleteExperience} from '../../actions/profile';

const Experience = ({ experience }) => {
    const dispatch = useDispatch();
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td className='hide-sm'>
                {moment(exp.from).format('YYYY/MM/DD')} -- {
                    exp.to === null ?
                        ( ' Now') :
                        moment(exp.to).format('YYYY/MM/DD')
                }
            </td>
            <td>
                <button onClick={() => dispatch(deleteExperience(exp._id))} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));
    return (
    <Fragment>
    { experiences.length !== 0 && (
        <Fragment>
            <h2 className='my-2'>Experince Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    ) }
    </Fragment>
  );
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired
};

export default Experience;
