import React, { useState } from 'react';

const SearchBar = ({ onSearchChange }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearchChange(value);
    };

    return (
        <div className="relative mb-4">
            <input 
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2 border rounded-md" 
                placeholder="Search for recipes..."
            />
        </div>
    );
};

export default SearchBar;
