// src/utils.js

export const getUniqueCategories = (data) => {
    const categories = data.map(item => item.category);
    return [...new Set(categories)]; // Returns unique categories
};
