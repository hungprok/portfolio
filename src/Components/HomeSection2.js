import React from 'react';
import './Home.css';
import cinemax from './img/cinemax.png'
import invasion from './img/invasion-of-aliens.png'

export default function HomeSection2() {
    return (
        <div id='projects' className='container p-5'>
            <div className='text-center text-white' style={{fontSize:'50px'}}>MY PROJECTS</div>
            <div className='row d-flex justify-content-around'>
                <div className="content m-3" style={{minWidth:'45%', height: '300px'}}>
                    <a href="https://nguyen-hung-spotify.netlify.com/" target="_blank">
                        <div className="content-overlay" />
                        <img style={{objectFit: "cover", height: '100%'}}
                            className="content-image"
                            src="https://353a23c500dde3b2ad58-c49fe7e7355d384845270f4a7a0a7aa1.ssl.cf2.rackcdn.com/5e54fc7d993a43b48a7c55f8/screenshot.png" />
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">Spotify Clone</h3>
                            <p className="content-text">This project aims to practice front-end programming skills</p>
                           <a href="https://github.com/hungprok/Spotify.git"><button>Github</button></a> 
                        </div>
                    </a>
                </div>

                <div className="content m-3" style={{minWidth:'45%', height: '300px'}}>
                    <a href="https://coderschool-hungnguyen.netlify.com/" target="_blank">
                        <div className="content-overlay" />
                        <img style={{objectFit: "cover", height: '100%'}}
                            className="content-image"
                            src="https://353a23c500dde3b2ad58-c49fe7e7355d384845270f4a7a0a7aa1.ssl.cf2.rackcdn.com/5e579e0de5e0d10008154a23/screenshot.png" />
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">Coder School Website Clone</h3>
                            <p className="content-text">This project aims to practice front-end programming skills</p>
                            <a href="https://github.com/hungprok/Coderschool.git"><button>Github</button></a> 
                        </div>
                    </a>
                </div>
            </div>

            <div className='row d-flex justify-content-around'>
               
                <div className="content m-3" style={{minWidth:'45%', height: '300px', objectFit: "cover"}}>
                    <a href="https://nguyenhung-cinemax-cloneimdb.netlify.com/" target="_blank">
                        <div className="content-overlay" />
                        <img style={{objectFit: "cover", height: '100%'}}
                            className="content-image"
                            src={cinemax}/>
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">Movie Page</h3>
                            <p className="content-text">This project aims to practice front-end programming skills by using Javascript and API</p>
                            <a href="https://github.com/hungprok/MoviePage.git"><button>Github</button></a> 
                        </div>
                    </a>
                </div>

                <div className="content m-3" style={{minWidth:'45%', height: '300px'}}>
                    <a href="https://invasion-of-aliens.netlify.com/" target="_blank">
                        <div className="content-overlay" />
                        <img style={{objectFit: "cover", height: '100%'}}
                            className="content-image"
                            src={invasion} />
                        <div className="content-details fadeIn-bottom">
                            <h3 className="content-title">Canvas Game</h3>
                            <p className="content-text">This project aims to practice front-end programming skills<br/>by using vanilla Javascript</p>
                            <a href="https://github.com/hungprok/Canvas-Game.git"><button>Github</button></a> 
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
