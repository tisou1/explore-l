import { useRef, useEffect } from 'react'
/**
 * 
 * @param value 
 * @returns 
 * Returning the latest hook can avoid closures. Closures are often used in. SetTimeout, setinterval, promise Then appears
 */
export function useLatest(value){
  const ref = useRef(value)
  // useEffect(()=>{
  //   ref.current = value
  // })
  ref.current = value

  //You can also update ref with useeffect
  return ref
}

