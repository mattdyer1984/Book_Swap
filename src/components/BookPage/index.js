import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./book-page.css";
import BookClaimForm from "../BookClaimForm";
import BookReturnForm from "../BookReturnForm";
import AddReviewForm from "./AddReviewForm"

function BookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [pages, setPages] = useState(0);
  const [genre, setGenre] = useState("");
  const [blurb, setBlurb] = useState("");
  const [img, setImg] = useState("");
  const [claimedBy, setClaimedBy] = useState();

  const [reviews, setReviews] = useState([]);
  const [reviewsNum, setReviewsNum] = useState(0);
  const [reviewsAvg, setReviewsAvg] = useState(0);

  const { id } = useParams("");

  function fetchBookData() {
    fetch("https://book-swap-api.dev.io-academy.uk/api/books/" + id)
      .then((res) => res.json())
      .then((info) => {
        setTitle(info.data.title);
        setAuthor(info.data.author);
        setYear(info.data.year);
        setPages(info.data.pages);
        setGenre(info.data.genre.name);
        setBlurb(info.data.blurb);
        setReviews(info.data.reviews);
        setImg(info.data.image);
        setClaimedBy(info.data.claimed_by_name);

        const totalRating = info.data.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );

        setReviewsAvg(
          (totalRating / info.data.reviews.length || 0).toPrecision(2)
        ); // avoid dividing by zero
        setReviewsNum(info.data.reviews.length);
        console.log(info.data.reviews.length);
      })
      .catch((error) => console.error("Error fetching data", error));
  }
  useEffect(() => {
    fetchBookData()
  }, [id])
  function handleReviewSubmit(newReview) {
    setReviews([...reviews, newReview])
    fetchBookData()
  }

  return (
    <div className="bookPageContainer">
      <div className="bookpage">
        <div className="lef-col">
          <img src={img} width="300px"></img>
        </div>
        <div className="right-col">
          <h1>{title}</h1>
          <p>{author}</p>
          <p>{year}</p>
          <p>{pages}</p>
          <p>{genre}</p>

          
           <a id='review-scores' href='#reviews'> <u>{reviewsNum} reviews</u> - {reviewsAvg}/5 stars</a>
          

          {claimedBy == null ?
            <BookClaimForm claimedBy={claimedBy} setClaimedBy={setClaimedBy} /> :
            <>
              <p className="claimed">claimed by {claimedBy}</p>
              <BookReturnForm />
            </>
          }

          <p>{blurb}</p>
          <AddReviewForm id={id} onReviewSubmit={handleReviewSubmit} />
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>
                  <strong>{review.name}</strong>
                </p>
                <p className="score">Score: {review.rating}/5 stars</p>
                <p id="reviews" >{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
