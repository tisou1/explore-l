import { useState, useReducer, useRef ,useEffect} from 'react'
import logo from './logo.svg'
import './App.css'
import Filtering from './Filtering'
import WrapComponent from './components/categorySelect'
function App() {
  const list = [
    {
      title: '类别',
      label: 'n1',
      index: 0,
      defaultValue: '未选择',
      options: [1, 2, 3],
    },
    {
      title: '项目',
      label: 'n2',
      index: 1,
      defaultValue: '未选择',
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
      defaultValue: '未选择',
      options: [7, 8, 9],
    },
    {
      title: '24H成交量',
      label: 'n4',
      index: 3,
      defaultValue: '未选择',
      options: [100000, 200000, 300000, 500000],
    },
  ]

  const changeValue = (values) => {
    console.log('状态值:', values)
  }
  return (
    <div className={'btn container-app w-[300px] mx-auto '}>
      <WrapComponent />
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

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    //useEffect是在dom渲染结束后执行.所以页面上显示的ref是上一轮的. 这里更新的值只会在下一轮显示
    ref.current = value;
    console.log('...',value);
  });
  return ref.current;
}

function useLatest(value){
  const ref = useRef(value)
  ref.current = value

  return ref.current
}




export default App
