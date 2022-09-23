let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
let nonFilterTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
``;
var allStatus = ["todo", "in-progress", "complete"];

var isAdd = true;
var taskNoInEdit = -1;

var numberFilter = 0;
var statusFilter = 0;

if (tasks.length === 0) {
  document.getElementById("no-tasks").style.display = "block";
}

const renderTasks = () => {
  document.querySelector(".tasks-list").innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var statusDiv = "";
    if (tasks[i].status === "todo") {
      statusDiv =
        '<div class="task-status"><button class="button task-status-todo task-status-todo">Todo</button></div>';
    } else if (tasks[i].status === "in-progress") {
      statusDiv =
        '<div class="task-status"><button class="button task-status-in-progress task-status-in-progress">In Progress</button></div>';
    } else {
      statusDiv =
        '<div class="task-status"><button class="button task-status-complete task-status-complete">Complete</button></div>';
    }

    document.querySelector(".tasks-list").innerHTML +=
      '<div class="task-item"> <div class="task-no">' +
      tasks[i].sNo +
      '</div><div class="task-name">' +
      tasks[i].name +
      "</div>" +
      statusDiv +
      '<div class="form-edit-delete-button">' +
      '<div class="task-edit" onClick="editTask(' +
      tasks[i].sNo +
      ')"><button class="button edit-button"><i class="fa-solid fa-pen"></i></button></div><div class="task-remove"><button class="button delete-button" onclick="deleteTask( ' +
      tasks[i].sNo +
      ')"><i class="fa-solid fa-trash"></i></button></div></div></div>';
  }
};

const formSubmit = () => {
  var taskName = document.getElementById("task-name").value;
  var taskStatus = document.getElementById("task-status").value;
  var taskNoEntered = document.getElementById("task-number").value;

  if (
    taskName.length === 0 ||
    taskStatus.length === 0 ||
    taskNoEntered.length === 0
  ) {
    if (taskName.length === 0)
      document.getElementById("task-name").style.borderColor = "red";

    if (taskStatus.length === 0)
      document.getElementById("task-status").style.borderColor = "red";

    if (taskStatus.length === 0)
      document.getElementById("task-number").style.borderColor = "red";
    return;
  }

  // for (var task of tasks) {
  //   if (task.name.toLowerCase() === taskName.toLowerCase()) {
  //     alert("Already Exists");
  //     return;
  //   }
  // }

  if (isAdd) {
    var taskNo;
    if (taskNoEntered === "0") {
      var newTasks = tasks.map((task) => {
        return { ...task, sNo: parseInt(task.sNo) + 1 };
      });
      tasks = [
        {
          sNo: "1",
          name: taskName,
          status: taskStatus,
        },
        ...newTasks,
      ];
    } else if (taskNoEntered === "-1" || taskNoEntered > tasks.length) {
      taskNo = parseInt(tasks[tasks.length - 1].sNo) + 1;

      tasks.push({
        sNo: taskNo.toString(),
        name: taskName,
        status: taskStatus,
      });
    } else {
      var newTasks = tasks.map((task) => {
        if (task.sNo < taskNoEntered) return task;
        else
          return {
            ...task,
            sNo: parseInt(task.sNo) + 1,
          };
      });

      newTasks.splice(taskNoEntered - 1, 0, {
        sNo: taskNoEntered.toString(),
        name: taskName,
        status: taskStatus,
      });

      tasks = newTasks;
    }

    renderTasks();
  } else {
    if (taskNoInEdit === taskNoEntered) {
      tasks[taskIndex].name = taskName;
      tasks[taskIndex].status = taskStatus;
    } else if (taskNoEntered === "0") {
      var newTasks = tasks.filter((task) => task.sNo === taskNoInEdit);

      newTasks = tasks.map((task) => {
        return { ...task, sNo: parseInt(task.sNo) + 1 };
      });

      tasks = [
        {
          sNo: "1",
          name: taskName,
          status: taskStatus,
        },
        ...newTasks,
      ];
    } else if (taskNoEntered === "-1" || taskNoEntered > tasks.length) {
      taskNo = parseInt(tasks[tasks.length - 1].sNo) + 1;

      var newTasks = tasks.filter((task) => task.sNo === taskNoInEdit);

      newTasks = tasks.map((task) => {
        return { ...task, sNo: parseInt(task.sNo) - 1 };
      });

      tasks.push({
        sNo: taskNo.toString(),
        name: taskName,
        status: taskStatus,
      });
    } else {
      var newTasks = tasks.filter((task) => task.sNo === taskNoInEdit);

      newTasks = tasks.map((task) => {
        if (task.sNo < taskNoEntered) return task;
        else return { ...task, sNo: parseInt(task.sNo) + 1 };
      });

      newTasks.splice(taskNoEntered - 1, 0, {
        sNo: taskNoEntered.toString(),
        name: taskName,
        status: taskStatus,
      });

      tasks = newTasks;
    }

    renderTasks();

    document.getElementById("form-submit-button").innerHTML = "Add Task";
    isAdd = true;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("task-name").value = "";
  document.getElementById("task-status").value = "";
  document.getElementById("task-number").value = "";

  document.getElementById("task-name").style.borderColor = "#80808082";
  document.getElementById("task-status").style.borderColor = "#80808082";
  document.getElementById("task-number").style.borderColor = "#80808082";

  document.getElementById("form-cancel-button").style.display = "none";
  document.getElementById("no-tasks").style.display = "none";
};

const cancelForm = () => {
  isAdd = true;

  document.getElementById("form-submit-button").innerHTML = "Add Task";
  document.getElementById("task-name").value = "";
  document.getElementById("form-cancel-button").style.display = "none";
};

const updateStatus = (i) => {
  console.log(i);
  var taskIndex = tasks.findIndex((task) => task.sNo == i);

  const statusPos = allStatus.indexOf(tasks[taskIndex].status);

  tasks[taskIndex].status = allStatus[(statusPos + 1) % 3];

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const filterByNumberStatus = async () => {
  if (numberFilter === 0) {
    numberFilter = 1;
    nonFilterTasks = tasks;

    await tasks.sort((a, b) => parseInt(b.sNo) - parseInt(a.sNo));

    document.getElementById("number-down").style.display = "inline";
  } else {
    numberFilter = 0;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    document.getElementById("number-down").style.display = "none";
  }

  renderTasks();
};

const filterByStatus = () => {
  var todoTasks = tasks.filter((task) => task.status === "todo");
  var inprogressTasks = tasks.filter((task) => task.status === "in-progress");
  var completeTasks = tasks.filter((task) => task.status === "complete");

  if (statusFilter === 0) {
    statusFilter = 1;
    nonFilterTasks = tasks;
    tasks = [...todoTasks, ...inprogressTasks, ...completeTasks];
    document.getElementById("status-up").style.display = "inline";
  } else if (statusFilter === 1) {
    statusFilter = -1;
    tasks = [...completeTasks, ...inprogressTasks, ...todoTasks];
    document.getElementById("status-up").style.display = "none";
    document.getElementById("status-down").style.display = "inline";
  } else {
    statusFilter = 0;
    tasks = nonFilterTasks;
    document.getElementById("status-up").style.display = "none";
    document.getElementById("status-down").style.display = "none";
  }

  renderTasks();
};

const editTask = (i) => {
  document.getElementById("form-submit-button").innerHTML = "Edit Task";
  document.getElementById("form-cancel-button").style.display = "inline";

  document.getElementById("task-number").value = i.toString();

  var taskDetails = tasks.filter((task) => task.sNo == i)[0];

  isAdd = false;

  taskNoInEdit = i;
  document.getElementById("task-name").value = taskDetails.name;
  document.getElementById("task-status").value = taskDetails.status;
};

const deleteTask = (i) => {
  var isConfirm = confirm("Do you want to delete the task");
  if (!isConfirm) return false;
  newTasks = tasks.filter((task) => task.sNo != i);

  newTasks = newTasks.map((task, i) => {
    return { ...task, sNo: i + 1 };
  });

  tasks = newTasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (tasks.length === 0) {
    document.getElementById("no-tasks").style.display = "block";
  }
  renderTasks();
};

renderTasks();
