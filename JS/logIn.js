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
                title: 'تمام فیلڈز لازمی ہیں',
                text: 'براہ کرم ای میل اور پاسورڈ درج کریں!',
                confirmButtonText: 'ٹھیک ہے'
            });
            return;
        }

        const response = await signInWithEmailAndPassword(auth, email.value, password.value);
        localStorage.setItem("uid", response.user.uid);
        Swal.fire({
            icon: 'success',
            title: 'لاگ ان کامیاب',
            text: 'خوش آمدید!',
            confirmButtonText: 'جاری رکھیں'
        }).then(() => {
            window.location.replace("../HTML/dashboard.html");
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'لاگ ان ناکام',
            text: error.message,
            confirmButtonText: 'ٹھیک ہے'
        });
    }


}

window.signInHandler = signInHandler
window.authCheck = authCheck