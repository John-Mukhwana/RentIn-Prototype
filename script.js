// script.js

// Function to load tenants from local storage and display in the table
function loadTenants() {
  const tenants = JSON.parse(localStorage.getItem("tenants")) || [];
  const tenantTableBody = document
    .getElementById("tenant-table")
    .querySelector("tbody");

  if (!tenantTableBody) {
    console.error("Table body not found");
    return;
  }
  tenantTableBody.innerHTML = ""; // Clear existing contents

  let totalPaid = 0;
  let outstandingCount = 0;

  // Populate table with tenants
  tenants.forEach((tenant, index) => {
    const row = tenantTableBody.insertRow();
    row.innerHTML = `  
            <td>${tenant.name}</td>  
            <td>${tenant.email}</td>  
            <td>${tenant.houseNumber}</td>
            <td>${tenant.houseType}</td>
            <td>${tenant.phoneNumber}</td>
            <td>${tenant.nationalId}</td>
            <td>${tenant.paymentStatus}</td>  
            <td>  
                <button class="edit" onclick="editTenant(${index})">Edit</button>  
                <button class="delete" onclick="deleteTenant(${index})">Delete</button>  
            </td>  
        `;

    // Update statistics
    if (tenant.paymentStatus === "paid") {
      totalPaid++;
    } else {
      outstandingCount++;
    }
  });

  // Calculate and display the updated totals
  document.getElementById("total-tenants").innerText = tenants.length;
  document.getElementById("total-paid").innerText = `Ksh ${totalPaid * 3500}`; // Assuming each tenant pays \$500
  document.getElementById("outstanding-rent").innerText = `${outstandingCount}`;
  document.getElementById("paid-tenants").innerText = `${totalPaid}`;
}

// Add tenant details from caretaker-input.html
document
  .getElementById("tenant-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById("tenant-name").value;
    const email = document.getElementById("tenant-email").value;
    const houseNumber = document.getElementById("tenant-house-number").value;
    const houseType = document.getElementById("tenant-house-type").value;
    const phoneNumber = document.getElementById("tenant-phone-number").value;
    const nationalId = document.getElementById("tenant-national-id").value;
    const paymentStatus = document.getElementById("payment-status").value;

    const tenants = JSON.parse(localStorage.getItem("tenants")) || [];
    tenants.push({
      name,
      email,
      houseNumber,
      houseType,
      phoneNumber,
      nationalId,
      paymentStatus,
    });
    localStorage.setItem("tenants", JSON.stringify(tenants));

    // Redirect back to tenant management page
    window.location.href = "tenant-management.html";
  });

// Function to edit a tenant
function editTenant(index) {
  const tenants = JSON.parse(localStorage.getItem("tenants")) || [];
  const tenant = tenants[index];

  const name = prompt("Edit tenant name:", tenant.name);
  const email = prompt("Edit tenant email:", tenant.email);
  const houseNumber = prompt("Edit house number:", tenant.houseNumber);
  const houseType = prompt("Edit house type:", tenant.houseType);
  const phoneNumber = prompt("Edit phone number:", tenant.phoneNumber);
  const nationalId = prompt("Edit national ID:", tenant.nationalId);
  const paymentStatus = prompt(
    "Edit payment status (Paid/Outstanding):",
    tenant.paymentStatus
  );

  if (
    name &&
    email &&
    houseNumber &&
    houseType &&
    phoneNumber &&
    nationalId &&
    paymentStatus
  ) {
    tenants[index] = {
      name,
      email,
      houseNumber,
      houseType,
      phoneNumber,
      nationalId,
      paymentStatus,
    };
    localStorage.setItem("tenants", JSON.stringify(tenants));
    loadTenants(); // Refresh the tenant display
  } else {
    alert("All fields are required!");
  }
}

// Function to delete a tenant
function deleteTenant(index) {
  if (confirm("Are you sure you want to delete this tenant?")) {
    const tenants = JSON.parse(localStorage.getItem("tenants")) || [];
    tenants.splice(index, 1);
    localStorage.setItem("tenants", JSON.stringify(tenants));
    loadTenants(); // Refresh the tenant display
  }
}

// Initial loading of tenants
loadTenants();

