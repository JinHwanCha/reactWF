import { useEffect, useRef, useState } from 'react'

export const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const endValue = parseInt(end.toString().replace(/[^0-9]/g, ''))
    const incrementTime = duration / endValue
    let currentCount = 0

    const timer = setInterval(() => {
      currentCount += Math.ceil(endValue / (duration / 16))
      if (currentCount >= endValue) {
        setCount(endValue)
        clearInterval(timer)
      } else {
        setCount(currentCount)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return { count, elementRef }
}
