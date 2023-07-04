let balance = document.querySelector(".balance");
let slotCont = document.querySelector(".slot_cont");

let slotPicLinks = [];
for (let i = 0; i < 4; i++) {
  slotPicLinks.push("../png/slot_" + (i + 1) + ".png");
}

let active = true;

for (let i = 0; i < 4; i++) {
  let slot = document.createElement("div");
  slot.classList.add("slot");

  let slotPics = document.createElement("div");
  slotPics.classList.add("slot_pics");

  generatePics(slotPics, 3);

  slot.appendChild(slotPics);

  slotCont.appendChild(slot);
}

let bet = 0;
let chosen = false;

let betButton = document.querySelector(".bet_button");
let slotPicsNodes = document.querySelectorAll(".slot_pics");

let warning = document.querySelector(".warning");
let playAgain = document.querySelector(".warning .button");
let betOptions = document.querySelectorAll(".bet_option");

for (let betOption of betOptions) {
  betOption.onclick = () => {
    if (!active) {
      return;
    }

    for (let b of betOptions) {
      b.classList.remove("chosen");
    }
    betOption.classList.add("chosen");
    chosen = true;
    bet = Number(betOption.innerHTML);
  };
}

playAgain.onclick = () => {
  for (let slotPics of slotPicsNodes) {
    slotPics.style.transition = "none";
    slotPics.innerHTML = "";
    slotPics.style.top = 0;
    generatePics(slotPics, 3);
  }

  warning.style.left = "-50%";
  active = true;
};

betButton.onclick = () => {
  betSingle();
};

function betSingle() {
  if (!bet || !active) {
    return;
  }
  active = false;

  changeBalance(-Number(bet));

  let r = randInt(1, 3);
  let winSlot = slotPicLinks[randInt(1, 4) - 1];
  let ind = 0;
  let order = shuffle(slotPicLinks);

  for (let slotPics of slotPicsNodes) {
    slotPics.style.transition = "top ease 4s";
    generatePics(slotPics, 24, r, winSlot, ind, order);
    ind++;
    slotPics.style.top =
      Number(slotPics.style.top.replace("px", "")) - 2160 + "px";
  }

  let prize = Number(bet) * 5;

  setTimeout(() => {
    if (r == 1) {
      changeBalance(prize);
    }
  }, 4100);

  setTimeout(() => {
    warning.firstElementChild.innerHTML =
      r == 1
        ? "Congrats!<br/>You have won " + prize
        : "No way!<br/>Try again right now";
    warning.style.left = "200px";
  }, 4500);
}

function generatePics(slotPics, count, r, winSlot, ind, order) {
  let shuffledLinks = shuffle(slotPicLinks);

  for (let j = 0; j < count; j++) {
    let slotPic = document.createElement("img");

    if (j == 22) {
      slotPic.src = r == 1 ? winSlot : shuffledLinks[randInt(1, 4) - 1];
      if (r == 1) {
        slotPic.src = winSlot;
      } else {
        slotPic.src = order[ind];
      }
    } else {
      slotPic.src = j < 4 ? shuffledLinks[j] : shuffledLinks[randInt(1, 4) - 1];
    }
    slotPics.appendChild(slotPic);
  }
}

function changeBalance(amount) {
  localStorage.setItem(
    "balance_spinner",
    Number(localStorage.getItem("balance_spinner")) + amount
  );
  balance.innerHTML = localStorage.getItem("balance_spinner");
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
