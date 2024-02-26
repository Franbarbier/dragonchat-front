import MainCont from "../components/MainCont/MainCont";
import TimerSync from "../components/TimerSync/TimerSync";
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from "./page";



const Syncing: NextPageWithLayout<{}> = ({  }) => {

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
