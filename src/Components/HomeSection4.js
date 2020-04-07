import React from 'react';
import './Home.css';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller, handleSetActive } from 'react-scroll'

export default function HomeSection4() {
    return (
        <div className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Contact</h6>
                        <p className="text-justify">
                            <li><i class="fa fa-mail"></i>0903 745 472</li>
                            <li><i class="fa fa-mail"></i>hungnguyen101196@gmail.com</li>

        </p>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        {/* <h6>‎‎‎</h6> */}
                        <ul className="social-icons text-left">
                            <p>
                                <a className="dribbble" href="#">
                                    <i className="fa fa-behance" />
                                </a>
                            </p>
                            <p>
                                <a className="linkedin" href="#">
                                    <i className="fa fa-linkedin" />
                                </a>
                            </p>
                            
                        </ul>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6>Menu</h6>
                        <ul className="footer-links">
                            <li>
                                <Link activeClass="active" to="home" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                                    Home</Link>
                            </li>
                            <li>
                                <Link activeClass="active" to="projects" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                                    Projects</Link>
                            </li>
                            <li>
                                <Link activeClass="active" to="resume" spy={true} smooth='easeOutQuint' offset={0} duration={1000} onSetActive={handleSetActive}>
                                    Resume</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright © 2017 All Rights Reserved by
          <a href="#"> Hung Nguyen</a>.
        </p>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        {/* <ul className="social-icons">
                            <li>
                                <a className="dribbble" href="#">
                                    <i className="fa fa-behance" />
                                </a>
                            </li>
                            <li>
                                <a className="linkedin" href="#">
                                    <i className="fa fa-linkedin" />
                                </a>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
