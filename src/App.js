import React from 'react'
import { hot } from 'react-hot-loader'
import Graph from './Graph'

const {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} = require('react-raphael');

class App extends React.Component{
  render(){
    
      return (
        <div>
            <Graph />
      </div>
    )
  }
}

export default hot(module)(App)
