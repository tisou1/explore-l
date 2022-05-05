

import React, { useState, useReducer } from 'react'
import CetagorySelect from './categorySelect'



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
  const [state, dispatch] = useReducer(reducer, initState, initFn)

  function reducer(state, action) {
    switch (action.type) {
      case 'categorySelect':
        return {
          ...state,
          select: action.data,
        }
      case 'clearAll':
        return {}
      default:
        return state
    }
  }

  const changeHandle = () => {
    //触发事件,把状态抛出去
  }
  return (
    <div className='filter-select-main'>
      <CetagorySelect />
    </div>
  )
}

export default FilterSelect