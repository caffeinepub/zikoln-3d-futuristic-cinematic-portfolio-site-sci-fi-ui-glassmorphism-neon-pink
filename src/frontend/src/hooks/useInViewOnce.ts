import { useEffect, useRef, useState } from 'react';

export function useInViewOnce(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options]);

  return { ref, isInView };
}
