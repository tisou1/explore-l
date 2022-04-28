import React, { useReducer, useState, useCallback } from 'react'
import './Filtering.scss'
import 'antd/dist/antd.css'
import { useLatest } from './useLatest'
import { Input, Select } from 'antd'
import { useEffect } from 'react'
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
//   onChange: (values: any[]) => void
// }

function initFn(initState) {
  return {
    ...initState,
  }
}

function Filtering(props) {
  const { selectList, onChange } = props
  const [state, dispatch] = useReducer(
    reducer,
    { select: selectList.map(val => val.defaultValue), search: '' },
     initFn
  )

  const ref = useLatest({ select: selectList.map(val => val.defaultValue), search: '' })
  function reducer(state, action) {
      switch(action.type) {
        case 'select':
          return {
            ...state,
            select: action.data,
          }
        case 'search':
          return {
            ...state,
            search: action.data,
          }
        default:
          return state
    }
  }


  useEffect(() => {
    onChange(state)
  },[state])

  const selectChange = (item, value, Option) => {
    const tempList = [... state.select]
    tempList.splice(item.index, 1, value)
    dispatch({ type: 'select', data: tempList })
    onChange(state)
  }

  const searchChange = (e) => {
   dispatch({type:'search', data: e.target?.value})
   onChange(state)
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
              <Select defaultValue={selectList[idx].defaultValue} onChange={(value, option) => selectChange(selectList[idx], value, option)} >
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

      <InputSearch searchChange={searchChange}/>
      
      <Show list={state}/>
    </section>
  )
}

export default Filtering

function InputSearch(props) {
  const { searchChange } = props
  return (
    <div>
      <Input placeholder="搜索栏(项目/ID/持有人)" onChange={searchChange}/>
    </div>
  )
}


function Show(props) {
  const { list } = props
  console.log(list)
  return (
    <div>
     {list.search}asda
     {
       list.select.map((val,idx) => (
         <div key={idx}>{val}</div>
        ))
     }
    </div>
  )
}

