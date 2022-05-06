import CreateSignal from "./app/createSignal";


const list = [
  { name: '24H', token: 'p-icon-USD' },
  { name: '7D', token: 'p-icon-BNB' },
  { name: '30D', token: 'p-icon-Polygon' },
  { name: '90D', token: 'p-icon-ETH' },
  { name: '1D', token: 'p-icon-ETH' },
  { name: 'MAX', token: 'p-icon-ETH' }
]


export default function TimeSelect(props) {
  return (
    <CreateSignal {...props} list={list} defaultValue="7D" title="时间" type="timeSelect"/>
  )
}
