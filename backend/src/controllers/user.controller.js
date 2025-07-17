const { User } = require("../models");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const user_params = req.body.user;
  const saltRounds = 10;

  try {
    const hashGenerated = await bcrypt.hash(user_params.password, saltRounds);
    const user = await User.create({
      name: user_params.name,
      email: user_params.email,
      password: hashGenerated,
      role: user_params.role,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function login(req, res) {
  const login_params  = req.body.login_params;
  try {
    const user = await User.findOne({
      where: {
        email: login_params.email,
      },
    });
    if (user !== null) {
      const match = await bcrypt.compare(login_params.password, user.password)
      if(match) {
        console.log(`Usuário logado: ${user.name} (${user.email})`)
        res.json({"msg": "User logado com sucesso"})
      } else {
        res.json({"msg": "Senha incorreta"})
      }
    } else {
      res.json({ msg: "Email incorreto" });
    }
  } catch (error) {
    res.json(error);
  }
}

async function deleteUser(req, res) {
  const user = req.body.user;
  try {
    await User.destroy({
      where: {
        email: user.email,
      },
    });
    res.json({ msg: "User deletado com sucesso" });
  } catch (error) {
    res.json({ msg: "Erro ao deletar user" });
  }
}

async function userList(req, res) {
  const user = await User.findAll();
  res.json(user);
}


module.exports = {
  createUser,
  login,
  deleteUser,
  userList,
};
