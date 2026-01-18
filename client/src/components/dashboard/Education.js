import {Fragment} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
    const dispatch = useDispatch();
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td className='hide-sm'>
                {moment(edu.from).format('YYYY/MM/DD')} -- {
                    edu.to === null ?
                        ( ' Now') :
                        moment(edu.to).format('YYYY/MM/DD')
                }
            </td>
            <td>
                <button onClick={() => dispatch(deleteEducation(edu._id))} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));
    return (
    <Fragment>
    { educations.length !== 0 && (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    ) }
    </Fragment>
  );
}

Education.propTypes = {
    education: PropTypes.array.isRequired
};

export default Education;
