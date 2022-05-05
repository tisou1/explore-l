import { useRef, useEffect } from "react";

export default function useLatest(value){
  const ref = useRef(value)
  ref.current = value

  return ref.current
}

