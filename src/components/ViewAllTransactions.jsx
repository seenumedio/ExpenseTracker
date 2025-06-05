import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom';
const ViewAllTransactions = () => {
    const [viewAll, setViewAll] = useState(false);
    return (
        <section className="m-auto max-w-lg mt-6 sm:mt-16">
            <Link
                to="./transactions"
                className="block bg-gray-700 text-white text-center py-4 rounded-xl hover:bg-green-100 hover:text-green-900"
            >View All Transactions</Link>
        </section>
    )
}

export default ViewAllTransactions