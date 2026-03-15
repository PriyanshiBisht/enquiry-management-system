const API_URL = "http://localhost:3000/api/enquiry";
let enquiries = [];
let editId = null;

const enquiryForm = document.getElementById("enquiryForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const feedback = document.getElementById("feedback");

// Fetch all enquiries from backend
async function fetchEnquiries() {
  const res = await fetch(API_URL);
  enquiries = await res.json();
  displayEnquiries();
}

// Display enquiries in the table
function displayEnquiries() {
  const tableBody = document.getElementById("enquiryTableBody");
  tableBody.innerHTML = "";

  enquiries.forEach((enquiry, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${enquiry.name}</td>
        <td>${enquiry.email}</td>
        <td>${enquiry.feedback || ""}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick='editEnquiry(${JSON.stringify(enquiry)})'>Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEnquiry('${enquiry._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Handle form submit for Add/Edit
enquiryForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const payload = {
    name: name.value,
    email: email.value,
    feedback: feedback.value
  };

  if (editId) {
    // Edit existing enquiry
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    editId = null;
  } else {
    // Add new enquiry
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  enquiryForm.reset();
  fetchEnquiries();
});

// Delete an enquiry
async function deleteEnquiry(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchEnquiries();
}

// Fill form for editing
function editEnquiry(enquiry) {
  name.value = enquiry.name;
  email.value = enquiry.email;
  feedback.value = enquiry.feedback;
  editId = enquiry._id;
}

// Initial fetch
fetchEnquiries();
