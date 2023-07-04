let balance = document.querySelector(".balance");

let options = ["rock", "paper", "scissors"];
let angles = { rock: 90, paper: 330, scissors: 210 };

let choiceCont = document.querySelector(".choice_cont");
let spinner = document.querySelector(".spinner");
let enemy = document.querySelector(".enemy");

let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let bet = document.querySelector(".bet");
let betButton = document.querySelector(".bet_button");

let active = true;
let chosen = false;
let steps = 0;

balance.innerHTML = localStorage.balance_b96;

generateSpinner(spinner);
generateSpinner(enemy);

rotateSpinner(spinner, 90);
rotateSpinner(enemy, 30);

for (let option of options) {
  let div = document.createElement("div");
  div.classList.add("choice");
  div.dataset.option = option;

  let img = document.createElement("img");
  img.src = "../png/" + option + ".png";
  div.appendChild(img);

  div.onclick = () => {
    if (!active) {
      return;
    }

    for (let o of document.querySelectorAll(".choice_cont div")) {
      o.classList.remove("chosen");
    }

    for (let spinnerOption of document.querySelectorAll(".spinner div")) {
      spinnerOption.classList.remove("chosen");
    }

    chosen = div.dataset.option;
    div.classList.add("chosen");
    document
      .querySelector(".spinner div." + div.dataset.option)
      .classList.add("chosen");

    rotateSpinner(spinner, angles[div.dataset.option]);
  };

  choiceCont.appendChild(div);
}

plus.onclick = () => {
  if (Number(bet.innerHTML) + 150 > Number(balance.innerHTML) || !active) {
    return;
  }
  bet.innerHTML = Number(bet.innerHTML) + 150;
};

minus.onclick = () => {
  if (Number(bet.innerHTML) < 150 || !active) {
    return;
  }
  bet.innerHTML = Number(bet.innerHTML) - 150;
};

betButton.onclick = () => {
  if (bet.innerHTML == 0 || !active || !chosen) {
    return;
  }
  active = false;

  changeBalance(-Number(bet.innerHTML));

  let enemyOption = moveEnemy();

  setTimeout(() => {
    changeBalance(Number(bet.innerHTML) * checkWin(chosen, enemyOption));
    active = true;
  }, 2100);
};

function generateSpinner(element) {
  let img = document.createElement("img");
  img.src = "../png/sp" + localStorage.getItem("selected_b96") + ".png";
  img.classList.add("major");

  for (let option of options) {
    let div = document.createElement("div");
    div.classList.add("small", option);

    let imgOption = document.createElement("img");
    imgOption.src = "../png/" + option + ".png";
    imgOption.classList.add("small", option);

    div.appendChild(imgOption);
    element.appendChild(div);
  }

  element.appendChild(img);
}

function rotateSpinner(element, deg) {
  element.style.transform = "rotate(" + deg + "deg) scale(0.7)";

  for (let option of element.querySelectorAll("img.small")) {
    option.style.transform = "rotate(-" + deg + "deg)";
  }
}

function moveEnemy() {
  for (let enemyOption of document.querySelectorAll(".enemy div")) {
    enemyOption.classList.remove("red");
  }

  let current =
    (Number(
      enemy.style.transform.replace(/scale(.*)/, "").replace(/\D+/g, "")
    ) -
      30) /
    120;

  console.log(enemy.style.transform);
  console.log(
    enemy.style.transform.replace(/scale(.*)/, "").replace(/\D+/g, "")
  );
  console.log(current);

  let r = randInt(6, 8);
  let enemyOptions = ["scissors", "paper", "rock"];

  steps += r;
  let finalAngel = 30 + (r + current) * 120;
  rotateSpinner(enemy, finalAngel);

  setTimeout(() => {
    document
      .querySelector(".enemy div.small." + enemyOptions[steps % 3])
      .classList.add("red");
  }, 1500);

  return enemyOptions[steps % 3];
}

function checkWin(playerOption, enemyOption) {
  let optionList = ["scissors", "paper", "rock", "scissors", "paper"];

  if (playerOption == enemyOption) {
    return 1;
  }
  for (let i = 1; i < 4; i++) {
    if (playerOption == optionList[i] && enemyOption == optionList[i - 1]) {
      return 0;
    } else if (
      playerOption == optionList[i] &&
      enemyOption == optionList[i + 1]
    ) {
      return 2;
    }
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBalance(amount) {
  localStorage.setItem(
    "balance_b96",
    Number(localStorage.getItem("balance_b96")) + amount
  );
  balance.innerHTML = localStorage.getItem("balance_b96");
}
