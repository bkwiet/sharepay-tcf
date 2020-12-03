import { NextApiRequest, NextApiResponse } from "next";
import { CURRENCY, formatAmountForStripe } from "../../../utils/stripe";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIP_SEC!, {
  apiVersion: "2020-08-27",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Api checkout req body", req.body);
    const amount: number = req.body.amount;
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: [
          {
            name: "Tout compte fait",
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/api/projects/addpayment?session_id={CHECKOUT_SESSION_ID}&idkey=${req.body.idkey}&email=${req.body.email}&amount=${req.body.amount}&summary=${req.body.summary}`,
        cancel_url: `${req.headers.origin}/projects/addpayment/reject`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
