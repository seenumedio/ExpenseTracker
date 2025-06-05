import React from 'react'

const Hero = ({ title = 'Track Your Expenses', subtitle = 'Money is the root of this world. Use it wisely with Expense Tracker' }) => {
  return (
    <>
      <section className="bg-custom-gradient py-20 mb-4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-yellow-300 sm:text-5xl md:text-6xl"
              style={{ textShadow: '0px 1px 2px purple'}}
            >
              {title}
            </h1>
            <p 
              className="my-4 text-xl text-yellow-300"
              style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'}}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </section>


      {/* <section className="bg-dark-gradient py-20 mb-4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="text-center">
            <h1
              className="text-5xl font-poppins font-extrabold text-blue-200 sm:text-5xl md:text-6xl"
              style={{ textShadow: '0 1px 1px yellow'}}
            >
              {title}
            </h1>
            
          </div>
        </div>
      </section> */}
    </>
  )
}

export default Hero