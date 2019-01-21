import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import If from '../helpers/if'

const baseURL = 'http://api-navetest.herokuapp.com/v1'

const initialState = {
  user: { name: '', email: '', password: '', rating: '' },
  id: '',
  redirect: false,
  update: false
}

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export default class CreateUser extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState, id: (this.props.location.search).replace('?id=', '') }

    this.updateField = this.updateField.bind(this)
    this.siginup = this.siginup.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    if (this.state.id !== '') {
      this.handleOneUser()
    }
  }

  updateField (event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  handleOneUser () {
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    axios.get(`${baseURL}/users/${this.state.id}`, config).then(resp => {
      this.setState({ ...this.state, user: resp.data, password: '' })
    })
  }

  siginup (e) {
    e.preventDefault()
    const data = JSON.stringify({ ...this.state.user })
    axios.post(`${baseURL}/users/signup`, data, config).then(resp => {
      if (resp.status === 200) {
        this.setState({ ...this.state, redirect: true })
      }
    })
  }

  handleUpdate (e) {
    e.preventDefault()
    const data = { 'name': this.state.user.name,
      'email': this.state.user.email,
      'rating': this.state.user.rating
    }

    const token = window.localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    axios.put(`${baseURL}/users/${this.state.user.id}`, data, config).then(resp => {
      if (resp.status === 200) {
        this.setState({ ...this.state, update: true })
      }
    })
  }
  render () {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
    if (this.state.update) {
      return <Redirect to='/users' />
    }
    return (
      <div className='container d-flex vw-100 vh-100 justify-content-center align-items-center'>
        <form className='w-50'>

          <div className='form-group'>
            <label htmlFor='name'>Nome:</label>
            <input type='text' className='form-control' id='name' name='name'
              placeholder='Nome' onChange={e => this.updateField(e)} value={this.state.user.name} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'> E-mail:</label>
            <input type='email' className='form-control' id='email' name='email'
              placeholder='Email' onChange={e => this.updateField(e)} value={this.state.user.email} />
          </div>
          <If test={this.state.id === ''}>
            <div className='form-group'>
              <label htmlFor='password'> Senha:</label>
              <input type='password' className='form-control' id='password' name='password'
                placeholder='Senha' onChange={e => this.updateField(e)} value={this.state.user.password} />
            </div>
          </If>
          <div className='form-group'>
            <label htmlFor='rating'> Pontuação: </label>
            <input type='text' className='form-control' id='rating' name='rating'
              placeholder='Pontuação' onChange={e => this.updateField(e)} value={this.state.user.rating} />
          </div>
          <If test={this.state.id === ''}>
            <button type='submit' className='btn btn-success' onClick={this.siginup}>Cadastrar</button>
          </If>
          <If test={this.state.id !== ''}>
            <button type='submit' className='btn btn-warning' onClick={this.handleUpdate}>Editar</button>
          </If>
        </form>
      </div>
    )
  }
}
