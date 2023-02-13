var addButton = document.getElementById("add-button");
var lbpamount = document.getElementById("lbp-amount");
var usdamount = document.getElementById("usd-amount");
var buyusdrate = document.getElementById("buy-usd-rate");
var sellusdrate = document.getElementById("sell-usd-rate");
var transactiontype = document.getElementById("transaction-type");
var SERVER_URL = "http://127.0.0.1:5000"
addButton.addEventListener("click", addItem);

function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
    .then(response => response.json())
    .then(data => {
        var usd_to_lbp = data.usd_to_lbp;
        var lbp_to_usd = data.lbp_to_usd;
    });

    sellusdrate.innerHTML = String(usd_to_lbp);
    buyusdrate.innerHTML = String(lbp_to_usd);

   }

fetchRates();
   

function addItem() {

    var x;
    if (transactiontype.value == "usd-to-lbp")
        {
            x = true;
        }
    else
        {
            x = false;
        }

    data = {
        "usd_amount": usdamount.value,
        "lbp_amount": lbpamount.value,
        "usd_to_lbp": x.valueOf
    };

    fetch(`${SERVER_URL}/transaction`), {
        body: JSON.stringify(data),
    }

    lbpamount.value = "";
    usdamount.value = "";

    fetchRates();
}