import express from 'express'
import { allTransactions, createTransaction, deleteTransaction, updateTransaction } from '../controllers/transaction.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

//api to create a new transaction
router.post('/new', isAuthenticated, createTransaction)
//api to get all the transactions
router.get('/all', isAuthenticated, allTransactions)
//apis to update & delete a transaction by it's id, that's why id is dynamic
router.route("/:id").put(isAuthenticated, updateTransaction).delete(isAuthenticated, deleteTransaction)


export default router;