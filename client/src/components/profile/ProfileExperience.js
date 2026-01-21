import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ProfileExperience = ({experience : {
    company,
    title,
    location,
    from,
    to, 
    description
} }) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        { moment(from).format('YYYY/MMM/DD') } -- { !to ? ' Now' : moment(to).format('YYYY/MMM/DD') }
      </p>
      <p>
        <strong>Position : </strong>{title}
      </p>
      <p>
        <strong>Description : </strong>{description}
      </p>
    </div>
  )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
