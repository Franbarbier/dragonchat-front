import Stripe from 'stripe';
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import Loader from "../components/Loader/Loader2";
import { HOST_URL, STRIPE_KEY } from '../constants/index';
import { ROUTES } from '../enums';

const Checkout = () => <Loader loading />;

export default Checkout;

Checkout.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>

export async function getServerSideProps({ _, res }) {

    if (STRIPE_KEY) {
        const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2023-08-16' })
        const prices = await stripe.prices.list();

        if (prices.data?.length && prices.data?.length > 0) {
            const session = await stripe.checkout.sessions.create({
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: prices.data[0].id,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',

                success_url: `${HOST_URL}${ROUTES.LOGIN}?session_id={CHECKOUT_SESSION_ID}`,

                cancel_url: `${HOST_URL}${ROUTES.DASH}`
            });

            if (session.url) {
                res.writeHead(302, { Location: session.url });
                res.end();
            }
        }
    } else {
        res.writeHead(302, { Location: `http://${ROUTES.DASH}` });
        res.end();
    }

    return;
}
