import React from 'react';
import '../App.css';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller, handleSetActive } from 'react-scroll'

export default function Navbar() {
    return (
        <nav id='home' className="navbar navbar-light">
            <div className='col-6' style={{ height: '50px' }}>
                <div className='d-flex'> 
                <a className="navbar-brand text-white" style={{ lineHeight: '20px', fontSize: '20px', letterSpacing: '10px' }}>HUNG^~<br />NGUYEN</a>
                <Link activeClass="active" to="home" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                <button className='m-2' style={{}}>HOME</button></Link>
                <Link activeClass="active" to="projects" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                <button className='m-2' style={{}}>PROJECTS</button></Link>
                <Link activeClass="active" to="resume" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                <button className='m-2' style={{}}>RESUME</button></Link>
                    </div>

            </div>
            {/* <div className='col-6'></div> */}
        </nav>
    )
}
