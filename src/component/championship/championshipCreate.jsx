
import React, { Component } from 'react'
import GenericList from '../template/genericList'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import IconButton from '../template/iconButton'

const baseURL = 'http://api-navetest.herokuapp.com/v1'
const token = window.localStorage.getItem('token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const initialState = {
  list: [],
  id: '',
  redirect: false,
  championship: '',
  players: []
}

export default class ChampionshipList extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState }

    this.renderRows = this.renderRows.bind(this)
    this.updateField = this.updateField.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.addUserInChamp = this.addUserInChamp.bind(this)
    this.removeUserInChamp = this.removeUserInChamp.bind(this)

    this.handleSearch()
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      this.setState({ ...this.state })
    }
    if (prevState.players !== this.state.players) {
      this.setState({ ...this.state })
    }
  }

  updateField (event) {
    this.setState({ ...this.state, championship: event.target.value })
  }

  handleSearch (championship = '') {
    axios.get(`${baseURL}/users`, config)
      .then(resp => {
        return (this.setState({ ...this.state, championship, list: resp.data }))
      }
      )
  }

  handleAdd () {
    const camp = { name: this.state.championship }
    const players = this.state.players
    const users = players.map(player => player.id)
    const comp = { name: camp.name, users: users }
    axios.post(`${baseURL}/championships`, camp, config)
      .then(resp => axios.put(`${baseURL}/championships/${resp.data.id}`, comp, config)
        .then(resp => (this.setState({ ...this.state, id: resp.data.id, redirect: true }))))
  }

  addUserInChamp (user) {
    let newList = this.removeUser(this.state.list, user)
    this.setState({ ...this.state, list: newList, players: [...this.state.players, user] })
  }

  removeUserInChamp (user) {
    let newList = this.removeUser(this.state.players, user)
    this.setState({ ...this.state, players: newList, list: [...this.state.list, user] })
  }

  removeUser (list, user) {
    let array = list
    let index = array.indexOf(user) // Let's say it's Bob.
    array.splice(index, 1)
    return array
  }

  renderRows () {
    // const list = this.state.list || []
    const btConfig = [{
      estilo: 'secondary',
      icon: 'plus',
      func: (data) => this.addUserInChamp(data)
    }]
    const keys = ['name']
    return <GenericList dado={this.state.list || []} btConfig={btConfig} keys={keys} />
  }

  renderPlayers () {
    const btConfig = [{
      estilo: 'danger',
      icon: 'minus',
      func: (data) => this.removeUserInChamp(data)
    }]
    const keys = ['name']
    return <GenericList dado={this.state.players || []} btConfig={btConfig} keys={keys} />
  }

  render () {
    if (this.state.redirect) {
      const id = this.state.id
      return <Redirect to={`/championship/edit?id=${id}`} />
    }
    return (
      <div>
        <div role='form' className='form d-flex'>
          <input id='championship'
            className='form-control w-75'
            onChange={this.updateField}
            placeholder='Adicione um campeonato'
            value={this.state.championship} />
          <IconButton estilo='primary' icon='plus'
            onClick={this.handleAdd} />
        </div>
        <div className='d-flex'>
          <h3 className='w-50'>Jogadores</h3>
          <h3>Jogadores no Camp.</h3>
        </div>
        <div className='d-flex'>
          <table className='table table-striped w-50'>
            <thead>
              <tr>
                <th>Nome</th>
                <th className='tableActions'>Ações</th>
              </tr>
            </thead>
            {this.renderRows()}
          </table>
          <table className='table table-striped w-50'>
            <thead>
              <tr>
                <th>Nome</th>
                <th className='tableActions'>Ações</th>
              </tr>
            </thead>
            {this.renderPlayers()}
          </table>
        </div>
      </div>
    )
  }
}
