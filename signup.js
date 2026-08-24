/* =========================================================
   TECHHUB GHANA
   SIGNUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("signupForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        /* =================================================
           GET FORM VALUES
        ================================================== */

        const usernameInput =
            document.getElementById("username");

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");


        if (
            !usernameInput ||
            !emailInput ||
            !passwordInput
        ) {
            return;
        }


        const username =
            usernameInput.value.trim();

        const email =
            emailInput.value.trim().toLowerCase();

        const password =
            passwordInput.value;


        /* =================================================
           VALIDATION
        ================================================== */

        if (!username || !email || !password) {

            alert(
                "Please complete all fields."
            );

            return;
        }


        if (username.length < 2) {

            alert(
                "Please enter a valid name."
            );

            usernameInput.focus();

            return;
        }


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            passwordInput.focus();

            return;
        }


        /* =================================================
           CHECK EMAIL FORMAT
        ================================================== */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return;
        }


        /* =================================================
           GET EXISTING USERS
        ================================================== */

        let users = [];


        try {

            users =
                JSON.parse(
                    localStorage.getItem(
                        "techhubUsers"
                    )
                ) || [];


            if (!Array.isArray(users)) {
                users = [];
            }

        } catch (error) {

            console.error(
                "Unable to read saved users:",
                error
            );

            users = [];
        }


        /* =================================================
           CHECK IF EMAIL ALREADY EXISTS
        ================================================== */

        const exists =
            users.some(
                (user) =>
                    user.email &&
                    user.email.toLowerCase() === email
            );


        if (exists) {

            alert(
                "An account with this email already exists."
            );

            emailInput.focus();

            return;
        }


        /* =================================================
           CREATE USER
           
           NOTE:
           This localStorage method is suitable only for
           a simple demo/student project.

           Do NOT use plain-text password storage for a
           real production authentication system.
        ================================================== */

        const user = {

            username: username,

            email: email,

            password: password

        };


        users.push(user);


        /* =================================================
           SAVE USERS
        ================================================== */

        try {

            localStorage.setItem(
                "techhubUsers",
                JSON.stringify(users)
            );

        } catch (error) {

            console.error(
                "Unable to save account:",
                error
            );

            alert(
                "Unable to create your account. Please try again."
            );

            return;
        }


        /* =================================================
           SAVE CURRENT USER
        ================================================== */

        try {

            localStorage.setItem(
                "techhubUser",
                JSON.stringify(user)
            );

        } catch (error) {

            console.error(
                "Unable to save current user:",
                error
            );
        }


        /* =================================================
           SUCCESS
        ================================================== */

        alert(
            "Account created successfully! 🎉"
        );


        window.location.href =
            "login.html";

    });

});
