import { useState, useMemo, memo } from 'react'
import { Dropdown } from 'antd'
import './wrapComponent.scss'
import logo from '../logo.svg'


function WrapComponent() {
  const [visible, setVisible] = useState(false)
  const list = ['时间', '空间', '质量']
  const [selectData, setSelectData] = useState({
    defaultValue: 'all',
    data: list.map(_ => '')
  })

  const changeHandle = (value, index, checked) => {
    let tempselectData = {
      ...selectData,
      data: selectData.data.map((val, i) => {
        if (i === index) {
          if (checked)
            return value
          else
            return ''
        }
        else
          return val
      })
    }
    setSelectData(tempselectData)
  }
  const menu = useMemo(() => (
    <div className='menu-list'>
      {
        list.map((val, idx) => (
          <MultipleItem key={idx} item={val} index={idx} changeHandle={changeHandle}/>
        ))
      }
    </div>
  ),[selectData])
  return (
    <div className='wrap-dropdown'>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        visible={visible}
        onVisibleChange={(v) => {
          setVisible(v)
        }}>
        <div>
          <CustomSelect selectData={selectData} show={visible} />
        </div>
      </Dropdown>
    </div>
  )
}


/// trigegr children
const CustomSelect =  memo((props) => {
  console.log('CustomSelect组件');
  const { selectData, show } = props
  
  const showWhichOrigin = useMemo(() => {
    let flag = selectData.data.some(val => val !== '')
    if (flag) {
      return selectData.data.filter(val => val !== '').join(',')
    } else {
      return selectData.defaultValue
    }
  }, [selectData.data])

  return (
    <div className='custom-select'>
      <div className='select-value'>{showWhichOrigin}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})

///item

function MultipleItem(props) {
  console.log('MultipleItem组件');
  const { item, index,changeHandle } = props
  const [active, setActive] = useState(false)
  const clickHandle = () => {
    changeHandle(item,index,!active)
    setActive(!active)
  }
  return (
    <div className="menu-item" onClick={clickHandle}>
      <div className='item-left'>
        <img src={logo} className='w-24px h-[24px]' alt="" />
        <div>{item}</div>
      </div>
      {
        active 
        ?
          <div>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#p-icon-Selectedn"></use>
            </svg>
          </div>
        :
          <div className='picon p-icon-NoSelectedn'></div>
      }

    </div>
  )
}


export default WrapComponent