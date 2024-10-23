// src/components/CategoriesList.jsx

import { motion } from 'framer-motion'; // Import Framer Motion

const CategoriesList = ({ categories, onSelectCategory, selectedCategory }) => {
    return (
        <div 
          
        className="flex flex-wrap gap-1  mb-6 mx-2">
            {categories.map((category) => (
                <motion.button                
                    whileTap={{ scale: 0.5}}
                    transition={{ type: 'spring', stiffness: 9990 }} // Add a spring transition
                    key={category}
                    className={`px-2 py-1 rounded transition duration-300 ${
                        selectedCategory === category
                            ? 'bg-[black] text-[#F2F0E4]'
                            : 'bg-[#F2F0E4] text-[#F24405] hover:bg-zinc-300'
                    }`}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    );
};

export default CategoriesList;
