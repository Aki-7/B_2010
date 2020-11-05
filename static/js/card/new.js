/*global Stripe, $*/

function getStripePublishKey() {
  return $("#stripe_pub_key").val();
}

function main() {
  const STRIPE_PUB_KEY = getStripePublishKey();
  const stripe = Stripe(STRIPE_PUB_KEY);
  const elements = stripe.elements();
  const cardElement = elements.create("card");
  cardElement.mount("#card-element");
  const cardholderName = document.getElementById("cardholder-name");
  const cardButton = document.getElementById("card-button");
  const clientSecret = cardButton.dataset.secret;

  cardButton.addEventListener("click", function () {
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
          alert(result.error);
          console.log(result);
        } else {
          window.location.href = "/card";
        }
      });
  });
}

main();
