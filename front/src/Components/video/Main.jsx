import React from 'react'
import Videobac from './video.mp4'
const Main = () => {
  return (
    <div className='main'>
         <video src={Videobac} autoPlay loop muted/>
    </div>
  )
}

export default Main;
