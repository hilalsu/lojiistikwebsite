export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    // If no tokens, redirect to login
    window.location.href = '/login';
    return;
  }

  let headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken: string = data.access;
        localStorage.setItem('accessToken', newAccessToken);
        accessToken = newAccessToken;
        
        // Retry the original request with the new access token
        headers = {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
        };
        response = await fetch(url, { ...options, headers });
      } else {
        // Refresh token failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return;
      }
    }

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
} 