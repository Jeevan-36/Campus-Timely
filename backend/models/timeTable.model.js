import mongoose from "mongoose";

const PeriodSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  }
});

const TimetableSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true
  },
  timetable: [PeriodSchema]
});

export const TimeTable=mongoose.model("TimeTable", TimetableSchema);
