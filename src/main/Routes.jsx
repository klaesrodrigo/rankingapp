import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from '../component/template/login'
import Users from '../component/user/users'
import CreateUser from '../component/user/userCreate'
import Championship from '../component/championship/championships'
import Matches from '../component/match/matches'

export default props =>
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route path='/users' component={Users} />
    <Route path='/create' component={CreateUser} />
    <Route path='/championship' component={Championship} />
    <Route path='/championship/create' component={Championship} />
    <Route path='/championship/edit' component={Championship} />
    <Route path='/matches' component={Matches} />

    <Redirect from='*' to='/login' />
  </Switch>
