const countryList = {
  AUD: "AU",
  BGN: "BG",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  CZK: "CZ",
  DKK: "DK",
  EUR: "FR",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KRW: "KR",
  MXN: "MX",
  MYR: "MY",
  NOK: "BV",
  NZD: "NZ",
  PHP: "PH",
  PLN: "PL",
  RON: "RO",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  USD: "US",
  ZAR: "ZA"
};


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let opt = document.createElement("option");
    opt.innerText = currCode;
    opt.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      opt.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      opt.selected = "selected";
    }
    select.append(opt);
  }

  select.addEventListener("change", evt => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  if (countryCode && img) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};

const updateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amtVal = amountInput.value;
  if (!amtVal || Number(amtVal) < 1) {
    amtVal = 1;
    // amountInput.value = "1";
  }

  const fromCode = fromCurr.value;
  const toCode = toCurr.value;

  const url = `https://api.frankfurter.app/latest?from=${fromCode}&to=${toCode}&amount=${amtVal}`;
  console.log("Fetching:", url);
  msg.innerText = "Loading...";

  try {
    const response = await fetch(url);
    console.log("Status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("JSON data:", data);

    if (!data.rates || data.rates[toCode] == null) {
      throw new Error("No rate available in response");
    }

    const rate = data.rates[toCode];
    const finalAmount = (rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCode} = ${finalAmount} ${toCode}`;
  } catch (err) {
    console.error("Error:", err);
    msg.innerText = "Error fetching exchange rate. Try again later.";
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// }

// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data[toCurr.value.toLowerCase()];

//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });

