import React, { Component } from 'react'
import GenericList from '../template/genericList'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const baseURL = 'http://api-navetest.herokuapp.com/v1'
const token = window.localStorage.getItem('token')
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}
const initialState = {
  players: [],
  campId: '',
  matches: false,
  delete: false
}

export default class ChampionshipEdit extends Component {
  constructor (props) {
    super(props)
    this.state = { ...initialState, campId: (window.location.search).replace('?id=', '') }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount () {
    this.handleSearch()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.players !== this.state.players) {
      this.setState({ ...this.state })
    }
  }

  handleSearch () {
    const id = this.state.campId
    axios.get(`${baseURL}/championships/${id}`, config)
      .then(resp => {
        if ((resp.data.users).length === 0) {
          window.alert('Campeonato não iniciado')
        }
        const playersList = resp.data.users
        const orderedUsers = playersList.sort((a, b) => b.rating - a.rating)
        return (this.setState({ ...this.state, players: orderedUsers }))
      }
      )
  }

  handleRemove () {
    axios.delete(`${baseURL}/championships/${this.state.campId}`, config)
      .then(resp => {
        return this.setState({ ...this.state, delete: false })
      })
  }

  renderPlayers () {
    const keys = ['name', 'rating']
    return <GenericList dado={this.state.players || []} keys={keys} />
  }

  render () {
    if (this.state.matches) {
      const id = this.state.campId
      return <Redirect to={`/matches?id=${id}`} />
    }
    if (this.state.delete) {
      return <Redirect to={`/championship`} />
    }
    return (
      <div>
        <div className='d-flex mb30'>
          <button className='btn btn-info' onClick={() => this.setState({ ...this.state, matches: true })}> Ver partidas</button>
          <button className='ml-auto btn btn-danger' onClick={() => this.handleRemove()}>Excluir campeonato</button>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          {this.renderPlayers()}
        </table>
      </div>
    )
  }
}
