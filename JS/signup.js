import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
} from "./firebase.js";

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
        const firstName = document.querySelector("#firstName")
    const lastName = document.querySelector("#lastName")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")


    console.log("firstName", firstName.value);
    console.log("lastName", lastName.value);
    console.log("email", email.value);
    console.log("password", password.value);

    const response = await createUserWithEmailAndPassword(auth, email.value, password.value)

    console.log("user", response);
    const userUId = response.user.uid
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
    }
    const userResponse = await setDoc(doc(db, "users", userUId), userObject)
    console.log(userResponse, "userResponse")
        window.location.replace("../index.html");
    } catch (error) {
        console.log("error", error.message);
    }
}

window.signUpHandler = signUpHandler;
window.authCheck = authCheck; 