import { useState, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux'
import { dispatchFilter } from '~/store'
import { Dropdown } from 'antd'
import './createInterval.scss'


export default function CreateSignal(props) {
  const dispatch = useDispatch()

  const {
    // dispatch,
    type,
    title,
    list = [],
    defaultValue,
    icon = false
  } = props

  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState(defaultValue || 'All')


  const chnageHandle = (val) => {
    // dispatch({ type: type, data: val })

    dispatchFilter({ [type]: val })(dispatch)

    setSelectData(val)
    setVisible(false)
  }

  const menu = useMemo(() => (
    <div className='custom-select-menu'>
      <CustomOption list={list} onChange={chnageHandle} icon={icon} />
    </div>
  ), [selectData])

  return (
    <div className='wrap-dropdown'>
      <div className='dropdown-title mb-3'>{title}</div>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        visible={visible}
        onVisibleChange={(v) => {
          setVisible(v)
        }}>
        <div>
          <CustomSelectTrigger selectData={selectData} show={visible} icon={icon} />
        </div>
      </Dropdown>
    </div>
  )
}


const CustomOption = (props) => {
  const { list, onChange, icon = false } = props
  const [avtive, setActive] = useState(0)
  const clickHandle = (item, index) => {
    onChange(item.name)
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
  // console.log('CustomSelect组件',props.selectData);
  const { selectData, show, icon } = props

  const showWhichOrigin = useMemo(() => ({ name: selectData }), [selectData])

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
