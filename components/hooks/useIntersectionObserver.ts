import { useEffect, useRef, useState, LegacyRef, RefObject } from 'react';

type Callback = () => void;

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIntersectionObserverProps {
  inViewCallback?: Callback;
  leaveViewCallback?: Callback;
  triggerOnce?: boolean;
  options?: IntersectionObserverOptions;
}

// type UseIntersectionObserverReturn = LegacyRef<HTMLDivElement> | RefObject<HTMLDivElement | null> | undefined;

export const useIntersectionObserver = ({
  inViewCallback,
  leaveViewCallback,
  triggerOnce = false,
  options = {},
}: UseIntersectionObserverProps): LegacyRef<HTMLDivElement> | undefined => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [inViewTriggered, setInViewTriggered] = useState<boolean>(false);
  const [leaveViewTriggered, setLeaveViewTriggered] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!inViewTriggered && triggerOnce || !triggerOnce)) {
            setIsIntersecting(true);
            setInViewTriggered(true);
            if (inViewCallback) inViewCallback();
          } else {
            if (isIntersecting && (!leaveViewTriggered && triggerOnce || !triggerOnce)) {
              if (leaveViewCallback) leaveViewCallback();
              setLeaveViewTriggered(true);
            }
            setIsIntersecting(false);
          }
        });
      },
      options
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [inViewCallback, leaveViewCallback, isIntersecting, inViewTriggered, leaveViewTriggered, options, triggerOnce]);

  return targetRef;
};
