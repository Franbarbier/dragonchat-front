import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (user) {
    return res.json({
      isLoggedIn: true,
      user_id: user.user_id,
    });
  } else {
    return res.json({
      isLoggedIn: false,
    });
  }
});