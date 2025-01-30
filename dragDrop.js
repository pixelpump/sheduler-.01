export function enableDragAndDrop() {
  const dragDropArea = document.querySelector('.drag-drop-area');
  dragDropArea.innerHTML = `
    <div class="supervisors">
      <h3>Supervisors</h3>
      <div class="draggable" draggable="true">Supervisor 1</div>
      <div class="draggable" draggable="true">Supervisor 2</div>
    </div>
    <div class="gardeners">
      <h3>Gardeners</h3>
      <div class="draggable" draggable="true">Gardener 1</div>
      <div class="draggable" draggable="true">Gardener 2</div>
    </div>
    <div class="properties">
      <h3>Properties</h3>
      <div class="droppable">Property A</div>
      <div class="droppable">Property B</div>
    </div>
  `;

  const draggables = document.querySelectorAll('.draggable');
  const droppables = document.querySelectorAll('.droppable');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      droppable.appendChild(dragging);
    });
  });
}
