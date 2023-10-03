import apiSenderWhatsappController from "../api/apiSenderWhatsappController";
import { LOGIN_COOKIE } from "../constants/index";

// export fn of the api is Connected
export const isConnected = async (req) => {
    const authCookie = req.cookies.get(LOGIN_COOKIE || "");
    if (!authCookie) {
        return false;
    }
    const accessToken = JSON.parse(authCookie.value || '{}').access_token || '';
    const response = await apiSenderWhatsappController.isConnected(accessToken);

    return response;

}