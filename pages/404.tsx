import NotFound from "../components/Err404/NotFound";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const NotFoundView : NextPageWithLayout<GralProps> = () => {

    return (
        <section>
            {/* <NotFound /> */}
            <NotFound />

            {/* <MainCont width={90} maxWidth={400}>
                <h1>404</h1>
            </MainCont> */}
        </section>
    );
};


export default NotFoundView;

NotFoundView.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };