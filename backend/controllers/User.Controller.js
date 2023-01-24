import User from './../models/User.js'

export const findAll = async (req, res, next) =>  {
  const users = await User.find();
  res.json({
    success: true,
    users: users
  })
}
