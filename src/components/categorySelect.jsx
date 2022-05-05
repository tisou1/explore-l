import { useState, useMemo, memo } from 'react'
import { Dropdown } from 'antd'
import CustomSelectTrigger from './app/customSelectTrigger'
import MultipleItem from './app/multipleItem'
import './wrapComponent.scss'
import logo from '../logo.svg'


function CetagorySelect() {
  const list = [
    {name:'时间'},
    {name:'空间'},
    {name:'质量'},
  ]
  const [visible, setVisible] = useState(false)
  const [selectData, setSelectData] = useState({
    defaultValue: 'all',
    data: list.map(_ => '')
  })
  const [filterText, setFilterText] = useState('')

  
  const filterList = useMemo(() => {
    let templist = []
    list.forEach((item) => {
      if(!item.name.includes(filterText)){
       return
      }

      templist.push(item)
    });
    return templist
  },[filterText])
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
    console.log('当前组件的选中值:',tempselectData);
  }

  const filterChange = (e) => {
    const { value } = e.target
    console.log(value);
    setFilterText(value)
  }
  const menu = useMemo(() => (
    <div className='custom-select-menu'>
      <div className='search-input'>
        <input 
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={filterChange}/>
      </div>
      <div className='menu-list'>
        {
          filterList.map((val, idx) => (
            <MultipleItem key={idx} item={val} index={idx} changeHandle={changeHandle} />
          ))
        }
      </div>
      <div className='submit-btn'>
        <button onClick={clickHandle}>确定</button>
      </div>
    </div>
  ), [selectData,filterText])
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
          <CustomSelectTrigger selectData={selectData} show={visible} />
        </div>
      </Dropdown>
    </div>
  )
}





export default CetagorySelect