import React from 'react';
import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const Books = () => (
  <div id="main">
    <h1>Ninja's Reading List</h1>
    <BookList />
    <AddBook />
  </div>
);

export default Books;
