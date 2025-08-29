import { useEffect, useState } from 'react';

export function useFrameworkReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Example: initialize resources here
    setReady(true);
  }, []);

  return ready;
}
