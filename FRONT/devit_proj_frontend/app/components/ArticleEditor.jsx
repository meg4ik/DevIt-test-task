"use client"

import React, { useState } from 'react';

const ArticleEditor = ({ article, onSave, onCancel }) => {
  const [editedArticle, setEditedArticle] = useState(article);

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditedArticle(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedArticle);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex items-start">
      <div className="flex-grow">
        <input type="text" value={editedArticle.title} onChange={(e) => handleInputChange(e, 'title')} className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
        <textarea value={editedArticle.description} onChange={(e) => handleInputChange(e, 'description')} className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
        <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Save</button>
        <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
      </div>
    </div>
  );
};

export default ArticleEditor;
