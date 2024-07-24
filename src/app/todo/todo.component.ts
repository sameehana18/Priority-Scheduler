import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  newTask = '';
  newTaskPriority: number = 1;
  tasks: Task[] = [];

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }
  
  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }  

  addTask() {
    if (this.newTask.trim() !== '') {
      const newTask: Task = {
        description: this.newTask,
        priority: this.newTaskPriority,
        completed: false 
      };
      this.tasks.push(newTask);
      this.sortTasksByPriority();
      this.newTask = '';
      this.newTaskPriority = 1;
      this.saveTasksToLocalStorage();
    }
  }  
  
  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    }
  }

  
  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  private sortTasksByPriority() {
    this.tasks.sort((a, b) => a.priority - b.priority);
  }
}

interface Task {
  description: string;
  priority: number;
  completed: boolean;
}
