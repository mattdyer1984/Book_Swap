import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../BookCard";
import GenreFilter from "../GenreFilter";
import "./home.css";
import SearchBar from "../SearchBar";

function HomePage(props) {
  const [books, setBooks] = useState([]);
  const [genreID, setGenreID] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url =
      "https://book-swap-api.dev.io-academy.uk/api/books?claimed=" +
      props.claimedUrl;

    if (genreID > 0) {
      url += `&genre=${genreID}`;
    }

    if (search.length > 0) {
      url += `&search=${search}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((bookData) => {
        setBooks(bookData.data);
      });
  }, [genreID, search, props.claimedUrl]);

  return (
    <div>
      <div className="search-container">
        <GenreFilter genreID={genreID} setGenreID={setGenreID} />
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="flex_container">
        {books.map((book, index) => (
          <Link className='book-links' key={index} to={`/Book/${book.id}`}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
