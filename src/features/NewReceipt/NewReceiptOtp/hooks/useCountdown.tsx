import { useEffect, useState } from 'react';
import { TUseCountdownReturn } from './types';

export const useCountdown = (
  initialTime: number,
  onExpire: () => void,
): TUseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const reset = () => setTimeLeft(initialTime);

  return { timeLeft, reset };
};
