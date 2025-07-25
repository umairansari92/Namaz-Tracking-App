const logoutButton = document.querySelector(".navbar button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    // Perform logout logic here
    window.location.replace("../index.html");
  });
}