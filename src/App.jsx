import React from 'react'
import FilterSelect from './FilterSelect'
import ShowFilterConditions from './ShowFilterConditions'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState,useMemo,useCallback } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const changeHandle = useCallback((state) => {
      console.log('state:',state);
  },[])

  const selects = useMemo(() => {
    return [
      'CategorySelect',
      'ProjectSelect',
      'PropertiesSelect',
      'StatusSelect',
      "EventSelect",
      'PriceSelect',
      'TransactionsNumSelect',
      'TradingSelect',
      'FloorSelect',
      'TimeSelect',
    ]
  })

  const handleClick = () => {
    console.log('点击')
  }

  return (
    <div className={'container-app w-full lg:w-[1200px] mx-auto '}>
      <div onClick={() => setCount(count + 1)}>count: {count}</div>

      <Button onClick={handleClick}>点击</Button>
      {/* <Counter name={selects}/> */}
      <FilterSelect 
        onChange={changeHandle} 
        selects={selects}/>

      <ShowFilterConditions />
    </div>
  )
}


const Counter = React.memo((props) => {
  console.log('Counter render')
  return(
    <div>
      counter, {props.name.length}
    </div>
  )
},(p, n) => {
  console.log(p === n);
})




export default App
