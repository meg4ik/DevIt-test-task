// components/ArticleList.js
'use client'
import React, { useState, useEffect } from 'react';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8088/articles/')
      .then(response => response.json())
      .then(data => setArticles(data.results))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
            <p>Published Date: {article.published_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
