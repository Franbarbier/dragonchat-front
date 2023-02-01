import EditUserProfile from "../../components/EditUserProfile/EditUserProfile";
import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import MainCont from "../../components/MainCont/MainCont";
import { NextPageWithLayout } from "../page";
import { GralProps } from "../_app";

const NewPassword : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={90} maxWidth={340}>
                <EditUserProfile />
            </MainCont>
        </section>
    );
};


export default NewPassword;

NewPassword.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };