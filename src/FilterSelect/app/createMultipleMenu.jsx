import { useState, useMemo, memo, useRef } from 'react'
import { Dropdown } from 'antd'
import './createMultipleMenu.scss'
import logo from '../logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchFilter } from '@/store'
import { useEffect } from 'react'



export default function CreateMultipleMenu(props) {
  const dispatch = useDispatch()
  const filterState = useSelector(state => state.filterSelect)

  const { 
    defaultValue = 'all',
    search=false, 
    avatar=true,
    list, 
    type,
    title
  } = props

  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState(() => ({
    defaultValue: 'all',
    data: list.map(val => ({...val, checked: false, show: true}))
  }))
  const [filterText, setFilterText] = useState('')


  useEffect(() => {
    // console.log(filterState[type],type)
    if(filterState[type].length === 0) {
      setSelectData({
        ...selectData,
        data: list.map(val => ({...val, checked: false, show: true}))
      })
    }
  },[filterState])


  const filterList = (() => {
    let templist = []
    selectData.data?.forEach((item) => {
      if (!item.name.includes(filterText)) {
        templist.push({...item, show: false})
        return
      }
      templist.push({...item, show: true})
    });
    return templist
  })()
  //过滤数据


  const changeHandle = (item, index, checked) => {

    let tempselectData = {
      ...selectData,
      data: selectData.data.map((val, i) => {
        if (i === index) 
          return {...val, checked}
        else
          return val
      })
    }
    // console.log(tempselectData);
    setSelectData(tempselectData)
  }

  const clickHandle = () => {
    let tempselectData = selectData.data.filter(val => val.checked).map(val => val.name)

    dispatchFilter({[type]: tempselectData})(dispatch)

    //close
    setVisible(false)
    //clear inpout
    // setFilterText('')

  }

  const filterChange = (e) => {
    const { value } = e.target
    // console.log(value);
    setFilterText(value)
  }


  const menu =  (
    <div className='custom-select-menu'>
      {
        search &&
        <div className='search-input'>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={filterChange} />
        </div>
      }

      <div className='menu-list'>
        {
          filterList.map((val, idx) => (
            val.show &&
            <MultipleItem key={val + idx} item={val} index={idx} avatar={avatar} changeHandle={changeHandle} />
          ))
        }
      </div>
      <div className='submit-btn'>
        <button onClick={clickHandle}>确定</button>
      </div>
    </div>
  )
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
          <CustomSelectTrigger  show={visible} type={type} defaultValue={defaultValue} />
        </div>
      </Dropdown>
    </div>
  )
}


/// trigegr children
const CustomSelectTrigger = memo((props) => {
  const filterState = useSelector(state => state.filterSelect)

  // console.log('CustomSelect组件',props.selectData);
  const { selectData, show , type, defaultValue} = props

  const showTitle = () => filterState[type].length === 0 ? defaultValue : filterState[type].join(',')


  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showTitle()}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})


function MultipleItem(props) {
  // console.log('MultipleItem组件');
  const { item, index, changeHandle, avatar } = props
  const [active, setActive] = useState(item.checked)
  useEffect(() => {
    setActive(item.checked)
  },[item.checked])

  const clickHandle = () => {
    changeHandle(item, index, !active)
    setActive(!active)
  }
  return (
    <div className="menu-item" onClick={clickHandle}>
      <div className={`item-left ${active ? 'active' : ''}`}>
        {
          avatar &&
          <img src={logo} className='w-24px h-[24px]' alt="" />
        }
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
