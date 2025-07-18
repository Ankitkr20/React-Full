import conf from '../conf.js'
import { Client, Account, ID, Databases, Query, Storage } from 'appwrite'

export class Service{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    // post relate services
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }catch(error){
            throw new Error(`Appwrite Service : createPost - ${error.message}`);
        }
    }
    async updatePost(slug,{title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                     featuredImage,
                     status,
                }
            )
        }catch(error){
            throw new Error(`Appwrite Serivce : createPost - ${error.message}`);
        }
    }
    async deleteDocument(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            throw new Error(`Appwrite Service : deleteDocument - ${error.message}`)
            return false
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }catch(error){
            throw new Error(`Appwrite Service : createPost - ${error.message}`)
            return false
        }
    }
    async getPosts(){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status","active")],
            )
        }catch(error){
            throw new Error(`Appwrite Service : getPosts - ${error.message}`)
            return false
        }
    }
    // file upload services
    async uploadFile(file){
            try{
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
            }catch(error){
                throw new Error(`Appwrite Service : uploadFile - ${error.message}`)
                return false
            }
        }
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        }catch(error){
            throw new Error(`Appwrite Service : deleteFile - ${error.message}`)
        }
    }
    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        }catch(error){
            throw new Error(`Appwrite Service : getFilePreview - ${error.message}`)
        }
    }
}
const service = new Service();
export default service;