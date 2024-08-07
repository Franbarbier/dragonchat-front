import EditUserProfileView, { IEditUserProfileView } from "../../components/EditUserProfileView/EditUserProfileView";
import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import MainCont from "../../components/MainCont/MainCont";
import { NextPageWithLayout } from "../page";

const EditUserProfile : NextPageWithLayout<IEditUserProfileView> = ({user}) => {
    console.log(user)
    return (
        <section>
            <MainCont width={90} maxWidth={340}>
                <EditUserProfileView user={user}/>
            </MainCont>
        </section>
    );
};

export async function getServerSideProps(context) {
    const cookies = context.req?.cookies;
    const headers = new Headers({
        "Content-Type": "application/json",
        });
    const cookieName = process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME
    const accessToken = JSON.parse(cookies[`${cookieName}`]).access_token
    headers.append("Authorization", `Bearer ${accessToken}`);
    const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER_URL}/auth/me`,
    { headers }
    );
    const data = await apiResponse.json();

    return {
        props: { user: data.data as IEditUserProfileView['user'] },
        }
}

EditUserProfile.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

export default EditUserProfile;

