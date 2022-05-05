import { useState } from 'react'
import logo from '../../logo.svg'

function MultipleItem(props) {
  // console.log('MultipleItem组件');
  const { item, index, changeHandle } = props
  const [active, setActive] = useState(false)
  const clickHandle = () => {
    changeHandle(item.name, index, !active)
    setActive(!active)
  }
  return (
    <div className="menu-item" onClick={clickHandle}>
      <div className={`item-left ${active ? 'active' : ''}`}>
        <img src={logo} className='w-24px h-[24px]' alt="" />
        <div className='left-value'>{item.name}</div>
      </div>
      {
        active
          ?
          <div className='item-right'>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#p-icon-Selectedn"></use>
            </svg>
          </div>
          :
          <div className='item-right picon p-icon-NoSelectedn'></div>
      }
    </div>
  )
}

export default MultipleItem