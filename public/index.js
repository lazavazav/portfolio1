//get modal element for courses
const modal = document.getElementById("coursesModal");

//get modal button
const courseLink = document.getElementById("educ");

//get close button
const closeBtn = document.getElementsByClassName("closeBtn")[0];

//listen for click event
courseLink.addEventListener("click", openModal); 
//listen for click event
closeBtn.addEventListener("click", closeModal);

//function to open Modal
  function openModal() {
    modal.style.display = "block";
  }

//function to close modal
  function closeModal() {
    modal.style.display = "none";
  }