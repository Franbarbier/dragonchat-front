import { useRouter } from 'next/router';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import withSession from '../lib/session';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';

const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  const { locale } = useRouter();

  console.log(GralProps)
  return (
    <section>
      <CardsCont {...mockCardsContProps.base} />
    </section>
  );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  
  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = user.access_token;
  headers.append("Authorization", `Bearer ${accessToken}`);
  console.log(headers)
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
    { headers }
  );
  const data = await apiResponse.json();
  const linkedWhatsapp = data.data.connected_whatsapp == 1;

  if (!linkedWhatsapp) {
    res.setHeader("location", "/qr");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
});

export default Home;

Home.getLayout = (page) => {
  return (
      <PrimaryLayout>
        {page}
      </PrimaryLayout>
    );
};