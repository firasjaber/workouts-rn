import { Request, Response, NextFunction } from 'express';

import { check, validationResult } from 'express-validator';

export function createValidationFor(route: string) {
  switch (route) {
    case 'register':
      return [
        check('firstName')
          .not()
          .isEmpty()
          .withMessage('first name is required'),
        check('lastName').not().isEmpty().withMessage('last name is required'),
        check('email').not().isEmpty().withMessage('email is required.'),
        check('password')
          .isLength({ min: 6 })
          .withMessage('Please enter a valid password ( min length is 6 ).'),
      ];
    case 'login':
      return [
        check('email').not().isEmpty().withMessage('email is required.'),
        check('password')
          .isLength({ min: 6 })
          .withMessage('Please enter a valid password ( min length is 6 ).'),
      ];

    default:
      return [];
  }
}

export function checkValidationResult(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(422).json({
    message: result.array({ onlyFirstError: true })[0].msg,
    error: result.array(),
  });
}
