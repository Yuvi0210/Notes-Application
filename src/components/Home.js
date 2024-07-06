import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  const { showAlert, showLoading } = props
  return (
    <div>
      <div className="container" style={{ width: '100%' }}>
        <Notes showAlert={showAlert} showLoading={showLoading}></Notes>
      </div>
    </div>
  )
}

export default Home
