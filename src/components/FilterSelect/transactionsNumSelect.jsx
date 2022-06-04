import CreateInterval from './app/createInterval'


export default function TransactionsNumSelect(props) {
  const list = [
    { name: '转账' },
    { name: '交易' },
  ]
  return (
    <CreateInterval {...props} title="24小时交易数" icon={false}  type="transactionsNumSelect" />
  )
}

