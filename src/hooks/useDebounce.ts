'use client';

import { useEffect, useRef, useState } from 'react';
import { debounce } from '@/lib/utils';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debouncedRef = useRef<(...args: Parameters<T>) => void>(
    debounce((...args: Parameters<T>) => fnRef.current(...args), delay)
  );

  return debouncedRef.current;
}
