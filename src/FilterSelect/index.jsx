

import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { dispatchFilter } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'

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
  const dispatch = useDispatch()
  const { onChange, selects } = props
  const [show, setShow] = useState(true)
  const [mbShow, setmbShow] = useState(false)


  useEffect(() => {
    onChange(filterState)
  })


  const selectMapping = useMemo(() => (
    new Map([
      ['CategorySelect', <CategorySelect key='CategorySelect' />],
      ['ProjectSelect', <ProjectSelect key='ProjectSelect' />],
      ['StatusSelect', <StatusSelect key='StatusSelect' />],
      ['EventSelect', <EventSelect key='EventSelect' />],

      ['PriceSelect', <PriceSelect key='PriceSelect' />],
      ['TransactionsNumSelect', <TransactionsNumSelect key='TransactionsNumSelect' />],
      ['FloorSelect', <FloorSelect key='FloorSelect' />],
      ['TradingSelect', <TradingSelect key='TradingSelect' />],

      ['TimeSelect', <TimeSelect key='TimeSelect' />],

      ['PropertiesSelect', <PropertiesSelect key='PropertiesSelect' />]
    ])
  ), [])

  let selectComponentList = selects.map((val) => {
    if (selectMapping.has(val))
      return selectMapping.get(val)
  })

  const searchChange = useDebounce((e) => {
    dispatchFilter({ 'search': e.target.value })(dispatch)
  }, 600)

  //   const searchChange = (e) => {
  //     // console.log(e.target.value)
  //     dispatchFilter({ 'search': e.target.value })(dispatch)
  // }

  const showSelects = () => {
    setShow(!show)
  }

  return (
    <div className='filter-select-main'>
      <div className='select-container'>
        <div className='filter-select-header'>
          <div className='header-left'>Sift</div>
          <div className='header-right' onClick={showSelects}>
            <span className='num'>{selectComponentList.length}</span>
            <span className='picon p-icon-Sift'></span>
          </div>
        </div>
        <div className={`filter-select-list ${show ? '' : 'hidden'}`} >
          {
            selectComponentList.map((component) => (
              component
            ))
          }
        </div>
      </div>

      {/* mb */}
      <div className='select-container-mb'>
        <div className='filter-select-header'>
          <div className='header-left'>Sift</div>
          <div className='header-right' onClick={() => setmbShow(!mbShow)}>
            <span className='num'>{selectComponentList.length}</span>
            <span className='picon p-icon-Sift'></span>
          </div>
        </div>
        <Modal visible={mbShow} onCancel={() => setmbShow(false)}>
          <div className={`filter-select-list-mb ${show ? '' : 'hidden'}`} >
            {
              selectComponentList.map((component) => (
                component
              ))
            }
          </div>
        </Modal>
      </div>


      <div className='search-input'>
        <span className='picon p-icon-Searchn'></span>
        <input type='text' placeholder='搜索栏 (項目/ 地址)' onChange={searchChange} />
      </div>

    </div>
  )
}


export default FilterSelect


//防抖
function useDebounce(fn, delay = 1000, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function (...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}
