import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';

const createJob = async (req, res, next) => {
  const { position, company } = req.body;
  if (!position || !company) {
    res.status(StatusCodes.BAD_REQUEST);
    const error = new Error('Must fill in all fields!');
    return next(error);
  }

  req.body.createdBy = req.user.userId;

  let job;
  try {
    job = await Job.create(req.body);
  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY);
    const error = new Error('Issue creating Job in database. Try again');
    return next(error);
  }

  res.status(StatusCodes.CREATED);
  res.json({ job });
};

const deleteJob = async (req, res, next) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    const error = new Error(
      'Job does not even exist. How did you even do that!?'
    );
    return next(error);
  }

  if (req.user.userId === job.createdBy.toString()) {
  } else {
    const error = new Error('You did not make this. Stop trying to delete it');
    return next(error);
  }

  try {
    await job.remove();
  } catch (err) {
    const error = new Error('Could not remove from database. Try again.');
    return next(error);
  }

  res.status(StatusCodes.OK);
  res.send('Job successfully deleted');
};

const getAllJobs = async (req, res, next) => {
  if (!req.user.userId) {
    res.status(StatusCodes.UNAUTHORIZED);
    const error = new Error('User not defined. Re-log in please');
    return next(error);
  }

  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== 'All') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'All') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);

  if (sort === 'Latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'Oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'A-Z') {
    result = result.sort('position');
  }

  if (sort === 'Z-A') {
    result = result.sort('-position');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  let jobs;
  try {
    // jobs = await Job.find(queryObject);
    jobs = await result;
  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY);
    const error = new Error(
      'Error trying to access jobs. Try again or contact admin'
    );
    return next(error);
  }

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    res.status(StatusCodes.BAD_REQUEST);
    const error = new Error(
      'All fields were not included! Refresh or re-log in'
    );
    return next(error);
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    res.status(StatusCodes.NOT_FOUND);
    const error = new Error('No job found. That is pretty weird?');
    return next(error);
  }

  if (req.user.userId === job.createdBy.toString()) {
  } else {
    const error = new Error('You did not make this. Stop trying to edit it');
    return next(error);
  }

  let updatedJob;
  try {
    updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST);
    const error = new Error('Bad request!');
    return next(error);
  }

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  //This is changing the data from an array of 'stats', to a 'stats' object for future use
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Pending: stats.Pending || 0,
    Interview: stats.Interview || 0,
    Declined: stats.Declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
