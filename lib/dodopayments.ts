import DodoPayments from "dodopayments";
export const dodopayments = new DodoPayments({
  bearerToken:
    process.env.NODE_ENV === "development"
      ? process.env.DODO_PAYMENTS_API_TEST_KEY
      : process.env.DODO_PAYMENTS_API_LIVE_KEY,
  environment:
    process.env.NODE_ENV === "development" ? "test_mode" : "live_mode",
});
