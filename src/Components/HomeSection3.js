import React from 'react'

export default function HomeSection3() {
    return (
        <div id='resume' style={{ backgroundColor: 'white', paddingTop:'50px' }}>
            <div className='text-center' style={{ fontSize: '50px', paddingBottom:'50px' }}>I HAVE BEEN</div>
            <div className='d-flex container'>
                <div className='col-6 text-right'>
                    <div style={{ height: '200px' }}>
                        <h3 className='bold' style={{}}>Solution Consultant<br/>(Business Analyst)</h3>
                    </div>

                    <div style={{ height: '200px' }}>
                        <img style={{ height: '100px' }} src="https://www.intel.com/etc/designs/intel/us/en/images/printlogo.png" alt="" />
                        {/* <h3>INTEL PRODUCTS VIETNAM</h3> */}
                    </div>

                    <div style={{ height: '200px' }}>
                        <h3 className='bold' style={{}}>Head<br/>Hunter<br/>Intern</h3>
                    </div>

                    <div style={{ height: '200px' }}>
                        <img style={{ height: '150px' }} src="https://lh3.googleusercontent.com/proxy/IXMheaZw37keGW_cleCr2-QbbocQP72MJSa0gz8_jQzNCewBvri53247qhy-gfYZx1EMRAQoXZRBskn_5G4YCsHbZL2LSiHh0eup-Bai" alt="" />
                    </div>
                </div>


                <div className='col-6'>
                    <div style={{ height: '200px' }}>

                        <img style={{ height: '100px' }} src="https://hiring-assets.careerbuilder.com/assets/logo--cb--color-stacked-0a628e36472706dbfb8b0af4693de3b9a81f90f06409f3333bb2e3f9ce679d2c.png" alt="" />
                    </div>
                    <div className='align-text-middle' style={{ height: '200px' }}>
                        <h3 className='align-text-middle' style={{}}>Talent<br />Acquisition<br />Intern</h3>
                    </div>

                    <div style={{ height: '200px' }}>
                        <img style={{ height: '100px' }} src="https://images02.vietnamworks.com/companyprofile/migrate/uploads/2016/09/TMA-Logo.png" alt="" />
                    </div>
                    <div className='align-text-middle' style={{ height: '200px' }}>
                        <h3 className='align-text-middle' style={{}}>Student</h3><p className='m-1'>Majoring in</p><h3>Business Administration</h3>
<p>“…the first public school in Vietnam
                        to use English as the official
                        language in both teaching and
learning…”</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
