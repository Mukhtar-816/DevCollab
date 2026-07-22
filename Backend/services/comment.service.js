const taskDal = require("../DAL/task.dal");
const CustomError = require("../utils/CustomError");
const commentDal = require("../DAL/comment.dal");

class commentService {
    constructor() { };

    async createComment(projectId, taskId, authorId, commentBody) {
        if (!projectId || !taskId || commentBody?.length < 2) throw new CustomError(400, "ProjectId or TaskId or comment required");

        const taskExist =await  taskDal.getTaskByKey({ projectId, _id: taskId });

        if (!taskExist) throw new CustomError(400, "Task Doesn't Exist to comment");

        const comment = await commentDal.createComment({
            projectId,
            taskId,
            authorId,
            body: commentBody
        });

        if (!comment) throw new CustomError(400, "Error Posting Comment");

        return comment;
    };

    async getTaskComments(projectId, taskId) {
        if (!projectId || !taskId) throw new CustomError(400, "ProjectId or taskId required");

        const comments = await commentDal.getCommentsByKey({ projectId, taskId });

        if (!comments || comments?.length == 0) return [];

        return comments;
    };


    async updateComment(memberId, commentId, commentBody) {
        if (!memberId || !commentId || !commentBody || commentBody?.length < 2) throw new CustomError(400, "Missing required data");

        const comment = await commentDal.getCommentByKey({ _id: commentId });

        if (!comment) throw new CustomError(400, "Comment Doesn't Exist");

        if (comment?.authorId?.toString() != memberId) throw new CustomError(400, "Forbidden, You can't update other's comment");

        let updatedComment = await commentDal.updateComment({ _id:commentId }, commentBody);

        if (!updatedComment) throw new CustomError(400, "Error Updating Comment");

        return updatedComment;
    };


    async deleteComment(memberId, commentId) {
        if (!memberId || !commentId) throw new CustomError(400, "Missing required data");

        const comment = await commentDal.getCommentByKey({ _id: commentId });

        if (!comment) throw new CustomError(400, "Comment Doesn't Exist");

        if (comment?.authorId?.toString() != memberId) throw new CustomError(400, "Forbidden, You can't delete other's comment");

        await commentDal.deleteCommentById({ _id: commentId });

        return true;
    };
};


module.exports = new commentService();