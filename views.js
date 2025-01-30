import { handleLogin, fetchProperties, fetchUsers, fetchCrews } from './main.js';
import { renderCalendar } from './calendar.js';
import { enableDragAndDrop } from './dragDrop.js';

export function renderLoginView() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Login</h1>
    <div class="user-role" onclick="handleLogin('Operations Manager')">Operations Manager</div>
    <div class="user-role" onclick="handleLogin('Supervisor')">Supervisor</div>
    <div class="user-role" onclick="handleLogin('Gardener')">Gardener</div>
  `;
}

export async function renderSchedulerView(role) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>${role} Scheduler</h1>
    <div class="calendar">
      <!-- Calendar view will be implemented here -->
    </div>
    <div class="drag-drop-area">
      <!-- Drag and drop area for crew scheduling -->
    </div>
    <div class="data-display">
      <!-- Data display for properties, users, and crews -->
    </div>
  `;

  renderCalendar();
  if (role === 'manager') {
    enableDragAndDrop();
    const properties = await fetchProperties();
    const users = await fetchUsers();
    const crews = await fetchCrews();
    displayData(properties, users, crews);
  } else if (role === 'supervisor') {
    const crews = await fetchCrews();
    displaySupervisorData(crews);
  } else if (role === 'gardener') {
    const crews = await fetchCrews();
    displayGardenerData(crews);
  }
}

function displayData(properties, users, crews) {
  const dataDisplay = document.querySelector('.data-display');
  dataDisplay.innerHTML = `
    <h2>Properties</h2>
    <ul>${properties.map(p => `<li>${p.name}</li>`).join('')}</ul>
    <h2>Users</h2>
    <ul>${users.map(u => `<li>${u.name} (${u.role})</li>`).join('')}</ul>
    <h2>Crews</h2>
    <ul>${crews.map(c => `<li>${c.supervisor} with ${c.gardeners.join(', ')}</li>`).join('')}</ul>
  `;
}

function displaySupervisorData(crews) {
  const dataDisplay = document.querySelector('.data-display');
  const supervisorCrews = crews.filter(c => c.supervisor === 'Supervisor Name'); // Replace with actual supervisor name
  dataDisplay.innerHTML = `
    <h2>Your Crews</h2>
    <ul>${supervisorCrews.map(c => `<li>${c.gardeners.join(', ')} at ${c.property}</li>`).join('')}</ul>
  `;
}

function displayGardenerData(crews) {
  const dataDisplay = document.querySelector('.data-display');
  const gardenerCrews = crews.filter(c => c.gardeners.includes('Gardener Name')); // Replace with actual gardener name
  dataDisplay.innerHTML = `
    <h2>Your Assignments</h2>
    <ul>${gardenerCrews.map(c => `<li>${c.property} with ${c.supervisor}</li>`).join('')}</ul>
  `;
}
