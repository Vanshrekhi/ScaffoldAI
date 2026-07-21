import genToken from "../config/token.js"
import User from "../models/user.model.js"

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body
    let user = await User.findOne({ email })
    if (!user) user = await User.create({ name, email })

    let token = await genToken(user._id)

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token   // ← ye add karna zaroori hai
    })
  } catch (error) {
    return res.status(500).json({ message: `Google auth error ${error}` })
  }
}

export const logOut = async (req,res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
         return res.status(500).json({message:`Logout error ${error}`})
    }
    
}
