import {useState, useEffect,useId, useDeferredValue } from 'react'

let arr = Array.from({length: 8000},(_, idx) => ':si-'+idx )
console.log(arr)
function App() {
  const [value, setInput] = useState('')
  const [data, setData] = useState({})
  const defaultValue = useDeferredValue(value)
  const id = useId()
  console.log(id)
  useEffect(() => {
    fetch('http://127.0.0.1:4523/mock/803735/user/' + defaultValue)
      .then(res => {
        // console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })
  },[defaultValue])//如果这里的依赖项是value的话, inptu触发onchange几次就会调用几次fetch
  //使用了defaultValue作为依赖项,由于defaultValue是由useDeferredValue处理过后的.所以会延迟这个值.就会说在有其他任务优先级的时候
  //.input这块的触发改变state优先级低,又因为我们模拟了大量的高优先级的任务.所以会延迟defaultValue从而是的fetch调用次数减少很多次(有一点像防抖)
  return (
    <div className="App" id={id}>
      <input value={value} onChange={e => setInput(e.target.value)}/>
      <div>
       {defaultValue}
      </div>
      <div>
       {value}
      </div>

      <div>返回的用户名: {data.username}</div>
      <div>
        {
          arr.map(val => (
            <div key={id+val}>{val}</div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
