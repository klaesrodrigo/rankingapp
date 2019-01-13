import React, { Component } from 'react'
import axios from 'axios'

const initialState = {
  user: { username: '', password: '' }
}
const baseURL = 'http://api-navetest.herokuapp.com/v1'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }
  }

  updateField (event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  login () {
    const user = this.state.user.username
    const pass = this.state.user.pass

    axios.post(`${baseURL}/login`, { username: user, password: pass }).then(resp => { console.log(resp) })
  }

  render () {
    return (
      <div className='container'>
        <form className=''>
          <input type='name' id='username' name='username' onChange={e => this.updateField(e)} />
          <input type='password' id='password' name='password' onChange={e => this.updateField(e)} />
        </form>
      </div>
    )
  }
}
