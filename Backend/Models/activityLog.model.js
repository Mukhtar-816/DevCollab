const { Schema, model } = require('mongoose');

const activityLogSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, 
    targetType: { type: String, required: true }, 
    targetId: { type: Schema.Types.ObjectId },
    metadata: { type: Object, default: {} },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const ActivityLog = model('ActivityLog', activityLogSchema);

module.exports = { ActivityLog };