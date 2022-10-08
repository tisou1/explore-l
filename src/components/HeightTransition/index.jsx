import React , { useState } from 'react'
import './index.scss'

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

export default HeightTransition