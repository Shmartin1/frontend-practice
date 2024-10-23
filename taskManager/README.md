# Task Manager Component

## Overview

This project implements a task management system using vanilla JavaScript. The component provides a clean interface for creating, managing, and filtering tasks, demonstrating key concepts in state management, event handling, and component architecture.

## Features

- Task creation and deletion
- Status management (Pending/Completed)
- Task filtering system
- Dynamic task list rendering
- Task description support
- Modular and object-oriented design

## Key Takeaways for Developers

1. **State Management**: The project demonstrates clean state management through the TaskManager class:
   ```javascript
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
   }
   ```
   - Array-based task collection
   - Clean task creation process
   - Proper state isolation

2. **Object-Oriented Design**: 
   ```javascript
   export class Task {
     constructor(id, title, description) {
       this.id = id;
       this.title = title;
       this.description = description;
       this.status = "Pending";
     }
   
     markAsComplete() {
       this.status = "Completed";
     }
   }
   ```
   - Clear separation of concerns
   - Encapsulated task properties
   - Status management through methods

3. **Filter System Implementation**:
   ```javascript
   getTasks(filter = "All") {
     if (filter === "All") {
       return this.tasks;
     } else if (filter === "Completed") {
       return this.tasks.filter(task => task.status === "Completed");
     } else if (filter === "Pending") {
       return this.tasks.filter(task => task.status === "Pending");
     }
   }
   ```
   - Efficient filtering mechanism
   - Clean filter logic
   - Multiple filter options

4. **Event Handling**: The UIManager implements robust event delegation:
   ```javascript
   bindEventHandlers() {
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
   ```
   - Event delegation pattern
   - Clean action handling
   - Proper data attribute usage

5. **Error Handling**:
   ```javascript
   constructor() {
     this.taskListContainer = document.querySelector("#task-list");
     this.taskForm = document.querySelector("#task-form");
     this.filterOptions = document.querySelector("#filter-options");

     if (!this.taskListContainer || !this.taskForm || !this.filterOptions) {
       console.error("One or more required DOM elements are missing.");
       return;
     }
   }
   ```
   - DOM element validation
   - Proper error logging
   - Graceful error handling

## Using the UIManager

The UIManager serves as the main controller for the task interface:

```javascript
// Initialize the component
const uiManager = new UIManager();
```

The UIManager automatically:
- Initializes the task management system
- Sets up event listeners
- Manages task list rendering
- Handles form submissions
- Manages filter operations

Key methods:
- `renderTaskList()`: Updates the task display
- `bindEventHandlers()`: Sets up event listeners
- `clearForm()`: Resets the task creation form

## Component Architecture

```
├── Task.js         # Task class definition
├── TaskManager.js  # Task management system
├── UIManager.js    # Main controller
└── index.js        # Application entry point
```

## Implementation Insights

1. **Task Rendering System**:
   ```javascript
   renderTaskList(tasks) {
     this.taskListContainer.innerHTML = "";
     tasks.forEach(task => {
       const taskItem = document.createElement("div");
       taskItem.className = "task-item";
       const titleStyle = task.status === 'Completed' ? 
         'style="text-decoration: line-through"' : '';
       taskItem.innerHTML = `
         <h3 ${titleStyle}>${task.title} (${task.status})</h3>
         <p>${task.description}</p>
         <button class="mark-complete" data-id="${task.id}">
           Mark as Complete
         </button>
         <button class="delete-task" data-id="${task.id}">
           Delete
         </button>
       `;
       this.taskListContainer.appendChild(taskItem);
     });
   }
   ```
   - Efficient DOM updates
   - Clean template generation
   - Visual status indication
   - Proper button handling

2. **Form Handling**:
   ```javascript
   this.taskForm.addEventListener("submit", (e) => {
     e.preventDefault();
     const title = e.target.elements['task-title']?.value;
     const description = e.target.elements['task-desc']?.value;
     if (title) {
       const newTask = this.taskManager.addTask(title, description);
       this.renderTaskList(this.taskManager.getTasks());
       this.clearForm();
     }
   });
   ```
   - Form submission handling
   - Input validation
   - Clear form reset
   - Immediate UI update

3. **Task Management**:
   ```javascript
   deleteTask(taskId) {
     this.tasks = this.tasks.filter(task => task.id !== taskId);
   }

   updateTask(taskId, newTitle, newDescription) {
     const task = this.tasks.find(task => task.id === taskId);
     if (task) {
       task.editTask(newTitle, newDescription);
     }
   }
   ```
   - Clean task deletion
   - Task update mechanism
   - Proper state management

This task manager component serves as an excellent example of:
- State management patterns
- Event delegation
- Form processing
- Filter implementation
- Dynamic UI updates
- Clean component architecture

The implementation provides valuable insights into creating maintainable and scalable web applications while maintaining clean code architecture and user experience.