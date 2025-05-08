import React from 'react'
import Products from './Products'

const HeroSection = () => {
  return (
    <>
   <div className="card text-bg-dark border-0 ">
  <img src="/src/assets/images/hero3.png" className="card-img " alt="..." height='600px'/>
  <div className="card-img-overlay d-flex flex-column justify-content-center ">
    <div className='ms-3 '>

    {/* <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
    <p className="card-text">CHECK OUT ALL THE TRENDS</p> */}
    </div>
   
  </div>
</div>
<Products/>

    </>
  )
}

export default HeroSection