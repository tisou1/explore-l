import { useState, useMemo, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchFilter } from '@/store'
import { Dropdown } from 'antd'
import './createInterval.scss'


export default function CreateSignal(props) {
  const dispatch = useDispatch()

  const {
    // dispatch,
    type,
    title,
    list = [],
    defaultValue = '7D',
    icon = false
  } = props

  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState(defaultValue || 'All')


  const chnageHandle = (item) => {
    // dispatch({ type: type, data: val })
    dispatchFilter({ [type]: item.value })(dispatch)

    setSelectData(item.name)
    setVisible(false)
  }

  const menu = useMemo(() => (
    <div className='custom-select-menu'>
      <CustomOption list={list} onChange={chnageHandle} icon={icon} />
    </div>
  ), [selectData])

  return (
    <div className='wrap-dropdown'>
      <div className='dropdown-title'>{title}</div>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        visible={visible}
        onVisibleChange={(v) => {
          setVisible(v)
        }}>
        <div>
          <CustomSelectTrigger selectData={selectData} list={list} show={visible} icon={icon} type={type} defaultValue={defaultValue}/>
        </div>
      </Dropdown>
    </div>
  )
}


const CustomOption = (props) => {
  const { list, onChange, icon = false } = props
  const [avtive, setActive] = useState(0)
  const clickHandle = (item, index) => {
    onChange(item)
    setActive(index)
  }
  return (
    <div className='token-list-int'>
      {
        list.map((item, index) => (
          <div
            key={index}
            onClick={() => clickHandle(item, index)}
            className={`token-item ${avtive === index ? 'active' : ''}`}
          >
            <div className='item-left'>
              {
                icon &&
                <div className='token-name'>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={'#' + item.token}></use>
                  </svg>
                </div>
              }
              <div className='left-name'>{item.name}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}


/// trigegr children
const CustomSelectTrigger = memo((props) => {
  const { list } = props
  // console.log('CustomSelect组件',props.selectData);
  const filterState = useSelector(state => state.filterSelect)

  const { selectData, show, icon, type, defaultValue } = props

  const showWhichOrigin = useMemo(() => {
    let value = filterState[type]
    if(value) {
     return list.find(val => val.value === value)
    }
    return defaultValue
  })

  return (
    <div className='custom-select-int'>
      <div className='select-value'>
        {
          icon &&
          <div className='token-name'>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={'#' + showWhichOrigin.token}></use>
            </svg>
          </div>
        }
        <span>{showWhichOrigin.name}</span>
      </div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})
