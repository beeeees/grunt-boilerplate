import React from 'react'

const MyApp = React.createClass({
  componentDidMount(){
    console.log("React app mounted.")
  },

  render(){
    return (
      <div>
        <h3>Rendered by React</h3>
        {this.props.message}
      </div>
    )
  }
})

export default MyApp
