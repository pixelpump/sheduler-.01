export async function fetchProperties() {
  const response = await fetch('/api/properties');
  return response.json();
}

export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

export async function fetchCrews() {
  const response = await fetch('/api/crews');
  return response.json();
}

export async function addProperty(property) {
  const response = await fetch('/api/properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  });
  if (!response.ok) {
    throw new Error('Failed to add property');
  }
  return response.json();
}

export async function addUser(user) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  return response.json();
}

export async function addCrew(crew) {
  const response = await fetch('/api/crews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(crew),
  });
  if (!response.ok) {
    throw new Error('Failed to add crew');
  }
  return response.json();
}
