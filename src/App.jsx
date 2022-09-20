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

  return (
    <div className={'container-app w-full lg:w-[1200px] mx-auto  aspect-video'}>
      <About />asd
        <Sandpack 
        template="react"
        files={{
          './App.js': code
        }}
       />
       
    </div>
  )
}



export default App
