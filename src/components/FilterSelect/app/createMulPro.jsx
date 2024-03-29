import { useState, useMemo, memo, useEffect, useLayoutEffect, useRef } from 'react'
import { dispatchFilter } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Menu } from 'antd'
// import './createMultipleMenu.scss'
import logo from '../logo.svg'
import './createMulPro.scss'
import { useCallback } from 'react'



export default function CreateMulPro(props) {
  const dispatch = useDispatch()
  const filterState = useSelector(state => state.filterSelect)

  const {
    // dispatch,
    search = false,
    avatar = true,
    // list,
    type,
    title,
    defaultValue = 'all',
  } = props

  const list = [
    {
      name: 'Trait Count',
      key: 'Trait Count',
      items: [
        { name: '4', key: '4', count: 100 },
        { name: '5', key: '5', count: 400 },
        { name: '6', key: '6', count: 200 },
      ]
    },
    {
      name: 'Background',
      key: 'Background',
      items: [
        { name: 'yellow', key: 'yellow', count: 100 },
        { name: 'black', key: 'black', count: 400 },
        { name: 'orange', key: 'orange', count: 200 },
      ]
    },

  ]



  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({
    defaultValue: 'all',
    data: list.map(val => ({
      ...val,
      items: val.items?.map(v => ({ ...v, checked: false, show: true }))
    }))
  })

  useEffect(() => {
    // console.log(filterState[type],type)
    if (filterState[type].length === 0) {
      setSelectData({
        ...selectData,
        data: list.map(val => ({
          ...val,
          items: val.items?.map(v => ({ ...v, checked: false, show: true }))
        }))
      })
    } 
    // else if (filterState[type].length > 0) {
     
    //   setSelectData({
    //     ...selectData,
    //     data: list.map(val => ({
    //       ...val,
    //       items: val.items?.map(v => ({ ...v, checked:  filterState[type][val.key]?.length > 0 ? true : false, show: true }))
    //     }))
    //   })
    // }
  }, [filterState])



  const changeHandle = (subIndex, subType, item, index, checked) => {
    const list = selectData.data
    // console.log('父组件changeHandle', subType, value, index, checked);

    // let subIndex = list.findIndex(val => Object.keys(val)[0] === subType )
    let replaceValue = {
      ...list[subIndex],
      items: list[subIndex].items?.map((val, i) => {
        if (i === index) {
          return { ...val, checked }
        }
        else
          return val
      })
    }

    list[subIndex] = replaceValue
    let tempselectData = {
      ...selectData,
      data: list
    }
    setSelectData(tempselectData)
  }

  const clickHandle = () => {
    let tempselectData = selectData.data?.map(val => ({
      [val.key]: val.items.filter(v => v.checked).map(v => v.name)
    }))

    // console.log(tempselectData, type);
    // dispatch({ type: type, data: tempselectData })
    // console.log('当前组件的选中值:',tempselectData);

    dispatchFilter({ [type]: tempselectData })(dispatch)

    //close
    setVisible(false)
  }

  const menu = useMemo(() => (
    <div className='custom-select-menu mul-pro'>
      <div className='multipleMenu'>
        {/* 循环创建Submenu */}
        {
          selectData.data?.map((item, index) => (
            <MultipleSubmenu key={item.key} subType={item.key} subIndex={index} list={item.items} title={item.name} onChange={changeHandle} />
          ))
        }
      </div>
      {/* <MultipleMenu /> */}
      <div className='submit-btn'>
        <button onClick={clickHandle}>确定</button>
      </div>
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
          <CustomSelectTrigger selectData={selectData} show={visible} type={type} defaultValue={defaultValue} />
        </div>
      </Dropdown>
    </div>
  )
}
/// trigegr children
const CustomSelectTrigger = memo((props) => {
  // console.log('CustomSelect组件',props.selectData);
  const filterState = useSelector(state => state.filterSelect)
  const { selectData, show, type, defaultValue } = props

  // const showWhichOrigin = useMemo(() => {
  //   let showWhich = []

  //   selectData.data.forEach(val => {
  //    val.items.forEach(v => {
  //      if(v.checked)
  //       showWhich.push(v.name)
  //    })
  //   })


  //   if(showWhich.length === 0) 
  //       return selectData.defaultValue
  //   else 
  //   return showWhich.join(',')
  // })

  const showWhichOrigin = () => {
    return filterState[type].length === 0 ? defaultValue : filterState[type].map(val => Object.values(val)[0]).join(',')
  }


  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showWhichOrigin()}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})


function MultipleSubmenu(props) {
  const { list, title, ...reset } = props
  const ulRef = useRef(null)
  const [show, setShow] = useState(false)
  const [filterText, setFilterText] = useState('')
  const filterList = (() => {
    let templist = []
    list.forEach((item) => {
      if (!item.name.includes(filterText)) {
        return
      }
      templist.push(item)
    });
    return templist
  })()


  const filterChange = (e) => {
    const { value } = e.target
    setFilterText(value)
  }


  return (

    <div className='MultipleSubmenu cus-select'>
      <div onClick={() => { setShow(!show) }} className="trigger">
        <div className='title'>{title}</div>
        <div className='picon p-icon-DropDownx2'></div>
      </div>
      <div className={`list-content ${show ? 'open' : ''}`} ref={ulRef} >
        <div className='submenu-content'>
          {
            true &&
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
                <MultipleItem key={idx} item={val} index={idx} {...reset} />
              ))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

const MultipleItem = memo((props) => {
  // console.log('MultipleItem组件', props);
  const { item, index, avatar, onChange: changeHandle, subIndex, subType } = props
  const [active, setActive] = useState(item.checked)
  useEffect(() => {
    setActive(item.checked)
  },[item.checked])

  const clickHandle = () => {
    changeHandle(subIndex, subType, item, index, !active)
    setActive(!active)
  }
  return (
    <div className="menu-item" onClick={clickHandle}>
      <div className={`item-left ${active ? 'active' : ''}`}>
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
        {/* {
          avatar &&
          <img src={logo} className='w-24px h-[24px]' alt="" />
        } */}
        <div className='left-value'>{item.name}</div>
      </div>

      <div className='item-righ'>{item.count}</div>

    </div>
  )
})
