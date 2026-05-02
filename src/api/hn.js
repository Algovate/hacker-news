const API_BASE = "https://hacker-news.firebaseio.com/v0";

export async function fetchStoryIds(feedType = "top") {
  const response = await fetch(`${API_BASE}/${feedType}stories.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${feedType} stories`);
  }

  const ids = await response.json();
  return Array.isArray(ids) ? ids : [];
}

export async function fetchItem(id) {
  const response = await fetch(`${API_BASE}/item/${id}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}`);
  }

  return response.json();
}
