import { useState, useReducer, useRef ,useEffect} from 'react'
import logo from './logo.svg'
import Filtering from './Filtering'
import { useLatest, usePrevious } from './hooks'
import FilterSelect from './FilterSelect'
import ShowFilterConditions from './ShowFilterConditions'
function App() {
  const [count, setCount] = useState({value: 0})
  const changeHandle = (state) => {
    console.log('state:',state);
  }

  const clickHandle = () => {
    let obj = count
    obj.value += 1
    //state是进行的浅比较,所以需要进行immerable(数据不可变)的操作
    setCount(count)
  }
  return (
    <div className={'container-app w-[1200px] mx-auto '}>

      <div>
        {count.value}
        <button onClick={clickHandle}>增加</button>
      </div>

      <FilterSelect 
        onChange={changeHandle} 
        selects={[
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
        ]}/>
      {/* <Filtering selectList={list} onChange={changeValue}/> */}
      {/* <Counter/> */}

      <ShowFilterConditions />
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
