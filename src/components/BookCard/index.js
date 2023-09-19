import "./bookcard.css"

function BookCard(props) {

    return (
            <div className='card'>
                <img src={props.book.image} alt={props.book.title} className='book_image' />
                <div className='text_container'>
                    <p className='book_title'>{props.book.title}</p>
                    <p className='book_author'>{props.book.author}</p>
                    <p className='book_genre'>{props.book.genre.name}</p>
                </div>
            </div>

    )
}

export default BookCard