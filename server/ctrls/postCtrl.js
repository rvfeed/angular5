import PostModel from "../model/postModel";
class PostCtrl{
    post;
    constructor(){
        this.post = new PostModel();
    }    
    login(userData){
        return this.post.findUser(userData);        
    }
    saveStatus(post){
        return this.post.savePost(post);
    }
    readPost(id){
        return this.post.readPost(id);
    }
    readAll(){
        return this.post.getAllPosts();
    }
    deleteStatus(id){
        return this.post.deleteStatus(id);
    }
    likeStatus(id, like){
        return this.post.likeStatus(id, like);
    }
    addComment(id, comment){
        comment.id = Date.now();
        return this.post.addComment(id, comment);
    }
    deleteComment(id, commentId){
        return this.post.deleteComment(id, commentId);
    }
    likeComment(id, commentId){
        return this.post.likeComment(id, commentId);
    }

    
}

export default PostCtrl;