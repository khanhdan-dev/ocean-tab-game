import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const navigateWithLoading = (href: string) => {
    setIsLoading(true);
    setLoadingProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 50);

    // Navigate
    router.push(href);
  };

  // Reset loading when pathname changes (navigation complete)
  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, isLoading]);

  return {
    isLoading,
    loadingProgress,
    navigateWithLoading,
  };
}
