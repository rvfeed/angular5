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
}

export default PostCtrl;