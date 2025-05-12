import React from 'react'

const SettingComp = () => {

  return (
    <div className=' w-75'>
 
    <div className='row'>
            <h1 className='text-start'>Settings</h1>
    </div>
    <div className='' style={{marginTop : "100px" , paddingLeft:"150px"}}>
        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Notification</label>
        </div>

        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Sound</label>
        </div>

        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Music</label>
        </div>

        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Vibration</label>
        </div>

        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Alarms</label>
        </div>

        <div className="form-check form-switch" style={{paddingBottom:"15px"}}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Disturbance</label>
        </div>



    </div>
    </div>
      )
}

export default SettingComp