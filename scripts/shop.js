if (!localStorage.items_b96) {
  localStorage.items_b96 = JSON.stringify(["1"]);
}

$(".balance").html(localStorage.balance_b96);

let bought = JSON.parse(localStorage.items_b96);
let selected = localStorage.selected_b96;

let shopItems = [
  { name: "1", price: 0 },
  { name: "2", price: 1000 },
  { name: "3", price: 1000 }
];

shopItems.forEach((item) => {
  item.bought = bought.includes(item.name);
  item.selected = item.name == selected;
});

renderCards();

$(".hidden").removeClass("hidden");

function renderCards() {
  $(".shop").html("");

  shopItems.forEach((item) => {
    let cardHtml = `
              <div class="card" data-name="${item.name}">
              <div class="card_top block">
                <img src="../png/sp${
                  item.name
                }.png" alt="" class="card_pic" />              
              </div>

                  ${getCardHTML(item)}
              </div>
          `;

    $(".shop").append(cardHtml);

    function getCardHTML(item) {
      if (!item.bought) {
        return `
                      <div class="card_btn gray btn" data-price="${item.price}">
                        BUY
                        <!-- <img src="../png/coin.png"/> -->  
                        <!-- <div>${item.price}</div> -->
                      </div>
                      `;
      } else {
        return `
                  <div class="card_btn btn" data-price="${item.price}">
                      <div>${item.selected ? "Selected" : "Select"}</div>
                  </div>
                  `;
      }
    }
  });

  $(".card_btn").click(function () {
    let btnIndex = $(".card_btn").index($(this));
    let shopItem = shopItems[btnIndex];

    if (!shopItem.bought) {
      if (localStorage.balance_b96 < shopItem.price) {
        return;
      }

      changeBalance(-$(this).data("price"));
      shopItem.bought = true;
      localStorage.items_b96 = JSON.stringify([
        ...JSON.parse(localStorage.items_b96),
        shopItem.name
      ]);
      renderCards();
      console.log(shopItems);
    } else if (!shopItem.selected) {
      localStorage.selected_b96 = shopItem.name;
      shopItems.forEach((item) => (item.selected = false));
      shopItem.selected = true;
      renderCards();
    }
  });
}

function changeBalance(amount) {
  localStorage.balance_b96 = +localStorage.balance_b96 + amount;
  $(".balance").html(localStorage.balance_b96);
}
