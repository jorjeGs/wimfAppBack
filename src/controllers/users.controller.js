const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id).populate('recipes');
    res.json(user)
}
userCtrl.getUserByName = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({username: username});
    console.log(user)
    res.json(user)
}
userCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({username});
    console.log(newUser);
    await newUser.save();
    res.json({message: 'User created'});
}
userCtrl.updateUser = async (req, res) => { //updateUser
    const { recipeid, username } = req.body;
    await User.findOneAndUpdate({username: username}, {
        $push:{
            recipes:{
                _id: recipeid
            }
        }
    });
    console.log(req.params.id, req.body);
    res.json({message: 'User Updated with recipe'});
}
userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'})
}


module.exports = userCtrl;
