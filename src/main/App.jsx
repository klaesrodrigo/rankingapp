import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '../component/template/custom.css'

import React from 'react'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'

export default props => (
  <BrowserRouter>
    <div className='app'>
      <Routes />
    </div>
  </BrowserRouter>
)
