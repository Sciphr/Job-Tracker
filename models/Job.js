import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, 'Please provide the position name'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Interview', 'Declined', 'Pending'],
      default: 'Pending',
    },
    jobType: {
      type: String,
      enum: [
        'Full Time',
        'Part Time',
        'Contract',
        'Remote - Full Time',
        'Remote - Part Time',
      ],
      default: 'Full Time',
    },
    jobLocation: {
      type: String,
      default: 'My City',
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
