import React from 'react';
import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const LandingPage = () => (
  <div id="main">
    <h1>Business Ideas</h1>
    <BookList />
    <AddBook />
  </div>
);

export default LandingPage;
