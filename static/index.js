var stripe = Stripe(
  "pk_test_51Hj4scALlAaFEDxYwl2qBvMnPIm3DY1sRVFQT4IUuJH84HXm6cbYr5HokR83wTYZgnLEQ3bWp2hAfcURL8ogc8ct00ybDazIAM"
);
var elements = stripe.elements();
var cardElement = elements.create("card");
cardElement.mount("#card-element");
var cardholderName = document.getElementById("cardholder-name");
var cardButton = document.getElementById("card-button");
var clientSecret = cardButton.dataset.secret;

cardButton.addEventListener("click", function (ev) {
  stripe
    .confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName.value,
        },
      },
    })
    .then(function (result) {
      if (result.error) {
        alert(error);
      } else {
        window.location.href = "/";
      }
    });
  ev.preventDefault();
});

var form = document.getElementById("setup-form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  return false;
});
