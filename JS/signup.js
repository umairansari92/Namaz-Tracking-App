import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
} from "../firebase.js";

console.log("auth", auth);

const authCheck = () => {
    console.log("authCheck");
    const uid = localStorage.getItem("uid");
    console.log("uid", uid);
    if (uid) {
        window.location.replace("./dashboard.html")
    }

};



const signUpHandler = async () => {

    try {
        const firstName = document.querySelector("#firstName");
        const lastName = document.querySelector("#lastName");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");

        // Field validation
        if (!firstName.value || !lastName.value || !email.value || !password.value) {
            Swal.fire({
                icon: 'error',
                title: 'Required Fields',
                text: 'Please fill in all fields!',
                confirmButtonText: 'OK'
            });
            return;
        }

        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const userUId = response.user.uid;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const signupDate = `${yyyy}-${mm}-${dd}`;

        const userObject = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            uid: response.user.uid,
            signupDate: signupDate
        };
        await setDoc(doc(db, "users", userUId), userObject);
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your account has been created!',
            confirmButtonText: 'Continue'
        }).then(() => {
            window.location.replace("../index.html");
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error.message,
            confirmButtonText: 'OK'
        });
    }
}

window.signUpHandler = signUpHandler;
window.authCheck = authCheck; 