import React from 'react'

const Hero = ({ title = 'Track Your Expenses', subtitle = 'Money is the root of this world. Use it wisely with Expense Tracker' }) => {
  return (
    <>
      <section className="w-[95%] mx-auto rounded-xl sm:rounded-2xl py-4 sm:py-6 md:py-8 mt-20">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>
      </div>
      </section>
    </>
  )
}

export default Hero