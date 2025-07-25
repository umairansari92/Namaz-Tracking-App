import {
    app,
    auth,
    signInWithEmailAndPassword
} from "../firebase.js";

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
        const email = document.querySelector("#loginEmail");
        const password = document.querySelector("#loginPassword");

        if (!email.value || !password.value) {
            Swal.fire({
                icon: 'error',
                title: 'Required Fields',
                text: 'Please enter both email and password!',
                confirmButtonText: 'OK'
            });
            return;
        }

        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        localStorage.setItem("uid", response.user.uid);
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome!',
            confirmButtonText: 'Continue'
        }).then(() => {
            window.location.replace("../HTML/dashboard.html");
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.message,
            confirmButtonText: 'OK'
        });
    }


}

window.signInHandler = signInHandler
window.authCheck = authCheck