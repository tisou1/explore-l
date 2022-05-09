import types from '../types'

const initState = {
    categorySelect: [],//多选
    projectSelect: [],//多选
    propertiesSelect: [],//多层级多选
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


const filterSelect = (state = initState, action) => {
  console.log('filterSelect reducer',action)
    switch (action.type) {
        case types.FILTER_SELECT:
            return {
                ...state,
                ...action.info
            }
        default:
            return state
    }
};

export default filterSelect;
