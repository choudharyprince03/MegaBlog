import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
     client =new  Client()
     account; 

     //contructor 
     constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
     }
     //creating an account and logging in 
     async createAccount ({email,password,name}){
        try{
            const userAccount = await this.account.create
                                (ID.unique(), email,password,name)
                if(userAccount){
                    return await this.login({email,password}); 
                }
                else{
                    return userAccount
                }
        } catch(error){
            throw error; 
        }
     }
     //login 
     async login ({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password});
        }
        catch (error){
             throw error  
        }
     }
     // getting current user 
     async getCurrentUser(){
        try {
            const user = await this.account.get();
            console.log("getCurrentUser SUCCESS:", user);
            return user;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", {
                message: error.message,
                code: error.code,
                status: error.status
            });
            return null;
        }
     }
     async logout(){
        try {
            return await this.account.deleteSessions()
            
        } catch (error) {
            throw error; 
        }
     }
}

const authService = new AuthService(); 

export default authService