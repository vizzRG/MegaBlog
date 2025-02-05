import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        // this.account= new Account(this.client)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

   async createPost({title, slug, featuredImage, status, userID, content}){
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
                userID,
            }
        )
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
    }
   }

   async updatePost(slug, {title, featuredImage, status, content}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                status,
                content,
            }

        )        
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error);
    }
   }

   async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error ",error );
        return false
    }
   }

   async getPost(slug){
    try {
        return this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error)
    }
   }

   async getPosts(queries= [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error);
    }
   }

   async uploadFile(file){
    try {
         return await this.bucket.createFile(
            conf.appwriteBuketId,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        return false
    }
   }

   async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBuketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
        return false
    }
   }

   getFilePreview(fileId){
    try {
        this.bucket.getFilePreview(
            conf.appwriteBuketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite service :: getFilePreview :: error", error);
    }
}

}

const service = new Service()

export default service;