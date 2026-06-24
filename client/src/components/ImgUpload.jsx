import React from 'react'
import { useNavigate } from 'react-router-dom'

function ImgUpload() {
    const navigate = useNavigate();
    return (
        <>
            <h2 className="text-base font-semibold text-darkBlue mb-3">
                Scan & Add Expense
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <label
                    htmlFor="receipt-upload"
                    className="flex flex-col items-center"
                >
                    <div className="text-5xl mb-3">
                        📄
                    </div>

                    <p className="text-base text-gray-500 text-center mb-4">
                        Drop your receipt here or
                        <span className="text-blue-500 font-semibold ml-1">
                            Browse
                        </span>
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate('/add-transaction')}
                        className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                    >
                        Upload & Analyze
                    </button>
                </label>

            </div>
        </>
    )
}

export default ImgUpload