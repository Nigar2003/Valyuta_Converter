let lefts = document.querySelectorAll(".currency-option-left");
let rights = document.querySelectorAll(".currency-option-right");
let fromInput = document.querySelector("#from-input");
let toInput = document.querySelector("#to-input");
let baseCurrency = "AZN";
const apiKey = "02b9297af21e3deb288542cd";

document
  .querySelectorAll(".leftSide .currency-option-left")
  .forEach((option) => {
    option.addEventListener("click", (event) => {
      const selectedCurrency = event.target.textContent;

      document
        .querySelectorAll(".leftSide .currency-option-left")
        .forEach((opt) => {
          opt.classList.remove("default");
        });

      event.target.classList.add("default");
    });
  });

document
  .querySelectorAll(".rightSide .currency-option-right")
  .forEach((option) => {
    option.addEventListener("click", (event) => {
      const selectedCurrency = event.target.textContent;

      document
        .querySelectorAll(".rightSide .currency-option-right")
        .forEach((opt) => {
          opt.classList.remove("default");
        });

      event.target.classList.add("default");
    });
  });

lefts.forEach((item) =>
  item.addEventListener("click", function () {
    let activeCurrencyRight = document.querySelector(
      ".currency-right>.default"
    );

    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error something went wrong");
        }
        return response.json();
      })
      .then((data) => data["conversion_rates"])
      .then((data) => {
        console.log(data[activeCurrencyRight.innerHTML]);
        toInput.value = (
          data[activeCurrencyRight.innerHTML] * fromInput.value
        ).toFixed(4);
      })
      .catch((error) => {
        console.log("Error something went wrong");
      });

    document.querySelector("#from-currency").innerHTML = this.innerHTML;
    document.querySelector("#from-input").innerHTML =
      activeCurrencyRight.innerHTML;
    document.querySelector("#to-currency").innerHTML =
      activeCurrencyRight.innerHTML;
    document.querySelector("#to-input").innerHTML = this.innerHTML;
  })
);

rights.forEach((item) =>
  item.addEventListener("click", function () {
    let activeCurrencyLeft = document.querySelector(".currency-left>.default");

    fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error something went wrong");
        }
        return response.json();
      })
      .then((data) => data["conversion_rates"])
      .then((data) => {
        console.log(data[activeCurrencyLeft.innerHTML]);
        fromInput.value = (
          data[activeCurrencyLeft.innerHTML] * toInput.value
        ).toFixed(4);

      })
      .catch((error) => {
        console.log("Error something went wrong");
      });

    document.querySelector("#to-currency").innerHTML = this.innerHTML;
    document.querySelector("#to-input").innerHTML =
      activeCurrencyLeft.innerHTML;
    document.querySelector("#from-currency").innerHTML =
      activeCurrencyLeft.innerHTML;
    document.querySelector("#from-input").innerHTML = this.innerHTML;
  })
);

fromInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9.]/g, "");

  const dots = this.value.match(/\./g) || [];
  if (dots.length > 1) {
    this.value = this.value.slice(0, -1);
  }

  let activeCurrency = document.querySelector(".currency-left>.default");
  let activeCurrencyRight = document.querySelector(".currency-right>.default");

  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error something went wrong");
      }
      return response.json();
    })
    .then((data) => data["conversion_rates"])
    .then((data) => {
      console.log(data[activeCurrencyRight.innerHTML]);
      toInput.value = (
        data[activeCurrencyRight.innerHTML] * fromInput.value
      ).toFixed(4);
    })
    .catch((error) => {
      console.log("Error something went wrong");
    });
});

toInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9.]/g, "");

  const dots = this.value.match(/\./g) || [];
  if (dots.length > 1) {
    this.value = this.value.slice(0, -1);
  }

  let activeCurrency = document.querySelector(".currency-right>.default");
  let activeCurrencyLeft = document.querySelector(".currency-left>.default");

  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error something went wrong");
      }
      return response.json();
    })
    .then((data) => data["conversion_rates"])
    .then((data) => {
      console.log(data[activeCurrencyLeft.innerHTML]);
      fromInput.value = (
        data[activeCurrencyLeft.innerHTML] * toInput.value
      ).toFixed(4);
    })
    .catch((error) => {
      console.log("Error something went wrong");
    });
});
