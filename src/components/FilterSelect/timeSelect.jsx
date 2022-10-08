import CreateSignal from "./app/createSignal";


const list = [
  { name: '24H', value: '1' },
  { name: '7D', value: '7' },
  { name: '30D', value: '30' },
  { name: '90D', value: '90' },
  { name: 'MAX', value: 'all' }
]


export default function TimeSelect(props) {
  return (
    <CreateSignal {...props} list={list} defaultValue="7D" title="时间" type="timeSelect" />
  )
}
