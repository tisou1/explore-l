import React, { useReducer, useState } from 'react'
import './Filtering.scss'
import 'antd/dist/antd.css'
import { Input, Select } from 'antd'
const { Option } = Select

// interface ItemType {
//   title: string
//   label: string
//   index: number
//   options: string[]
//   modal?: any
// }

// interface FilteringType {
//   selectList: ItemType[]
//   selectChange: (values: any[]) => void
// }

function initFn(initState) {
  return {
    ...initState,
  }
}

function Filtering(props) {
  const { selectList, selectChange } = props

  // const [selecteds, setSelecteds] = useState(() => Array.from({ length: selectList.length }, () => ''))

  const [state, dispatch] = useReducer(reducer, { select: [], search: '' }, initFn)

  function reducer() {
    
  }

  const changeValue = (item, value, Option) => {
    const tempList = [...selecteds]
    tempList.splice(item.index, 1, value)
    setSelecteds(tempList)
    selectChange(tempList)
  }

  return (
    <section className="filtering">
      <div className="f-select">
        {
          selectList.map((selectItem, idx) => (
            <div className="select-item" key={idx}>
              <div className="item-title">
                <div>{selectItem.title}</div>
                {
                  selectItem.modal
                  && <div className="title-modal" onClick={selectItem.modal?.onClick}>{selectItem.modal?.title}</div>
                }
              </div>
              <Select defaultValue={selectList[idx].options[0]} onChange={(value, option) => changeValue(selectList[idx], value, option)} >
                {
                  selectItem.options.map((val, idx) => (
                    <Option value={val} key={idx}>{val}</Option>
                  ))
                }
              </Select>
            </div>
          ))
        }
      </div>

      <InputSearch />

    </section>
  )
}

export default Filtering

function InputSearch(props) {
  return (
    <div>
      <Input placeholder="搜索栏(项目/ID/持有人)" />
    </div>
  )
}
