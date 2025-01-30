import { renderLoginView, renderSchedulerView } from './views.js';

document.addEventListener('DOMContentLoaded', () => {
  renderLoginView();
});

export function handleLogin(role) {
  if (role === 'Operations Manager') {
    renderSchedulerView('manager');
  } else if (role === 'Supervisor') {
    renderSchedulerView('supervisor');
  } else if (role === 'Gardener') {
    renderSchedulerView('gardener');
  }
}

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
