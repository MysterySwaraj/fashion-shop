const homeController =require('../app/http/controllers/customer/homeController')
const authController =require('../app/http/controllers/customer/authController')
const cartController =require('../app/http/controllers/customer/cartController')

 function initRoutes(app) {
   
    app.get('/', homeController().index)
  

    app.get('/login',authController().login)

    app.get('/register', authController().register)
   // (req, res) => {
    //    res.render('auth/register')
    //})

    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)
}

module.exports = initRoutes