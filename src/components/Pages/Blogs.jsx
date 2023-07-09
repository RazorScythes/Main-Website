import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown, faArrowRight, faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs, countBlogCategories, addOneBlogLikes } from "../../actions/blogs";
import Cookies from 'universal-cookie';
import moment from 'moment';
import heroImage from '../../assets/hero-image.jpg';
import styles from "../../style";

const cookies = new Cookies();

const TextWithEllipsis = ({ text, limit = 55 }) => {
    if (text.length > limit) {
      return <span>{text.slice(0, limit)}...</span>;
    }
    return <span>{text}</span>;
}

const Blogs = ({ user }) => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const blog = useSelector((state) => state.blogs.blogs)
    const categories = useSelector((state) => state.blogs.categories)

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        dispatch(getBlogs({
            id: user ? user.result?._id : ''
        }))
        dispatch(countBlogCategories({
            id: user ? user.result?._id : ''
        }))
    }, [])

    const pageIndex = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1
    const navType = searchParams.get('type') ? searchParams.get('type') : ''
    const filteredType = searchParams.get('category') ? searchParams.get('category') : ''
    const paramIndex = searchParams.get('type') === null || searchParams.get('type') === ''
    const checkParams = (val) => {return searchParams.get('type') === val}

    const [toggle, setToggle] = useState({
        categories: false,
        filtered: false
    })
    const [blogs, setBlogs] = useState([])
    const [displayedPages, setDisplayedPages] = useState([]);

    const itemsPerPage = 18; // Number of items per page
    const totalPages = Math.ceil(blogs?.length / itemsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(pageIndex);
    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        window.scrollTo(0, 0)
        const calculateDisplayedPages = () => {
          const pagesToShow = [];
          const maxDisplayedPages = 6; // Maximum number of page buttons to display
    
          if (totalPages <= maxDisplayedPages) {
            // If total pages are less than or equal to the maximum, display all pages
            for (let i = 1; i <= totalPages; i++) {
              pagesToShow.push(i);
            }
          } else {
            let startPage;
            let endPage;
    
            if (currentPage <= Math.floor(maxDisplayedPages / 2)) {
              // If current page is close to the beginning
              startPage = 1;
              endPage = maxDisplayedPages;
            } else if (currentPage >= totalPages - Math.floor(maxDisplayedPages / 2)) {
              // If current page is close to the end
              startPage = totalPages - maxDisplayedPages + 1;
              endPage = totalPages;
            } else {
              // If current page is in the middle
              startPage = currentPage - Math.floor(maxDisplayedPages / 2);
              endPage = currentPage + Math.floor(maxDisplayedPages / 2);
            }
    
            for (let i = startPage; i <= endPage; i++) {
              pagesToShow.push(i);
            }
          }
    
          setDisplayedPages(pagesToShow);
        };
    
        calculateDisplayedPages();
    }, [currentPage, totalPages, pageIndex]);

    useEffect(() => {
        if(searchParams.get('type') === null || searchParams.get('type') === '') {
            var filteredData
            if(filteredType !== null)
                filteredData = blog.filter(obj => filteredType === obj.categories || filteredType === '');
            else 
                filteredData = blog

            setBlogs(filteredData)
        }
        else if(searchParams.get('type') === 'latest') {
            // Filter and group the objects by date
            const groupedData = blog.reduce((result, obj) => {
              const date = obj.createdAt.split('T')[0];
              if (result[date]) {
                result[date].push(obj);
              } else {
                result[date] = [obj];
              }
              return result;
            }, {});
    
            // Get the latest date from the groupedData object
            const latestDate = Object.keys(groupedData).sort().pop();
    
            // Get the objects related to the latest date
            const latestBlogs = groupedData[latestDate];
    
            if(latestBlogs !== undefined) { 
                var filteredData
                if(filteredType !== null)
                    filteredData = latestBlogs.filter(obj => filteredType === obj.categories || filteredType === '');
                else 
                    filteredData = latestBlogs
    
                setBlogs(filteredData)
            }
        }
        else if(searchParams.get('type') === 'most_viewed') {
            // Sort the data based on views in ascending order
            if(blog.length > 0) {
              var arr = [...blog]
    
              const sortedData = arr.sort((a, b) => b.views.length - a.views.length);
    
              if(sortedData.length > 0)
                var filteredData
                if(filteredType !== null)
                    filteredData = sortedData.filter(obj => filteredType === obj.categories || filteredType === '');
                else 
                    filteredData = sortedData
    
                setBlogs(filteredData)
            }
        }
        else if(searchParams.get('type') === 'popular') {
            // Sort the data based on views in ascending order
            if(blog.length > 0) {
                var arr = []
    
                blog.forEach(item => {
                var popularity = ((item.views.length/2) + item.likes.length) - item.dislikes.length
                    if(popularity > 0) { 
                        arr.push({...item, popularity: popularity})
                    }
                });
    
                const sortedData = arr.sort((a, b) => b.popularity - a.popularity);
    
                 if(sortedData.length > 0)
                    var filteredData 
                    if(filteredType !== null)
                        filteredData = sortedData.filter(obj => filteredType === obj.categories || filteredType === '');
                    else 
                        filteredData = sortedData
        
                    setBlogs(filteredData)
                }
          }
    }, [blog, searchParams.get('type'), filteredType])

    const convertTimezone = (date) => {
        const timeZone = 'America/New_York';

        const dateObj = new Date(date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour12: false,
        }).format(dateObj);

        return formattedDate
    }

    const handlePageType = (type) => {
        const urlString = window.location.href.split('?')[0];
        const baseUrl = window.location.origin;
        const path = urlString.substring(baseUrl.length);
        if(filteredType)
          navigate(`${path}?type=${type}&page=${1}&filtered=${filteredType}`)
        else
          navigate(`${path}?type=${type}&page=${1}`)
          
        setToggle({tags: false, filtered: false})
    };

    const handleFilteredChange = (filtered) => {
        const urlString = window.location.href.split('?')[0];
        const baseUrl = window.location.origin;
        const path = urlString.substring(baseUrl.length);
        navigate(`${path}?type=${navType}&page=${1}&category=${filtered}`)
        setToggle({tags: false, filtered: false})
        setSelectedCategory(filtered)
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        if(filteredType)
          navigate(`/blogs?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}&filtered=${filteredType}`)
        else
          navigate(`/blogs?type=${(searchParams.get('type') !== null) ? searchParams.get('type') : ''}&page=${pageNumber}`)
        
        setToggle({tags: false, filtered: false})
    };

    const addLikes = (index, blogId) => {
        var array = [...blogs]
        var duplicate = false

        array[index].likes.forEach((item) => { if(item === cookies.get('uid')) duplicate = true })
        if(!duplicate) {
            var updatedBlog = { ...array[index] }; 

            updatedBlog.likes = Array.isArray(updatedBlog.likes)
            ? [...updatedBlog.likes]
            : [];

            updatedBlog.likes.push(cookies.get('uid'));

            array[index] = updatedBlog;

            setBlogs(array);
        }
        else {
            var updatedBlog = { ...array[index] };

            updatedBlog.likes = Array.isArray(updatedBlog.likes)
            ? [...updatedBlog.likes]
            : [];

            updatedBlog.likes = updatedBlog.likes.filter((item) => item !== cookies.get('uid'))

            array[index] = updatedBlog;

            setBlogs(array);
        }

        dispatch(addOneBlogLikes({
            id: array[index]._id,
            likes: array[index].likes,
            userId: user ? user.result?._id : ''
        }))
    }

    const checkedForLikedBLogs = (likes) => {
        var liked = likes.some((item) => { if(item === cookies.get('uid')) return true })
        return liked ? liked : false;
    }

    const getFirstParagraph = (content) => {
        var text = ''
        content.some((c) => {
            if(c.element === 'normal_naragraph'){
                text = c.paragraph
                return true;
            }
        })
        return text
    }
    return (
        <div
            className="relative bg-cover bg-center"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className={`${styles.boxWidthEx}`}>
                        <div className='sm:h-96'>
                            <div className="container mx-auto py-12 xs:px-6 text-white">
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 place-content-start'>
                                    <div>
                                        <p>Home / Blogs</p>
                                        <button className='mt-4 mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 border border-gray-100  transition-colors duration-300 ease-in-out px-8 rounded-full'>
                                            {blogs?.length > 0 ? blogs.length : "0" } Articles
                                        </button>
                                        <h1 className='text-4xl font-semibold my-4'>Blogs</h1>
                                        <p>Etiam placerat velit vitae dui blandit sollicitudin. Vestibulum tincidunt sed dolor sit amet volutpat. Nullam egestas sem at mollis sodales. Nunc eget lacinia eros, ut tincidunt nunc. Quisque volutpat, enim id volutpat interdum, purus odio euismod neque, sit amet faucibus justo dolor tincidunt dui.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.marginX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidthEx}`}>
                    <div className="container mx-auto py-12 pt-4 xs:px-6 text-white">
                        <div className="flex justify-between items-center">
                            <div className='flex flex-row flex-wrap items-start xs:justify-start justify-center'>
                                <button onClick={() => handlePageType("")} style={{backgroundColor: paramIndex && 'rgb(243, 244, 246)', color: paramIndex && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100  transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>All</button>
                                <button onClick={() => handlePageType("latest")} style={{backgroundColor: checkParams('latest') && 'rgb(243, 244, 246)', color: checkParams('latest') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Latest</button>
                                <button onClick={() => handlePageType("most_viewed")} style={{backgroundColor: checkParams('most_viewed') && 'rgb(243, 244, 246)', color: checkParams('most_viewed') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>Most Viewed</button>
                                <button onClick={() => handlePageType("popular")} style={{backgroundColor: checkParams('popular') && 'rgb(243, 244, 246)', color: checkParams('popular') && 'rgb(31, 41, 55)'}} className='mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out'>Popular</button>
                                <div className='relative z-40 ml-2'>
                                    <button onClick={() => setToggle({...toggle, categories: !toggle.categories, filtered: false})} className='cursor-pointer mb-2 font-semibold text-sm bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 px-4 border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2 flex items-center'>
                                        {selectedCategory ? selectedCategory : 'Categories'}
                                        {toggle.categories ? <FontAwesomeIcon icon={faChevronUp} className='ml-1 font-bold'/> : <FontAwesomeIcon icon={faChevronDown} className='ml-1 font-bold'/> }
                                    </button>
                                    {
                                        categories && categories.length > 0 &&
                                            <div className={`${toggle.categories ? `absolute` : `hidden`}`}>
                                                <ul className='no-scroll max-h-[183px] overflow-y-auto flex flex-col mb-2 font-semibold text-sm bg-gray-800 text-gray-100  border border-gray-100 transition-colors duration-300 ease-in-out xs:mr-2 mr-2'>
                                                <button onClick={() => handleFilteredChange('')}><li className='px-4 py-2 hover:bg-gray-900 hover:text-gray-100 cursor-pointer'>All</li></button>
                                                    {
                                                        categories.map((item, index) => {
                                                            return (
                                                                <button onClick={() => handleFilteredChange(item.category)} key={index}><li className='px-4 py-2 hover:bg-gray-900 hover:text-gray-100 cursor-pointer'>{item.category} ({item.count})</li></button>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-12 gap-5 place-content-start mt-8'>
                            {
                                blogs && blogs.length > 0 &&
                                    blogs.slice(startIndex, endIndex).map((item, index) => {
                                        var liked_blogs = checkedForLikedBLogs(item.likes);
                                        var first_paragraph = getFirstParagraph(item.content)
                                        return (
                                            <div key={index}>
                                                <div className='relative'>
                                                    <img 
                                                        src={item.featured_image}
                                                        alt="Featured Image"
                                                        className='rounded-lg h-[435px] w-full object-cover border border-gray-800'
                                                    />
                                                    <label className='absolute top-16 font-semibold  bg-[#CD3242] pl-4 pr-8 py-1 rounded-br-full rounded-tr-full'>{item.categories}</label>
                                                </div>
                                                <div className='grid sm:grid-cols-3 grid-cols-3 gap-12 place-content-start p-2 py-3'>
                                                    <div className='col-span-2 flex flex-wrap items-center'>
                                                        <img 
                                                            src={item.user.avatar}
                                                            className='w-8 h-8 object-cover rounded-full border border-gray-400'
                                                            alt="avatar"
                                                        />
                                                        <p className='ml-2 break-all text-white'>{item.user.username}</p>
                                                    </div>
                                                    <div className='flex flex-wrap items-center justify-end'>
                                                        <button className='cursor-pointer' onClick={() => addLikes(index, item._id)}><FontAwesomeIcon icon={faHeart} style={{color: liked_blogs ? '#CD3242' : '#FFF'}} className='mr-1 pt-1 font-bold text-lg'/> {item.likes.length}</button>
                                                    </div>
                                                </div>
                                                <div className='p-2 py-1'>
                                                    <h2 className='text-3xl font-semibold'><TextWithEllipsis text={item.post_title} limit={60}/></h2>
                                                    <p className='break-all text-white mt-2'><TextWithEllipsis text={first_paragraph} limit={150}/></p>
                                                    <div className='flex justify-between items-center mt-4'>
                                                        <p><FontAwesomeIcon icon={faCalendar} className='mr-1 pt-1 font-bold'/> {convertTimezone(item.createdAt)}</p>
                                                        <Link to={`/blogs/${item._id}`} className='flex items-center justify-end text-right hover:text-[#CD3242] transition-all'>Continue Reading <FontAwesomeIcon icon={faArrowRight} className='ml-1 pt-1 font-bold'/></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>

                        {
                            blogs && blogs.length > 0 &&
                            <div className='flex items-center justify-center mt-12'>
                                <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='cursor-pointer mr-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
                                >
                                <span className='xs:block hidden'>Prev</span>
                                <FontAwesomeIcon icon={faChevronLeft} className='xs:hidden inline-block'/>
                                </button>
                                {displayedPages.map((pageNumber) => (
                                <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                // className={currentPage === index + 1 ? "active" : ""}
                                style={{backgroundColor: pageIndex === pageNumber ? "rgb(243 244 246)" : "rgb(31 41 55)", color: pageIndex === pageNumber ? "rgb(31 41 55)" : "rgb(243 244 246)"}}
                                className="cursor-pointer mx-1 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out"
                                >
                                {pageNumber}
                                </button>
                                ))}
                                <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className='cursor-pointer ml-2 bg-gray-800 hover:bg-transparent hover:text-gray-100 text-gray-100 py-1 xs:px-4 px-2 border border-gray-100 rounded transition-colors duration-300 ease-in-out'
                                >
                                <span className='xs:block hidden'>Next</span>
                                <FontAwesomeIcon icon={faChevronRight} className='xs:hidden inline-block'/>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs