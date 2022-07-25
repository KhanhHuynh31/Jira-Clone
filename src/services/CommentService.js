import { baseService } from "./baseService";

export class CommentService extends baseService {

    constructor() {
        super();
    }
    getTaskComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }
    insertComment = (commentObject) => {
        return this.post('Comment/insertComment', commentObject);
    }
    // updateComment = (commentObject) => {
    //     return this.put('Comment/updateComment', commentObject)

    // }
    updateComment = (id, contentComment) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`)

    }
    deleteComment = (id) => {

        return this.delete(`Comment/deleteComment?idComment=${id}`);
    }

}


export const commentService = new CommentService();