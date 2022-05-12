

import React, { useState,  useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchFilter } from '@/store'
import './index.scss'

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

const MULTIPLESELECTPRO = [
  'propertiesSelect'
]

export default function ShowFilterConditions(props) {
  const dispatch = useDispatch()
  const state = useSelector(state => state.filterSelect)

  const clearAll = () => {
      //TODO
      dispatchFilter({ subType: 'clearAll' })(dispatch)
  }


  const showConditions = (() => {
    let list = []
    let conditions = Object.entries(state)
    conditions.forEach(([key, value]) => {
      //多选
      if (MULTIPLESELECT.includes(key) && Array.isArray(value)) {
        if (value.length > 0) {
          list.push(
           <ShowConditionsItem key={key} type={key} value={value.join(',')}/>
          )
        }
      }

      //单选
      else if (SIGNALSELECT.includes(key) && value !== '') {
        list.push(
          <ShowConditionsItem key={key} type={key} value={value}/>
        )
      }
      //区间
      else if (INTERVALSELECT.includes(key)) {
        if (!value.min && !value.max) return
        let hasToken = !!value.token
        list.push(
          <ShowConditionsItem key={key} type={key} icon={hasToken} value={`${value.min} ~ ${value.max}`}/>
        )
      }
      //嵌套
      else if (MULTIPLESELECTPRO.includes(key)) {
        if(value.length > 0) {
          let _value = value.map(val => Object.values(val)[0]).flat(1).join(',')

          list.push(
          <ShowConditionsItem key={key} type={key}  value={_value} />
          )
        }
      }
    })
    console.log(list);
    return list
  })()
  
  return (
      <div className='filter-select-show'>
        {showConditions}
        {
          showConditions.length > 0 && 
          <div className='clearAll' onClick={clearAll}>
            ClearAll
          </div>
        }
      </div>
  )
}

function ShowConditionsItem(props) {
  const dispatch = useDispatch()
  const { icon, value, type } = props
  const clickHandler = () => {
    //TODO
    dispatchFilter({ subType :type })(dispatch)
  }
  return (
    <div className="condition-display">
      <div className='condition-left'>
        <div className='token-name'>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#p-icon-Userx"></use>
          </svg>
        </div>
        <span>{value}</span>
      </div>
      <span className='condition-right picon p-icon-ShutDown' onClick={clickHandler}></span>
    </div>
  )
}
