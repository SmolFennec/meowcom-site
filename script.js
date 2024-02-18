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
    document.getElementById("form").style.display = "block";
}

document.getElementById("formbox").style.height = "300px";
document.getElementById("formbox").style.cursor = "default";
document.getElementById("close").style.display = "block";
}

function closeReviewForm(event) {
event.stopPropagation();
document.getElementById("form").style.display = "none";
document.getElementById("formbox").style.height = "50px";
document.getElementById("formbox").style.cursor = "pointer";
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
        document.getElementById("name").value = "";
        document.getElementById("review").value = "";
})
    .catch(console.error);

});