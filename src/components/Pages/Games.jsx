import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error_forbiden } from '../../assets';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getGames, clearAlert } from "../../actions/game";
import GamesCards from './GamesCards';
import image from '../../assets/hero-bg.jpg'
import avatar from '../../assets/avatar.png'
import styles from "../../style";
const Games = ({ user }) => {

    const dispatch = useDispatch()

    const game = useSelector((state) => state.game.games)

    const [rating, setRating] = useState(0);
    const [fixedRating, setFixedRating] = useState(3.5)
    const [games, setGames] = useState([])

    useEffect(() => {
        dispatch(getGames({
          id: user ? user.result?._id : ''
        }))
    }, [])

    useEffect(() => {
        if(game.length > 0)
            setGames(game)
    }, [game])
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
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.flexCenter}`}> 

            </div>
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto file:lg:px-8 relative px-0">
                        <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start my-10">
                            {
                                games && games.length > 0 &&
                                    games.map((item, index) => {
                                        return (
                                            <GamesCards  
                                                key={index}
                                                id={item._id}
                                                heading={item.title} 
                                                image={item.featured_image} 
                                                downloads={1}
                                                category={item.tags.length > 0 ? item.tags[0] : 'No Categories'} 
                                                uploader={item.user.username} 
                                                ratings={item.ratings}
                                            />
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games