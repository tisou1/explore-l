import { useState, useReducer } from 'react'
import logo from './logo.svg'
import './App.css'
import Filtering from './Filtering'

function App() {
  const list = [
    {
      title: '类别',
      label: 'n1',
      index: 0,
      defaultValue: 1,
      options: [1, 2, 3],
    },
    {
      title: '项目',
      label: 'n2',
      index: 1,
      defaultValue: 4,
      options: [4, 5, 6],
      modal: {
        title: '选择属性',
        onClick: () => console.log('打开modal'),
      },
    },
    {
      title: '增加',
      label: 'n3',
      index: 2,
      defaultValue: 7,
      options: [7, 8, 9],
    },
    {
      title: '24H成交量',
      label: 'n4',
      index: 3,
      defaultValue: 100000,
      options: [100000, 200000, 300000, 500000],
    },
  ]

  const changeValue = (values) => {
    console.log('状态值:', values)
  }
  return (
    <div className={'btn container-app w-[1200px] mx-auto'}>
      <Filtering selectList={list} onChange={changeValue}/>
      {/* <Count/> */}
    </div>
  )
}

function reducer(state,action) {
  switch(action.type) {
    case '+':
      return state + 1
    default: state
  }
}

function Count() {
  const [state, dispatch] = useReducer(reducer, 0)
  const click = () => {
    console.log("state",state)
    dispatch({type:'+'})
    console.log("state",state)

  }
  return(
    <div onClick={click} className="p-2 bg-gray-500">{state}</div>
  )
}

export default App
