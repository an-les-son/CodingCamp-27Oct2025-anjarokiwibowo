function showTodo() {
  const todoTable = document.getElementById("todoTable");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todoTable.innerHTML = "";

  if (todos.length === 0) {
    todoTable.innerHTML = `
      <tr>
        <td colspan="4" class="pt-2 pb-7 text-gray-400">No task found</td>
      </tr>
    `;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2">${todo.task}</td>
      <td class="py-2">${todo.dueDate}</td>
      <td class="py-2">${todo.status}</td>
      <td class="py-2">
        <button onclick="delTodo(${index})" class="bg-button rounded-lg px-2 py-1 font-semibold text-mainbg cursor-pointer hover:border-amber-50 hover:border-2">Delete</button>
      </td>
    `;
    todoTable.appendChild(row);
  });
}

function addTodo() {
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("dueDate");
  const task = taskInput.value.trim();
  const dateValue = dateInput.value;

  if (!task || !dateValue) {
    alert("Please input all the fields first!");
    return;
  }

  const [year, month, day] = dateValue.split("-");
  const dueDate = `${day}/${month}/${year}`;

  const today = new Date();
  const due = new Date(`${year}-${month}-${day}`);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  let status = "";
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = (due - today) / oneDay;

  if (diff < 0) status = "Done";
  else if (diff === 0) status = "Proses";
  else status = "Waiting";

  const newTodo = { task, dueDate, status };
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos, null, 2));

  taskInput.value = "";
  dateInput.value = "";
  showTodo();
}

function delTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

//Filter (Urutkan berdasarkan tanggal terdekat)
function filterTodo() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.sort((a, b) => {
    const [dayA, monthA, yearA] = a.dueDate.split("/");
    const [dayB, monthB, yearB] = b.dueDate.split("/");
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateA - dateB; // ascending
  });

  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

//Hapus semua data
function deleteAllTodo() {
  const konfirmasi = confirm("Are you sure you want to delete all?");
  if (konfirmasi) {
    localStorage.removeItem("todos");
    showTodo();
  }
}

//Hubungkan tombol
const addBtn = document.getElementById("addBtn");
const filBtn = document.getElementById("filBtn");
const delBtn = document.getElementById("delBtn");

addBtn.addEventListener("click", addTodo);
filBtn.addEventListener("click", filterTodo);
delBtn.addEventListener("click", deleteAllTodo);

//Tampilkan data saat halaman dimuat
showTodo();


