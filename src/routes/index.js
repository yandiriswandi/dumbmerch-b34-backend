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
    getUserProducts, 
} = require('../controllers/user')
//profile
const { 
    getProfile,
    addProfile,
    updateProfile 
} = require('../controllers/profile');
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
//sorting
const {getCelana,getBaju} = require('../controllers/sorting')

// Route
//user
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/user', addUsers)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/user-products', getUserProducts);
//profile
router.get('/profiles',auth, getProfile);
router.post('/profile',auth,uploadFile('image'), addProfile);
router.patch('/profile/:id',auth,uploadFile('image'), updateProfile);
//product
router.get('/products',auth,getProducts)//add authentication based on token
router.get('/product/:id', getProduct)
router.post('/product',auth, uploadFile('image'), addProduct)//insert middleware
router.patch('/product/:id',auth, uploadFile('image'), updateProduct)
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
//sorting
router.get('/celana',getCelana);
router.get('/baju',getBaju);

module.exports = router