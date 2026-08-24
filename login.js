/* =========================================================
   TECHHUB GHANA
   LOGIN.JS
   =========================================================
   Handles:
   - Mobile navigation menu
   - Login form validation
   - Reading account created by signup.js
   - Checking email and password
   - Creating login session
   - Saving current user
   - Redirecting to dashboard.html
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");


            const isOpen =
                navMenu.classList.contains("show");


            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu after clicking a navigation link */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {
        return;
    }


    /* =====================================================
       FORM ELEMENTS
    ===================================================== */

    const emailInput =
        document.getElementById("loginEmail");


    const passwordInput =
        document.getElementById("loginPassword");


    const errorMessage =
        document.getElementById("loginError");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !emailInput ||
        !passwordInput ||
        !errorMessage
    ) {
        return;
    }


    /* =====================================================
       LOGIN FORM SUBMISSION
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* =================================================
               CLEAR PREVIOUS ERROR
            ================================================== */

            errorMessage.textContent = "";


            /* =================================================
               GET USER INPUT
            ================================================== */

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            /* =================================================
               VALIDATE EMAIL
            ================================================== */

            if (!email) {

                errorMessage.textContent =
                    "Please enter your email address.";

                emailInput.focus();

                return;
            }


            if (!emailInput.checkValidity()) {

                errorMessage.textContent =
                    "Please enter a valid email address.";

                emailInput.focus();

                return;
            }


            /* =================================================
               VALIDATE PASSWORD
            ================================================== */

            if (!password) {

                errorMessage.textContent =
                    "Please enter your password.";

                passwordInput.focus();

                return;
            }


            /* =================================================
               GET SAVED USER
            ================================================== */

            const savedUser =
                localStorage.getItem(
                    "techhubUser"
                );


            /* =================================================
               NO ACCOUNT FOUND
            ================================================== */

            if (!savedUser) {

                errorMessage.textContent =
                    "No TechHub Ghana account was found. Please create an account first.";

                return;
            }


            /* =================================================
               CONVERT SAVED USER FROM JSON
            ================================================== */

            let user;


            try {

                user =
                    JSON.parse(savedUser);

            } catch (error) {

                errorMessage.textContent =
                    "There is a problem with your saved account. Please create your account again.";

                localStorage.removeItem(
                    "techhubUser"
                );

                return;
            }


            /* =================================================
               GET SAVED ACCOUNT INFORMATION
            ================================================== */

            const savedEmail =
                (user.email || "")
                    .trim()
                    .toLowerCase();


            const savedPassword =
                user.password || "";


            /* =================================================
               CHECK ACCOUNT INFORMATION
            ================================================== */

            if (
                email === savedEmail &&
                password === savedPassword
            ) {


                /* =============================================
                   LOGIN SUCCESSFUL
                ============================================== */

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                /* =============================================
                   SAVE CURRENT USER
                ============================================== */

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify({

                        username:
                            user.username || "",

                        email:
                            user.email || ""

                    })
                );


                /* =============================================
                   CLEAR FORM
                ============================================== */

                loginForm.reset();


                /* =============================================
                   REDIRECT TO DASHBOARD
                ============================================== */

                window.location.href =
                    "dashboard.html";


                return;
            }


            /* =================================================
               LOGIN FAILED
            ================================================== */

            errorMessage.textContent =
                "Incorrect email or password.";

        }
    );

});
