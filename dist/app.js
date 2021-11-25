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
    this.checkBtn.addEventListener("click", this.checkHandler);
    this.checked = false;
  }

  checkHandler() {
    if (!this.checked) {
      this.toggleBackgroundHandler();
      this.checked = true;
      myApp.displayTasks(-1)
    } else if (this.checked) {
      this.toggleBackgroundHandler();
      this.checked = false;
      myApp.displayTasks(1)
    }
  }

  toggleBackgroundHandler() {
    this.checkBtn.classList.toggle("blue-background");
  }
}


class UI {
  constructor() {
    this.input = getElement(".task-input");
    this.tasks = getElement(".tasks-container");
    this.taskList = [];
    this.counter = 0;
    // Footer
    this.clearBtn = getElement(".clear-btn");
    this.itemNumber = getElement(".number-left");
    // Bind
    this.clearTasks = this.clearTasks.bind(this);
    // Event Listeners
    this.input.addEventListener("keypress", (e) => {
      if (e.charCode === 13 && this.input.value.length > 0) {
        this.addTask(this.input.value);
        this.input.value = "";
        this.displayTasks(1);
      }
    });

    this.clearBtn.addEventListener("click", this.clearTasks);
  }

  addTask(v) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<button class="check"><i class="fas fa-check fa-2x"></i></button><p>${v}</p>`
    const newTask = new Task(task);
    this.taskList.push(newTask);
  }


  displayTasks(c) {
    this.counter += c;
    this.itemNumber.textContent = this.counter;
    if (this.taskList.length > 0) {
      this.taskList.forEach((task) => {
        this.tasks.appendChild(task.value);
      });
    }
  };

  clearTasks() {
    this.counter = 0;
    this.itemNumber.textContent = this.counter;
    while (this.taskList.length > 0) {
      this.taskList.pop();
    }
    this.tasks.innerHTML = "";
    console.log("Clicked");
  }
}


const myApp = new UI();