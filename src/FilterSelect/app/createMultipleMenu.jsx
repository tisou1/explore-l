import { useState, useMemo, memo } from 'react'
import { Dropdown } from 'antd'
// import CustomSelectTrigger from './customSelectTrigger'
// import MultipleItem from './multipleItem'
import './createMultipleMenu.scss'
import logo from '../../logo.svg'



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
    data: list.map(_ => '')
  })
  const [filterText, setFilterText] = useState('')


  const filterList = useMemo(() => {
    let templist = []
    list.forEach((item) => {
      if (!item.name.includes(filterText)) {
        return
      }

      templist.push(item)
    });
    return templist
  }, [filterText])
  //过滤数据


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

  const clickHandle = () => {
    let tempselectData = selectData.data.filter(val => val !== '').join(',')
    dispatch({ type: type, data: selectData.data.filter(val => val !== '') })
    // console.log('当前组件的选中值:',tempselectData);

    //close
    setVisible(false)
  }

  const filterChange = (e) => {
    const { value } = e.target
    console.log(value);
    setFilterText(value)
  }
  const menu = useMemo(() => (
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
            <MultipleItem key={idx} item={val} index={idx} avatar={avatar} changeHandle={changeHandle} />
          ))
        }
      </div>
      <div className='submit-btn'>
        <button onClick={clickHandle}>确定</button>
      </div>
    </div>
  ), [selectData, filterText])
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

  const showWhichOrigin = useMemo(() => {
    let flag = selectData.data.some(val => val !== '')
    if (flag) {
      return selectData.data.filter(val => val !== '').join(',')
    } else {
      return selectData.defaultValue
    }
  }, [selectData.data])

  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showWhichOrigin}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})


function MultipleItem(props) {
  // console.log('MultipleItem组件');
  const { item, index, changeHandle, avatar } = props
  const [active, setActive] = useState(false)
  const clickHandle = () => {
    changeHandle(item.name, index, !active)
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
