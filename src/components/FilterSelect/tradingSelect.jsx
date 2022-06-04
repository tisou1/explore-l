import CreateInterval from './app/createInterval'


export default function TradingSelect(props) {

  return (
    <CreateInterval {...props} title="24小时交易量" type="tradingSelect" />
  )
}

