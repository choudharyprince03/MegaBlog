import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account} from "appwrite";

export class Services{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client); 
    }

    handleError(method, error) {
        console.error(`Appwrite service :: ${method} :: error`, {
            message: error.message || error,
            code: error.code,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
    }
    
    async createPost({title, slug, content, featuredImage, status, userId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug,
                {
                    title, 
                    content: content.substring(0, 10000), // Truncate to 10000 chars
                    featuredImage, 
                    status,
                    userId
                }
            )
        } catch (error) {
             this.handleError('createPost', error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title, 
                    content: content.substring(0, 10000), // Truncate to 10000 chars
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            this.handleError('updatePost', error);

        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug)  
            return true;
        } 
        
        catch (error) {
             this.handleError('deletePost', error);
            return false
        }
   
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
           this.handleError('getPost', error);
            return false;
        }
    }
    
    async getPosts( queries=[]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
           this.handleError('getPosts', error);
            return false
        }

    }

    async uploadFile(file){
        try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(), 
                    file, 
                )

        } catch (error) {
              this.handleError('uploadFile', error);
            return false 
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true ; 
            
        } catch (error) {
            this.handleError('deleteFile', error);
            return false 
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }

    getFileDownload(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }

}
const service = new Services()

export default service; 