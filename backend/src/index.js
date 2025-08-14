require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const app = express()
const PORT = process.env.PORT || 7777

const models = require('./models')

app.use(cookieParser());

const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true em prod (https)
  sameSite: 'lax', // 'lax' é um bom equilíbrio; 'strict' é mais seguro
  path: '/api/auth/refresh', // opcional: limitar o path
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
};



// Middleware para permitir JSON nas requisições
app.use(express.json())

// Configuração de Rotas
const usersRoutes = require('./routes/user.routes')
app.use('/api/users', usersRoutes)

const listingsRoutes = require('./routes/listing.routes')
app.use('/api/listings', listingsRoutes)

const bookingsRoutes = require('./routes/booking.routes')
app.use('/api/bookings', bookingsRoutes)

const reviewsRoutes = require('./routes/review.routes')
app.use('/api/reviews', reviewsRoutes)

// Exemplo simples de rota
app.get('/', (req, res) => {
  res.send('AmparoBnB API rodando com sucesso 🚀')
})

// Sincroniza os models com o banco e inicia o servidor
async function startServer() {
  try {
    await models.sequelize.authenticate()
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.')

    await models.sequelize.sync({  }) // ou { force: true } para recriar tudo
    console.log('📦 Models sincronizados com o banco de dados.')

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar a aplicação:', error)
  }
}

startServer()
