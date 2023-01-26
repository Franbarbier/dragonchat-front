import withSession from "../../lib/session";
import apiUserController from "../../services/apiUserController";

export default withSession(async (req, res) => {
    const method = req.method.toLowerCase();
    const { email, password } = req.body;
    
    if (method !== "post") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const response = await apiUserController.login(email, password);
        if (response.status == 200) {
            await saveSession(response.data, req);
            res.status(200).json({email});
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(error.response.status).json({error: error.response.data.message});
        return;
    }
})

async function saveSession(user, request) {
    request.session.set("user", user);
    await request.session.save();
}