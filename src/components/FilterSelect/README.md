## FilterSelect使用

> 目前是接收两个属性`onChange`,`selects`
- `onChange`是条件改变之后的回调事件,该事件接收`state`
- `selects`传入一个数组,指定要使用那些内部组件.

> 搭配ShowFilterConditions组件进行条件的展示.


## selects可选值

### 一层多选
`CategorySelect(类别)`, `ProjectSelect(项目)`,  `StatusSelect(状态)`,   `EventSelect(事件)`

### 区间选择
`PriceSelect(区间价格)`, `TransactionsNumSelect(交易数)`, `TradingSelect(交易量)`, `FloorSelect(地板价)`

### 单选
`TimeSelect(时间)`,

### 两层多选
`PropertiesSelect(属性)`



```jsx
  import FilterSelect from '**/FilterSelect'
  import  ShowFilterConditions from '**/ShowFilterConditions'
  export default function () {
    const changeHandle = (state) => {
      //state接收的是全部状态的值
      //TODO
    }
    return (
      <div>
        <FilterSelect
          onChange={changeHandle} 
          selects={[
            'CategorySelect',
            'ProjectSelect',
            'PropertiesSelect',
            'StatusSelect',
            'EventSelect',
            'TimeSelect',
            'PriceSelect',
            'TransactionsNumSelect',
            'TradingSelect',
            'FloorSelect'
          ]}
          />

          <ShowFilterConditions />
      </div>
    )
  }
```