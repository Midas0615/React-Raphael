import React from 'react'
import BarChart from '../lib/index.js';

const barSerises = [
	{
		color: "#74C93C",
		hoverColor: "#FF7E60",
		data: [{x:1100,y:1}]
	},{
		color: "#03A9F4",
		hoverColor: "#FF7E60",
		data: [{x:1300,y:1}]
	},{
		color: "#FF7E60",
		hoverColor: "#FF7E60",
		data: [{x:1200,y:1}]
	},{
		color: "#9802fe",
		hoverColor: "#FF7E60",
		data: [{x:1200,y:1}]
	}
]

const barXAxis = {
	min: 0,
	max: 4000,
	interval: 400,
	formatter: null
}

const barYAxis = {
	min: 0,
	max: 1,
	interval: 1,
	formatter: function() {
		return 'A\n \nB\n \nC\n \nD'
	},
	width: 150,
}

class Graph extends React.Component {
  render() {

    return (
      <BarChart barWidth={12} xAxis={barXAxis} yAxis={barYAxis} width={1000} height={200} serises={barSerises} />
    )
  }
}

export default Graph