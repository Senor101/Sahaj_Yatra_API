import { body } from 'express-validator'

const validateBusRegister = [
  body('busNumber').notEmpty().withMessage('Bus number is required'),
  body('busType').notEmpty().withMessage('Bus type is required'),
  body('busRoute').optional(),
  body('busSeats')
    .optional()
    .isNumeric()
    .withMessage('Bus seats must be a number'),
]

const validateUserRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').notEmpty().isEmail().withMessage('Email is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('citizenshipNumber')
    .notEmpty()
    .withMessage('Citizenship number is required'),
  body('password')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .withMessage(
      'Password must be alphanumeric and at least 5 characters long',
    ),
]

export { validateBusRegister, validateUserRegister }
