import withSession from "../../lib/session";
import apiUserController from "../../services/apiUserController";

export default withSession(async (req, res) => {
    try {
        const userToken = req.session.get("user").access_token;
        const response = await apiUserController.logout(userToken);
        if (response.status == 200) {
            req.session.destroy();
            res.redirect("/login");
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(error.response.status).json({error: error.response.data.message});
        return;
    }
});