"use client"
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ArticleEditor from './ArticleEditor';
import ArticleForm from './ArticleForm';

const AdminArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('-published_date');
  const [editedArticle, setEditedArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('accessToken');

  const fetchArticles = (page) => {
    let url = `http://127.0.0.1:8088/articles/?page=${page}&ordering=${orderBy}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setArticles(data.results);
        setCurrentPage(page);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch(error => console.error('Error fetching articles:', error));
  };

  useEffect(() => {
    fetchArticles(1);
  }, [searchQuery, orderBy]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchArticles(page);
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const formatPublishedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8088/admin/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        fetchArticles(currentPage);
      } else {
        console.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const handleEditClick = (article) => {
    setEditedArticle(article);
  };

  const handleSaveArticle = async (article) => {
    try {
      const response = await fetch(`http://127.0.0.1:8088/admin/${article.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      });
      if (response.ok) {
        fetchArticles(currentPage);
        setEditedArticle(null);
      } else {
        console.error('Failed to update article');
      }
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedArticle(null);
  };

  const handleCreate = () => {
    setShowForm(false);
    fetchArticles(currentPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Articles</h1>
      <SearchBar value={searchQuery} onChange={handleSearchInputChange} />
      <div className="mb-4">
        <label htmlFor="orderBy" className="mr-2">Order By:</label>
        <select id="orderBy" value={orderBy} onChange={handleOrderByChange}  className="text-black">
          <option value="-published_date">Newest First</option>
          <option value="published_date">Oldest First</option>
        </select>
      </div>
      {showForm ? (
        <ArticleForm onCreate={handleCreate} />
      ) : (
        <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Article</button>
      )}
      <ul>
        {articles.map(article => (
          <li key={article.id} className="border border-gray-300 rounded-lg p-4 mb-4 flex items-start">
            <div className="flex-grow">
              {editedArticle && editedArticle.id === article.id ? (
                <ArticleEditor
                  article={editedArticle}
                  onSave={handleSaveArticle}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <a className="text-blue-500 font-bold" href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                  <p className="text-white-700">{article.description}</p>
                </>
              )}
              <p className="text-gray-500">Published Date: {formatPublishedDate(article.published_date)}</p>
            </div>
            <button onClick={() => handleEditClick(article)} className="text-blue-500 font-bold">Edit</button>
            <button onClick={() => deleteArticle(article.id)} className="text-red-500 font-bold ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default AdminArticleList;
