import React, { useState, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Sandpack } from "@codesandbox/sandpack-react";
import About from './about.mdx'



const code = `
  export default function App(){
    return <h1>Hello Wor22d</h1>
  }
`

function App() {
  console.log('父组件L:')
  return (
    <div className={'container-app w-full lg:w-[1200px] mx-auto  aspect-video'}>
      <About name="about组件"/>
        {/* <Sandpack 
        template="react"
        files={{
          './App.js': code
        }}
       /> */}
       <Counter/>
       <Child />
    </div>
  )
}

function Counter() {
  const state = useSelector(state => state.counter)
  const dispatch = useDispatch()

  console.log('子组件counter')
  return (
    <button onClick={() => dispatch({  type: 'counter'})}>更改Counter</button>
  )
}

function Child() {
  const state = useSelector(state => state.filterSelect)
  const dispatch = useDispatch()

  console.log('子组件Child')
  return (
    <button onClick={() => dispatch({ info:{ search: 'xxxx'}, type: 'filter_select'})}>更改Child</button>
  )
}


export default App
