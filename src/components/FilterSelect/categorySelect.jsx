import { useMemo } from 'react'
import CreateMultipleMenu from './app/createMultipleMenu'


export default function CategorySelect(props) {
  const list =  [
    { name: 'PFP' },
    { name: '艺术品' },
    { name: 'Game' },
    { name: 'Art' },
    { name: 'Music' }
  ]
  return (
    <CreateMultipleMenu {...props} title="类别" search type="categorySelect" list={list}/>
  )
}
