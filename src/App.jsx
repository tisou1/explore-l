import React, { useState, useMemo, useCallback } from 'react'
import FilterSelect from './FilterSelect'
import ShowFilterConditions from './ShowFilterConditions'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useSelector, useDispatch } from 'react-redux'
import Filp from './Flip'
import Test from './Test'
import './app.scss'
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
      {/* <Test/> */}
      {/* <Filp /> */}
      {/* <div onClick={() => setCount(count + 1)}>count: {count}</div>

      <Button onClick={handleClick}>点击</Button> */}

      {/* <FilterSelect 
        onChange={changeHandle} 
        selects={selects}/>

      <ShowFilterConditions /> */}
      <HeightTransition />
    </div>
  )
}


const HeightTransition = (props) => {
  const list = [
    'react',
    'vue',
    'typescripe',
    'sveltejs',
    'angular'
  ]
  const listRef = React.useRef(null)
  const _heihgt = React.useRef(0)
  const show = React.useRef(false)
  const [active, setActive] = React.useState(false)
  const [_style, setStyle] = useState({
    height: '0',
  })

  React.useEffect(() => {
    _heihgt.current = listRef.current.clientHeight 
    console.log(listRef.current.offsetHeight);
  }, [])

  React.useEffect(() => {
 
  })

  const handleClick = () => {

    if (show.current) {
      //关闭
      setStyle({
        height: '0',
      })

      show.current = false
    } else {
      //展开
      setStyle({
        height: _heihgt.current + 24 + 'px',
      })
      
      show.current = true
    }
  }

  const handleTransitioned = () => {
  //  if(show.current) {
  //   return
  //  } else {
  //    setStyle({
  //      display: 'none',
  //    })
  //  }
  }
  return (
    <section className='flex flex-col items-center justify-center mt-16'>


      <div onClick={handleClick} className="w-64px h-42px bg-blue-400 rounded-xl text-center leading-42px cursor-pointer">切换</div>
      <div style={_style } className={`list-m `} onTransitionEnd={handleTransitioned}>
        <div className='w-200px bg-gray-300 text-center' ref={listRef}>
          {
            list.map((val, idx) => (
              <div key={idx} className="h-42px border-b bg-currentborder-slate-300">{val}</div>
            ))
          }
        </div>
      </div>

    </section>
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
