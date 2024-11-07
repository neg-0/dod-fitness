export const handle401Error = (error: any) => {
  if (error.response && error.response.status === 401) {
    // Instead of directly redirecting, dispatch a custom event
    window.dispatchEvent(new CustomEvent('auth-error', { detail: error }));
  }
  return Promise.reject(error);
}; 