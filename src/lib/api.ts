const API_BASE_URL = `http://${window.location.hostname}:8000/api/v1`;

function getAuthHeader() {
  const token = localStorage.getItem("careershift.token");
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...options.headers,
  };

  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, { ...options, headers });
  
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "An error occurred");
  }

  return data;
}
