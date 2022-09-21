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
  timeSelect: '', //单选
  floorSelect: {
    token: DEFAULT_TOKEN,
    min: '',
    max: '',
  },//类型&区间
  eventSelect: [],//多选
  search: '',//搜索框
}


const filterSelect = (state = initState, action) => {
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
      ...action.info //add data
    }
  } else {
    return state
  }
};


const dispatcCount = (state = 0, action) => {
  switch(action.type) {
    case 'counter': 
      return  state += 1
    default:
       return state
  }
  
};

export  {
  filterSelect,
  dispatcCount
}
