<template>
  <div>
    <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems"
      :success-url="successURL" :cancel-url="cancelURL" @loading="v => (loading = v)" />
    <button @click="submit">Subscribe!</button>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import store from "@/store";
import { db } from "@/firebase";

export default {
  name: "test",
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      "pk_test_51I3s13B4jY1Sj3hi06G2QtPl71f6XPgMMxcrOFSPxTdsx6hKo0HmtyXXmTd7D4gCVuJgI8FLctz69epCWCuGyFON0018bChwHC";
    return {
      loading: false,
      lineItems: [
        {
          price: "price_1IAe3NB4jY1Sj3hiA9YhObsP", // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "https://payingcustomer.netlify.app/", //moram napraviti succes page - ili baciti na neku ulogiranu stranicu
      cancelURL: "https://payingcustomer.netlify.app/cancel",
    };
  },
  // You will be redirected to Stripe's secure checkout page
  methods: {
    submit() {
      console.log('test kombo')
      this.regUser();
      this.$refs.checkoutRef.redirectToCheckout();
    },

    regUser() {
      alert("upisujem", store.userDisplayName);
      db.collection("users").add({
        name: store.userDisplayName,
        email: store.currentUser,
        posted_at: Date.now(),
        subscription: store.subsType,
      });
    },
  },
};
</script>
// preuzeto sa https://vuestripe.com/stripe-checkout/recurring-payment
