'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './getQueryClient';

const queryClient = getQueryClient();
export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
