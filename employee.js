// employee.js
import { db, auth } from "./firebase.js";
import {
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// References
const employeeForm = document.getElementById("employeeForm");
const employeeTableBody = document.getElementById("employeeTableBody");
const employeeSection = document.getElementById("employeeSection");
const authSection = document.getElementById("authSection");
const logoutBtn = document.getElementById("logoutBtn");

// Show/hide sections based on login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    employeeSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    loadEmployees();
  } else {
    authSection.style.display = "block";
    employeeSection.style.display = "none";
    logoutBtn.style.display = "none";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// Add employee
employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const empName = document.getElementById("empName").value.trim();
  const empDept = document.getElementById("empDept").value.trim();
  const empRole = document.getElementById("empRole").value.trim();
  const empEmail = document.getElementById("empEmail").value.trim();
  const empSalary = document.getElementById("empSalary").value.trim();

  if (!empName || !empDept || !empRole || !empEmail || !empSalary) {
    alert("⚠️ Please fill in all fields");
    return;
  }

  const employeesRef = ref(db, "employees");

  await push(employeesRef, {
    name: empName,
    department: empDept,
    role: empRole,
    email: empEmail,
    salary: empSalary
  });

  employeeForm.reset();
  loadEmployees(); // ✅ refresh immediately after adding
});

// Load employees
function loadEmployees() {
  const employeesRef = ref(db, "employees");

  onValue(employeesRef, (snapshot) => {
    employeeTableBody.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
      const emp = childSnapshot.val();
      const empId = childSnapshot.key;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.role}</td>
        <td>${emp.email}</td>
        <td>₹${emp.salary}</td>
        <td><button onclick="deleteEmployee('${empId}')">❌ Delete</button></td>
      `;
      employeeTableBody.appendChild(row);
    });
  });
}

// Delete employee
window.deleteEmployee = async function (empId) {
  const empRef = ref(db, "employees/" + empId);
  await remove(empRef);
};
