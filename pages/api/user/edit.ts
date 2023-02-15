import type { NextApiRequest, NextApiResponse } from "next";
import withSession from "../../../lib/session";
import apiUserController from "../../../services/apiUserController";

interface RequestWithSession extends NextApiRequest {
  session: any;
}

export default withSession(
  async (req: RequestWithSession, res: NextApiResponse) => {
    const method = req.method?.toLowerCase();
    const { name, email, password, passwordConfirmation } = req.body;

    if (method !== "put") {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      const accessToken = req.session.get("user").access_token;
      const response = await apiUserController.edit(accessToken, name, email, password, passwordConfirmation);
      if (response.status == 200) {
        res.status(200).json({ email });
        return res;
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(error.response.status)
        .json({ error: error.response.data.message });
      return res;
    }
  }
);