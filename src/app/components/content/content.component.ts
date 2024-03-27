import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  taskName: string = '';
  tasksInProgress: string[] = [];
  completedTasks: string[] = [];

  constructor() {
    this.loadTasks();
  }

  addTask(taskName: string) {
    if (taskName.trim() === "") {
      alert("Please enter a task!");
      return;
    }
    this.tasksInProgress.push(taskName);
    this.saveTasks();
  }

  completeTask(index: number) {
    const completedTask = this.tasksInProgress.splice(index, 1)[0];
    this.completedTasks.push(completedTask);
    this.saveTasks();
  }

  removeTask(tasks: string[], index: number) {
    tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasksInProgress', JSON.stringify(this.tasksInProgress));
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }

  loadTasks() {
    const savedTasksInProgress = localStorage.getItem('tasksInProgress');
    if (savedTasksInProgress) {
      this.tasksInProgress = JSON.parse(savedTasksInProgress);
    }

    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      this.completedTasks = JSON.parse(savedCompletedTasks);
    }
  }
}
