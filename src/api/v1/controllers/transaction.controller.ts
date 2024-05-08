import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { ObjectId } from 'mongoose'

import Transaction from '../models/transaction.model'
import User from '../models/user.model'

const getTransactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user.id
    const transactionHistory = await Transaction.find({
      userId: userId,
    }).lean()

    const udpatedTransactionHistory = transactionHistory.map((t) => {
      var date = new Date(t.transactionDate)
      var newDate = date.toISOString().split('T')[0]
      return {
        ...t,
        transactionDate: newDate,
        amount: Math.round(t.amount),
      }
    })

    return res.status(200).json({
      message: 'Transaction History Fetched Successfully',
      data: udpatedTransactionHistory,
    })
  } catch (error) {
    next(error)
  }
}

const verifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      token,
      amount,
      product_identity,
      idx,
      userId,
    }: {
      token: string
      amount: number
      product_identity: string
      idx: string
      userId: ObjectId
    } = req.body
    let config = {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
    const resBody = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      {
        token: token,
        amount: amount,
      },
      config,
    )

    const user = await User.findById(userId)
    if (!user) return res.status(400).json({ message: 'Invalid User' })

    user.amount += amount / 100
    await user.save()

    // // TODO : manage user and save transaction logs in db
    const newTransaction = await Transaction.create({
      amount: amount / 100,
      userId: userId,
      transactionType: 'credit',
      transactionDate: new Date(),
      remarks: 'Khalti Load',
    })
    return res.json({
      message: 'Payment Successful',
      data: newTransaction,
    })
  } catch (error) {
    next(error)
  }
}

export default { getTransactionHistory, verifyPaymentController }
