var addButton = document.getElementById("add-button");
var lbpamount = document.getElementById("lbp-amount");
var usdamount = document.getElementById("usd-amount");
var buyusdrate = document.getElementById("buy-usd-rate");
var sellusdrate = document.getElementById("sell-usd-rate");
var transactiontype = document.getElementById("transaction-type");
addButton.addEventListener("click", addItem);
var sellUsdTransactions = [];
var buyUsdTransactions = [];
function addItem() {

    var ratio;
    ratio = lbpamount.value/usdamount.value;

    if (transactiontype.value == "usd-to-lbp")
    {
        sellUsdTransactions.push(ratio);
    }
    else
    {
        buyUsdTransactions.push(ratio);
    }
    lbpamount.value = "";
    usdamount.value = "";

 updateRates();
}
function updateRates() {

    var x;
    var y;

    if (sellUsdTransactions.length != 0)
    {
        x = sellUsdTransactions.reduce((a, b) => a + b, 0) / sellUsdTransactions.length;
        x = x.toFixed(2);
        sellusdrate.innerHTML = String(x);

    }

    if (buyUsdTransactions.length != 0)
    {
        
        y = buyUsdTransactions.reduce((a, b) => a + b, 0) / buyUsdTransactions.length;
        y = y.toFixed(2);
        buyusdrate.innerHTML = String(y);

    }
 
}