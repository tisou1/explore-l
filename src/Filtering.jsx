import React, {memo, useReducer, useState, useCallback } from 'react'
import './Filtering.scss'
import 'antd/dist/antd.css'
import { useLatest } from './useLatest'
import { Input, Select } from 'antd'
import { useEffect } from 'react'
const { Option } = Select

const list = [
  {
    title: '类别',
    label: 'n1',
    index: 0,
    defaultValue: '未选择',
    options: [1, 2, 3],
  },
  {
    title: '项目',
    label: 'n2',
    index: 1,
    defaultValue: '未选择',
    options: [4, 5, 6],
    modal: {
      title: '选择属性',
      onClick: () => console.log('打开modal'),
    },
  },
  {
    title: '增加',
    label: 'n3',
    index: 2,
    defaultValue: '未选择',
    options: [7, 8, 9],
  },
  {
    title: '24H成交量',
    label: 'n4',
    index: 3,
    defaultValue: '未选择',
    options: [100000, 200000, 300000, 500000],
  },
]

const changeValue = (values) => {
  console.log('状态值:', values)
}

function initFn(initState) {
  return {
    ...initState,
  }
}

function Filtering(props) {
  const [count, setCount] = useState(0);
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
        case 'clearAll':
          return { select: state.select.map(val => ''), search: '',}
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
    // onChange(state)
  }

  const searchChange =(e) => {
   dispatch({type:'search', data: e.target?.value})
  }

  return (
    <section className="filtering">
      <div className='p-2 bg-gray-300/70' onClick={() => setCount(count + 1)}>{count}</div>
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

      <InputSearch value={state.search} searchChange={searchChange} />
      
      <ConditionBar list={state} dispatch={dispatch} selectList={selectList}/>
    </section>
  )
}

export default Filtering

function InputSearch(props) {
  const { searchChange, value } = props

  return (
    <div>
      <Input placeholder="搜索栏(项目/ID/持有人)" value={value} onChange={searchChange}/>
    </div>
  )
}


const ConditionBar =  memo((props) => {
  const { list, dispatch, selectList } = props
  console.log('condition',selectList);
  const clearClick = (index) => {
    const tempList = [... list.select]
    //其实我们可以拿到他的默认值放进去,而不房一个空字符串
    tempList.splice(index, 1, '')
    dispatch({ type: 'select', data: tempList })
  }

  const showClearAll = () => {
    return list.select.every(val => val !== '') && list.search !== ''
  }
console.log(showClearAll());
  return (
    <div className='condition-bar'>
     {
       list.select.map((val,idx) => (
        val !== '' && val !== selectList[idx].defaultValue &&
         <div key={idx} className="condition">
            <div>图像</div>
            <div className="condition-name">{val}</div>
            <div className='clear-condition' onClick={() => clearClick(idx)}>×</div>
         </div>
        ))
     }
     {
       list.search && list.search !== '' &&
         <div className='condition'>
           <div className="condition-name">{list.search}</div>
           <div className='clear-condition' onClick={() => dispatch({type: 'search', data: ''})}>×</div>
         </div>
     }
     {
      showClearAll() &&
       <div onClick={() => dispatch({type: 'clearAll'})} className="clear-all">Clear All</div>
     }
    </div>
  )
})

