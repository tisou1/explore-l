

import React, { useState, useReducer } from 'react'
import { useEffect } from 'react'
import CategorySelect from './categorySelect'
import ProjectSelect from './projectSelect'
import StatusSelect from './statusSelect'


function initFn(initState) {
  return {
    ...initState,
  }
}
const initState = {
  categorySelect: [],//多选
  projectSelect: [],//多选
  propertiesSelect: [{}],//多层级多选
  statusSelect: [],//多选
  priceSelect: {
    token: '',
    min: '',
    max: '',
  }, //类型&区间
  transactionsNumSelect: {
    min: '',
    max: ''
  }, //区间(交易数)
  tradingSelect: {
    token: '',
    min: '',
    max: '',
  },//类型&区间 (交易量)
  timeSelect: '', //单选
  floorSelect: {
    token: '',
    min: '',
    max: '',
  },//类型&区间
  eventSelect: [],//多选
}

function FilterSelect(props) {
  const { onChange } = props
  const [count,setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, initState, initFn)

  function reducer(state, action) {
    switch (action.type) {
      // multiple
      case 'statusSelect':
      case 'projectSelect':
      case 'categorySelect':
        return {
         ...state,
         [action.type]: [...action.data]
        }
      case 'clearAll': 
        return {...initState}
      default:
        return state
    }
  }

  useEffect(() => {
    onChange(state)
  },[state])

  const changeHandle = () => {
    //触发事件,把状态抛出去
  }
  return (
    <div className='filter-select-main'>
      CategorySelect:
      <CategorySelect dispatch={dispatch} />
      ProjectSelect:
      <ProjectSelect dispatch={dispatch} />
      StatusSelect:
      <StatusSelect dispatch={dispatch}/>
      {/* <div onClick={() => setCount(count + 1)}>{count}</div> */}
    </div>
  )
}

export default FilterSelect