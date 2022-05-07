import { useRef, useEffect } from "react";
export default function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    //useEffect是在dom渲染结束后执行.所以页面上显示的ref是上一轮的. 这里更新的值只会在下一轮显示
    ref.current = value;
    // console.log('...',value);
  });
  return ref.current;
}
