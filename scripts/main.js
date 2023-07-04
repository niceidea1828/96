if (!localStorage.balance_b96) {
  localStorage.balance_b96 = 10000;
}

if (!localStorage.selected_b96) {
  localStorage.selected_b96 = 1;
}

$(".balance").html(localStorage.balance_b96);
