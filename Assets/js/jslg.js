// URL Parameter Handler
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function updateURL(action) {
  const url = new URL(window.location);
  if (action === "register") {
    url.searchParams.set("action", "register");
  } else {
    url.searchParams.delete("action");
  }
  window.history.pushState({}, "", url);
}

// Initialize form based on URL parameter
function initializeFromURL() {
  const action = getURLParameter("action");
  if (action === "register") {
    switchToRegister(false); // false = don't update URL again
  } else {
    switchToLogin(false); // false = don't update URL again
  }
}

// Smooth Form Switching with Sliding Effect
function switchToRegister(updateURLParam = true) {
  const sliderContainer = document.getElementById("sliderContainer");
  sliderContainer.classList.add("show-register");

  // Clear login form
  document.getElementById("loginForm").reset();

  // Update URL if needed
  if (updateURLParam) {
    updateURL("register");
  }
}

function switchToLogin(updateURLParam = true) {
  const sliderContainer = document.getElementById("sliderContainer");
  sliderContainer.classList.remove("show-register");

  // Clear register form
  document.getElementById("registerForm").reset();
  clearPasswordStrength();

  // Update URL if needed
  if (updateURLParam) {
    updateURL("login");
  }
}

// Form Submissions
function handleLogin(event) {
  event.preventDefault();
  const loading = document.getElementById("loginLoading");
  const btn = event.target.querySelector('button[type="submit"]');

  loading.style.display = "inline-block";
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    loading.style.display = "none";
    btn.disabled = false;
    showSuccess("Login successful!", "login");

    // Redirect simulation
    setTimeout(() => {
      alert("Redirecting to homepage...");
    }, 1500);
  }, 2000);
}

function handleRegister(event) {
  event.preventDefault();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showError("Password confirmation does not match!", "register");
    return;
  }

  const loading = document.getElementById("registerLoading");
  const btn = event.target.querySelector('button[type="submit"]');

  loading.style.display = "inline-block";
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    loading.style.display = "none";
    btn.disabled = false;
    showSuccess(
      "Registration successful! Please check your email to verify your account.",
      "register"
    );

    // Auto switch to login after successful registration
    setTimeout(() => {
      switchToLogin();
    }, 2000);
  }, 2500);
}

// Password Strength Checker
function checkPasswordStrength() {
  const password = document.getElementById("registerPassword").value;
  const strengthBar = document.getElementById("passwordStrengthBar");

  if (!password) {
    clearPasswordStrength();
    return;
  }

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthBar.className = "password-strength-bar";
  if (strength <= 1) {
    strengthBar.classList.add("strength-weak");
  } else if (strength <= 3) {
    strengthBar.classList.add("strength-medium");
  } else {
    strengthBar.classList.add("strength-strong");
  }
}

function clearPasswordStrength() {
  const strengthBar = document.getElementById("passwordStrengthBar");
  strengthBar.className = "password-strength-bar";
}

// Social Login
function socialLogin(provider) {
  showInfo(`Redirecting to ${provider}...`);
  // Implement social login logic here
}

// Message System
function showSuccess(message, formType) {
  showMessage(message, "success", formType);
}

function showError(message, formType) {
  showMessage(message, "danger", formType);
}

function showInfo(message, formType = "login") {
  showMessage(message, "info", formType);
}

function showMessage(message, type, formType) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert-custom");
  existingAlerts.forEach((alert) => alert.remove());

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-custom alert-dismissible fade show`;
  alertDiv.innerHTML = `
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "danger"
            ? "exclamation-triangle"
            : "info-circle"
        } me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Insert into active form
  const isRegisterActive = document
    .getElementById("sliderContainer")
    .classList.contains("show-register");
  const targetForm = isRegisterActive
    ? document.querySelector(".form-panel:last-child .form-section")
    : document.querySelector(".form-panel:first-child .form-section");

  if (targetForm) {
    targetForm.insertBefore(alertDiv, targetForm.children[2]); // After title and description
  }

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

function goHome() {
  alert("Go back to ChunShyns homepage...");
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  initializeFromURL();
});

// Form Enhancement
document.addEventListener("DOMContentLoaded", function () {
  // Initialize form based on URL parameter
  initializeFromURL();

  // Real-time email validation
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email)) {
        this.classList.add("is-invalid");
      } else if (email) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
      }
    });
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      const isRegisterActive = document
        .getElementById("sliderContainer")
        .classList.contains("show-register");
      if (isRegisterActive) {
        document.getElementById("registerForm").requestSubmit();
      } else {
        document.getElementById("loginForm").requestSubmit();
      }
    }
  });
});
