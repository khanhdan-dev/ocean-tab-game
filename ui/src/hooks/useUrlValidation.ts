// hooks/useUrlValidation.ts

import { useCallback } from "react";

const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*|\/[^\s]*)$/i;

function useUrlValidation() {
  const validateUrl = useCallback((url: string): boolean => {
    return urlRegex.test(url);
  }, []);

  return { validateUrl };
}

export default useUrlValidation;
