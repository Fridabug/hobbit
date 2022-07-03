import React from 'react'
import {GoLocation} from 'react-icons/go'
import './show-profle.styles.scss'

function ShowProfile({toggle, userName, message, imgUrl, user, hobbies, age, location}) {

  return (
    <>
        <div className={ toggle ? 'dark' : null }></div>
        <div className='modal-two'>
            <div className='modal-content'>
                <span className='close' onClick={toggle}>x</span>
                <div className='show-profile'>
                    <div className='profile-pic-container'><img src={imgUrl} alt='profile pic'/></div>
                    <div className='profile-content'>
                        <h2>{userName}, {age}</h2>
                        <p><GoLocation/> {location}</p>
                        <div>Hobbies: {hobbies.map(hobby => <span className="tag">{hobby}</span>)}</div>
                        <p>About me: {message ? message : "user doesn't have a bio yet"}</p>
                    </div>
                    

                </div>
            </div>
        </div>
    </>
  )
}

export default ShowProfile