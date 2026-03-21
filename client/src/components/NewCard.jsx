import { motion } from 'framer-motion';
import { FaWallet } from 'react-icons/fa';

function NewCard({ bg = '', setActiveCard, amount = '', type, extra=null }) {
    return (
        <motion.div
            className={`bg-gradient-to-br from-${bg}-100 to-${bg}-200 rounded-lg shadow-md flex justify-center`}
            onClick={() => setActiveCard({ label: type, amount, extra })}
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center justify-center cursor-pointer py-6"
            >
                <FaWallet className={`text-${bg}-600 text-3xl mb-2`} />
                <p className="text-sm text-gray-600">{type}</p>
                <h2 className="hidden md:block text-xl font-bold text-gray-800">
                    ₹ {amount}
                </h2>
            </motion.div>
        </motion.div>
    );
}

export default NewCard;