import { Task } from './Task.js';

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title, description) {
    const id = this.tasks.length + 1;
    const newTask = new Task(id, title, description);
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  updateTask(taskId, newTitle, newDescription) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.editTask(newTitle, newDescription);
    }
  }

  getTasks(filter = "All") {
    if (filter === "All") {
      return this.tasks;
    } else if (filter === "Completed") {
      return this.tasks.filter(task => task.status === "Completed");
    } else if (filter === "Pending") {
      return this.tasks.filter(task => task.status === "Pending");
    }
  }
}
