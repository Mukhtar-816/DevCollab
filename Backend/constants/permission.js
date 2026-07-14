const Permission = Object.freeze({
  DELETE_PROJECT: 'project:delete',
  UPDATE_PROJECT: 'project:update',
  MANAGE_MEMBERS: 'member:manage',
  CREATE_TASK: 'task:create',
  UPDATE_TASK: 'task:update',
  COMMENT: 'task:comment'
});

const ROLE_PERMISSIONS = {
  Owner: [
    Permission.DELETE_PROJECT,
    Permission.UPDATE_PROJECT,
    Permission.MANAGE_MEMBERS,
    Permission.CREATE_TASK,
    Permission.UPDATE_TASK,
    Permission.COMMENT
  ],
  Admin: [
    Permission.UPDATE_PROJECT,
    Permission.MANAGE_MEMBERS,
    Permission.CREATE_TASK,
    Permission.UPDATE_TASK,
    Permission.COMMENT
  ],
  PM: [
    Permission.CREATE_TASK,
    Permission.UPDATE_TASK,
    Permission.COMMENT
  ],
  Developer: [
    Permission.CREATE_TASK,
    Permission.UPDATE_TASK,
    Permission.COMMENT
  ],
  Tester: [
    Permission.CREATE_TASK,
    Permission.COMMENT
  ],
  Guest: [] // Read-only
};

module.exports = {
  Permission,
  ROLE_PERMISSIONS
};