import React from 'react'
import FilterSelect from './FilterSelect'
import ShowFilterConditions from './ShowFilterConditions'
import 'antd/dist/antd.css'
function App() {
  
  const changeHandle = (state) => {
    console.log('state:',state);
  }

  return (
    <div className={'container-app w-full lg:w-[1200px] mx-auto '}>
      <FilterSelect 
        onChange={changeHandle} 
        selects={[
          'CategorySelect',
          'ProjectSelect',
          'PropertiesSelect',
          // 'StatusSelect',
          // "EventSelect",
          // 'PriceSelect',
          // 'TransactionsNumSelect',
          // 'TradingSelect',
          // 'FloorSelect',
          // 'TimeSelect',
        ]}/>

      <ShowFilterConditions />
    </div>
  )
}





export default App
