import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reviews({ productId, userId }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews/${productId}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, [productId]);

    const submitReview = () => {
        axios.post('http://localhost:5000/reviews', { userId, productId, rating, reviewText })
            .then(response => {
                setReviews([...reviews, response.data]);
                setRating(5);
                setReviewText('');
            })
            .catch(error => console.error('Error submitting review:', error));
    };

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.username}</strong>: {review.review_text} - {review.rating}/5
                    </li>
                ))}
            </ul>
            <h3>Leave a Review</h3>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here"
            ></textarea>
            <button onClick={submitReview}>Submit Review</button>
        </div>
    );
}

export default Reviews;
