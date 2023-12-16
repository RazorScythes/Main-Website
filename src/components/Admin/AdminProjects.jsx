import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faCalendar, faClose, faTrash, faArrowDown, faArrowUp, faShare, faShareAltSquare, faExternalLink, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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

import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
    const [codePreview, setCodePreview] = useState(false)
    
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
        content: [
            { 
                header: '',
                container: []
            }
        ],
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
        else if(contentSelected === 'list_image') {
            array[parent].container.push({ header: 'List Image',  element: contentSelected, image_input: '', heading_input: '', sub_input: '', link_input: '', list: []})
        }
        else if(contentSelected === 'code_highlights') {
            array[parent].container.push({ header: 'Code',  element: contentSelected, input: '', language: 'javascript', theme: 'docco', paragraph: ''})
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

    const selectValue = (e, index, parent, type) => {
        var array = [...form.content]
        if(type === 'language') array[parent].container[index] = {...array[parent].container[index], language: e.target.value};
        else if(type === 'theme') array[parent].container[index] = {...array[parent].container[index], theme: e.target.value};
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

    const listInputValueMulti = (e, index, parent, type) => {
        var array = [...form.content]

        if(type === 'image') array[parent].container[index] = {...array[parent].container[index], image_input: e.target.value};
        else if(type === 'link') array[parent].container[index] = {...array[parent].container[index], link_input: e.target.value};
        else if(type === 'heading') array[parent].container[index] = {...array[parent].container[index], heading_input: e.target.value};
        else if(type == 'sub_heading') array[parent].container[index] = {...array[parent].container[index], sub_input: e.target.value};
        
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

    const addListsMulti = (index, parent) => {       
        var array = [...form.content]

        if(!array[parent].container[index].heading_input) return

        array[parent].container[index] = {
            ...array[parent].container[index],
            list: [
                ...array[parent].container[index].list,
                {
                    image: array[parent].container[index].image_input,
                    link: array[parent].container[index].link_input,
                    heading: array[parent].container[index].heading_input,
                    sub_heading: array[parent].container[index].sub_input,
                }
            ],
            image_input: '',
            link_input: '',
            heading_input: '',
            sub_input: '',
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
                                                    <h2 className='text-3xl font-bold my-4 text-gray-800'>New Project</h2>        
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
                                                                                        default={`normal_naragraph-${box_index}`}
                                                                                        value={contentSelected}
                                                                                        onChange={(e) => setContentSelected(e.target.value)}
                                                                                    >
                                                                                        <option value="" className="capitalize" disabled={true}>Select Element</option>
                                                                                        <option disabled={true} className='text-sm'>-----Text</option>
                                                                                        <option value="sub_heading" className="capitalize">Sub Heading</option>
                                                                                        <option value="normal_naragraph" className="capitalize">Normal Paragraph</option>
                                                                                        <option value="quoted_paragraph" className="capitalize">Quoted Paragraph</option>
                                                                                        <option value="code_highlights" className="capitalize">Code Highlights</option>
                                                                                        <option disabled={true} className='text-sm'>-----List</option>
                                                                                        <option value="bullet_list" className="capitalize">Bullet List</option>
                                                                                        <option value="number_list" className="capitalize">Number List</option>
                                                                                        <option value="list_image" className="capitalize">List Image</option>
                                                                                        <option disabled={true} className='text-sm'>-----Image</option>
                                                                                        <option value="grid_image" className="capitalize">Grid Image</option>
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
                                                                                                        <div className='flex flex-row mb-2'>
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
                                                                                                                        <button
                                                                                                                            key={i}
                                                                                                                            className="mb-1 flex items-center justify-between px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple"
                                                                                                                        >
                                                                                                                            {list_item}
                                                                                                                            <FontAwesomeIcon onClick={() => removeLists(index, i, box_index)} id={i} icon={faClose} className="ml-2 cursor-pointer" />
                                                                                                                        </button>
                                                                                                                    )
                                                                                                                })
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'list_image' ?
                                                                                                <div className='grid grid-cols-1 gap-5 place-content-start mb-2'>
                                                                                                    <div className='flex flex-col'>
                                                                                                        <div className='flex flex-row justify-between py-2'>
                                                                                                            <input 
                                                                                                                type="text" 
                                                                                                                className='border-none font-semibold outline-none'
                                                                                                                onChange={(e) => headerValue(e, index, box_index)}
                                                                                                                value={ form.content[box_index].container[index].header }
                                                                                                            />
                                                                                                            <div className='flex'>
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
                                                                                                                <div className='flex flex-row items-end ml-4'>
                                                                                                                    <button onClick={() => addListsMulti(index, box_index)} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add List</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start'>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Image URL </label>
                                                                                                                <input 
                                                                                                                    type="text" 
                                                                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                                                                    onChange={(e) => listInputValueMulti(e, index, box_index, 'image')}
                                                                                                                    value={ form.content[box_index].container[index].image_input }
                                                                                                                />
                                                                                                            </div>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Link URL </label>
                                                                                                                <input 
                                                                                                                    type="text" 
                                                                                                                    className='p-2 border border-solid border-[#c0c0c0]'
                                                                                                                    onChange={(e) => listInputValueMulti(e, index, box_index, 'link')}
                                                                                                                    value={ form.content[box_index].container[index].link_input }
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start'>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Heading </label>
                                                                                                                <textarea
                                                                                                                    name="message"
                                                                                                                    id="message"
                                                                                                                    cols="30"
                                                                                                                    rows="3"
                                                                                                                    placeholder="Heading"
                                                                                                                    className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                                                                    onChange={(e) => listInputValueMulti(e, index, box_index, 'heading')}
                                                                                                                    value={ form.content[box_index].container[index].heading_input }
                                                                                                                >
                                                                                                                </textarea>
                                                                                                            </div>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Sub Heading </label>
                                                                                                                <textarea
                                                                                                                    name="message"
                                                                                                                    id="message"
                                                                                                                    cols="30"
                                                                                                                    rows="3"
                                                                                                                    placeholder="Sub heading"
                                                                                                                    className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                                                                    onChange={(e) => listInputValueMulti(e, index, box_index, 'sub_heading')}
                                                                                                                    value={ form.content[box_index].container[index].sub_input }
                                                                                                                >
                                                                                                                </textarea>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {
                                                                                                            form.content[box_index].container[index].list.length > 0 &&
                                                                                                                <div className='mt-4'>
                                                                                                                {
                                                                                                                    form.content[box_index].container[index].list.map((list_item, i) => {
                                                                                                                        return (
                                                                                                                            <div className='relative my-1 flex font-poppins items-center'>
                                                                                                                                <img 
                                                                                                                                    className='w-16 h-16 border border-solid border-gray-500 rounded-md'
                                                                                                                                    src={list_item.image}
                                                                                                                                />
                                                                                                                                <div className='flex flex-col ml-2'>
                                                                                                                                    <h2 className='font-semibold text-base'>{list_item.heading}</h2>
                                                                                                                                    <p className='text-xs font-semibold text-[#FB2736] drop-shadow-sm'>{list_item.sub_heading}</p>
                                                                                                                                    <a href={list_item.link} target='_blank'><FontAwesomeIcon icon={faExternalLink} className='absolute right-8 top-1/2 transform -translate-y-1/2'/></a>
                                                                                                                                    <FontAwesomeIcon onClick={() => removeLists(index, i, box_index)} id={i} icon={faTrash} className='cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2'/>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        )
                                                                                                                    })
                                                                                                                }
                                                                                                                </div>
                                                                                                        }
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                item.element === 'code_highlights' ?
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
                                                                                                        <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 place-content-start'>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Language: </label>
                                                                                                                <select
                                                                                                                    className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                                                                    default="code_highlights"
                                                                                                                    onChange={(e) => selectValue(e, index, box_index, 'language')}
                                                                                                                    value={ form.content[box_index].container[index].language }
                                                                                                                >
                                                                                                                    <option value="1c">1c</option>
                                                                                                                    <option value="abnf">abnf</option>
                                                                                                                    <option value="accesslog">accesslog</option>
                                                                                                                    <option value="actionscript">actionscript</option>
                                                                                                                    <option value="ada">ada</option>
                                                                                                                    <option value="angelscript">angelscript</option>
                                                                                                                    <option value="apache">apache</option>
                                                                                                                    <option value="applescript">applescript</option>
                                                                                                                    <option value="arcade">arcade</option>
                                                                                                                    <option value="arduino">arduino</option>
                                                                                                                    <option value="armasm">armasm</option>
                                                                                                                    <option value="asciidoc">asciidoc</option>
                                                                                                                    <option value="aspectj">aspectj</option>
                                                                                                                    <option value="autohotkey">autohotkey</option>
                                                                                                                    <option value="autoit">autoit</option>
                                                                                                                    <option value="avrasm">avrasm</option>
                                                                                                                    <option value="awk">awk</option>
                                                                                                                    <option value="axapta">axapta</option>
                                                                                                                    <option value="bash">bash</option>
                                                                                                                    <option value="basic">basic</option>
                                                                                                                    <option value="bnf">bnf</option>
                                                                                                                    <option value="brainfuck">brainfuck</option>
                                                                                                                    <option value="c-like">c-like</option>
                                                                                                                    <option value="c">c</option>
                                                                                                                    <option value="cal">cal</option>
                                                                                                                    <option value="capnproto">capnproto</option>
                                                                                                                    <option value="ceylon">ceylon</option>
                                                                                                                    <option value="clean">clean</option>
                                                                                                                    <option value="clojure-repl">clojure-repl</option>
                                                                                                                    <option value="clojure">clojure</option>
                                                                                                                    <option value="cmake">cmake</option>
                                                                                                                    <option value="coffeescript">coffeescript</option>
                                                                                                                    <option value="coq">coq</option>
                                                                                                                    <option value="cos">cos</option>
                                                                                                                    <option value="cpp">cpp</option>
                                                                                                                    <option value="crmsh">crmsh</option>
                                                                                                                    <option value="crystal">crystal</option>
                                                                                                                    <option value="csharp">csharp</option>
                                                                                                                    <option value="csp">csp</option>
                                                                                                                    <option value="css">css</option>
                                                                                                                    <option value="d">d</option>
                                                                                                                    <option value="dart">dart</option>
                                                                                                                    <option value="delphi">delphi</option>
                                                                                                                    <option value="diff">diff</option>
                                                                                                                    <option value="django">django</option>
                                                                                                                    <option value="dns">dns</option>
                                                                                                                    <option value="dockerfile">dockerfile</option>
                                                                                                                    <option value="dos">dos</option>
                                                                                                                    <option value="dsconfig">dsconfig</option>
                                                                                                                    <option value="dts">dts</option>
                                                                                                                    <option value="dust">dust</option>
                                                                                                                    <option value="ebnf">ebnf</option>
                                                                                                                    <option value="elixir">elixir</option>
                                                                                                                    <option value="elm">elm</option>
                                                                                                                    <option value="erb">erb</option>
                                                                                                                    <option value="erlang-repl">erlang-repl</option>
                                                                                                                    <option value="erlang">erlang</option>
                                                                                                                    <option value="excel">excel</option>
                                                                                                                    <option value="fix">fix</option>
                                                                                                                    <option value="flix">flix</option>
                                                                                                                    <option value="fortran">fortran</option>
                                                                                                                    <option value="fsharp">fsharp</option>
                                                                                                                    <option value="gams">gams</option>
                                                                                                                    <option value="gauss">gauss</option>
                                                                                                                    <option value="gcode">gcode</option>
                                                                                                                    <option value="gherkin">gherkin</option>
                                                                                                                    <option value="glsl">glsl</option>
                                                                                                                    <option value="gml">gml</option>
                                                                                                                    <option value="go">go</option>
                                                                                                                    <option value="golo">golo</option>
                                                                                                                    <option value="gradle">gradle</option>
                                                                                                                    <option value="groovy">groovy</option>
                                                                                                                    <option value="haml">haml</option>
                                                                                                                    <option value="handlebars">handlebars</option>
                                                                                                                    <option value="haskell">haskell</option>
                                                                                                                    <option value="haxe">haxe</option>
                                                                                                                    <option value="hsp">hsp</option>
                                                                                                                    <option value="htmlbars">htmlbars</option>
                                                                                                                    <option value="http">http</option>
                                                                                                                    <option value="hy">hy</option>
                                                                                                                    <option value="inform7">inform7</option>
                                                                                                                    <option value="ini">ini</option>
                                                                                                                    <option value="irpf90">irpf90</option>
                                                                                                                    <option value="isbl">isbl</option>
                                                                                                                    <option value="java">java</option>
                                                                                                                    <option value="javascript">javascript</option>
                                                                                                                    <option value="jboss-cli">jboss-cli</option>
                                                                                                                    <option value="json">json</option>
                                                                                                                    <option value="julia-repl">julia-repl</option>
                                                                                                                    <option value="julia">julia</option>
                                                                                                                    <option value="kotlin">kotlin</option>
                                                                                                                    <option value="lasso">lasso</option>
                                                                                                                    <option value="latex">latex</option>
                                                                                                                    <option value="ldif">ldif</option>
                                                                                                                    <option value="leaf">leaf</option>
                                                                                                                    <option value="less">less</option>
                                                                                                                    <option value="lisp">lisp</option>
                                                                                                                    <option value="livecodeserver">livecodeserver</option>
                                                                                                                    <option value="livescript">livescript</option>
                                                                                                                    <option value="llvm">llvm</option>
                                                                                                                    <option value="lsl">lsl</option>
                                                                                                                    <option value="lua">lua</option>
                                                                                                                    <option value="makefile">makefile</option>
                                                                                                                    <option value="markdown">markdown</option>
                                                                                                                    <option value="mathematica">mathematica</option>
                                                                                                                    <option value="matlab">matlab</option>
                                                                                                                    <option value="maxima">maxima</option>
                                                                                                                    <option value="mel">mel</option>
                                                                                                                    <option value="mercury">mercury</option>
                                                                                                                    <option value="mipsasm">mipsasm</option>
                                                                                                                    <option value="mizar">mizar</option>
                                                                                                                    <option value="mojolicious">mojolicious</option>
                                                                                                                    <option value="monkey">monkey</option>
                                                                                                                    <option value="moonscript">moonscript</option>
                                                                                                                    <option value="n1ql">n1ql</option>
                                                                                                                    <option value="nginx">nginx</option>
                                                                                                                    <option value="nim">nim</option>
                                                                                                                    <option value="nix">nix</option>
                                                                                                                    <option value="node-repl">node-repl</option>
                                                                                                                    <option value="nsis">nsis</option>
                                                                                                                    <option value="objectivec">objectivec</option>
                                                                                                                    <option value="ocaml">ocaml</option>
                                                                                                                    <option value="openscad">openscad</option>
                                                                                                                    <option value="oxygene">oxygene</option>
                                                                                                                    <option value="parser3">parser3</option>
                                                                                                                    <option value="perl">perl</option>
                                                                                                                    <option value="pf">pf</option>
                                                                                                                    <option value="pgsql">pgsql</option>
                                                                                                                    <option value="php-template">php-template</option>
                                                                                                                    <option value="php">php</option>
                                                                                                                    <option value="plaintext">plaintext</option>
                                                                                                                    <option value="pony">pony</option>
                                                                                                                    <option value="powershell">powershell</option>
                                                                                                                    <option value="processing">processing</option>
                                                                                                                    <option value="profile">profile</option>
                                                                                                                    <option value="prolog">prolog</option>
                                                                                                                    <option value="properties">properties</option>
                                                                                                                    <option value="protobuf">protobuf</option>
                                                                                                                    <option value="puppet">puppet</option>
                                                                                                                    <option value="purebasic">purebasic</option>
                                                                                                                    <option value="python-repl">python-repl</option>
                                                                                                                    <option value="python">python</option>
                                                                                                                    <option value="q">q</option>
                                                                                                                    <option value="qml">qml</option>
                                                                                                                    <option value="r">r</option>
                                                                                                                    <option value="reasonml">reasonml</option>
                                                                                                                    <option value="rib">rib</option>
                                                                                                                    <option value="roboconf">roboconf</option>
                                                                                                                    <option value="routeros">routeros</option>
                                                                                                                    <option value="rsl">rsl</option>
                                                                                                                    <option value="ruby">ruby</option>
                                                                                                                    <option value="ruleslanguage">ruleslanguage</option>
                                                                                                                    <option value="rust">rust</option>
                                                                                                                    <option value="sas">sas</option>
                                                                                                                    <option value="scala">scala</option>
                                                                                                                    <option value="scheme">scheme</option>
                                                                                                                    <option value="scilab">scilab</option>
                                                                                                                    <option value="scss">scss</option>
                                                                                                                    <option value="shell">shell</option>
                                                                                                                    <option value="smali">smali</option>
                                                                                                                    <option value="smalltalk">smalltalk</option>
                                                                                                                    <option value="sml">sml</option>
                                                                                                                    <option value="sqf">sqf</option>
                                                                                                                    <option value="sql">sql</option>
                                                                                                                    <option value="sql_more">sql_more</option>
                                                                                                                    <option value="stan">stan</option>
                                                                                                                    <option value="stata">stata</option>
                                                                                                                    <option value="step21">step21</option>
                                                                                                                    <option value="stylus">stylus</option>
                                                                                                                    <option value="subunit">subunit</option>
                                                                                                                    <option value="swift">swift</option>
                                                                                                                    <option value="taggerscript">taggerscript</option>
                                                                                                                    <option value="tap">tap</option>
                                                                                                                    <option value="tcl">tcl</option>
                                                                                                                    <option value="thrift">thrift</option>
                                                                                                                    <option value="tp">tp</option>
                                                                                                                    <option value="twig">twig</option>
                                                                                                                    <option value="typescript">typescript</option>
                                                                                                                    <option value="vala">vala</option>
                                                                                                                    <option value="vbnet">vbnet</option>
                                                                                                                    <option value="vbscript-html">vbscript-html</option>
                                                                                                                    <option value="vbscript">vbscript</option>
                                                                                                                    <option value="verilog">verilog</option>
                                                                                                                    <option value="vhdl">vhdl</option>
                                                                                                                    <option value="vim">vim</option>
                                                                                                                    <option value="x86asm">x86asm</option>
                                                                                                                    <option value="xl">xl</option>
                                                                                                                    <option value="xml">xml</option>
                                                                                                                    <option value="xquery">xquery</option>
                                                                                                                    <option value="yaml">yaml</option>
                                                                                                                    <option value="zephir">zephir</option>
                                                                                                                </select>
                                                                                                            </div>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Theme: </label>
                                                                                                                <select
                                                                                                                    className="w-full capitalize appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                                                                    default="normal_naragraph"
                                                                                                                    onChange={(e) => selectValue(e, index, box_index, 'theme')}
                                                                                                                    value={ form.content[box_index].container[index].theme }
                                                                                                                >
                                                                                                                    <option value="a11y-dark">a11y-dark</option>
                                                                                                                    <option value="a11y-light">a11y-light</option>
                                                                                                                    <option value="agate">agate</option>
                                                                                                                    <option value="an-old-hope">an-old-hope</option>
                                                                                                                    <option value="androidstudio">androidstudio</option>
                                                                                                                    <option value="arduino-light">arduino-light</option>
                                                                                                                    <option value="arta">arta</option>
                                                                                                                    <option value="ascetic">ascetic</option>
                                                                                                                    <option value="atelier-cave-dark">atelier-cave-dark</option>
                                                                                                                    <option value="atelier-cave-light">atelier-cave-light</option>
                                                                                                                    <option value="atelier-dune-dark">atelier-dune-dark</option>
                                                                                                                    <option value="atelier-dune-light">atelier-dune-light</option>
                                                                                                                    <option value="atelier-estuary-dark">atelier-estuary-dark</option>
                                                                                                                    <option value="atelier-estuary-light">atelier-estuary-light</option>
                                                                                                                    <option value="atelier-forest-dark">atelier-forest-dark</option>
                                                                                                                    <option value="atelier-forest-light">atelier-forest-light</option>
                                                                                                                    <option value="atelier-heath-dark">atelier-heath-dark</option>
                                                                                                                    <option value="atelier-heath-light">atelier-heath-light</option>
                                                                                                                    <option value="atelier-lakeside-dark">atelier-lakeside-dark</option>
                                                                                                                    <option value="atelier-lakeside-light">atelier-lakeside-light</option>
                                                                                                                    <option value="atelier-plateau-dark">atelier-plateau-dark</option>
                                                                                                                    <option value="atelier-plateau-light">atelier-plateau-light</option>
                                                                                                                    <option value="atelier-savanna-dark">atelier-savanna-dark</option>
                                                                                                                    <option value="atelier-savanna-light">atelier-savanna-light</option>
                                                                                                                    <option value="atelier-seaside-dark">atelier-seaside-dark</option>
                                                                                                                    <option value="atelier-seaside-light">atelier-seaside-light</option>
                                                                                                                    <option value="atelier-sulphurpool-dark">atelier-sulphurpool-dark</option>
                                                                                                                    <option value="atelier-sulphurpool-light">atelier-sulphurpool-light</option>
                                                                                                                    <option value="atom-one-dark">atom-one-dark</option>
                                                                                                                    <option value="atom-one-dark-reasonable">atom-one-dark-reasonable</option>
                                                                                                                    <option value="atom-one-light">atom-one-light</option>
                                                                                                                    <option value="brown-paper">brown-paper</option>
                                                                                                                    <option value="codepen-embed">codepen-embed</option>
                                                                                                                    <option value="color-brewer">color-brewer</option>
                                                                                                                    <option value="darcula">darcula</option>
                                                                                                                    <option value="dark">dark</option>
                                                                                                                    <option value="default-style">default-style</option>
                                                                                                                    <option value="docco">docco</option>
                                                                                                                    <option value="dracula">dracula</option>
                                                                                                                    <option value="far">far</option>
                                                                                                                    <option value="foundation">foundation</option>
                                                                                                                    <option value="github">github</option>
                                                                                                                    <option value="github-gist">github-gist</option>
                                                                                                                    <option value="gml">gml</option>
                                                                                                                    <option value="googlecode">googlecode</option>
                                                                                                                    <option value="gradient-dark">gradient-dark</option>
                                                                                                                    <option value="gradient-light">gradient-light</option>
                                                                                                                    <option value="grayscale">grayscale</option>
                                                                                                                    <option value="gruvbox-dark">gruvbox-dark</option>
                                                                                                                    <option value="gruvbox-light">gruvbox-light</option>
                                                                                                                    <option value="hopscotch">hopscotch</option>
                                                                                                                    <option value="hybrid">hybrid</option>
                                                                                                                    <option value="idea">idea</option>
                                                                                                                    <option value="ir-black">ir-black</option>
                                                                                                                    <option value="isbl-editor-dark">isbl-editor-dark</option>
                                                                                                                    <option value="isbl-editor-light">isbl-editor-light</option>
                                                                                                                    <option value="kimbie.dark">kimbie.dark</option>
                                                                                                                    <option value="kimbie.light">kimbie.light</option>
                                                                                                                    <option value="lightfair">lightfair</option>
                                                                                                                    <option value="lioshi">lioshi</option>
                                                                                                                    <option value="magula">magula</option>
                                                                                                                    <option value="mono-blue">mono-blue</option>
                                                                                                                    <option value="monokai">monokai</option>
                                                                                                                    <option value="monokai-sublime">monokai-sublime</option>
                                                                                                                    <option value="night-owl">night-owl</option>
                                                                                                                    <option value="nnfx">nnfx</option>
                                                                                                                    <option value="nnfx-dark">nnfx-dark</option>
                                                                                                                    <option value="nord">nord</option>
                                                                                                                    <option value="obsidian">obsidian</option>
                                                                                                                    <option value="ocean">ocean</option>
                                                                                                                    <option value="paraiso-dark">paraiso-dark</option>
                                                                                                                    <option value="paraiso-light">paraiso-light</option>
                                                                                                                    <option value="pojoaque">pojoaque</option>
                                                                                                                    <option value="purebasic">purebasic</option>
                                                                                                                    <option value="qtcreator_dark">qtcreator_dark</option>
                                                                                                                    <option value="qtcreator_light">qtcreator_light</option>
                                                                                                                    <option value="railscasts">railscasts</option>
                                                                                                                    <option value="rainbow">rainbow</option>
                                                                                                                    <option value="routeros">routeros</option>
                                                                                                                    <option value="school-book">school-book</option>
                                                                                                                    <option value="shades-of-purple">shades-of-purple</option>
                                                                                                                    <option value="solarized-dark">solarized-dark</option>
                                                                                                                    <option value="solarized-light">solarized-light</option>
                                                                                                                    <option value="srcery">srcery</option>
                                                                                                                    <option value="stackoverflow-dark">stackoverflow-dark</option>
                                                                                                                    <option value="stackoverflow-light">stackoverflow-light</option>
                                                                                                                    <option value="sunburst">sunburst</option>
                                                                                                                    <option value="tomorrow">tomorrow</option>
                                                                                                                    <option value="tomorrow-night">tomorrow-night</option>
                                                                                                                    <option value="tomorrow-night-blue">tomorrow-night-blue</option>
                                                                                                                    <option value="tomorrow-night-bright">tomorrow-night-bright</option>
                                                                                                                    <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
                                                                                                                    <option value="vs">vs</option>
                                                                                                                    <option value="vs2015">vs2015</option>
                                                                                                                    <option value="xcode">xcode</option>
                                                                                                                    <option value="xt256">xt256</option>
                                                                                                                    <option value="zenburn">zenburn</option>
                                                                                                                </select>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='grid sm:grid-cols-1 grid-cols-1 gap-5 place-content-start mt-2'>
                                                                                                            <div className='flex flex-col'>
                                                                                                                <label className='font-semibold text-sm'> Code: <FontAwesomeIcon onClick={() => setCodePreview(!codePreview)} icon={codePreview ? faEyeSlash : faEye} className='cursor-pointer'/></label>
                                                                                                                {
                                                                                                                    !codePreview &&
                                                                                                                    <textarea
                                                                                                                        name="message"
                                                                                                                        id="message"
                                                                                                                        cols="30"
                                                                                                                        rows="8"
                                                                                                                        placeholder="code"
                                                                                                                        className="w-full p-2 border border-solid border-[#c0c0c0]"
                                                                                                                        onChange={(e) => paragraphValue(e, index, box_index)}
                                                                                                                        value={ form.content[box_index].container[index].paragraph }
                                                                                                                    >
                                                                                                                    </textarea>
                                                                                                                }
                                                                                                            </div>
                                                                                                            {
                                                                                                                codePreview &&
                                                                                                                <SyntaxHighlighter language={form.content[box_index].container[index].language} style={hljsStyles[form.content[box_index].container[index].theme]} showLineNumbers={true}>
                                                                                                                    {`${form.content[box_index].container[index].paragraph}`}
                                                                                                                </SyntaxHighlighter>
                                                                                                            }
                                                                                                        </div>
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