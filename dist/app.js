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
    this.deleteBtn = value.querySelector(".delete");
    this.checked = false;
    // Bind To Function
    this.checkHandler = this.checkHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    // Event Listener
    this.checkBtn.addEventListener("click", this.checkHandler);
    this.deleteBtn.addEventListener("click", this.deleteHandler);
  }

  // Check checbox background color and adjuts item number
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

  deleteHandler() {
    for (let i = 0; i <= myApp.taskList.length; i++) {
      if (myApp.taskList[i] === this) {
        if (i > -1) {
          this.value.parentNode.removeChild(this.value);
          myApp.taskList.splice(i, 1);
          if (myApp.counter > 0) {
            myApp.displayTasks(-1, myApp.taskList);
          } else {
            myApp.displayTasks(0, myApp.taskList);
          }
        }
      }
    }
  }

  // Toggle the background colour of checkbox
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
    this.tasksLeft = getElement(".tasks-left");
    this.itemNumber = getElement(".number-left");
    // Bind
    this.clearTasks = this.clearTasks.bind(this);
    // Event Listeners
    this.input.addEventListener("keypress", (e) => {
      if (e.charCode === 13 && this.input.value.length > 0) {
        this.addTask(this.input.value);
        this.input.value = "";
        this.displayTasks(1, this.taskList);
      }
    });
    this.clearBtn.addEventListener("click", this.clearTasks);
  }

  // Add new Task to the Task List Constructore
  addTask(v) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<button class="check"><i class="fas fa-check fa-2x"></i></button><p>${v}</p><button class="delete"><i class="fas fa-times fa-2x"></i></button>`;
    const newTask = new Task(task);
    this.taskList.push(newTask);
  }

  // Add every task to the container
  displayTasks(c, list) {
    this.counter += c;
    if (this.counter < 0) {
      this.taskTextHandler(0);
    } else {
      this.taskTextHandler(this.counter);
    }

    if (list.length >= 0) {
      list.forEach((task) => {
        this.tasks.appendChild(task.value);
      });
    }
  };

  // Adjusts the text depending on how many tasks have been checked
  taskTextHandler(c) {
    if (c === 1) {
      this.tasksLeft.innerHTML = `<span class="number-left">1</span> Task Left`;
    } else {
      this.tasksLeft.innerHTML = `<span class="number-left">${c}</span> Tasks Left`;
    }
  }

  deleteItem(item) {
    if (this.taskList.length > 0) {
      for (let i = 0; i < this.taskList; i++) {
        console.log(this.taskList[i]);
      }
    }
  }

  // Clears all the tasks from the list
  clearTasks() {
    this.counter = 0;
    this.tasksLeft.innerHTML = `<span class="number-left">${this.counter}</span> Tasks`;
    this.itemNumber.textContent = this.counter;
    this.taskList = [];
    this.tasks.innerHTML = "";
    this.input.value = "";
    console.log(this.taskList.length);
  }
}

const myApp = new UI();