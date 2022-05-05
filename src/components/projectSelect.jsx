import CreateMultipleMenu from './app/createMultipleMenu'


export default function ProjectSelect(props) {
  const list = [
    { name: 'Bored Ape Yacht Club' },
    { name: 'Bored Ape Yacht Club' },
    { name: 'Bored Ape Yacht Club' },
    { name: 'Bored Ape Yacht Club' },
    { name: 'Bored Ape Yacht Club' }
  ]
  return (
    <CreateMultipleMenu {...props} list={list} search/>
  )
}

