export function renderCalendar(view = 'month') {
  const calendarContainer = document.querySelector('.calendar');
  calendarContainer.innerHTML = `
    <div class="calendar-header">
      <button onclick="changeView('day')">Day</button>
      <button onclick="changeView('week')">Week</button>
      <button onclick="changeView('month')">Month</button>
    </div>
    <div class="calendar-body">
      <!-- Calendar content based on the selected view -->
      <p>Currently viewing: ${view}</p>
    </div>
  `;
}

export function changeView(view) {
  renderCalendar(view);
}
