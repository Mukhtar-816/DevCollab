const eventBus = require('../events/log.event');
const { ActivityLog } = require('../Models/activityLog.model');

const registerActivityLogListener = () => {
  eventBus.on('activity:log', async (payload) => {
    try {
      await ActivityLog.create(payload);
      console.log(`[Activity Log] Recorded: ${payload.action}`);
    } catch (error) {
      console.error('[Activity Log Error] Failed to write log:', error);
    }
  });
};

module.exports = registerActivityLogListener;