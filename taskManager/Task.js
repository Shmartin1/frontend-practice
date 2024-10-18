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
  
    editTask(title, description) {
      this.title = title;
      this.description = description;
    }
}
  