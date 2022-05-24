const express = require('express')

const router = express.Router()

// Controller
//user
const { 
    getUsers, 
    getUser, 
    addUsers, 
    updateUser, 
    deleteUser, 
    getProfile,
    getUserProducts, 
} = require('../controllers/user')
//product
const { 
    getProducts, 
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/product')
//category
const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')
//transaction
const { 
    getTransactions, 
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transaction')
//auth
const { register, login } = require('../controllers/auth');
// Middleware
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route
//user
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/user', addUsers)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/profiles', getProfile);
router.get('/user-products', getUserProducts);
//product
router.get('/products',auth,getProducts)//add authentication based on token
router.get('/product/:id', getProduct)
router.post('/product',auth, uploadFile('image'), addProduct)//insert middleware
router.patch('/product/:id',auth, updateProduct)
router.delete('/product/:id',auth, deleteProduct)
//category
router.get('/categories', getCategories)
router.get('/category/:id',auth, getCategory)
router.post('/category',auth, addCategory)
router.patch('/category/:id',auth, updateCategory)
router.delete('/category/:id',auth, deleteCategory)
//transaction
router.get('/transactions', auth,getTransactions)
router.get('/transaction/:id',auth, getTransaction)
router.post('/transaction', auth,addTransaction)
router.patch('/transaction', updateTransaction)
router.delete('/transaction/:id', deleteTransaction)
//auth
router.post('/register', register);
router.post('/login', login);

module.exports = router