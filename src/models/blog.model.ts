import mongoose, { Schema, Document } from 'mongoose';

interface IBlog extends Document {
  title: string;
  content: string;
  userID: mongoose.Schema.Types.ObjectId;
}

const blogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogusers',
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model<IBlog>('blogs', blogSchema);

export {BlogModel,IBlog};
