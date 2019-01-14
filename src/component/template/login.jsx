import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const initialState = {
  user: { email: '', password: '' },
  redirect: false
}
const baseURL = 'http://api-navetest.herokuapp.com/v1'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.login = this.login.bind(this)
    this.updateField = this.updateField.bind(this)
    this.returnLogin = this.returnLogin.bind(this)
  }

  updateField (event) {
    const user = { ...this.state.user }
    console.log(event.target.name)
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  login (e) {
    e.preventDefault()
    const data = JSON.stringify({ ...this.state.user })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(data)
    axios.post(`${baseURL}/users/login`, data, config).then(resp => {
      window.localStorage.setItem('token', resp.data.token)
      if (resp.status === 200) {
        this.setState({ ...this.state, redirect: true })
      }
    })
  }

  returnLogin () {
    return (
      <div className='container d-flex vw-100 vh-100 justify-content-center align-items-center'>
        <form className='w-50'>
          <div className='form-group'>
            <input type='email' className='form-control' id='email' name='email'
              placeholder='Email' onChange={e => this.updateField(e)} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' id='password' name='password'
              placeholder='Password' onChange={e => this.updateField(e)} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.login}>Entrar</button>
          <Link to='/create'><button type='submit' className='btn btn-primary'>Cadastrar</button></Link>
        </form>
      </div>
    )
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/users' />
    }
    return (
      this.returnLogin()
    )
  }
}
