import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ProfileItem = ({key, profile}) => {
    const {
      user: { _id, name, avatar },
      skills, 
      status, 
      company, 
      location
    } = profile; //contains name and avatar due to populate
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={avatar} alt=''/>
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        <p className='my-1'>
            {location && <span>{location}</span>}
        </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
      </div>
      <ul>
        {skills.slice(0,4).map((skill, index)=> (
            <li key={index} className='text-primary'>
                <i className='fas fa-check'></i>
                {skill}
            </li>
        ))}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
