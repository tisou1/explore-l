import { useState, useMemo, memo } from 'react'
import { Dropdown } from 'antd'
import './createInterval.scss'

const list = [
  { name: 'USD', token: 'p-icon-USD' },
  { name: 'BNB', token: 'p-icon-BNB' },
  { name: 'Polygon', token: 'p-icon-Polygon' },
  { name: 'ETH', token: 'p-icon-ETH' }
]

export default function CreateInterval(props) {
  const {
    dispatch,
    type,
    title,
    icon = true,
  } = props

  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({
    defaultValue: '-',
    token: 'p-icon-USD',//p-icon-Polygon, p-icon-BNB
    min: '',
    max: '',
  })

  const clickHandle = () => {
    //TODO 校验数据
    dispatch({
      type: type, data: {
        token: selectData.token,
        min: selectData.min,
        max: selectData.max
      }
    })
    //close
    setVisible(false)
  }

  const menu = useMemo(() => (
    <div className='custom-select-menu'>
      {
        icon && 
          <TokenItem list={list} tokenChange={(token) => setSelectData({ ...selectData, token })} icon={icon} />
      }

      <div className='min-max'>
        <input type="text" placeholder='Min' value={selectData.min} onChange={(e) => setSelectData({ ...selectData, min: e.target.value })} />
        <input type="text" placeholder='Max' value={selectData.max} onChange={(e) => setSelectData({ ...selectData, max: e.target.value })} />
      </div>
      <div className='submit-btn'>
        <button onClick={clickHandle}>确定</button>
      </div>
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
          <CustomSelectTrigger selectData={selectData} show={visible} icon={icon}/>
        </div>
      </Dropdown>
    </div>
  )
}


const TokenItem = (props) => {
  const { list, tokenChange, icon } = props
  const [avtive, setActive] = useState(0)
  const clickHandle = (item, index) => {
    tokenChange(item.token)
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
              <div className='left-name'> {item.name}</div>
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

  const showWhichOrigin = useMemo(() => {
    let obj = {}
    obj.token = selectData.token
    let flag = selectData.min && selectData.max
    if (flag) {
      obj.name = `${selectData.min} ~ ${selectData.max}`
    } else {
      obj.name = '-'
    }
    return obj
  }, [selectData.min, selectData.max, selectData.token])

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
