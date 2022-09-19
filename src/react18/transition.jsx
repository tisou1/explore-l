import { useState, useTransition } from 'react';


function Transition() {
  //返回一个过渡的待定状态的有状态值，以及一个启动过渡的函数。
  // startTransition让你在提供的回调中标记更新为过渡。
  const [count, setCount] = useState(0)
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    console.log(isPending);
    startTransition(() => {
      //当调用这个函数的时候,isPendign会为true的,状态值更新完成,isPendig恢复false
      setCount(c => c + 1)
    })
  }
  console.log(isPending);

  return (
    <div className='transition container mx-auto p-5 py-10 flex justify-center flex-col'>
      <div className='text-red-300/50 text-lg'>
        {isPending && 'pengding......'}
      </div>
      <button 
      onClick={handleClick} 
      className="p-2 border border-gray-600/80 rounded bg-blue-300/10 dark:border-white dark:text-white"
      >change {count}</button>
    </div>
  )
}


export default Transition