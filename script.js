var logged = false;
var accessToken = null;
var tokenType = null;
var userdata = null;
window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
} 



function openReviewForm() {
if (accessToken != null) {
    document.getElementById("form").classList.add("show");
}

document.getElementById("formbox").classList.add("opensmall")
document.getElementById("close").style.display = "block";
}

function closeReviewForm(event) {
event.stopPropagation();
document.getElementById("form").style.display = "none";
document.getElementById("formbox").classList.remove("opensmall")
document.getElementById("close").style.display = "none";
}

document.getElementById("formbox").addEventListener("click", openReviewForm);
document.getElementById("close").addEventListener("click", closeReviewForm);


document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();

    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    .then(result => result.json())
    .then(response => {
        userdata = response;
    

        var username = (document.getElementById("name").value);
        var content = "Username: " + (userdata.username) + "\n" + "userID: " + (userdata.id) + "\n" + "time: " + new Date().toLocaleString() + "\n" + "Reviewee Name: " + document.getElementById("name").value + "\n" + "Review: " + document.getElementById("review").value + "\n" + "Avatar: " + `https://cdn.discordapp.com/avatars/${userdata.id}/${userdata.avatar}.png`;

        if (!username || !content) {
            alert("Please fill out all fields");
            return;
        }

        else if (content.length > 1000) {
            alert("Review is too long");
            return;
        }

        else if (content.includes("@")) {
            alert("Review cannot contain @ symbol");
            return;
        }
        else{
            fetch('https://discord.com/api/webhooks/1207797237250527242/tkKJb_hdcAyaU5wTpjb1VOygaxnfQ1tLRTs3KWolrFhFN4hzdWfwbLojFsRw5ERv8STd', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content
                }),
            });
        }
        console.log("0")
        document.getElementById("name").value = "";
        document.getElementById("review").value = "";
        document.getElementById("form").style.display = "none";
        document.getElementById("formbox").style.height = "50px";
        document.getElementById("formbox").style.cursor = "pointer";
        document.getElementById("close").style.display = "none";
        document.getElementById("overlay").style.display = "block";
        document.getElementById("alert").style.display = "block";
})
    .catch(console.error);

});

function CloseAlert() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("alert").style.display = "none";
}
document.getElementById("alrtcls").addEventListener("click", CloseAlert);


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