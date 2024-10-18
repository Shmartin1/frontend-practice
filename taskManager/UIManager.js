// UIManager.js

import { TaskManager } from './TaskManager.js';

export class UIManager {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskListContainer = document.querySelector("#task-list");
    this.taskForm = document.querySelector("#task-form");
    this.filterOptions = document.querySelector("#filter-options");

    if (!this.taskListContainer || !this.taskForm || !this.filterOptions) {
      console.error("One or more required DOM elements are missing.");
      return;
    }

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = e.target.elements['task-title']?.value;
      const description = e.target.elements['task-desc']?.value;
      console.log("Form submitted:", { title, description });
      if (title) {
        const newTask = this.taskManager.addTask(title, description);
        console.log("New task created:", newTask);
        this.renderTaskList(this.taskManager.getTasks());
        this.clearForm();
      }
    });

    this.filterOptions.addEventListener("change", (e) => {
      const filter = e.target.value;
      this.renderTaskList(this.taskManager.getTasks(filter));
    });

    this.taskListContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-task")) {
        const taskId = parseInt(e.target.dataset.id);
        this.taskManager.deleteTask(taskId);
        this.renderTaskList(this.taskManager.getTasks());
      }

      if (e.target.classList.contains("mark-complete")) {
        const taskId = parseInt(e.target.dataset.id);
        const task = this.taskManager.tasks.find(task => task.id === taskId);
        if (task) {
          task.markAsComplete();
          this.renderTaskList(this.taskManager.getTasks());
        }
      }
    });
  }

  renderTaskList(tasks) {
    console.log("Rendering tasks:", tasks);
    this.taskListContainer.innerHTML = "";
    tasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task-item";
      const titleStyle = task.status === 'Completed' ? 'style="text-decoration: line-through"' : '';
      taskItem.innerHTML = `
        <h3 ${titleStyle}>${task.title} (${task.status})</h3>
        <p>${task.description}</p>
        <button class="mark-complete" data-id="${task.id}">Mark as Complete</button>
        <button class="delete-task" data-id="${task.id}">Delete</button>
      `;
      this.taskListContainer.appendChild(taskItem);
    });
    console.log("Task list HTML:", this.taskListContainer.innerHTML);
  }

  clearForm() {
    this.taskForm.reset();
  }
}