import React, { useEffect, useState } from 'react'
import styles from "../../style";

import { Hero, Feature, GameList, News, Service, Socials, Users, Footer } from '../index'
import { toram_online, genshin_impact, minecraft, tower_of_fantasy, watching_video, seaplant } from '../../assets';
import Alert from '../Alert';
import Loading from './Loading';
import SideAlert from '../SideAlert';
import Cookies from 'universal-cookie';
// Static Services Component 
const service_multiple_image = [
    { src: toram_online, alt: 'Image 1' },
    { src: genshin_impact, alt: 'Image 2' },
    { src: minecraft, alt: 'Image 3' },
    { src: tower_of_fantasy, alt: 'Image 4' },
]

const service_single_image = [
  { src: watching_video, alt: 'Video' }
]

const Home = ({ path, user }) => {
    // const count = useSelector((state) => state.counter)
    const cookies = new Cookies();

    useEffect(() => {
        document.title = "Home"
        cookies.set('myCat', 'Pacman', { path: '/' });
    }, [])

    return (
        <div className='relative'>
            <Alert />
            <Hero />
            <div style={{background: 'linear-gradient(180deg, #083C73, 5%, #030423)'}}>
            <div className={`${styles.paddingX} ${styles.flexCenter} relative`}>
                <div className={`${styles.boxWidth}`}>
                    <div className='w-full absolute'>
                        <div id="bubbles">
                            <div class="bubble x1"></div>
                            {/* <div class="bubble x2"></div> */}
                            <div class="bubble x3"></div>
                            {/* <div class="bubble x4"></div> */}
                            <div class="bubble x5"></div>
                            <div class="bubble x6"></div>
                            <div class="bubble x7"></div>
                            <div class="bubble x8"></div>
                            {/* <div class="bubble x9"></div>
                            <div class="bubble x10"></div> */}
                        </div>
                        <div class="bubbles-wrapper">
                            <div><span class="dot"></span></div>
                            <div><span class="dot"></span></div>
                            <div><span class="dot"></span></div>
                            <div><span class="dot"></span></div>
                        </div>
                        <svg className="fish" id="fish" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.99441 91.081383">
                            {/* <path
                                id="fish2"
                                d="m 172.04828,20.913839 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            /> */}
                            {/* <path
                                id="fish3"
                                d="m 254.99441,42.953992 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            /> */}
                            <path
                                id="fish6"
                                d="m 200.07076,80.737109 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            />
                            {/* <path
                                id="fish4"
                                d="m 97.275623,89.018799 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            /> */}
                            {/* <path
                                id="fish5"
                                d="m 137.65312,60.900973 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            /> */}
                            <path
                                id="fish1"
                                d="m 38.19699,20.522295 c 0.0489,-0.444179 -0.2178,-0.896934 -1.01784,-1.415715 -0.72801,-0.475049 -1.4826,-0.932948 -2.2149,-1.401138 -1.6035,-1.028129 -3.29018,-1.969653 -4.89798,-3.079244 -4.67074,-3.24131 -10.22127,-4.404923 -15.76322,-5.1509392 -2.27235,-0.286401 -4.81223,-0.168925 -6.72186,-1.574351 -1.48174,-1.081294 -4.04993,-4.828523 -6.86506,-6.456038 -0.4862,-0.290688 -2.77227,-1.44486897 -2.77227,-1.44486897 0,0 1.30939,3.55000597 1.60951,4.26429497 0.69542,1.644664 -0.38158,3.063809 -0.83262,4.642447 -0.29069,1.0418502 2.13772,0.8129002 2.26463,1.7827212 0.18179,1.432007 -4.15197,1.936211 -6.59152,2.417263 -3.65634,0.715146 -7.91635,2.082841 -11.56925,0.884071 -4.3046,-1.38313 -7.37269,-4.129669 -10.46566,-7.2354952 1.43801,6.7252892 5.4382,10.6028562 5.6157,11.4226162 0.18607,0.905509 -0.45961,1.091584 -1.04099,1.682394 -1.28967,1.265655 -6.91566,7.731125 -6.93366,9.781383 1.61379,-0.247815 3.56115,-1.660957 4.9803,-2.485862 1.58035,-0.905509 7.60593,-5.373029 9.29347,-6.065023 0.38587,-0.160351 5.0549,-1.531476 5.09434,-0.932949 0.0695,0.932949 -0.30784,1.137031 -0.18436,1.527189 0.22638,0.746016 1.44144,1.465449 2.02282,1.985088 1.50918,1.292237 3.21044,2.42841 4.27373,4.156252 1.49203,2.401827 1.55805,4.999163 1.98251,7.677102 0.99469,-0.111473 2.0091,-2.17545 2.55961,-2.992638 0.51278,-0.772598 2.38639,-4.07136 3.09725,-4.275442 0.67227,-0.204082 2.75511,0.958673 3.50284,1.180763 2.85973,0.848057 5.644,1.353976 8.56032,1.353976 3.50799,0.0094 12.726,0.258104 19.55505,-4.800226 0.75545,-0.567658 2.55703,-2.731104 2.55703,-2.731104 0,0 -0.37644,-0.577091 -1.04785,-0.790605 0.89779,-0.584808 1.8659,-1.211633 1.94993,-1.925922 z"
                                style={{ fill: '#08386D', fillOpacity: 1 }}
                            />
                        </svg>
                    </div>
                    <Feature /> 
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div class="bubbles-wrapper">
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                    <div><span class="dot"></span></div>
                </div>
                <div className={`${styles.boxWidth} relative top-[-80px]`}>
                    <GameList />
                    <News user={user}/>
                </div>
            </div>
            <div className='absolute w-full'>
                <div id="bubbles">
                    <div class="bubble x1"></div>
                    <div class="bubble x2"></div>
                    {/* <div class="bubble x3"></div> */}
                    <div class="bubble x4"></div>
                    <div class="bubble x5"></div>
                    {/* <div class="bubble x6"></div>
                    <div class="bubble x7"></div> */}
                    <div class="bubble x8"></div>
                    <div class="bubble x9"></div>
                    {/* <div class="bubble x10"></div> */}
                </div>
                <div class="content top-0 right-8 z-50">
                    <svg
                    className="submarine-svg"
                    id="submarine"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 677.21 358.19"
                    >
                    <defs>
                        <style>
                        {`.cls-1{fill:#d8bc8b;}.cls-1,.cls-2,.cls-3,.cls-4{stroke:#e79a7f;stroke-miterlimit:10;stroke-width:5px;}.cls-2{fill:#e9d196;}.cls-3{fill:#d4d8da;}.cls-4{fill:none;}`}
                        </style>
                    </defs>
                    <title>Untitled-5</title>
                    <path
                        className="cls-1"
                        d="M978.64,467.44l-36,.1a50,50,0,0,1-50-49.74l-.25-85.53a50,50,0,0,1,49.67-50l36-.10a10.13,10.13,0,0,1,10.12,10.08S964,353.3,964.08,374.82s24.63,82.47,24.63,82.47A10.13,10.13,0,0,1,978.64,467.44Z"
                        transform="translate(-314 -139)"
                    />
                    <path
                        className="cls-2"
                        d="M484.5,154.5h-53a10,10,0,0,0-10,10v6a10,10,0,0,0,10,10h35v90a12,12,0,0,0,12,12h4a12,12,0,0,0,12-12v-106A10,10,0,0,0,484.5,154.5Z"
                        transform="translate(-314 -139)"
                    />
                    <circle className="cls-1" cx="165.5" cy="157.5" r="51" />
                    <path
                        className="cls-1"
                        d="M414,494.5H743.26c17.83,2.6,63.66-21.74,103.49-50l-513.4,1.59C350.93,475.26,380.59,494.5,414,494.5Z"
                        transform="translate(-314 -139)"
                    />
                    <path
                        className="cls-2"
                        d="M743.26,274.5H414c-53.64,0-97.53,49.5-97.53,110h0a119.2,119.2,0,0,0,16.85,61.6l513.4-1.59c12.71-9,24.81-18.43,35.19-27.49L882.4,339C838.09,308.17,762.18,274.5,743.26,274.5Z"
                        transform="translate(-314 -139)"
                    />
                    <path
                        className="cls-1"
                        d="M915,374.5c0-9.29-13.31-22.14-32.6-35.54L881.94,417C901.51,399.93,915,384.09,915,374.5Z"
                        transform="translate(-314 -139)"
                    />
                    <ellipse className="cls-3" cx="154.48" cy="218.24" rx="41.98" ry="41.76" />
                    <ellipse className="cls-3" cx="284.27" cy="218.24" rx="41.98" ry="41.76" />
                    <ellipse className="cls-3" cx="414.02" cy="217.26" rx="41.98" ry="41.76" />
                    <path className="cls-4" d="M331.5,374.5" transform="translate(-314 -139)" />
                    <path
                        className="cls-4"
                        d="M387.75,297.78s-16.07,6.83-26.18,16.72-21.37,34.77-21.37,34.77"
                        transform="translate(-314 -139)"
                    />
                    <line className="cls-4" x1="20.61" y1="220.6" x2="18.39" y2="232.4" />
                    <rect className="cls-2" x="92.5" y="2.5" width="24" height="50" rx="12" ry="12" />
                    <line className="cls-4" x1="567.5" y1="199.5" x2="567.5" y2="278.5" />
                    <line className="cls-4" x1="660.5" y1="162.5" x2="643.5" y2="210.5" />
                    <line className="cls-4" x1="661.96" y1="157.72" x2="663.04" y2="154.28" />
                    <line className="cls-4" x1="19.5" y1="307.5" x2="532.5" y2="305.5" />
                    </svg>
                </div>
            </div>
            <div className='w-full h-full relative top-[-40px]'>
                <Service 
                    heading3 = "Awesome Games"
                    heading2 = "Games hidden from the internet"
                    description = "Hidden games on the internet can be a treasure trove for gamers looking for new challenges."
                    button_text = "View Games"
                    button_link = "/games"
                    data = {service_multiple_image}
                    reverse = {false}
                    icon_reverse = {false}
                />
                <Service 
                    heading3 = "Rare Videos"
                    heading2 = "Watch video without interruptions"
                    description = "Hidden games on the internet can be a treasure trove for gamers looking for new challenges."
                    button_text = "View Videos"
                    button_link = "/videos"
                    data = {service_single_image}
                    reverse = {true}
                    icon_reverse = {true}
                />
            </div>

            {/* <div className='w-full h-full relative'>
                <Socials />
                <Users />
            </div> */}
            </div>
            <Footer path={path}/>
        </div>
    )
}

export default Home