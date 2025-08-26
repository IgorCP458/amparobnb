const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkToken = require("../middlewares/authCheck");


async function createUser(req, res) {
  const {user_params} = req.body;
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
  const loginParams  = req.body.loginParams;
  try {
    const user = await User.findOne({
      where: {
        email: loginParams.email,
      },
    });
    if (user !== null) {
      const match = await bcrypt.compare(loginParams.password, user.password)
      if(match) {
        console.log(`Usuário logado: ${user.name} (${user.email})`)
        const {email, id, name, avatar} = user
        const userJwt = {email, id, name, avatar}
        
        const token = jwt.sign(userJwt, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });


        res.status(200).cookie("token", token, {
          httpOnly: true, // não acessível via JS no browser
          secure: process.env.NODE_ENV === "production", // HTTPS
          sameSite: "strict", // prevenção contra CSRF básico
          maxAge: 60 * 60 * 1000, // 1 hora
        }).json({ isLogged: true });
      } else {
        res.json({"msg": "Senha incorreta"})

      }
    } else {
      res.json({ msg: "Email incorreto" });

    }
  } catch (error) {
    res.json(error);
    console.log(error)

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

async function authCheck(req, res) {
    const token = req.cookies.token
    
    if(!token) {
      res.status(401).json({ user: null })
      
    } else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, email, name, avatar} = decoded; // salva info do user para a próxima rota
        return res.status(200).json({user: {id, email, name, avatar}})
      } catch (error) {
        return res.status(401).json({ user: null });
      }
    }
    
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true em produção
    sameSite: "strict",
  });
  return res.json({ message: "Logout realizado com sucesso" });
}



module.exports = {
  createUser,
  login,
  logout,
  deleteUser,
  userList,
  authCheck
};
