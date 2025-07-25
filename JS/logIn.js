import {
    app,
    auth,
    signInWithEmailAndPassword
} from "./fireBase.js"

const authCheck = () => {
    console.log("authCheck");
    const uid = localStorage.getItem("uid");
    console.log("uid", uid);
    if (uid) {
        window.location.replace("./dashboard.html")
    }

};


const signInHandler = async () => {
try {
        const email = document.querySelector("#loginEmail")
    const password = document.querySelector("#loginPassword")

    console.log(email.value)
    console.log(password.value)
    if (!email.value || !password.value) {
        alert("Required fields are missing")
        return;
    }

    const response = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log("login response", response.user.uid);
    localStorage.setItem("uid", response.user.uid);
    window.location.replace("../HTML/dashboard.html")
} catch (error) {
    alert(error.message)
}


}

window.signInHandler = signInHandler
window.authCheck = authCheck