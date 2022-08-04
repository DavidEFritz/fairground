import { Request, Response } from 'express';

export default (req: Request, res: Response): void => {
  res.send('Welcome to Fairground Games. Read the Wiki on my GitHub repo for more information: https://github.com/DavidEFritz/fairground')
}