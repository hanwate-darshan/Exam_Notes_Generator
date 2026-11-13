import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  classLevel: String,
  examType: String,

  revisionMode: {
    type: Boolean,
    default: false
  },

  includeDiagram: Boolean,
  includeChart: Boolean,

  content: {
    type: mongoose.Schema.Types.Mixed, // AI response (JSON)
    required: true
  },

  youtubeVideos: [{
    videoId: String,
    title: String,
    channelTitle: String,
    thumbnailUrl: String,
    url: String
  }]

}, { timestamps: true });

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
