document.getElementById("cashout-btn").addEventListener("click", function () {
  const inputAgent = document.getElementById("input-agent");
  const agent = inputAgent.value;
  console.log(agent);
  if (agent.length != 11) {
    alert("Invalid Agent Number");
    return;
  }
  //
  const inputAmount = document.getElementById("input-amount");
  const amount = inputAmount.value;
  console.log(amount);
  }
  //
  const balanceAmount = document.getElementById("balance");
  const balance = balanceAmount.innerText;
  console.log(balance);
  //
  const newBalace = Number(balance) - Number(amount);
  if (newBalace < 0) {
    alert("Invalid Amount");
    return;
  }
  //
  const cashoutPin = document.getElementById("cashout-pin");
  const pin = cashoutPin.value;
  if (pin === "1234") {
    alert("Cashout Successful");
    balanceAmount.innerText = newBalace;
  } else {
    alert("Invaild Pin");
    return;
  }
});
