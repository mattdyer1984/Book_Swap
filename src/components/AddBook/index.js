import { useState } from "react";
import "./add-book.css";
import { Navigate } from "react-router-dom";
import GenreDropdown from "./GenreDropdown";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState(0);
  const [pageCount, setPageCount] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [blurb, setBlurb] = useState("");

  const [redirect, setRedirect] = useState(false);

  const [titleErrors, setTitleErrors] = useState("");
  const [authorErrors, setAuthorErrors] = useState("");
  const [genreErrors, setGenreErrors] = useState("");
  const [blurbErrors, setBlurbErrors] = useState("");
  const [imgErrors, setImgErrors] = useState("");
  const [yearErrors, setYearErrors] = useState("");

  function handelInputChange(event, setState) {
    const newValue = event.target.value;
    setState(newValue);
  }

  function generatePostData() {
    const postData = {
      "title": title,
      "author": author,
      "genre_id": genre,
    };

    if (blurb && blurb.length != 0) {
      postData.blurb = blurb;
    }

    if (imgUrl && imgUrl.length != 0) {
      postData.image = imgUrl;
    }

    if (year && year != 0) {
      postData.year = year;
    }

    if (pageCount && pageCount != 0) {
      postData.page_count = pageCount;
    }
    return postData;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const postData = generatePostData();

    fetch("https://book-swap-api.dev.io-academy.uk/api/books", {
      method: "POST",

      // putting data into json
      body: JSON.stringify(postData),
      mode: "cors",
      // Telling the API that we're sending JSON, and we want JSON back
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setTitleErrors(data.errors.title);
          setAuthorErrors(data.errors.author);
          setGenreErrors(data.errors.genre_id);
          setBlurbErrors(data.errors.blurb);
          setImgErrors(data.errors.image);
          setYearErrors(data.errors.year);
        } else {
          setRedirect(true);
        }
      });
  }

  return (
    <form className="addform" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title (required)</label>
        <input
          type="input"
          name="title"
          placeholder="Title"
          onChange={(e) => handelInputChange(e, setTitle)}
        />
      </div>
      <div className="field">
        <label htmlFor="author">Author (required)</label>
        <input
          type="input"
          name="author"
          placeholder="Author"
          onChange={(e) => handelInputChange(e, setAuthor)}
        />
      </div>
      <div className="field">
        <GenreDropdown genre={genre} setGenre={setGenre} />
      </div>
      <div className="field">
        <label htmlFor="year">Year</label>
        <input
          type="input"
          name="year"
          placeholder="2000"
          onChange={(e) => handelInputChange(e, setYear)}
        />
      </div>
      <div className="field">
        <label htmlFor="page-count">Page Count</label>
        <input
          type="input"
          name="page-count"
          placeholder="0"
          onChange={(e) => handelInputChange(e, setPageCount)}
        />
      </div>
      <div className="field">
        <label htmlFor="img-url">Image URL</label>
        <input
          type="input"
          name="img-url"
          placeholder="Image URL"
          onChange={(e) => handelInputChange(e, setImgUrl)}
        />
      </div>
      <div className="field">
        <label htmlFor="blurb">Blurb</label>
        <textarea
        className="text-area"
          placeholder="Blurb"
          name="blurb"
          rows="4"
          cols="50"
          onChange={(e) => handelInputChange(e, setBlurb)}
        ></textarea>
      </div>
      <div className="field">
        <button className="submit-button">Add book</button>
      </div>
      <div className="errors">
        <p>{titleErrors}</p>
        <p>{authorErrors}</p>
        <p>{genreErrors}</p>
        <p>{blurbErrors}</p>
        <p>{imgErrors}</p>
        <p>{yearErrors}</p>
      </div>

      {redirect && <Navigate replace to="/" />}
    </form>
  );
}

export default AddBook;
