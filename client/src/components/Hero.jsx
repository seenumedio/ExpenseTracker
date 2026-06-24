import React from 'react'

const Hero = ({ title = 'Track Your Expenses', subtitle = 'Money is the root of this world. Use it wisely with Expense Tracker' }) => {
  return (
    <section className="w-[95%] mx-auto rounded-xl py-3 sm:py-4 mt-20">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Hero