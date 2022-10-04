import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!name || !email || !password) {
    res.status(StatusCodes.NOT_ACCEPTABLE);
    return next('All fields were not filled in!');
  }

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE);
    return next('Can not seem to access database. Contact admin');
  }

  if (user) {
    res.status(StatusCodes.CONFLICT);
    return next('User already exists');
  }

  try {
    const createdUser = await User.create(req.body);
    const token = createdUser.createJWT();
    res.status(StatusCodes.CREATED).json({
      createdUser: {
        email: createdUser.email,
        lastName: createdUser.lastName,
        location: createdUser.location,
        name: createdUser.name,
      },
      token,
      location: createdUser.location,
    });
  } catch (err) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE);
    next(err.message);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST);
    return next('Please fill in each login field');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST);
    return next('User does not exist');
  }

  let isPasswordCorrect;

  try {
    isPasswordCorrect = await user.comparePassword(password);
  } catch (err) {
    res.status(StatusCodes.SERVICE_UNAVAILABLE);
    return next(err.message);
  }

  if (!isPasswordCorrect) {
    res.status(StatusCodes.NOT_FOUND);
    return next('Invalid Credentials');
  }

  const token = user.createJWT();
  user.password = undefined;

  res
    .status(StatusCodes.ACCEPTED)
    .json({ user, token, location: user.location });
};

const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    const error = new Error('Something happened. Refresh and try again?');
    return next(error);
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  try {
    await user.save();
  } catch (err) {
    const error = new Error(
      'Whoops something messaged up. Refresh and try again'
    );
    return next(error);
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK);
  res.json({ user, token, location });
};

export { register, login, updateUser };
