import types from '../types'

const DEFAULT_TOKEN = 'usd'

const initState = {
  categorySelect: [],//多选
  projectSelect: [],//多选
  propertiesSelect: [],//多层级多选
  statusSelect: [],//多选
  priceSelect: {
    token: DEFAULT_TOKEN,
    min: '',
    max: '',
  }, //类型&区间
  transactionsNumSelect: {
    min: '',
    max: ''
  }, //区间(交易数)
  tradingSelect: {
    token: DEFAULT_TOKEN,
    min: '',
    max: '',
  },//类型&区间 (交易量)
  timeSelect: '7', //单选
  floorSelect: {
    token: DEFAULT_TOKEN,
    min: '',
    max: '',
  },//类型&区间
  eventSelect: [],//多选
  search: '',//搜索框
}


const filterSelect = (state = initState, action) => {
  // switch (action.type) {
  //     case types.FILTER_SELECT:
  //         return {
  //             ...state,
  //             ...action.info
  //         }
  //     default:
  //         return state
  // }

  if (action.type === types.FILTER_SELECT) {
    let { subType = false } = action.info
    if(subType) {//这里需要清除东西
      //all
      if(subType === 'clearAll') {
        return {
          ...initState
        }
      }
      //signal
      return {
        ...state,
        [subType]: initState[subType]
      }
    }
    return {
      ...state,
      ...action.info
    }
  } else {
    return state
  }
};

export default filterSelect;
