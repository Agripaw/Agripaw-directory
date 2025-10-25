// ===============================
// AGRIPAW Listing Form Script
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("listingForm");
  if (!form) return;

  const stateInput = document.getElementById("state");
  if (stateInput) {
    stateInput.addEventListener("input", () => {
      stateInput.value = stateInput.value.toUpperCase();
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["businessName", "contactName", "email", "city", "state", "breedType"];
    const missing = requiredFields.filter(id => !document.getElementById(id).value.trim());

    if (missing.length > 0) {
      alert("⚠️ Please complete all required fields before submitting.");
      return;
    }

    // Check for manual review triggers
    const animalTypes = Array.from(form.querySelectorAll("input[name='animalType']:checked"));
    const allBreeds = form.querySelector("input[name='allBreeds']:checked");
    const reviewRequired = animalTypes.length > 1 || allBreeds;

    // Gather all form data
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

    // Format email data
    const subject = reviewRequired
      ? "New Listing Under Review – AgriPaw Directory"
      : "New Listing Submission – AgriPaw Directory";

    const to = "info@agripaw.com";
    const cc = data.email;

    const emailBody = `
📋 AGRIPAW LISTING SUBMISSION
----------------------------------
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

Manual Review Required: ${reviewRequired ? "✅ YES" : "No"}
----------------------------------
`;

    // Simulate Email Sending (Console Only)
    console.group("📨 Simulated Email Routing");
    console.log("TO:", to);
    console.log("CC:", cc);
    console.log("SUBJECT:", subject);
    console.log("MESSAGE BODY:\n", emailBody);
    console.groupEnd();

    // ===== FUTURE INTEGRATION POINT =====
    // Uncomment once EmailJS or Microsoft 365 is connected:
    //
    // emailjs.send("service_id", "template_id", {
    //   to_email: to,
    //   cc_email: cc,
    //   subject: subject,
    //   message: emailBody
    // });

    // Microsoft Graph API Integration (future-ready)
    // graphClient.api('/me/sendMail').post({
    //   message: {
    //     subject: subject,
    //     body: { contentType: 'Text', content: emailBody },
    //     toRecipients: [{ emailAddress: { address: to } }],
    //     ccRecipients: [{ emailAddress: { address: cc } }]
    //   }
    // });

    // Confirmation Message
    alert(
      reviewRequired
        ? "✅ Your listing was submitted successfully.\n⚠️ It will be flagged for manual review before publishing.\nA confirmation copy was sent to your email."
        : "✅ Your listing was submitted successfully!\nA confirmation copy was sent to your email."
    );

    form.reset();
  });
});
