// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  return null;
};

export async function getServerSideProps(context) {
  context.res.writeHead(302, { Location: "/dash" });
  context.res.end();
  return { props: {} };
}

export default Home;
