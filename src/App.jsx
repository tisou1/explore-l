import React, { useState, useMemo, useCallback } from 'react'
import FilterSelect from '@/components/FilterSelect'
import ShowFilterConditions from '@/components/ShowFilterConditions'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useSelector, useDispatch } from 'react-redux'
import Filp from './Flip'

import HeightTransition from  '@/components/HeightTransition'

function App() {
  const [count, setCount] = useState(0)
  const changeHandle = useCallback((state) => {
    console.log('state:', state);
  }, [])

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
    <div className={'container-app w-full lg:w-[1200px] mx-auto  aspect-video'}>
      <HeightTransition />
    </div>
  )
}



const Counter = React.memo((props) => {
  console.log('Counter render')
  return (
    <div>
      counter, {props.name.length}
    </div>
  )
}, (p, n) => {
  console.log(p === n);
})




export default App
