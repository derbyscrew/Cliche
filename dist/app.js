"use strict";


// Checks if an element exists within the DOM
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element
  } else {
    throw new Error(`Please check ${selection} selection, doesnt exist`);
  }
}


class Task {
  constructor(value) {
    this.value = value;
    this.checkBtn = value.querySelector(".check");
    // Bind To Function
    this.checkHandler = this.checkHandler.bind(this);
    // Event Listener
    this.checkBtn.addEventListener("click", this.checkHandler)
  }

  checkHandler() {
    this.checkBtn.classList.toggle("blue-background");
  }
}


class UI {
  constructor() {
    this.input = getElement(".task-input");
    this.tasks = getElement(".tasks-container");
    this.clearBtn = getElement(".clear-btn");
    this.itemNumber = getElement(".number-left");
    this.taskList = [];
    // Bindes
    this.displayTasks = this.displayTasks.bind(this);
    // Event Listeners
    this.input.addEventListener("keypress", (e) => {
      if (e.charCode === 13 && this.input.value.length > 0) {
        this.addTask(this.input.value);
        this.input.value = "";
        this.displayTasks();
      }
    });

  }


  addTask(v) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<button class="check"><i class="fas fa-check fa-2x"></i></button><p>${v}</p>`
    const newTask = new Task(task);
    this.taskList.push(newTask);
  }


  displayTasks() {
    if (this.taskList.length > 0) {
      this.taskList.forEach((task) => {
        this.tasks.appendChild(task.value);
      });
    }
  }

}

const myApp = new UI();
