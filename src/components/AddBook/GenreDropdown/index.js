import { useEffect, useState } from "react";
import "./genre-dropdown.css";

function GenreDropdown(props) {
  const [bookGenres, setBookGenres] = useState([]);

  function handelInputChange(event, setState) {
    const newValue = event.target.value;
    setState(newValue);
  }

  useEffect(() => {
    fetch("https://book-swap-api.dev.io-academy.uk/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setBookGenres(data.data);
        console.log(data.data);
      });
  }, []);

  return (
    <div className="dropdown">
      <label htmlFor="genre">Genre (required)</label>
      <select
        type="input"
        name="genre"
        placeholder="None selected"
        onChange={(e) => handelInputChange(e, props.setGenre)}
      >
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

export default GenreDropdown;
