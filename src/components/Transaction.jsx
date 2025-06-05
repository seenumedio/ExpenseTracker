import React from 'react'
import { useState } from 'react';
import { FaRupeeSign, FaCalendarAlt } from 'react-icons/fa'
const Transaction = ({ transaction }) => {

    const [showAmount, setShowAmount] = useState(false);
    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-3 md:p-4">
                <div className="mb-6">
                    <span className=" text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                        {transaction.recurring}
                    </span>
                    <span className="text-orange-700 mb-3 float-right">
                        <FaCalendarAlt className='inline mb-1 mr-1' />
                        {transaction.date}
                    </span>

                </div>
                <h3 className="text-2xl font-bold my-4">{transaction.category}</h3>

                <span
                    className={
                        `${transaction.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} 
                        text-md px-2 py-1 rounded-md`
                    }
                >
                    <button onClick={() => setShowAmount((prevState) => !prevState)} className="inline mb-5 hover:text-lg">{transaction.type}</button>
                </span>
                <div className={`${showAmount ? '' : 'hidden'} inline text-lg text-yellow-600 m-4`}>
                    <FaRupeeSign className='inline mb-1' />
                    {transaction.amount}
                </div>

                <div className="border border-gray-100 mb-5"></div>
                <div className="flex flex-col justify-between mb-4">

                    <a
                        href={`./transactions/${transaction.id}`}
                        className="h-[36px] bg-oliveGreen hover:bg-green-100 py-2 text-green-900 rounded-lg text-center text-sm"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Transaction