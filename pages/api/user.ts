import withSession from "../../lib/session";


export type User = {
  isLoggedIn: boolean;
  user_id?: BigInt;
};

export default withSession(async (req, res) => {
  const user = req.session.get("user") as User | undefined;

  if (user) {
    return res.json({
      isLoggedIn: true,
      user_id: user.user_id,
    });
  } else {
    return res.json({
      isLoggedIn: false
    });
  }
});