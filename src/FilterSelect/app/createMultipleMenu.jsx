import { useState, useMemo, memo } from 'react'
import { Dropdown } from 'antd'
// import CustomSelectTrigger from './customSelectTrigger'
// import MultipleItem from './multipleItem'
import './createMultipleMenu.scss'
import logo from '../logo.svg'



export default function CreateMultipleMenu(props) {
  const { 
    dispatch, 
    search=false, 
    avatar=true,
    list, 
    type,
    title
  } = props

  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({
    defaultValue: 'all',
    data: list.map(val => ({...val, checked: false, show: true}))
  })
  const [filterText, setFilterText] = useState('')


  const filterList = useMemo(() => {
    let templist = []
    selectData.data?.forEach((item) => {
      if (!item.name.includes(filterText)) {
        templist.push({...item, show: false})
        return
      }
      templist.push({...item, show: true})
    });
    return templist
  }, [filterText])
  //过滤数据

  console.log(filterList)

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
    setSelectData(tempselectData)
  }

  const clickHandle = () => {
    let tempselectData = selectData.data.filter(val => val.checked).map(val => val.name)
    dispatch({ type: type, data: tempselectData })

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
        <div className='dropdown-title mb-3'>{title}</div>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        visible={visible}
        onVisibleChange={(v) => {
          setVisible(v)
        }}>
        <div>
          <CustomSelectTrigger selectData={selectData} show={visible} />
        </div>
      </Dropdown>
    </div>
  )
}


/// trigegr children
const CustomSelectTrigger = memo((props) => {
  // console.log('CustomSelect组件',props.selectData);
  const { selectData, show } = props

  const showWhichOrigin = () => {

    let list = selectData.data.filter(val => val.checked)
                .map(val => val.name)
    if(list.length === 0) 
      return selectData.defaultValue
    else 
      return list.join(',')
  }

  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showWhichOrigin()}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})


function MultipleItem(props) {
  // console.log('MultipleItem组件');
  const { item, index, changeHandle, avatar } = props
  const [active, setActive] = useState(item.checked)
  // console.log(active);
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
