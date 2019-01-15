import React from 'react'

import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import ListChampionship from '../championship/listChampionships'

export default props => (
  <div>
    <Menu />
    <div className='container'>
      <PageHeader name='Lista' small='usuários' />
      <ListChampionship />
    </div>
  </div>
)
