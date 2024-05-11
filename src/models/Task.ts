import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "on_hold",
  IN_PROGRESS: "in_progress",
  UNDER_REVIEW: "under_review ",
  COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface Itask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
} 

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<Itask>("Task", TaskSchema);
export default Task;
