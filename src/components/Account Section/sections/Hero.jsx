import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { uploadHero, getPortfolio } from "../../../actions/portfolio";
import { clearAlert } from '../../../actions/portfolio';
import Alert from '../../Alert';
const Hero = ({ user, portfolio }) => {

    const dispatch = useDispatch()

    const alert = useSelector((state) => state.portfolio.alert)
    const variant = useSelector((state) => state.portfolio.variant)

    const [showAlert, setShowAlert] = useState(false)
    const [alertInfo, setAlertInfo] = useState({
        alert: '',
        variant: ''
    })

    const [hero, setHero] = useState({
        id: user.result?._id,
        image: '',
        full_name: '',
        description: '',
        profession: [],
        animation: ''
    })

    const [input, setInput] = useState({
        hero: {
            image: '',
            full_name: '',
            description: '',
            profession: '',
            animation: false
        }
    })

    useEffect(() => {
        dispatch(getPortfolio({id: user.result?._id}))
    }, [])

    useEffect(() => {
        setHero({
            ...hero,
            full_name: portfolio ? portfolio.full_name : '',
            description: portfolio ? portfolio.description : '',
            profession: portfolio ? portfolio.profession : [],
            animation: portfolio ? portfolio.animation : ''
        })
    }, [portfolio])

    useEffect(() => {
        if(alert && variant){
            setAlertInfo({ ...alertInfo, alert: alert, variant: variant })
            setShowAlert(true)
            window.scrollTo(0, 0)

            dispatch(clearAlert())
        }
    }, [alert, variant])

    const addProfession = () => {
        let duplicate = false

        if(input.hero.profession.length === 0) return;

        hero.profession.forEach(item => { if(input.hero.profession === item) duplicate = true })

        if(duplicate) { duplicate = false; return;}

        setHero({ ...hero, profession: hero.profession.concat(input.hero.profession )})

        setInput({ ...input, hero: { ...input.hero, profession: '' }})
    }

    const deleteProfession = (e) => {
        let arr = [...hero.profession]
        arr.splice(e.currentTarget.id, 1)
        setHero({ ...hero, profession: [...arr] })
    }

    const convertImage = async (e) => {
        setInput({...input, hero: { ...hero, image: e.target.value }})
        if(e.target.files[0] && e.target.files[0]['type'].split('/')[0] === 'image'){
            let convert = await toBase64(e.target.files[0])
            setHero({ ...hero, image:convert })
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = () => {
        dispatch(uploadHero(hero))
    }

    return (
        <div className="container mx-auto relative px-0 sm:px-4 py-16">
            {
                alertInfo.alert && alertInfo.variant && showAlert &&
                    <Alert variants={alertInfo.variant} text={alertInfo.alert} show={showAlert} setShow={setShowAlert} />
            }
            <h2 className='text-3xl font-bold text-gray-800 mb-8'>{ 'Hero Section' }</h2>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-4'>
                <div className='flex flex-col'>
                    <label className="block mb-2 font-medium" htmlFor="file_input">Upload file</label>
                    <input 
                        className="block w-full text-gray-800 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        id="file_input" 
                        type="file"
                        accept="image/*" 
                        onChange={convertImage}
                        value={input.hero.image}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG</p>
                </div>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5 place-content-start mb-4'>
                <div className='flex flex-col'>
                    <label className='font-semibold'> Full Name: </label>
                    <input 
                        type="text" 
                        className='p-2 border border-solid border-[#c0c0c0]'
                        onChange={(e) => setHero({...hero, full_name: e.target.value})}
                        value={hero.full_name}
                    />
                </div>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-2'>
                <div className='flex flex-col'>
                    <label className='font-semibold'> Professions: </label>
                    <div className='flex flex-row'>
                        <input 
                            type="text" 
                            className='w-full p-2 border border-solid border-[#c0c0c0]'
                            value={input.hero.profession}
                            onChange={(e) => setInput({...input, hero:{ ...input.hero, profession: e.target.value }})}
                        />
                        <div className='flex flex-row items-end'>
                            <button onClick={addProfession} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start text-white mb-2'>
                <div className='flex flex-row flex-wrap'>
                    {
                        hero.profession.length > 0 &&
                            hero.profession.map((item, i) => {
                                return (
                                    <div key={i} className='w-full flex flex-row p-2 py-3 bg-gray-800 mb-1'>
                                        <div className='w-1/2 flex flex-row items-center'>
                                            <FontAwesomeIcon icon={faChevronRight} className="mr-2 w-3 h-3"/> <p className='font-semibold'>{item}</p>
                                        </div>
                                        <div className='w-1/2 text-right'>
                                            <FontAwesomeIcon id={i} onClick={deleteProfession} icon={faTrash} className="mr-2 hover:cursor-pointer" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-2'>
                <div className='flex flex-col'>
                    <label className='font-semibold'> Portfolio description: </label>
                    <div className='flex flex-row'>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="8"
                            placeholder="Message"
                            className="w-full p-2 border border-solid border-[#c0c0c0]"
                            onChange={(e) => setHero({...hero, description: e.target.value})}
                            value={ hero.description }
                        >
                        </textarea>
                    </div>
                </div>
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-2'>
                <div className="flex items-center mb-4">
                    <input 
                        id="default-checkbox" 
                        type="checkbox" 
                        checked={hero.animation}
                        onChange={() => setHero({...hero, animation: !hero.animation})}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="default-checkbox" className="ml-2 font-medium text-gray-900 dark:text-gray-300">Typing Animation</label>
                </div>
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 place-content-start mb-2'>
                <button onClick={handleSubmit} className='float-left font-semibold border border-solid border-gray-800 bg-gray-800 hover:bg-transparent hover:text-gray-800 rounded-sm transition-all text-white p-2'>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Hero