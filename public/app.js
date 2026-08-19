import { nextStatus, summarize } from '../src/focus.js';

const tasks = [
  { title: 'Review the launch checklist', detail: 'Product / 25 min', status: 'done' },
  { title: 'Shape the staging walkthrough', detail: 'Engineering / 40 min', status: 'in-progress' },
  { title: 'Write tomorrow\'s first question', detail: 'Planning / 10 min', status: 'planned' },
  { title: 'Clear the small paper cut', detail: 'Maintenance / 15 min', status: 'planned' }
];
const list = document.querySelector('#task-list');
const initialStatuses = tasks.map((task) => task.status);

document.querySelector('#reset-board').addEventListener('click', () => {
  tasks.forEach((task, index) => { task.status = initialStatuses[index]; });
  render();
});

function render() {
  const summary = summarize(tasks);
  document.querySelector('#progress-count').textContent = `${summary.completed} / ${summary.total}`;
  document.querySelector('#remaining-count').textContent = `${summary.remaining} remaining`;
  document.querySelector('#progress-bar').style.width = `${summary.total ? summary.completed / summary.total * 100 : 0}%`;
  list.replaceChildren(...tasks.map((task, index) => {
    const button = document.createElement('button');
    button.className = `task task-${task.status}`;
    button.type = 'button';
    button.dataset.index = index;
    button.innerHTML = `<span class="task-state" aria-hidden="true"></span><span class="task-copy"><strong>${task.title}</strong><small>${task.detail}</small></span><span class="task-status">${task.status}</span><span class="task-arrow" aria-hidden="true">→</span>`;
    button.addEventListener('click', () => { tasks[index].status = nextStatus(task.status); render(); });
    return button;
  }));
}

render();
