// ===============================
// AGRIPAW Listing Form Script
// ===============================

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("listingForm");

  if (!form) return; // Exit if form not found

  // Convert state to uppercase automatically
  const stateInput = document.getElementById("state");
  if (stateInput) {
    stateInput.addEventListener("input", () => {
      stateInput.value = stateInput.value.toUpperCase();
    });
  }

  // Listen for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["businessName", "contactName", "email", "city", "state", "breedType"];
    const missing = requiredFields.filter(id => !document.getElementById(id).value.trim());

    if (missing.length > 0) {
      alert("⚠️ Please complete all required fields before submitting.");
      return;
    }

    // Check for multiple animal types or all breeds (triggers manual review)
    const animalTypes = Array.from(form.querySelectorAll("input[name='animalType']:checked"));
    const allBreeds = form.querySelector("input[name='allBreeds']:checked");

    let reviewRequired = false;
    if (animalTypes.length > 1 || allBreeds) {
      reviewRequired = true;
    }

    // Gather form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    // Build formatted output
    let message = `
📋 NEW AGRIPAW LISTING SUBMISSION

Business Name: ${data.businessName}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
City/State: ${data.city}, ${data.state}

Animal Type(s): ${Array.isArray(data.animalType) ? data.animalType.join(", ") : data.animalType || "N/A"}
Breed Type: ${data.breedType}
Listing Type: ${data.listingType || "N/A"}

Service Type(s): ${Array.isArray(data.serviceType) ? data.serviceType.join(", ") : data.serviceType || "N/A"}
Network Type(s): ${Array.isArray(data.networkType) ? data.networkType.join(", ") : data.networkType || "N/A"}

Website: ${data.website || "N/A"}
YouTube: ${data.youtube || "N/A"}
Instagram: ${data.instagram || "N/A"}
Facebook: ${data.facebook || "N/A"}
TikTok: ${data.tiktok || "N/A"}

Hide Name: ${data.hideName ? "Yes" : "No"}
Hide Email: ${data.hideEmail ? "Yes" : "No"}
Manual Review: ${reviewRequired ? "✅ YES (Multiple animal types or 'All Breeds')" : "No"}
    `;

    // Simulate email output for now
    console.log("Simulated Email Sent:");
    console.log(message);

    // Future integration: EmailJS or Microsoft 365 email API
    // Example EmailJS template (to connect later):
    // emailjs.send("service_id", "template_id", data);

    // Confirmation for user
    alert(
      reviewRequired
        ? "✅ Your listing was submitted successfully.\n⚠️ This entry will be flagged for manual review before publishing."
        : "✅ Your listing was submitted successfully!"
    );

    // Reset form after submit
    form.reset();
  });
});
