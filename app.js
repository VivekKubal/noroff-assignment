let newLoan = document.getElementById("loanBalance");
let repayId = document.getElementById("repay-loan");
let loanBalance = 0;

function getLoan() {
  let loanSelection = prompt("Get Loan", "Type your Loan Amount");

  let gotLoan = loanSelection;
  let loanAllowed = newBalance.textContent * 2;

  if (loanSelection > loanAllowed) {
    alert(`Upto ${loanAllowed} kr loan allowed`);
  } else if (loanSelection != null && isNaN(loanSelection) === false) {
    newLoan.innerText = gotLoan;
    repayId.style.visibility = "visible";
  }
}

let salaryIncreament = document.getElementById("increaseSalary");
let salary = 0;

function addSalary() {
  salary += 100;
  salaryIncreament.innerText = salary;
}

let newBalance = document.getElementById("bank-balance");
let latestBalance = 0;

function bankSaving() {
  if (newLoan.textContent > 0) {
    let calcResult = (salary / 100) * 10;

    let deposit = salary - calcResult;
    latestBalance = latestBalance + deposit;
    newBalance.innerHTML = latestBalance;

    let payLoan = newLoan.textContent;
    payLoan = payLoan - calcResult;
    newLoan.innerText = payLoan;
  } else {
    latestBalance = latestBalance + salary;
    newBalance.innerHTML = latestBalance;
  }
  salary = 0;
  salaryIncreament.innerHTML = salary;
}

let updatedLoan = 0;

function repayLoan() {
  if (newLoan.textContent > salary) {
    updatedLoan = newLoan.textContent - salary;
    newLoan.innerHTML = updatedLoan;
  } else if (newLoan.textContent <= salary) {
    let depositAmount = salary - newLoan.textContent;
    latestBalance = latestBalance + depositAmount;
    newBalance.innerHTML = latestBalance;
    newLoan.innerHTML = 0;
    if (newLoan.textContent <= 0) {
      repayId.style.visibility = "hidden";
    }
  }
  salary = 0;
  salaryIncreament.innerHTML = salary;
}

// FETCHING DATA FROM API
//DOM ELEMENTS
const laptopSelection = document.getElementById("laptopSelection");

const laptopId = document.getElementById("laptop-id");
const laptopImage = document.getElementById("laptop-image");
const laptopTitle = document.getElementById("laptop-title");
const laptopSpecs = document.getElementById("laptop-specs");
const laptopDesc = document.getElementById("laptop-desc");

const laptopPrice = document.getElementById("laptop-price");
const laptopInStock = document.getElementById("laptop-stock");

// EVENT LISTENERS
laptopSelection.addEventListener("change", showSelectedPC);

const apiUrl = "https://hickory-quilled-actress.glitch.me/computers";
const imgUrl = "https://hickory-quilled-actress.glitch.me/";
let laptops = [];

// API CALLING
async function getLaptopData() {
  try {
    const response = await fetch(apiUrl);
    const laptopInfo = await response.json();
    laptops = laptopInfo;
  } catch (error) {
    console.log(error.message);
  } finally {
    createSelect();
  }
}
getLaptopData();

// Function to create Select
function createSelect() {
  const opt = document.createElement("option");

  opt.value = 0;
  opt.innerHTML = "Choose Laptop";
  laptopSelection.appendChild(opt);

  for (const newLaptop of laptops) {
    const opt = document.createElement("option");
    opt.value = newLaptop.id;
    opt.innerHTML = newLaptop.title;
    laptopSelection.appendChild(opt);
  }
  console.log(laptopSelection);
}

let showLaptops = document.getElementById("laptop-info");

// Function for Events
function showSelectedPC() {
  if (laptopSelection.value != 0) {
    showLaptops.style.visibility = "visible";

    laptopDesc.innerText = laptops[laptopSelection.value - 1].description;
    laptopTitle.innerText = laptops[laptopSelection.value - 1].title;
    laptopSpecs.innerText = laptops[laptopSelection.value - 1].specs;
    laptopPrice.innerText = laptops[laptopSelection.value - 1].price;
    laptopInStock.innerText = laptops[laptopSelection.value - 1].stock;
    laptopImage.src = imgUrl + laptops[laptopSelection.value - 1].image;
    laptopImage.alt = laptops[laptopSelection.value - 1].title;
  } else {
    showLaptops.style.visibility = "hidden";
  }
}

// Laptop buying process
/*EVENT LISTENER*/
const buyNow = document.getElementById("buy-now");
buyNow.addEventListener("click", buyNowProcess);

let currentStock = 0;
function buyNowProcess() {
  const laptopAmount = laptopPrice.innerText;
  currentStock = laptopInStock.innerText;

  if (latestBalance < laptopAmount) {
    alert("Insufficient Balance to buy the Laptop");
  } else if (latestBalance >= laptopAmount && currentStock > 0) {
    latestBalance -= laptopAmount;
    newBalance.innerHTML = latestBalance;
    alert("Congratulations! You bought a new Laptop");
    currentStock -= 1;
    laptopInStock.innerText = currentStock;
  } else if (currentStock <= 0) {
    alert("Product is out of stock");
  }
}
