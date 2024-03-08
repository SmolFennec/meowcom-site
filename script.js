let mobileMenu = document.getElementById("mobilemenu");
document.getElementById("burger").addEventListener("click", function() {
    if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
        // If menu is closed, open it
        mobileMenu.style.display = "block";
        mobileMenu.classList.remove("closed");
        mobileMenu.classList.add("open");
        document.body.style.overflow = 'hidden';
    } else {
        // If menu is open, close it
        mobileMenu.classList.remove("open");
        mobileMenu.classList.add("closed");

        // Wait for the animation to finish before hiding the element
        setTimeout(function() {
            if (mobileMenu.classList.contains("closed")) {
                mobileMenu.style.display = "none";
            }
        }, 500); // The timeout should be equal to the duration of the animation

        document.body.style.overflow = 'auto';
    }
});