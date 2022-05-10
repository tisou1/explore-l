import { useRef } from 'react'
import CreateMulPro from "./app/createMulPro";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchFilter } from '~/store'


const list = [
  { name: '24H', token: 'p-icon-USD' },
  { name: '7D', token: 'p-icon-BNB' },
  { name: '30D', token: 'p-icon-Polygon' },
  { name: '90D', token: 'p-icon-ETH' },
  { name: '1D', token: 'p-icon-ETH' },
  { name: 'MAX', token: 'p-icon-ETH' }
]


export default function PropertiesSelect(props) {
  const filterState = useSelector(state => state.filterSelect)
  const dispatch = useDispatch()
  const { projectSelect, propertiesSelect } = filterState

  const showComponent = useRef(true)

  if(projectSelect.length === 1) {
    showComponent.current = false
    if(propertiesSelect.length > 0)
      dispatchFilter({ subType: 'propertiesSelect'})(dispatch)
  } else {
    showComponent.current = true
  }

  return (
      showComponent.current ?
      <CreateMulPro {...props} list={list} defaultValue="all" title="属性" type="propertiesSelect"/>
      : null
  )
}
