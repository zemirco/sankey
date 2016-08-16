
import React from 'react'
import ReactDOM from 'react-dom'
import Sankey from '../'

// 50 receptions in total
// 2 of them cross the net directly, 1 is zero attack and 1 is attack win
// ---
// 5 reception error
// 10 reception zero
// |- 2 setting error
// |- 4 setting zero
// |--- 2 attack zero
// |--- 2 attack win
// |- 4 setting good
// |--- 1 attack error
// |--- 3 attack win
// 35 reception good
// |- 3 setting error
// |- 10 setting zero
// |--- 1 attack error
// |--- 6 attack zero
// |--- 3 attack win
// |- 22 setting good
// |--- 2 attack error
// |--- 5 attack zero
// |--- 15 attack win

// const energy = {
//   nodes: [
//     {name: 'Attack'},
//     {name: 'Reception'},
//     {name: 'Reception Error'}, // 0
//     {name: 'Reception Zero'},  // 1
//     {name: 'Reception Good'},  // 2
//     {name: 'Setting Error'},   // 3
//     {name: 'Setting Zero'},    // 4
//     {name: 'Setting Good'},    // 5
//     {name: 'Attack Error'},    // 6
//     {name: 'Attack Zero'},     // 7
//     {name: 'Attack Win'}       // 8
//   ],
//   links: [
//     // attack zero
//     {source: 0, target: 9, value: 1},
//     // attack win
//     {source: 0, target: 10, value: 1},
//     // reception -> reception error
//     {source: 1, target: 2, value: 5},
//     // reception -> reception zero
//     {source: 1, target: 3, value: 10},
//     // reception -> reception good
//     {source: 1, target: 4, value: 35},
//     // reception error
//     {source: 2, target: 5, value: 0.1},
//     // reception zero
//     {source: 3, target: 5, value: 2},
//     {source: 3, target: 6, value: 4},
//     {source: 3, target: 7, value: 4},
//     // reception good
//     {source: 4, target: 5, value: 3},
//     {source: 4, target: 6, value: 10},
//     {source: 4, target: 7, value: 22},
//     // reception good -> attack winner
//     {source: 4, target: 10, value: 3},
//     // test
//     {source: 5, target: 8, value: 0.1},
//     // setting zero
//     {source: 6, target: 8, value: 1},
//     {source: 6, target: 9, value: 8},
//     {source: 6, target: 10, value: 5},
//     // setting good
//     {source: 7, target: 8, value: 3},
//     {source: 7, target: 9, value: 5},
//     {source: 7, target: 10, value: 18}
//   ]
// }

const newData = {
  nodes: [
    {name: 'Attack'},
    {name: 'Reception'},
    {name: 'Reception Error'},
    {name: 'Reception Zero'},
    {name: 'Reception Good'},
    {name: 'Setting Error'},
    {name: 'Setting Zero'},
    {name: 'Setting Good'},
    {name: 'Attack Error'},
    {name: 'Attack Zero'},
    {name: 'Attack Win'}
  ],
  // links: [
  //   // attack zero
  //   // {source: 0, target: 9, value: 2},
  //   // attack win
  //   // {source: 0, target: 10, value: 2},
  //   // reception -> reception error
  //   {source: 0, target: 1, value: 5},
  //   // reception -> reception zero
  //   {source: 0, target: 2, value: 10},
  //   // reception -> reception good
  //   {source: 0, target: 3, value: 35},
  //   // reception error
  //   {source: 1, target: 4, value: 0.1},
  //   // reception zero
  //   {source: 2, target: 4, value: 2},
  //   {source: 2, target: 5, value: 4},
  //   {source: 2, target: 6, value: 4},
  //   // reception good
  //   // {source: 3, target: 4, value: 3},
  //   {source: 3, target: 5, value: 10},
  //   {source: 3, target: 6, value: 22},
  //   // reception good -> attack winner
  //   {source: 3, target: 9, value: 3},
  //   // test
  //   {source: 4, target: 7, value: 0.1},
  //   // setting zero
  //   {source: 5, target: 7, value: 1},
  //   {source: 5, target: 8, value: 8},
  //   {source: 5, target: 9, value: 5},
  //   // setting good
  //   {source: 6, target: 7, value: 3},
  //   {source: 6, target: 8, value: 5},
  //   {source: 6, target: 9, value: 18}
  // ]
  links: [
    { source: 0, target: 9, value: 0.001 },
    { source: 0, target: 10, value: 0 },
    { source: 1, target: 2, value: 0.001 },
    { source: 1, target: 3, value: 5 },
    { source: 1, target: 4, value: 8 },
    { source: 2, target: 5, value: 0.001 },
    { source: 3, target: 8, value: 0 },
    { source: 3, target: 9, value: 1 },
    { source: 3, target: 10, value: 1 },
    { source: 3, target: 5, value: 0 },
    { source: 3, target: 6, value: 1 },
    { source: 3, target: 7, value: 2 },
    { source: 4, target: 8, value: 0 },
    { source: 4, target: 9, value: 0 },
    { source: 4, target: 10, value: 0 },
    { source: 4, target: 5, value: 0 },
    { source: 4, target: 6, value: 1 },
    { source: 4, target: 7, value: 7 },
    { source: 5, target: 8, value: 0.001 },
    { source: 6, target: 8, value: 1 },
    { source: 6, target: 9, value: 2 },
    { source: 6, target: 10, value: 2 },
    { source: 7, target: 8, value: 1 },
    { source: 7, target: 9, value: 5 },
    { source: 7, target: 10, value: 7 }
  ]
}

class App extends React.Component {

  componentDidMount () {
    this.a = new Sankey({
      target: this.svg
    })
    this.a.render(newData)
  }

  render () {
    return (
      <div>
        <svg ref={c => { this.svg = c }} />
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))
