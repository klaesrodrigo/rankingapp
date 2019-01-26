import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const initialState = {
  user: { email: '', password: '' },
  redirect: false,
  token: ''
}
const baseURL = 'http://api-navetest.herokuapp.com/v1'

export default class Login extends Component {
  state = {
    ...initialState
  }

  updateField = event => {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  login = e => {
    e.preventDefault()
    const data = JSON.stringify({ ...this.state.user })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(`${baseURL}/users/login`, data, config).then(resp => {
      window.localStorage.setItem('token', resp.data.token)
      const { history } = this.props
      history.push('/users')
    })
  }

  render () {
    return (
      <div className='container d-flex vw-100 vh-100 justify-content-center align-items-center'>
        <form className='w-50' onSubmit={this.login}>
          <div className='form-group'>
            <input type='email' className='form-control' id='email' name='email'
              placeholder='Email' onChange={this.updateField} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' id='password' name='password'
              placeholder='Password' onChange={this.updateField} />
          </div>
          <button type='submit' className='btn btn-primary'>Entrar</button>
          <Link to='/create'><button type='button' className='btn btn-primary'>Cadastrar</button></Link>
        </form>
      </div>
    )
  }
}
