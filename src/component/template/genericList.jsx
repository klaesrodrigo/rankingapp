import React, { Component } from 'react'
import IconButton from './iconButton'

export default class GenericField extends Component {
  constructor (props) {
    super(props)
    this.state = { list: props.data, btConfig: props.btConfig }
    console.log(this.props.data)
    console.log(this.state)
  }

  renderFild (data) {
    const list = data
    return list.map(item => (<td>{item}</td>))
  }

  renderButton (data, btConfig) {
    btConfig.map(item => (<IconButton estilo={item.estilo} icon={item.icon} onClick={item.func} />))
  }

  render () {
    const list = this.state.list || []
    return (list.map(data => (
      <tr key={data.id}>
        {this.renderFild(data)}
        <td />
      </tr>
    )))
  }
}
