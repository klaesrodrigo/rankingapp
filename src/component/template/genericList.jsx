import React, { Component } from 'react'
import IconButton from './iconButton'

export default class GenericField extends Component {
  constructor (props) {
    super(props)
    this.state = { list: props.dado, btConfig: props.btConfig, keys: props.keys }
  }

  renderButton (data, btConfig) {
    const config = btConfig
    if (btConfig) {
      return config.map(
        (item, key) => (<IconButton key={key}
          estilo={item.estilo} icon={item.icon}
          onClick={() => item.func(data)} hide={item.hide} />))
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.dado !== this.state.list) {
      this.setState({ ...this.state, list: prevProps.dado })
    }
  }

  renderTds (item, data) {
    const keys = data
    return (
      keys.map((value, key) => {
        return (<td key={key}>{item[value]}</td>)
      })
    )
  }

  renderTrs () {
    const list = this.state.list || []
    const config = this.state.btConfig
    const keys = this.state.keys
    if (this.state.btConfig) {
      return list.map(item => (
        <tr key={item.id}>
          {this.renderTds(item, keys)}
          <td className='actionsColumn'>
            {this.renderButton(item, config)}
          </td>
        </tr>
      ))
    } else {
      return list.map(item => (
        <tr key={item.id}>
          {this.renderTds(item, keys)}
        </tr>
      ))
    }
  }

  render () {
    return (
      <tbody>
        {this.renderTrs()}
      </tbody>
    )
  }
}
