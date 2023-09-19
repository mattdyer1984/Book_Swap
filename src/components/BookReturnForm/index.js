import { useState } from "react";
import "./bookreturn.css";
import { useParams } from "react-router-dom";

function BookReturnForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const { id } = useParams("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://book-swap-api.dev.io-academy.uk/api/books/return/" + id, {
      method: "PUT",

      // putting data into json
      body: JSON.stringify({
        "email": email,
      }),
      mode: "cors",
      // Telling the API that we're sending JSON, and we want JSON back
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
        setErrorMessage(data.message)
      });
  }

  return (
    <form className="return-form" onSubmit={handleSubmit}>
      <p className="heading">want to return this book?</p>
      <div className="input">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleEmail}
        />
      </div>
      <input className="return-button" type="submit" value="Return"></input>
      <p className="error">{errorMessage}</p>
    </form>
  );
}

export default BookReturnForm;
