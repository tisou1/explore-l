import { useState, useMemo, memo, useEffect, useLayoutEffect, useRef } from 'react'
import { Dropdown, Menu } from 'antd'
// import './createMultipleMenu.scss'
import logo from '../../logo.svg'
import './createMulPro.scss'
import usePrevious from '../../hooks/usePrevious'
import { useCallback } from 'react'



export default function CreateMulPro(props) {
  const {
    dispatch,
    search = false,
    avatar = true,
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
    <div className='custom-select-menu mul-pro'>
      <MultipleMenu />
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


      {/* <CustomMenu/> */}

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


//

function MultipleMenu(props) {
  const list = [
    { 
      name: 'Trait Count',
      key: 'Trait Count',
      items: [
        {name: '4', key: '4', count: 100},
        {name: '5', key: '5', count: 400},
        {name: '6', key: '6', count: 200},
      ]
    },
    { 
      name: 'Background',
      key: 'Background',
      items: [
        {name: 'yellow', key: 'yellow', count: 100},
        {name: 'black', key: 'black', count: 400},
        {name: 'orange', key: 'orange', count: 200},
      ]
    },

  ]

  const onClick = (e) => {
    console.log('click', e);
  }
  return (
    <div className='multipleMenu'>
      {/* 循环创建Submenu */}
      {
        list.map((item, index) => (
          <MultipleSubmenu key={item.key} list={item.items} title={item.name}/>
        ))
      }
    </div>
  )
}

function MultipleSubmenu(props) {
  const { list, title } = props
  const ulRef = useRef(null)
  const [show, setShow] = useState(false)
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

  const filterChange = (e) => {
    const { value } = e.target
    setFilterText(value)
  }

  const changeHandle = useCallback((value, index, checked) => {
    console.log('changeHandle');
  },[])

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
                <MultipleItem key={idx} item={val} index={idx} changeHandle={changeHandle} />
              ))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

const MultipleItem = memo((props) => {
  console.log('MultipleItem组件',props);
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

      <div className='item-righ'>{22222}</div>

    </div>
  )
})
