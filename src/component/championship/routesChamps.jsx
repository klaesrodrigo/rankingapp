import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Championship from './listChampionships'
import champCreate from './championshipCreate'

export default props =>
  <Switch>
    {/* <Route path='/championship' component={Championship} /> */}
    <Route path='/championship/create' component={champCreate} />

    <Redirect from='*' to='/login' />
  </Switch>
