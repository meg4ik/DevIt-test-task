
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <input
        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search articles by title or description"
      />
    </div>
  );
};

export default SearchBar;
