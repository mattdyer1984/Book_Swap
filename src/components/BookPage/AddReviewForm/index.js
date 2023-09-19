import React, { useState } from "react";
import "./addreview.css";

function AddReviewForm(props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [nameError, setNameError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewCharCount, setReviewCharCount] = useState(0);
  const maxReviewLength = 450;

  function handleInputChange(event, setState) {
    const newValue = event.target.value;
    setState(newValue);
  }

  function clearForm() {
          setNameError("");
          setRatingError("");
          setReviewError("");
          setName("");
          setRating("");
          setReview("");
          setReviewCharCount(0);
  }

  function handleReviewChange(event) {
    const newReview = event.target.value;
    if (newReview.length <= maxReviewLength) {
      setReview(newReview);
      setReviewCharCount(newReview.length);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://book-swap-api.dev.io-academy.uk/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        rating: rating,
        review: review,
        book_id: props.id,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setNameError(data.errors.name);
          setRatingError(data.errors.rating);
          setReviewError(data.errors.review);
        } else {
         clearForm()
          props.onReviewSubmit({
            name: name,
            rating: rating,
            review: review,
          });
        }
      });
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <p className="review-title">Want to review this book?</p>
      <label className="label-names" htmlFor="name">
        Name
      </label>
      <input
        placeholder="Name"
        id="name"
        type="text"
        value={name}
        onChange={(e) => handleInputChange(e, setName)}
      />
      <div className="error-message">{nameError}</div>

      <label className="label-names" htmlFor="rating">
        Rating (out of 5)
      </label>
      <input
        id="rating"
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => handleInputChange(e, setRating)}
      />
      <div className="error-message">{ratingError}</div>

      <label className="label-names" htmlFor="review">
        Review
      </label>
      <textarea
        id="review"
        value={review}
        onChange={handleReviewChange}
      />
      <div className="char-count">
        {reviewCharCount} / {maxReviewLength} characters
      </div>
      <div className="error-message">{reviewError}</div>
      <input className="submit" type="submit" value="Review" />
    </form>
  );
}

export default AddReviewForm;
