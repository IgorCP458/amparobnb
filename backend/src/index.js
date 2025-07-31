require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 7777

const models = require('./models')

const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

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
