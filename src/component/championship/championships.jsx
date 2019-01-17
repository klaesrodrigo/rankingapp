import React from 'react'

import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import Router from './routesChamps'

export default props => (
  <div>
    <Menu />
    <div className='container'>
      <PageHeader name='Lista' small='Campeonatos' />
      <Router />
    </div>
  </div>
)
