import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'

const ImageModal = ({ openModal, setOpenModal, image, setImage, preview, setPreview, header = "" }) => {
    const closeModal = () => {
        setOpenModal(false)
        setPreview(false)
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState('')
    const [cropProgress, setCropProgress] = useState(false)

    const showCroppedImage = useCallback(async () => {
        if(cropProgress) return
        
        try {
            setCropProgress(true)
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
            )

            setImage(croppedImage)
            setCropProgress(false)
            setOpenModal(false)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    return (
        <>
            {/* Backdrop */}
            {openModal && (
                <div className="fixed inset-0 bg-black opacity-90 z-40"></div>
            )}
            {
                openModal && (
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-[400px]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}

                                {
                                    header.length > 0 && (
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-2xl font-semibold">
                                                Crop Image
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => closeModal()}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                                </span>
                                            </button>
                                        </div>
                                    )
                                }
                                
                                {/*body*/}
                                <div className="relative p-6 flex-auto h-[350px]">
                                    {
                                        preview ?
                                        <img 
                                            src={image}
                                            alt={'avatar'}
                                            className="object-cover w-full h-[320px]"
                                        />
                                        :
                                        <Cropper
                                            image={image}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={2/2}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                        />
                                    }
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end py-2 px-6 border-t border-solid border-slate-200 rounded-b">
                                    {
                                        preview ?
                                            <button
                                                className="w-full bg-gray-800 text-white hover:text-gray-800 hover:bg-transparent border border-solid border-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => closeModal()}
                                            >
                                                Close
                                            </button>
                                        :
                                            <button
                                                className="w-full bg-gray-800 text-white hover:text-gray-800 hover:bg-transparent border border-solid border-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => showCroppedImage()}
                                            >
                                                Crop
                                            </button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ImageModal