const Comment = require("../Models/comment.model");

class commentDal {
    constructor(){};

    async createComment (data){
        if (!data || Object.entries(data)?.length == 0) return null;

        const createdComment = await Comment.create(data);
        const populated = await createdComment.populate('authorId', '_id email');
        return populated.toObject();
    };

    async getCommentsByKey (key){
        if (!key || Object.entries(key)?.length == 0) return null;

        // Populate authorId with required fields; .lean() works seamlessly after populate
        return await Comment.find(key)
            .populate('authorId', '_id email')
            .lean(); 
    };

    async getCommentByKey (key){
        if (!key || Object.entries(key)?.length == 0) return null;

        return await Comment.findOne(key)
            // .populate('authorId', '_id email')
            .lean(); 
    };

    async updateComment (key, body){
        if (!key || Object.entries(key)?.length == 0) return null;

        return await Comment.findOneAndUpdate(
            key, 
            { '$set': { body } }, 
            { returnDocument: 'after' }
        )
        .populate('authorId', '_id email')
        .lean(); 
    };

    async deleteCommentById (key) {
        if (!key || Object.entries(key)?.length == 0) return null;

        return await Comment.findOneAndDelete(key);
    }
};

module.exports = new commentDal();