import React from 'react'

const Loader = () => {
  return (
    <div className="loader">
        <svg className="svg-wrap" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle stroke-linecap="round" stroke-width="2" className="svg-stroke" cy="25" cx="50" r="15"></circle>
            <circle className="circle circle-one" cy="25" cx="35" r="1"></circle>
            <circle className="circle circle-two" cy="25" cx="45" r="1"></circle>
            <circle className="circle circle-three" cy="25" cx="55" r="1"></circle>
        </svg>  
    </div>
  )
}

export default Loader