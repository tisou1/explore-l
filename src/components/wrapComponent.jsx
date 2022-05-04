import { useState,useMemo } from 'react'
import { Dropdown } from 'antd'
import './wrapComponent.scss'


function WrapComponent() {
  const [visible, setVisible] = useState(false)
  const list = ['时间','空间','质量']
  const [current, setCurrrent] = useState({
    defaultValue: 'all',
    data: list.map(_ => '')
  })
  const showWhichOrigin = useMemo(() => {
      let flag =  current.data.some(val => val !== '')
      if(flag) {
        return current.data.filter(val => val !== '').join(',')
      } else {
        return current.defaultValue
      }
  },[current.data])
  const changeHandle = (e, index) => {
    const { value, checked } = e.target
    let tempCurrent = {
      ...current,
      data: current.data.map((val, i) => {
       if( i === index){
         if(checked)
          return value
         else 
          return ''
       }
       else 
        return val
      })
    }
    setCurrrent(tempCurrent)
  }
  const menu = (
      <div className='menu-list'>
      {
        list.map((val,idx) => (
          <div key={idx} className="menu-item">
            <div onChange={(e) => changeHandle(e,idx)} className={`picon ${p-icon-NoSelectedn}`}>{val}</div>
          </div>
        ))
      }
      </div>
  )
  return (
    <div className='wrap-dropdown'>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        visible={visible}
        onVisibleChange={(v) => {
          console.log(v)
          setVisible(v)
        }}>
        <button>{showWhichOrigin}</button>
      </Dropdown>
    </div>
  )
}

export default WrapComponent