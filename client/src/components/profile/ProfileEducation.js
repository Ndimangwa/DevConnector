import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ProfileEducation = ({education : {
    school,
    degree,
    fieldofstudy,
    from,
    to, 
    description
} }) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        { moment(from).format('YYYY/MMM/DD') } -- { !to ? ' Now' : moment(to).format('YYYY/MMM/DD') }
      </p>
      <p>
        <strong>Degree/Diploma : </strong>{degree}
      </p>
      <p>
        <strong>Field of Study : </strong>{fieldofstudy}
      </p>
      <p>
        <strong>Description : </strong>{description}
      </p>
    </div>
  )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation
