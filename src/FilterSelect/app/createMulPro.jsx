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
    // list,
    type,
    title
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
      [val.key]: val.items.map(_ => ''),
    }))
  })



  // [v.key]: v.items.map((val, i) => {
  //   if (i === index) {
  //     if (checked)
  //       return value
  //     else
  //       return ''
  //   }
  //   else
  //     return val
  // })

  const changeHandle = (subType, value, index, checked) => {
    const list = selectData.data
    // console.log('父组件changeHandle', subType, value, index, checked);

    let parentIndex = list.findIndex(val => Object.keys(val)[0] === subType )
    let replaceValue = {
      [subType]: list[parentIndex][subType].map((val, i) => {
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

    list[parentIndex] = replaceValue
    let tempselectData = {
      ...selectData,
      data: list
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

  const menu = useMemo(() => (
    <div className='custom-select-menu mul-pro'>
      <div className='multipleMenu'>
        {/* 循环创建Submenu */}
        {
          list.map((item, index) => (
            <MultipleSubmenu key={item.key} subType={item.key} list={item.items} title={item.name} onChange={changeHandle} />
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
    let showWhich = []
    let flag = false

    selectData.data.forEach(v => {
      //这个对象中只有一个key,一个value
      v[Object.keys(v)[0]].forEach(val => {
        if (val !== '') {
          showWhich.push(val)
          flag = true
        }
      })
    })

    if (flag) {
      return showWhich.join(',')
    } else {
      return selectData.defaultValue
    }
  })


  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showWhichOrigin}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})


function MultipleSubmenu(props) {
  const { list, title, subType, onChange } = props
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

  const changeHandle = useCallback((type, value, index, checked) => {
    console.log('changeHandle', type, value, index, checked);

    // let tempselectData = {
    //   ...selectData,
    //   data: selectData.data.map((val, i) => {
    //     if (i === index) {
    //       if (checked)
    //         return value
    //       else
    //         return ''
    //     }
    //     else
    //       return val
    //   })
    // }
    // setSelectData(tempselectData)
  }, [])

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
                <MultipleItem key={idx} item={val} type={subType} index={idx} changeHandle={onChange} />
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
  const { item, index, changeHandle, avatar, type } = props
  const [active, setActive] = useState(false)
  const clickHandle = () => {
    changeHandle(type, item.name, index, !active)
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
