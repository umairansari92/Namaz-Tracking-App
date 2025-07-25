import { auth, onAuthStateChanged } from "../firebase.js";

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    const uidLocal = localStorage.getItem("uid");
    if (!uidLocal || !user || user.uid !== uidLocal) {
      Swal.fire({
        icon: 'warning',
        title: 'رسائی ممنوع',
        text: 'براہ کرم پہلے لاگ ان کریں!',
        confirmButtonText: 'لاگ ان پر جائیں'
      }).then(() => {
        window.location.replace("./index.html");
      });
    }
  });
});
const logoutButton = document.querySelector(".navbar button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    Swal.fire({
      icon: 'success',
      title: 'لاگ آؤٹ',
      text: 'آپ کامیابی سے لاگ آؤٹ ہو گئے ہیں!',
      confirmButtonText: 'ٹھیک ہے'
    }).then(() => {
      window.location.replace("./index.html");
    });
  });
}