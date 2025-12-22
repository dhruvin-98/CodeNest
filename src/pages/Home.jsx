import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='homePgeWrapper' >
        <div className='formWrapper'>
          <img src="/CodeNest_img.png" alt="CodeNest_logo" className='homePageLogo' />
          <h4 className='mainLabel'>Paste invitation ROOM ID</h4>
          <div className='inputGroup'>
            <input type="text" className='inputBox' placeholder='ROOM ID' />
            <input type="text" className='inputBox' placeholder='USERNAME' />
            <button className='btn joinBtn'>Join</button>

            <span>If you don't have an invite then create &nbsp;
              <a href="" className='createNewBtn'>New Room</a>
            </span>
          </div>
        </div>
        <footer>
          <h4>Built  by <a href="https://github.com/dhruvin-98" target="_blank" rel="noopener noreferrer">Dhruvin</a></h4>
        </footer>
        </div>
      </div>
  )
}

export default Home