export function nextStatus(status) {
  const states = ['planned', 'in-progress', 'done'];
  const index = states.indexOf(status);
  return states[(index + 1) % states.length];
}

export function summarize(tasks) {
  const completed = tasks.filter((task) => task.status === 'done').length;
  return { completed, total: tasks.length, remaining: tasks.length - completed };
}
