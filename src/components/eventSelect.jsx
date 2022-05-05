import CreateMultipleMenu from './app/createMultipleMenu'


export default function EventSelect(props) {
  const list = [
    { name: '转账' },
    { name: '交易' },
  ]
  return (
    <CreateMultipleMenu {...props} list={list} type="eventSelect" avatar={false}/>
  )
}

