$(document).ready(function () {
    loadTasks();
    
    $("form").submit(function (e) {
        e.preventDefault();
        // alert("shhf")
        const text = $("#task-input").val();
        console.log(text);
        const task = {
        id: Date.now(),
        text: text,
        completed: false,
        };

        addTask(task);
        saveTask(task);
        $("#task-input").val("");
    });
});

function getLocalData() {
  const tasks = localStorage.getItem("tasks");
  console.log("Getting tasks:", tasks);
  return tasks ? JSON.parse(tasks) : [];
}

function saveTask(task) {
  const tasks = getLocalData();
  tasks.push(task);
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(task) {
    console.log("Adding task:", task.text); // Debugging line
    const taskItem = $("<li>", {
    "data-id": task.id,
    class: task.completed ? "completed" : "",
    html: `<span>${task.text}</span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>`
  });
  $("#task-list").append(taskItem);
}

function loadTasks() {
  const tasks = getLocalData();
  console.log("Loading tasks:", tasks); // Debugging line
  tasks.forEach((task) => addTask(task));
}

$('#task-list').on('click', '.complete-btn', function() {
    const li = $(this).closest('li');
    const id = li.data('id');
    tComplete(id);
});

$('#task-list').on('click', '.edit-btn', function() {
    const li = $(this).closest('li');
    const id = li.data('id');
    editTask(id);
});

$('#task-list').on('click', '.delete-btn', function() {
    const li = $(this).closest('li');
    const id = li.data('id');
    deleteTask(id);
});

function deleteTask(id) {
    let tasks = getLocalData();
    tasks = tasks.filter((task) => task.id == id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    $(`li[data-id=${id}]`).remove();
}

function tComplete(id) {
    const tasks = getLocalData();
    const task = tasks.find((task) => task.id == id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    $(`li[data-id=${id}]`).toggleClass('completed');
}

function editTask(id) {
    const tasks = getLocalData();
    const task = tasks.find((task) => task.id == id);
    const text = prompt('Edit Task', task.text);
    if (text != null && text.trim() != '') {
        task.text = text;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        $(`li[data-id=${id}] span`).text(text);
    }
}
