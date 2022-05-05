import { memo, useMemo } from 'react'

/// trigegr children
const CustomSelectTrigger = memo((props) => {
  // console.log('CustomSelect组件',props.selectData);
  const { selectData, show } = props

  const showWhichOrigin = useMemo(() => {
    let flag = selectData.data.some(val => val !== '')
    if (flag) {
      return selectData.data.filter(val => val !== '').join(',')
    } else {
      return selectData.defaultValue
    }
  }, [selectData.data])

  return (
    <div className='custom-select-mul'>
      <div className='select-value'>{showWhichOrigin}</div>
      <div className={`picon p-icon-DropDownx1 ${show ? 'rotate' : ''}`}></div>
    </div>
  )
})

export default CustomSelectTrigger