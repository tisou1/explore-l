

import React, { useMemo,useEffect, useState, useReducer } from 'react'
import { useSelector} from 'react-redux'

import CategorySelect from './categorySelect'
import ProjectSelect from './projectSelect'
import StatusSelect from './statusSelect'
import EventSelect from './eventSelect'

import PriceSelect from './priceSelect'
import TransactionsNumSelect from './transactionsNumSelect'
import TradingSelect from './tradingSelect'
import FloorSelect from './floorSelect'

import TimeSelect from './timeSelect'

import PropertiesSelect from './propertiesSelect'

import './index.scss'



function FilterSelect(props) {
  const filterState = useSelector(state => state.filterSelect)
  const { onChange, selects } = props

  useEffect(() => {
    onChange(filterState)
  })

  const selectMapping = useMemo(() => (
    new Map([
      ['CategorySelect', <CategorySelect key='CategorySelect'  />],
      ['ProjectSelect', <ProjectSelect key='ProjectSelect'  />],
      ['StatusSelect', <StatusSelect key='StatusSelect'  />],
      ['EventSelect', <EventSelect key='EventSelect'  />],
  
      ['PriceSelect', <PriceSelect key='PriceSelect'  />],
      ['TransactionsNumSelect', <TransactionsNumSelect key='TransactionsNumSelect'  />],
      ['FloorSelect', <FloorSelect key='FloorSelect'  />],
      ['TradingSelect', <TradingSelect key='TradingSelect'  />],
  
      ['TimeSelect', <TimeSelect key='TimeSelect' />],
  
      ['PropertiesSelect', <PropertiesSelect key='PropertiesSelect' />]
    ])
  ),[])

  let selectComponentList = selects.map((val) => {
    if (selectMapping.has(val))
      return selectMapping.get(val)
  })

  const searchChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className='filter-select-main'>
      <div className='filter-select-list'>
        {
          selectComponentList.map((component) => (
            component
          ))
        }
      </div>
      <div className='search-input'>
        <span className='picon p-icon-Searchn'></span>
        <input type='text' placeholder='搜索栏 (項目/ 地址)' onChange={searchChange}/>
      </div>
    </div>
  )
}


export default FilterSelect