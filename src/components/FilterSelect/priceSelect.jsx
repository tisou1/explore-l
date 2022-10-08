import CreateInterval from './app/createInterval'


export default function PriceSelect(props) {
  const list = [
    { name: '转账' },
    { name: '交易' },
  ]
  return (
    <CreateInterval {...props} title="区间价格"  type="priceSelect" />
  )
}

