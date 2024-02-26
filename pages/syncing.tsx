import Cookies from "universal-cookie";
import MainCont from "../components/MainCont/MainCont";
import TimerSync from "../components/TimerSync/TimerSync";
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from "./page";

interface Syncing {
    cook : string
}

const Syncing: NextPageWithLayout<Syncing> = ({  cook }) => {

    return (
        <section>
            <MainCont width={90} maxWidth={400}>
               <TimerSync />
            </MainCont>
        </section>
    );
};

export default Syncing;

Syncing.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
};

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);

  console.log("server cookie" , cookies.get('syncTime')) 

    return {props :{ "jaja" : "hola"}};
}