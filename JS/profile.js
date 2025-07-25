import { auth, onAuthStateChanged } from "../firebase.js";

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Access Denied',
        text: 'Please login first to access this page!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        window.location.replace("../index.html");
      });
    }
  });
});
const logoutButton = document.querySelector(".navbar button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully!',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.replace("./index.html");
    });
  });
}