import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Card from "../components/Card";
const NewUserPage = () => (
    <>
        <Hero />
        <div className="bg-[#fdf6e3] min-h-[70vh] flex flex-col items-center justify-center py-8">
            <section className="w-full max-w-5xl px-4 mt-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">What You Can Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card bg={'bg-white'}>
                        <h3 className="font-bold text-lg mb-2">Add Transactions</h3>
                        <p className="text-gray-700">Record your income and expenses easily.</p>
                    </Card>
                    <Card bg={'bg-white'}>
                        <h3 className="font-bold text-lg mb-2">Visual Dashboard</h3>
                        <p className="text-gray-700">Get insights with pie charts and summaries</p>
                    </Card>
                    <Card bg={'bg-white'}>
                        <h3 className="font-bold text-lg mb-2">Categorize Expenses</h3>
                        <p className="text-gray-700">Track where your money goes.</p>
                    </Card>
                </div>
            </section>

            <section className="w-full max-w-3xl mt-12 px-2 md:px-0">
                <div className="bg-black rounded-xl p-8 flex flex-col items-center">
                    <h2 className="text-2xl md:text-2xl font-bold text-[#ffe082] mb-4 text-center">
                        Start Managing Your Finances Today
                    </h2>
                    <Link
                        to="/add-transaction"
                        className="bg-[#ffe082] hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md text-lg transition"
                    >
                        Add Your First Expense
                    </Link>
                </div>
            </section>

            <footer className="mt-16 text-gray-600 text-center text-sm">
                © 2024 Expense Tracker by Saiesh
            </footer>
        </div>
    </>
);

export default NewUserPage;
