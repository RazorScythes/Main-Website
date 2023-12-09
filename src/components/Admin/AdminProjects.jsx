import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faCalendar, faClose, faTrash, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom'
import { Header } from './index'
import { Link } from 'react-router-dom'
import Alert from '../Alert';
import SideAlert from '../SideAlert';
import styles from '../../style'

import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import ImageModal from '../ImageModal';

import heroBackgroundImage from '../../assets/1696333975880.jpg';

const AdminProjects = ({ user, path }) => {
    const dispatch = useDispatch()

    const alert = useSelector((state) => state.settings.alert)
    const variant = useSelector((state) => state.settings.variant)
    const heading = useSelector((state) => state.settings.heading)
    const paragraph = useSelector((state) => state.settings.paragraph)

    const [open, setOpen] = useState({
        portfolio: false,
        pages: false,
        uploads: false,
        manage: false,
    })
    const [isOpen, setIsOpen] = useState(false)
    const [imageFile, setimageFile] = useState('')
    const [image, setImage] = useState('')
    const [imageModal, setImageModal] = useState(false)
    const [openImageModal, setOpenImageModal] = useState(false)
    const [displayImage, setDisplayImage] = useState('')
    const [removeImage, setRemoveImage] = useState([])
    const [preview, setPreview] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertInfo, setAlertInfo] = useState({
        alert: '',
        variant: ''
    })
    const [message, setMessage] = useState({
        heading: '',
        paragraph: ''
    })
    const [active, setActive] = useState(false)

    const { options } = useParams();
    
    const [contentSelected, setContentSelected] = useState('')
    const [form, setForm] = useState({
        featured_image: '',
        post_title: '',
        content: [],
        tags: [],
        categories: 'Gaming'
    })
    const [tags, setTags] = useState([])
    const [input, setInput] = useState({
        tags: '',
    })

    useEffect(() => {
        if(alert || variant){
            setAlertInfo({ ...alertInfo, alert: alert, variant: variant })
            setShowAlert(true)
            if(heading) {
                setMessage({...message, heading: heading, paragraph: paragraph})
                setActive(true)
            }
            setSubmitted(false)
            window.scrollTo(0, 0)
            dispatch(clearAlert())
        }
    }, [alert, variant, heading, paragraph])

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })
    
    const cropImage = (file) => {
        if(!file) {
            return;
        }
    
        if(image && image.includes('https://drive.google.com')) setRemoveImage(removeImage.concat(image))
    
        fileToDataUri(file)
            .then(dataUri => {
                setImage(dataUri)
                setImageModal(true)
            })
    }

    const addTags = () => {
        let duplicate = false
        if(input.tags.length === 0) return;
        tags.forEach(item => { if(input.tags === item) duplicate = true })
        if(duplicate) { duplicate = false; return;}
        setTags(tags.concat(input.tags))
        setInput({...input, tags: ''})
    }

    const deleteTags = (e) => {
        let arr = [...tags]
        arr.splice(e.currentTarget.id, 1)
        setTags([...arr])
    }   

    const addContentContainer = () => {
        setForm({...form, content: form.content.concat({container: []})})
    }

    const addContentElements = (parent) => {
        var array = [...form.content]

        if(contentSelected === 'normal_naragraph') {
            array[parent].container.push({ header: 'Normal Paragraph',  element: contentSelected, paragraph: ''})
        }
        else if(contentSelected === 'quoted_paragraph') {
            array[parent].container.push({ header: 'Quoted Paragraph',  element: contentSelected, paragraph: ''})
        }
        else if(contentSelected === 'grid_image') {
            array[parent].container.push({ header: 'Grid Image', type: 'boxed', element: contentSelected, input: '', grid_image: []})
        }
        else if(contentSelected === 'sub_heading') {
            array[parent].container.push({ header: 'Sub Heading',  element: contentSelected, heading: ''})
        }
        else if(contentSelected === 'bullet_list') {
            array[parent].container.push({ header: 'Bullet List',  element: contentSelected, input: '', list: []})
        }
        else if(contentSelected === 'number_list') {
            array[parent].container.push({ header: 'Number List',  element: contentSelected, input: '', list: []})
        }
        else if(contentSelected === 'single_image') {
            array[parent].container.push({ header: 'Single Image',  type: 'rectangular', element: contentSelected, image: ''})
        }
        setForm({...form, content: array})
    }

    useEffect(() => {
        console.log(form)
    }, [form])

    const moveElementUpwards = (index, parent) => {
        var array = [...form.content]

        // Swapping the positions of the first and second elements
        const temp = array[parent].container[index];
        array[parent].container[index] = array[parent].container[index-1];
        array[parent].container[index-1] = temp;

        setForm({...form, content: array})
    }

    const moveElementsDownwards = (index, parent) => {
        var array = [...form.content]

        // Swapping the positions of the second and first elements
        const temp = array[parent].container[index];
        array[parent].container[index] = array[parent].container[index+1];
        array[parent].container[index+1] = temp;

        setForm({...form, content: array})
    }

    const removeElementsContent = (index, parent) => {
        var array = [...form.content]

        array[parent].container.splice(index, 1)

        setForm({...form, content: array})
    }

    const headerValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], header: e.target.value};
        setForm({...form, content: array})
    }

    const paragraphValue = (e, index, parent) => {
        var array = [...form.content];
        array[parent].container[index] = {...array[parent].container[index], paragraph: e.target.value};
        setForm({...form, content: array});
    }

    const headingValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], heading: e.target.value};
        setForm({...form, content: array})
    }

    const singleInputValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], image: e.target.value};
        setForm({...form, content: array})
    }

    const gridInputValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], input: e.target.value};
        setForm({...form, content: array})
    }

    const listInputValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], input: e.target.value};
        setForm({...form, content: array})
    }
    
    const typeValue = (e, index, parent) => {
        var array = [...form.content]
        array[parent].container[index] = {...array[parent].container[index], type: e.target.value};
        setForm({...form, content: array})
    }

    const addGridContentImage = (index, parent) => {       
        var array = [...form.content]

        if(!array[parent].container[index].input) return
        array[parent].container[index] = {
            ...array[parent].container[index],
            grid_image: [...array[parent].container[index].grid_image, array[parent].container[index].input],
            input: ''
        };

        setForm({...form, content: array})
    }

    const addLists = (index, parent) => {       
        var array = [...form.content]

        if(!array[parent].container[index].input) return

        array[parent].container[index] = {
            ...array[parent].container[index],
            list: [...array[parent].container[index].list, array[parent].container[index].input],
            input: ''
        };

        setForm({...form, content: array})
    }

    const removeLists = (parent_index, child_index, parent) => {
        var array = [...form.content]

        array[parent].container[parent_index].list.splice(child_index, 1)

        setForm({...form, content: array})
    }

    const removeGridContentImage = (parent_index, child_index, parent) => {
        var array = [...form.content]

        array[parent].container[parent_index].grid_image.splice(child_index, 1)

        setForm({...form, content: array})
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} path={path}/>
            <div class="flex flex-col flex-1">
                <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} path={path}/>
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="mx-auto grid"></div>
                        <div className="relative bg-[#F9FAFB]">   
                            <SideAlert
                                variants={alertInfo.variant}
                                heading={message.heading}
                                paragraph={message.paragraph}
                                active={active}
                                setActive={setActive}
                            />

                            <ImageModal
                                openModal={imageModal}
                                setOpenModal={setImageModal}
                                image={image}
                                setImage={setImage}
                                preview={preview}
                                setPreview={setPreview}
                                aspects='landscape'
                            />

                            {/* <div className="sm:mx-16 mx-6 pt-8 flex justify-between items-center">
                                <h2 className='text-3xl font-semibold font-poppins'>Projects</h2>
                                <div>
                                <button className="sm:my-8 py-2 px-4 border-[#CAD5DF] leading-5 text-white font-semibold transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                                </div>
                            </div> */}
                            
                            <div className="relative">   
                                <div className={`${styles.marginX} ${styles.flexCenter}`}>
                                    <div className={`${styles.boxWidthEx}`}>
                                        <div className="container mx-auto relative px-0 pt-8 pb-16">
                                            {
                                                alertInfo.alert && alertInfo.variant && showAlert &&
                                                    <Alert variants={alertInfo.variant} text={alertInfo.alert} show={showAlert} setShow={setShowAlert} />
                                            }
                                            <div className='grid md:grid-cols-1 grid-cols-1 gap-5 place-content-start mb-4 font-poppins'>
                                                {/* <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">

                                                    <div className='relative bg-white hover:bg-blue-100 transision-all hover:cursor-pointer w-full p-2 border border-solid border-gray-300 rounded-md'>
                                                        <img
                                                            className='object-cover w-full h-52'
                                                            src={heroBackgroundImage}
                                                        />
                                                        <div className='px-2 pb-2 font-poppins'>
                                                            <h2 className='text-lg font-semibold my-2 mr-2 leading-7'>32-Band Audio Spectrum Visualizer Analyzer </h2>
                                                            <div className='flex flex-wrap'>
                                                            <p className='text-sm text-gray-600'>2310 views • </p>
                                                            <p className='text-sm text-gray-600 ml-1'> 12 likes •</p>
                                                            <p className='text-sm text-gray-600 ml-1'> 1 comments</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div> */}

                                                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
                                                    <h2 className='text-3xl font-semibold my-4'>New Project</h2>        
                                                </div>

                                                <div className="md:flex items-start justify-center mt-4">

                                                    <div className="lg:w-1/3 md:w-1/3 w-full">
                                                        <div className='grid sm:grid-cols-2 grid-cols-1  gap-5 place-content-start '>
                                                            <h2 className='text-2xl font-bold text-gray-800 my-4'>Details</h2>        
                                                        </div>

                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Featured Image Url: </label>
                                                                <div className='flex flex-row'>
                                                                    <input 
                                                                        className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                        id="file_input" 
                                                                        type="file"
                                                                        accept="image/*" 
                                                                        value={imageFile}
                                                                        onChange={(e) => {
                                                                            setimageFile(e.target.value)
                                                                            cropImage(e.target.files[0] || null)
                                                                        }}
                                                                    />
                                                                    {
                                                                        image && (
                                                                            <div className='flex flex-row items-end'>
                                                                                <button 
                                                                                    onClick={() => {
                                                                                        setPreview(true)
                                                                                        setImageModal(true)
                                                                                    }} 
                                                                                    className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2 py-3'><FontAwesomeIcon icon={faEye} className="mx-4"/>
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Post Title: </label>
                                                                <input 
                                                                    type="text" 
                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                    value={form.post_title}
                                                                    onChange={(e) => setForm({...form, post_title: e.target.value})}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Category: </label>
                                                                <select
                                                                    className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                    value={form.categories}
                                                                    onChange={(e) => setForm({...form, categories: e.target.value})}
                                                                >
                                                                    <option value="Gaming" className="capitalize">Gaming</option>
                                                                    <option value="Fashion" className="capitalize">Fashion</option>
                                                                    <option value="Beauty" className="capitalize">Beauty</option>
                                                                    <option value="Lifestyle" className="capitalize">Lifestyle</option>
                                                                    <option value="Personal" className="capitalize">Personal</option>
                                                                    <option value="Technology" className="capitalize">Technology</option>
                                                                    <option value="Health" className="capitalize">Health</option>
                                                                    <option value="Fitness" className="capitalize">Fitness</option>
                                                                    <option value="Wellness" className="capitalize">Wellness</option>
                                                                    <option value="Business" className="capitalize">Business</option>
                                                                    <option value="Education" className="capitalize">Education</option>
                                                                    <option value="Food and Recipe" className="capitalize">Food and Recipe</option>
                                                                    <option value="Love and Relationships" className="capitalize">Love and Relationships</option>
                                                                    <option value="Alternative topics" className="capitalize">Alternative topics</option>
                                                                    <option value="Green living" className="capitalize">Green living</option>
                                                                    <option value="Music" className="capitalize">Music</option>
                                                                    <option value="Automotive" className="capitalize">Automotive</option>
                                                                    <option value="Marketing" className="capitalize">Marketing</option>
                                                                    <option value="Internet services" className="capitalize">Internet services</option>
                                                                    <option value="Finance" className="capitalize">Finance</option>
                                                                    <option value="Sports" className="capitalize">Sports</option>
                                                                    <option value="Entertainment" className="capitalize">Entertainment</option>
                                                                    <option value="Productivity" className="capitalize">Productivity</option>
                                                                    <option value="Hobbies" className="capitalize">Hobbies</option>
                                                                    <option value="Parenting" className="capitalize">Parenting</option>
                                                                    <option value="Pets" className="capitalize">Pets</option>
                                                                    <option value="Photography" className="capitalize">Photography</option>
                                                                    <option value="Agriculture" className="capitalize">Agriculture</option>
                                                                    <option value="Art" className="capitalize">Art</option>
                                                                    <option value="DIY" className="capitalize">DIY</option>
                                                                    <option value="Science" className="capitalize">Science</option>
                                                                    <option value="History" className="capitalize">History</option>
                                                                    <option value="Self-improvement" className="capitalize">Self-improvement</option>
                                                                    <option value="News and current affairs" className="News and current affairs">Japanese</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className='grid grid-cols-1  gap-5 place-content-start'>
                                                            <div className='flex flex-col'>
                                                                <label className='font-semibold'> Add Tags: </label>
                                                                <div className='flex flex-row'>
                                                                    <input 
                                                                        type="text" 
                                                                        className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                        value={input.tags}
                                                                        onChange={(e) => setInput({...input, tags: e.target.value})}
                                                                    />
                                                                    <div className='flex flex-row items-end'>
                                                                        <button onClick={addTags} className='float-left border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>          

                                                        {
                                                            tags && tags.length > 0 &&
                                                                <div className='flex flex-wrap items-center gap-2 mt-2 mb-4 relative border-[2px] border-dashed border-gray-400 p-2 rounded-md'>
                                                                {
                                                                    tags.map((item, index) => {
                                                                        return (
                                                                            <button
                                                                                key={index}
                                                                                className="flex items-center justify-between px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple"
                                                                            >
                                                                                {item}
                                                                                <FontAwesomeIcon onClick={deleteTags} id={index} icon={faClose} className="ml-2 cursor-pointer" />
                                                                            </button>
                                                                        )
                                                                    })
                                                                }
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="lg:w-3/4 md:w-3/4 w-full md:pl-8">
                                                        <div className='grid sm:grid-cols-2 grid-cols-1  gap-5 place-content-start '>
                                                            <h2 className='text-2xl font-bold text-gray-800 my-4 mb-2'>Content</h2>        
                                                        </div>
                                                        {
                                                            form.content?.length > 0 &&
                                                                form.content.map((box, box_index) => {
                                                                    return(
                                                                    <div key={box_index} className='border border-solid border-gray-500 p-4 mt-4'>
                                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                                            <div className='flex flex-col'>
                                                                                <label className='font-semibold'> Element Content: </label>
                                                                                <div className='flex flex-row'>
                                                                                    <select
                                                                                        className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                                        default="normal_naragraph"
                                                                                        value={contentSelected}
                                                                                        onChange={(e) => setContentSelected(e.target.value)}
                                                                                    >
                                                                                        <option value="" className="capitalize" disabled={true}>Select Element</option>
                                                                                        <option value="normal_naragraph" className="capitalize">Normal Paragraph</option>
                                                                                        <option value="quoted_paragraph" className="capitalize">Quoted Paragraph</option>
                                                                                        <option value="grid_image" className="capitalize">Grid Image</option>
                                                                                        <option value="sub_heading" className="capitalize">Sub Heading</option>
                                                                                        <option value="bullet_list" className="capitalize">Bullet List</option>
                                                                                        <option value="number_list" className="capitalize">Number List</option>
                                                                                        <option value="single_image" className="capitalize">Single Image</option>
                                                                                    </select>
                                                                                    <div className='flex flex-row items-end'>
                                                                                        <button onClick={() => addContentElements(box_index)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>     

                                                                        <div className='grid grid-cols-1  gap-5 place-content-start mb-4'>
                                                                            {
                                                                                form.content?.length > 0 &&
                                                                                    form.content[box_index].container.map((item, index) => {
                                                                                        console.log(item, true)
                                                                                        return (
                                                                                            <>
                                                                                            {
                                                                                                item.element === 'normal_naragraph' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            {/* <label className='font-semibold'> Normal Paragraph: </label> */}
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <textarea
                                                                                                                name="paragraph"
                                                                                                                id="message"
                                                                                                                cols="30"
                                                                                                                rows="8"
                                                                                                                placeholder="Paragraph"
                                                                                                                className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                                                                onChange={(e) => paragraphValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].paragraph }
                                                                                                            >
                                                                                                            </textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'quoted_paragraph' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <textarea
                                                                                                                name="quoted"
                                                                                                                id="message"
                                                                                                                cols="30"
                                                                                                                rows="4"
                                                                                                                placeholder="Quoted Paragraph"
                                                                                                                className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                                                                onChange={(e) => paragraphValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].paragraph }
                                                                                                            >
                                                                                                            </textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'sub_heading' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                                                onChange={(e) => headingValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].heading }
                                                                                                                placeholder='Sub Heading'
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'grid_image' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                                                onChange={(e) => gridInputValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].input }
                                                                                                                placeholder='Image URL'
                                                                                                            />
                                                                                                            <div className='flex flex-row items-end'>
                                                                                                                <button onClick={() => addGridContentImage(index, box_index)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-col'>
                                                                                                            <label className='font-semibold'> Image/s dimension: </label>
                                                                                                            <select
                                                                                                                className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                                                                default="normal_naragraph"
                                                                                                                value={form.content[box_index].container[index].type}
                                                                                                                onChange={(e) => typeValue(e, index, box_index)}
                                                                                                            >
                                                                                                                <option value="boxed" className="capitalize">Boxed</option>
                                                                                                                <option value="boxed_full" className="capitalize">Boxed Full</option>
                                                                                                                <option value="rectangular" className="capitalize">Rectangular</option>
                                                                                                                <option value="auto" className="capitalize">Auto</option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        {
                                                                                                            form.content[box_index].container[index].grid_image.length > 0 &&
                                                                                                            <>
                                                                                                            <div className={`grid ${(form.content[box_index].container[index].type === 'boxed') && 'sm:grid-cols-2'} grid-cols-1 gap-5 place-content-start my-4`}>
                                                                                                                {
                                                                                                                    form.content[box_index].container[index].grid_image.map((image, i) => {
                                                                                                                        return (
                                                                                                                            <div key={i} className='relative'>
                                                                                                                                <img 
                                                                                                                                    src={image}
                                                                                                                                    className={`w-full ${form.content[box_index].container[index].type === 'boxed-full' && 'md:h-[500px] sm:h-[400px] h-[300px]'} ${(form.content[box_index].container[index].type === 'boxed' || form.content[box_index].container[index].type === 'rectangular') && 'md:h-60 h-48'} object-cover bg-top rounded-lg border border-[#cococo]`}
                                                                                                                                    alt={`Grid Image #${i+1}`}
                                                                                                                                />
                                                                                                                                <button title="remove image" onClick={() => removeGridContentImage(index, i, box_index)} className='absolute top-2 right-4'><FontAwesomeIcon icon={faClose} className='cursor-pointer'/></button>
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    })
                                                                                                                }
                                                                                                            </div>
                                                                                                            </>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'single_image' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                                                onChange={(e) => singleInputValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].image }
                                                                                                                placeholder='Image URL'
                                                                                                            />
                                                                                                        </div>
                                                                                                        <div className='flex flex-col'>
                                                                                                            <label className='font-semibold'> Image/s dimension: </label>
                                                                                                            <select
                                                                                                                className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                                                                default="normal_naragraph"
                                                                                                                value={form.content[box_index].container[index].type}
                                                                                                                onChange={(e) => typeValue(e, index, box_index)}
                                                                                                            >
                                                                                                                <option value="rectangular" className="capitalize">Rectangular</option>
                                                                                                                <option value="boxed_full" className="capitalize">Boxed Full</option>
                                                                                                                <option value="auto" className="capitalize">Auto</option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        {
                                                                                                            form.content[box_index].container[index].image &&
                                                                                                                <div className='relative mt-2'>
                                                                                                                    <img 
                                                                                                                        src={form.content[box_index].container[index].image}
                                                                                                                        className={`w-full ${form.content[box_index].container[index].type === 'boxed-full' && 'md:h-[500px] sm:h-[400px] h-[300px]'} ${(form.content[box_index].container[index].type === 'rectangular') && 'md:h-60 h-48'} object-cover bg-top rounded-lg border border-[#cococo]`}
                                                                                                                        alt={`Grid Image`}
                                                                                                                    />
                                                                                                                </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'bullet_list' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                                                onChange={(e) => listInputValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].input }
                                                                                                                placeholder='Lists Items'
                                                                                                            />
                                                                                                            <div className='flex flex-row items-end'>
                                                                                                                <button onClick={() => addLists(index, box_index)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {
                                                                                                            form.content[box_index].container[index].list.length > 0 &&
                                                                                                                form.content[box_index].container[index].list.map((list_item, i) => {
                                                                                                                    return (
                                                                                                                        <div key={i} className='flex items-center relative mt-2 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] border border-[#CAD5DF] px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                                                                            <p className='pr-2'>{list_item}</p>
                                                                                                                            <FontAwesomeIcon onClick={() => removeLists(index, i, box_index)} id={i} icon={faClose} className="ml-2 cursor-pointer absolute top-2 right-2" />
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                })
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'number_list' &&
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div>
                                                                                                                {
                                                                                                                    form.content[box_index].container.length === 1 ?
                                                                                                                        <button onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    :
                                                                                                                    index === 0 && form.content[box_index].container.length !== 1 ?
                                                                                                                    <>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)}><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)}><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    : index === (form.content[box_index].container.length - 1) ?
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <button title="move upwards" onClick={() => moveElementUpwards(index, box_index)} ><FontAwesomeIcon icon={faArrowUp} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="move downwards" onClick={() => moveElementsDownwards(index, box_index)} ><FontAwesomeIcon icon={faArrowDown} className='mr-4 cursor-pointer'/></button>
                                                                                                                        <button title="remove elements" onClick={() => removeElementsContent(index, box_index)} ><FontAwesomeIcon icon={faTrash} className='cursor-pointer'/></button>
                                                                                                                    </>
                                                                                                                    
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-row'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='w-full p-2 border border-solid border-[#c0c0c0]'
                                                                                                                onChange={(e) => listInputValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].input }
                                                                                                                placeholder='Lists Items'
                                                                                                            />
                                                                                                            <div className='flex flex-row items-end'>
                                                                                                                <button onClick={() => addLists(index, box_index)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {
                                                                                                            form.content[box_index].container[index].list.length > 0 &&
                                                                                                                form.content[box_index].container[index].list.map((list_item, i) => {
                                                                                                                    return (
                                                                                                                        <div key={i} className='flex items-center relative mt-2 bg-[#EAF0F7] hover:bg-gray-100  hover:text-gray-700 text-[#5A6C7F] border border-[#CAD5DF] px-4 py-1 mr-2 xs:text-sm text-sm font-semibold transition-all capitalize'>
                                                                                                                            <p className='pr-2'>{list_item}</p>
                                                                                                                            <FontAwesomeIcon onClick={() => removeLists(index, i, box_index)} id={i} icon={faClose} className="ml-2 cursor-pointer absolute top-2 right-2" />
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                })
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                            }
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    )
                                                                })
                                                        }
                                                        <button
                                                            onClick={addContentContainer}
                                                            className="border-[2px] mt-4 border-dashed border-gray-500 text-gray-800 text-center w-full px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 rounded-md focus:outline-none focus:shadow-outline-purple"
                                                        >
                                                            New Container
                                                        </button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminProjects