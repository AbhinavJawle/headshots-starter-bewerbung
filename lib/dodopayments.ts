import DodoPayments from "dodopayments";
export const dodopayments = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY_LIVE,
  environment: "live_mode",

  //test:
  // bearerToken: process.env.DODO_API_KEY_TEST,
  // environment: "test_mode",
});
