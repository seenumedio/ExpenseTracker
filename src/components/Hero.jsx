import React from 'react'

const Hero = ({ title = 'Track Your Expenses', subtitle = 'Money is the root of this world. Use it wisely with Expense Tracker' }) => {
  return (
    <>
      <section className="w-[95%] mx-auto rounded-xl sm:rounded-2xl py-4 sm:py-6 md:py-8 mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900"
            >
              {title}
            </h1>
            <p
              className="mt-3 md:mt-4 text-sm sm:text-lg md:text-xl text-slate-500 max-w-xs sm:max-w-md md:max-w-none mx-auto"
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