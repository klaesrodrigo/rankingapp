import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Login from '../component/template/login'
import Users from '../component/user/users'
import CreateUser from '../component/user/createUser'
import Championship from '../component/championship/championships'

export default props =>
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route path='/users' component={Users} />
    <Route path='/create' component={CreateUser} />
    <Route path='/championship' component={Championship} />

    <Redirect from='*' to='/login' />
  </Switch>
