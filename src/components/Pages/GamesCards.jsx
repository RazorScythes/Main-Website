import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const divideAndScale = (a, b) => {
    var result = a / b;
    var scaledResult = result % 5;
  
    if (scaledResult < 0) {
      scaledResult += 5;
    }
    console.log(Number(scaledResult.toFixed(1)))
    return Number(scaledResult.toFixed(1));
}

const GamesCards = ({ id, heading, image, category, downloads, uploader, ratings }) => {

    const [rating, setRating] = useState(0);
    const [fixedRating, setFixedRating] = useState(ratings ? divideAndScale(ratings, 3) : 0)
    const [ratingNumber, setRatingNumber] = useState(ratings ? divideAndScale(ratings, 3) : 0)

    const handleMouseEnter = (index, isHalf) => {
        setRating(index + (isHalf ? 0.5 : 1));
    };

    const handleMouseLeave = () => {
        setRating(0);
    };

    const handleStarClick = (index, isHalf) => {
        const newRating = index + (isHalf ? 0.5 : 1);
        setFixedRating(newRating === fixedRating ? 0 : newRating);
        // You can add your logic here to handle the rating value
    };

    const TextWithEllipsis = ({ text, limit = 25 }) => {
        if (text.length > limit) {
          return <span>{text.slice(0, limit)}...</span>;
        }
        return <span>{text}</span>;
    }

    return (
        <div className='bg-gray-800 rounded-sm shadow-[0px_2px_10px_2px_rgba(0,0,0,0.56)]'>
            <img
                className='h-44 w-full object-cover rounded-t-sm'
                alt="game feature image"
                src={image}
            />
            <div className='py-2 px-4 text-gray-300'>
                <p className="text-center mb-2 text-sm w-full mr-2 bg-gray-700 text-gray-100 py-1 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out">
                    {category}
                </p>
                <h2 className='text-lg  font-semibold'><TextWithEllipsis text={heading}/> </h2>
                <p className='text-xs text-gray-400'><strong>By:</strong> {uploader}</p>
                <div className="flex items-center star-rating">
                    {[...Array(5)].map((_, index) => ( 
                        <span
                            key={index}
                            className={`relative star ${fixedRating >= index + 1 ? 'filled' : rating >= index + 1 ? 'filled' : ''} ${
                                fixedRating === index + 0.5 ? 'half-filled' : rating === index + 0.5 ? 'half-filled' : ''
                            }`}
                            onMouseEnter={() => handleMouseEnter(index, false)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleStarClick(index, false)}
                        >
                            &#9733;
                        </span>
                    ))}
                    <span className='ml-1'>({ratingNumber})</span>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-2'>
                    <p className='flex items-center text-sm'>{downloads} Download{downloads > 1 && 's'}</p>
                </div>
                <div className='grid grid-cols-3 gap-2 mt-2'>
                    <Link to="/games/adventure_time" className='col-span-2 '>
                        <button className="sm:text-base text-sm w-full mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-2 border border-gray-100 transition-colors duration-300 ease-in-out">
                            Preview
                        </button>
                    </Link>
                    <button className="sm:text-base text-sm w-full mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-2 border border-gray-100 transition-colors duration-300 ease-in-out">
                        <FontAwesomeIcon icon={faDownload} className="text-white"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GamesCards