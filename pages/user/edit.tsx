import Config from "../../components/Config/Config";
import EditUserProfileView, { IEditUserProfileView } from "../../components/EditUserProfileView/EditUserProfileView";
import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import MainCont from "../../components/MainCont/MainCont";
import withSession from '../../lib/session';
import { NextPageWithLayout } from "../page";

const EditUserProfile : NextPageWithLayout<IEditUserProfileView> = ({user}) => {
    return (
        <section>
            <MainCont width={90} maxWidth={340}>
                <EditUserProfileView user={user}/>
            </MainCont>
            <Config/>
        </section>
    );
};

export const getServerSideProps = withSession(async function ({ req, res }) {
    const headers = new Headers({
        "Content-Type": "application/json",
        });
    const user = req.session.get("user");
    const accessToken = user.access_token
    headers.append("Authorization", `Bearer ${accessToken}`);
    const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER_URL}/auth/me`,
    { headers }
    );
    const data = await apiResponse.json();
    return {
        props: { user: data.data as IEditUserProfileView['user'] },
        }
})

EditUserProfile.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

export default EditUserProfile;

