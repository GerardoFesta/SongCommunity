const User = require('../schemas/user-schema');

const createUser = (req, res) => {
  const { username, email, preferite, password } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and email',
    });
  }

  const user = new User({ username, email, preferite });

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'User created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'User not created!',
      });
    });
};

const register = (req, res) => {
  
  const { username, email, password } = req.body;
  console.log({username}, {email}, {password})
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username and email',
    });
  }
  preferite=[]
  const user = new User({ Username: username, Email: email, Preferite: preferite, Password: password });
  console.log(user)
  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'User created!',
      });
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({
        error,
        message: 'User not created!',
      });
    });
};

const updateUser = async (req, res) => {
  const { username, email, preferite } = req.body;

  if (!username && !email && !preferite) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a username, email, or preferite to update',
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username, email, preferite } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found!',
      });
    }

    return res.status(200).json({
      success: true,
      id: user._id,
      message: 'User updated!',
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: err,
      message: 'User not updated!',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Users not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const login = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  console.log({username}, {password}) 
  try {
    const user = await User.findOne({"Username": username });
    console.log({user})
    if (!user) {
      console.log("!user")
      return res.status(401).json({ success: false, message: 'Username non valido.' });
    }


    if (! (password == user.Password)) {
      console.log("!passwords")
      return res.status(401).json({ success: false, message: 'Password non valida.'});
    }
    console.log("CORRETTO")
    // Effettua l'accesso riuscito
    // Genera un token di accesso o esegui altre azioni necessarie

    res.status(200).json({ success: true, message: 'Accesso riuscito.'  , data: user});
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Errore durante accesso.'});
  }
};


module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  register,
  login
};
