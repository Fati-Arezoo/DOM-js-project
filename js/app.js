/* ========================= Selecting DOM Elements ============================= */
const $form = document.querySelector("#form");
const studentInput = document.querySelector(".student");
const courseInput = document.querySelector(".course");
const teacherInput = document.querySelector(".teacher");
const submitBtn = document.querySelector(".subButton");
const iconOne = document.querySelector(".fa-user");
const iconTwo = document.querySelector(".fa-book");
const iconThree = document.querySelector(".fa-user-tie");
const cards = document.querySelector(".cards");
const loading = document.querySelector(".loading");
const loadingTwo = document.querySelector(".loadingTwo");
/* ======================== Add Event Listeners ================================== */
document.addEventListener("DOMContentLoaded", loadingSite);
$form.addEventListener("submit", addNewStudent);
$form.addEventListener("keydown", disableSubmitBtn);
cards.addEventListener("click", deletCard);
/* ================================= Utillitis ================================= */
function loadingSite() {
  disableSubmitBtn();
  loadSite();
}
/* =============================Local Storage================================= */
function loadDataFromLocalStorage() {
  let data;
  if (localStorage.getItem("tasks")) {
    data = JSON.parse(localStorage.getItem("tasks")); //to javascript object //
  } else {
    data = [];
  }
  return data;
}
// /* ================== Disable submit button if input are empty================== */
function disableSubmitBtn() {
  if (
    studentInput.value === "" ||
    courseInput.value === "" ||
    teacherInput.value === ""
  ) {
    submitBtn.disabled = true;
  } else submitBtn.disabled = false;
}

/* ============================ Function Submit Form ============================= */
function addNewStudent(e) {
  e.preventDefault();

  loadingBoxs();
  setTimeout(function () {
    resetForm();
    LoadingClose();
    let card = document.createElement("div");
    card.innerHTML = createCard(registerInfo);
    cards.appendChild(card);
  }, 2000);

  const data = loadDataFromLocalStorage();

  // Created an object and put value and img //
  const registerInfo = {
    studentName: studentInput.value,
    coursName: courseInput.value,
    teacherName: teacherInput.value,
    coursePicture: Math.floor(Math.random() * 6),
  };

  data.push(registerInfo); // Add the inputs values into the data struture //
  localStorage.setItem("tasks", JSON.stringify(data)); //SavelocalStorage

  /* Clear input  */
  studentInput.value = "";
  courseInput.value = "";
  teacherInput.value = "";

  /* Run the disable function  */
  disableSubmitBtn();
}

/* ============================ Loadingpic and text============================= */
function loadingBoxs() {
  loadingTwo.style.display = "flex";
  loading.style.display = "flex";
}

function LoadingClose() {
  loading.style.display = "none";
  loadingTwo.style.display = "none";
}
/* ===============================Resetform===================================== */
function resetForm() {
  studentInput.setAttribute("style", "border:none");
  iconOne.setAttribute("style", "border:2px solid #f1ab27;");
  teacherInput.setAttribute("style", "border:none");
  iconTwo.setAttribute("style", "border:2px solid #f1ab27;");
  courseInput.setAttribute("style", "border:none");
  iconThree.setAttribute("style", "border:2px solid #f1ab27;");
}

/* ==================Border runt input and icon================================= */
studentInput.addEventListener("blur", function (e) {
  if (this.value !== "") {
    setSuccessFor(this);
    iconOne.setAttribute("Style", "border: 2px solid #0cd30cd2;");
    return;
  }
  iconOne.setAttribute("style", "border:2px solid #e74c3c;");
  setErrorFor(this);
});

courseInput.addEventListener("blur", function (e) {
  if (this.value !== "") {
    setSuccessFor(this);
    iconTwo.setAttribute("Style", "border: 2px solid #0cd30cd2;");
    return;
  }
  iconTwo.setAttribute("style", "border:2px solid #e74c3c;");
  setErrorFor(this);
});

teacherInput.addEventListener("blur", function (e) {
  if (this.value !== "") {
    setSuccessFor(this);
    iconThree.setAttribute("Style", "border: 2px solid #0cd30cd2;");
    return;
  }
  iconThree.setAttribute("style", "border:2px solid #e74c3c;");
  setErrorFor(this);
});

/* =================== Error function =================== */
function setErrorFor(input) {
  input.setAttribute("style", "border: 2px solid  #e74c3c;");
}
/* =================== Success function =================== */
function setSuccessFor(input) {
  input.setAttribute("style", "border: 2px solid  #2ecc71;");
}
/* =================== Delete function =================== */
function deletCard(e) {
  if (e.target.classList.contains("delete")) {
    const cardId = e.target.parentElement.parentElement;
    cardId.remove();
  }
}

/* ============================== created htmlCode =========================== */
function createCard(registerInfo) {
  let htmlCode = `
    <div class="card card-one">
        <div class="card-header header-one">
        <div class="delete">&times</div>
            <img src="/img/img-${registerInfo.coursePicture}.jpg" class="img">
        </div>
        <div class="card-body">
            <p class="card-body-title">Name: <span class="text text-one">${registerInfo.studentName}</span>
            </p>
            <p class="card-body-title">course: <span class="text text-two">${registerInfo.coursName}</span>
            </p>
            <p class="card-body-title">Teacher: <span class="text">${registerInfo.teacherName}</span>
            </p>
        </div>
    </div>  
    `;
  return htmlCode;
}

/* ============================ Function Reload Page =========================== */
function loadSite() {
  const data = loadDataFromLocalStorage();
  let htmlCode = "";
  for (let i = 0; i < data.length; i++) {
    // <-- Loop through the data and save it in the DOM //
    htmlCode += createCard(data[i]);
  }
  cards.innerHTML = htmlCode;
}
