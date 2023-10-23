import EditUserProfileView, { IEditUserProfileView } from "../../components/EditUserProfileView/EditUserProfileView";
import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import MainCont from "../../components/MainCont/MainCont";
import useDeviceType from "../../utils/checkDevice";
import { NextPageWithLayout } from "../page";


// Aca el tipado deberia ser "IEditUserProfileView" pero estoy con un error que no encuentro, lo dejo asi para la demo.
const EditUserProfile : NextPageWithLayout<IEditUserProfileView> = ({setLoading, notification, setNotification }) => {
    const isMobile = useDeviceType();
    return (
        <section>
            <MainCont width={90} maxWidth={340} style={ isMobile ? {"marginTop" : "10%"} : {} }>
                <EditUserProfileView setLoading={setLoading} notification={notification} setNotification={setNotification}  />
            </MainCont>
        </section>
    );
};


EditUserProfile.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

export default EditUserProfile;

