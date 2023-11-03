import Stripe from 'stripe';
import Loader from "../components/Loader/Loader2";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { HOST_URL, STRIPE_KEY, STRIPE_PRODUCT } from '../constants/index';
import { ROUTES } from '../enums';

const Checkout = () => <Loader loading />;

export default Checkout;

Checkout.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>

export async function getServerSideProps({ _, res }) {
    try {
        if (STRIPE_KEY && STRIPE_PRODUCT) {
            const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2023-08-16' })
            const prices = await stripe.prices.list();
            const product = prices.data.find(p => p.product === STRIPE_PRODUCT);

            if (product) {
                const session = await stripe.checkout.sessions.create({
                    billing_address_collection: 'auto',
                    line_items: [
                        {
                            price: product.id,
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
            res.writeHead(302, { Location: `${HOST_URL}${ROUTES.DASH}` });
            res.end();
        }
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        res.writeHead(302, { Location: `${HOST_URL}${ROUTES.DASH}` });
        res.end();
    }

    return { props: {} };
}
