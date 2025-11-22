import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account} from "appwrite";

export class Serives{
    client = new Client()
    Databases
    bucket 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client); 
    }
    
    async createPost({title, slug, content, featuredImage, status, userId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error; 
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
                    content,
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            throw error 
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            slug)  
        } 
        catch (error) {
            throw error
            return false; 
        }
        return true; 
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true; 

        } catch (error) {
            throw error 
            return false; 
        }
    }
    
    async getPosts( queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )
            
        } catch (error) {
            throw error ;r
            return false; 
        }

    }

    async uploadFile(file){
        try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(), 
                    file, 
                )
                return true; 
        } catch (error) {
            throw error 
            return false; 
        }
    }
    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true ; 
            
        } catch (error) {
            throw error 
            return false; 
        }
    }
    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, 
            fileID, 
            
        )
    }
}
const service = new Serives()

export default service; 