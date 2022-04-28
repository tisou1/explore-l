import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Filtering from './Filtering'

function App() {
  const list = [
    {
      title: '类别',
      label: 'n1',
      index: 0,
      options: [1, 2, 3],
    },
    {
      title: '项目',
      label: 'n2',
      index: 1,
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
      options: [7, 8, 9],
    },
    {
      title: '24H成交量',
      label: 'n4',
      index: 3,
      options: [100000, 200000, 300000, 500000],
    },
  ]

  const changeValue = (values) => {
    console.log('状态值:', values)
  }
  return (
    <div className={'btn container-app w-[1200px] mx-auto'}>
      <Filtering selectList={list} selectChange={changeValue}/>
    </div>
  )
}

export default App
