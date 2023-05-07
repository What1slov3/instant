export type LoadingStatus = {
  loadingStatus: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
};
