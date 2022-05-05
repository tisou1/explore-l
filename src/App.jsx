import { useState, useReducer, useRef ,useEffect} from 'react'
import logo from './logo.svg'
import Filtering from './Filtering'
import { useLatest, usePrevious } from './hooks'
import FilterSelect from './components/FilterSelect'
function App() {
  const changeHandle = (state) => {
    console.log('state:',state);
  }
  return (
    <div className={'btn container-app w-[300px] mx-auto '}>
      <FilterSelect onChange={changeHandle}/>
      {/* <Filtering selectList={list} onChange={changeValue}/> */}
      {/* <Counter/> */}
    </div>
  )
}


function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  const add = () => {
    console.log('setCount',count)
    setCount(count+1)
  }
  return <h1 onClick={add}>Now: {count}, before: {prevCount}</h1>;
}




export default App
