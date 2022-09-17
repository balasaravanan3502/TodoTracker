let tasks = [
  {
    sNo: "1",
    name: "Buy Grocery",
    status: "todo",
  },
  {
    sNo: "2",
    name: "Buy Grocery",
    status: "todo",
  },
];

var tasksList = document.querySelector(".tasks-list");

var myHTML = "";

for (var i = 0; i < tasks.length; i++) {
  myHTML +=
    '<div class="task-item"> <div class="task-no">' +
    tasks[i].sNo +
    '</div><div class="task-name">' +
    tasks[i].name +
    '</div><div class="task-status task-status-in-progress">In Progress</div><div class="task-edit"><button class="button edit-button"><i class="fa-solid fa-pen"></i></button></div><div class="task-remove"><button class="button delete-button"><i class="fa-solid fa-trash"></i></button></div></div>';
}

var addTaskListener = document.querySelector(".add-task");
addTaskListener.addEventListener("click", addTask);

function addTask() {
  tasks.push({
    sNo: "2",
    name: "Buy Grocery",
    status: "todo",
  });

  console.log(tasks);
}

// tasksList.innerHTML = myHTML;
