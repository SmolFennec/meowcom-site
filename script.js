function openReviewForm() {
  document.getElementById("form").style.display = "block";
  document.getElementById("formbox").style.height = "300px";
}

function closeReviewForm() {
  document.getElementById("form").style.display = "none";
  document.getElementById("formbox").style.height = "50px";
}

document.getElementById("form").addEventListener("click" , openReviewForm);
document.getElementById("close").addEventListener("click" , closeReviewForm);