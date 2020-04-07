import React from 'react';
import './Home.css';
import typewrite from '../Script/typewrite.js';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller, handleSetActive } from 'react-scroll'

export default function HomeSection1() {
    return (
        <div className='mt-5'>
            <div className='text-white pr-3 pb-5 d-flex' style={{ height: '95vh' }}>
                {/* <span className='text-white'> hahaha </span> */}
                <div style={{ width: '5%', border: 'solid 4px white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', borderLeft: '0px' }}></div>

                <div className='pl-2' style={{ color: 'grey', width: '50%', fontSize: '60px', lineHeight: '58px', wordSpacing: '15px', paddingTop: '10%' }}>
                <p>I'm a<span style={{ fontWeight: 'bold' }}
                        className="typewrite red text-white"
                        data-period={2000}
                        data-type='[ " Business Analayst"]'/></p>
               <p>
                <span style={{ fontWeight: 'bold' }}
                        className="typewrite red text-white"
                        data-period={2000}
                        data-type='[ " Fullstack Developer"]'/> also</p>  
                        
                        <p>UI/UX Designer
                <span style={{ fontWeight: 'bold' }}
                        className="typewrite red text-white"
                        data-period={2000}
                        data-type='[ " soon"]'/> </p>
            </div>

                <div style={{ width: '45%', 
                // border: 'solid 4px white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', borderLeft: '0px' 
            }}>
                    {/* <p className='text-right pr-3' style={{ fontSize: '30px' }}>Welcome to my page! If this is the first time you coming here then let me show you a hometour</p> */}
                    <img src='https://images.squarespace-cdn.com/content/v1/5adb202de2ccd17b7bb7ef6b/1524480405880-D8P5TCWW7DSQYZVU9QTY/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxQ1ibo-zdhORxWnJtmNCajDe36aQmu-4Z4SFOss0oowgxUaachD66r8Ra2gwuBSqM/signavatar.png' alt=""/>
                </div>
            </div>
            <div className='text-center vertical-center p-5' style={{ backgroundColor: 'white', color: '#282c34', fontSize: '60px'}}>
                <p className='container' style={{fontSize:'20px', width: '500px', lineHeight: '65px'}}>
                 <span style={{fontSize:'50px'}}>"</span>   Can I say something? Um, I'm the type of person that if you ask me a question and I don't know the answer, I'm gonna tell you that I don't know. But I bet you what, I know how to find the answer and I will find the answer.<span style={{fontSize:'50px'}}>"</span> </p>
                 <h4>Chris Gadner</h4>

            </div>
        </div>
    )
}
