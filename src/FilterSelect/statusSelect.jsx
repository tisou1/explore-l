import CreateMultipleMenu from './app/createMultipleMenu'


export default function StatusSelect(props) {
  const list = [
    { name: '直接购买' },
    { name: '有报价' },
  ]
  return (
    <CreateMultipleMenu {...props} list={list} title="statusSelect" type="statusSelect" avatar={false}/>
  )
}
