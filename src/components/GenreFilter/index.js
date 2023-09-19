import { useEffect, useState } from "react";
import "./genre-filter.css";

function GenreFilter(props) {
  const [bookGenres, setBookGenres] = useState([]);

  useEffect(() => {
    fetch("https://book-swap-api.dev.io-academy.uk/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setBookGenres(data.data);
      });
  }, []);

  function setGenre(event) {
    props.setGenreID(event.target.value);
  }

  return (
    <div className="container">
      <label htmlFor="genreId">Filter by genre:</label>
      <select className="dropdown" id="genreId" onChange={setGenre}>
        <option className="dropdown" value={0}>
          All
        </option>
        {bookGenres.map((genre) => (
          <option className="dropdown" value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
