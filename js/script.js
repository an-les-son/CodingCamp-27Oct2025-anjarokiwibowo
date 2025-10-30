
// function showTodo() {

//     const todoTable = document.getElementById("todoTable");
//     const todos = JSON.parse(localStorage.getItem("todos")) || [];

//     if (todos.length === 0) {
//         todoTable.innerHTML = `
//         <tr>
//           <td colspan="4" class="pt-2 pb-7 text-border">No task found</td>
//         </tr>
//         `;
//         return;
//     }


//     todos.forEach((todo, index) => {

//         const add = document.getElementById("addBtn");
//         const row = document.createElement("tr");

//         add.addEventListener("click", function() {

//         const task = document.getElementById("task").value;
//         const [year, month, day] = document.getElementById("dueDate").value.split("-");
//         const dueDate = `${day}/${month}/${year}`;

//         const newTodo = {
//             task: task,
//             dueDate: dueDate,
//             status: "Belum selesai",
//             actions: ""
//         };

//         const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

//         existingTodos.push(newTodo);

//         localStorage.setItem("todos", JSON.stringify(existingTodos, null, 2));

//     })

//         row.innerHTML = `
//             <td class="py-2">${todo.task}</td>
//             <td class="py-2">${todo.dueDate}</td>
//             <td class="py-2">${todo.status}</td>
//             <td class="py-2">
//             <button onclick="delTodo(${index})" class="px-2 py-1 bg-red-500 rounded">Hapus</button>
//             </td>
//         `;
//         todoTable.appendChild(row);
//     });

//     function delTodo(index) {
//         const todos = JSON.parse(localStorage.getItem("todos")) || [];
//         todos.splice(index, 1);
//         localStorage.setItem("todos", JSON.stringify(todos));
//         showTodo();
//     }

//   }
// showTodo();

// ==============================================================

// const add = document.getElementById("addBtn");
// const del = document.getElementById("delBtn");

// add.addEventListener("click", function() {

//     const task = document.getElementById("task").value;
//     const [year, month, day] = document.getElementById("dueDate").value.split("-");
//     const dueDate = `${day}/${month}/${year}`;

//     const newTodo = {
//         task: task,
//         dueDate: dueDate,
//         status: "Belum selesai",
//         actions: ""
//     };

//     const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

//     existingTodos.push(newTodo);

//     localStorage.setItem("todos", JSON.stringify(existingTodos, null, 2));

// })

// function showTodo () {
//     const todoTable = document.getElementById("todoTable");
//     const todos = JSON.parse(localStorage.getItem("todos")) || [];

//     todoTable.innerHTML ="";

//     todos.forEach((todo,index) => {
//         const row = document.createElement("tr");

//         row.innerHTML =`
//             <td class="py-2">${todo.task}</td>
//             <td class="py-2">${todo.dueDate}</td>
//             <td class="py-2">${todo.status}</td>
//             <td class="py-2">
//             <button onclick="hapusTodo(${index})" class="bg-button rounded-lg px-2 py-1 font-semibold text-mainbg cursor-pointer hover:border-amber-50 hover:border-2">Delete</button>
//             </td>
//             `;
//             todoTable.appendChild(row);
//     })
// }

// function hapusTodo(index) {
//     const todos = JSON.parse(localStorage.getItem("todos")) || [];
//     todos.splice(index, 1);
//     localStorage.setItem("todos", JSON.stringify(todos, null, 2));
//     showTodo();
//   }

// delBtn.addEventListener("click", function() {
//     const konfirmasi = confirm("Are you sure you want to delete all ?");
//     if (konfirmasi) {
//       localStorage.clear(); 
//       showTodo(); 
//     }
//   });  

// showTodo();

function showTodo() {
  const todoTable = document.getElementById("todoTable");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Kosongkan tabel dulu
  todoTable.innerHTML = "";

  if (todos.length === 0) {
    todoTable.innerHTML = `
      <tr>
        <td colspan="4" class="pt-2 pb-7 text-border">No task found</td>
      </tr>
    `;
    return;
  }

  // Tampilkan data dari localStorage
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

// 🔥 Fungsi untuk menambah todo baru
function addTodo() {
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("dueDate");
  const task = taskInput.value.trim();
  const dateValue = dateInput.value;

  if (!task || !dateValue) {
    alert("Isi semua kolom terlebih dahulu!");
    return;
  }

  // Format tanggal
  const [year, month, day] = dateValue.split("-");
  const dueDate = `${day}/${month}/${year}`;

  // 🔍 Hitung status berdasarkan tanggal
  const today = new Date();
  const due = new Date(`${year}-${month}-${day}`);

  // Hapus waktu dari perbandingan (biar fokus ke tanggal saja)
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  let status = "";
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = (due - today) / oneDay; // selisih hari

  if (diff < 0) {
    status = "Done"; // sudah lewat
  } else if (diff === 0) {
    status = "Proses"; // hari ini
  } else {
    status = "Waiting"; // besok
  }

  const newTodo = {
    task: task,
    dueDate: dueDate,
    status: status,
    actions: ""
  };

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos, null, 2));

  // Reset input
  taskInput.value = "";
  dateInput.value = "";

  // Perbarui tabel
  showTodo();
}

// 🔥 Fungsi hapus data
function delTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodo();
}

// Jalankan saat tombol Add diklik
document.getElementById("addBtn").addEventListener("click", addTodo);

// Jalankan saat halaman dibuka
showTodo();
