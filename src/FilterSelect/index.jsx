

import React, { useState, useReducer } from 'react'
import { useEffect } from 'react'
import CategorySelect from './categorySelect'
import ProjectSelect from './projectSelect'
import StatusSelect from './statusSelect'
import EventSelect from './eventSelect'

import PriceSelect from './priceSelect'

import './index.scss'
import { useMemo } from 'react'


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

const MULTIPLESELECT = [
  'categorySelect',
  'projectSelect',
  'statusSelect',
  'eventSelect'
]

const SIGNALSELECT = ['timeSelect']

const INTERVALSELECT = [
  'priceSelect',
  'transactionsNumSelect',
  'tradingSelect',
  'floorSelect'
]

function FilterSelect(props) {
  const { onChange, selects } = props
  const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, initState, initFn)

  function reducer(state, action) {
    switch (action.type) {
      // multiple
      case 'eventSelect':
      case 'statusSelect':
      case 'projectSelect':
      case 'categorySelect':
        return {
          ...state,
          [action.type]: action.data
        }

      case 'priceSelect':
        return {
          ...state,
          [action.type]: action.data
        }
      case 'clearAll':
        return { ...initState }
      default:
        return state
    }
  }

  useEffect(() => {
    onChange(state)
    console.log(state);
  }, [state])

  const selectMapping = new Map([
    ['CategorySelect', <CategorySelect key='CategorySelect' dispatch={dispatch} />],
    ['ProjectSelect', <ProjectSelect key='ProjectSelect' dispatch={dispatch} />],
    ['StatusSelect', <StatusSelect key='StatusSelect' dispatch={dispatch} />],
    ['EventSelect', <EventSelect key='EventSelect' dispatch={dispatch} />],
    ['PriceSelect', <PriceSelect key='PriceSelect' dispatch={dispatch} />],
  ])

  let selectComponentList = selects.map((val) => {
    if (selectMapping.has(val))
      return selectMapping.get(val)
  })
  // const changeHandle = () => {
  //   //触发事件,把状态抛出去
  // }

  const showConditions = useMemo(() => {
    let list = []
    let conditions = Object.entries(state)
    conditions.forEach(([key, value]) => {
      //多选
      if (MULTIPLESELECT.includes(key) && Array.isArray(value)) {
        if (value.length > 0) {
          list.push(
            <div key={key}>
              <span>{value.join(',')}</span>
              <span className='picon p-icon-ShutDown'></span>
            </div>
          )
        }
      }

      //单选
      else if (SIGNALSELECT.includes(key)) {
        list.push(
          <div key={key}>{key}:{value}</div>
        )
      }
      //区间
      else if (INTERVALSELECT.includes(key)) {
        if(!value.min && !value.max) return
        let hasToken = !!value.token
        list.push(
          <div key={key}>
            {key}:{value.min} ~ {value.max}
          </div>
        )
      }

      //嵌套

    })
    console.log(list);
    return list
  }, [state])
  return (
    <div className='filter-select-main'>
      {
        selectComponentList.map((component) => (
          component
        ))
      }

      <div className='filter-select-show'>
        {showConditions}
      </div>
      {/* <div onClick={() => setCount(count + 1)}>{count}</div> */}
    </div>
  )
}

export default FilterSelect