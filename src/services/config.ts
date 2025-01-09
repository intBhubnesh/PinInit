// contain the appwrite configuration
import conf from '../conf/conf'
import { Client, ID, Databases, Query, Storage } from 'appwrite'

interface Pin {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
}

export class Services{
    private client : Client = new Client()
    private database : Databases
    private bucket : Storage

    constructor(){
        this.client = new Client()
        .setEndpoint(conf.appwriteUrl)         // API endpoint
        .setProject(conf.appwriteProjectId);   // Project ID

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPin({title, slug, content, featuredImage, status, userId} : Pin) : Promise<any>{
        try {
            const pin = await this.database.createDocument(
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
            return pin
        } catch (error) {
            console.log("Appwrite services :: createPin :: error",error);
        }
        return null
    }

    async updatePin(slug : string, {title, content, featuredImage, status} : Pin): Promise<any> {
        try {
            const updatePin = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            return updatePin

        } catch (error) {
            console.log("Appwrite services :: updatePin :: error",error);
        }

        return null
    }

    async isDeleteExpression(slug : string) : Promise<any>{
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite services :: deletePin :: error",error);
            return false
        }
    }

    async getPin(slug : string) : Promise<any>{
        try {
            const pin = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

            if(pin) return pin

        } catch (error) {
            console.log("Appwrite services :: getPin :: error",error);
        }

        return null
    }

    async getPinList( query : any = Query.equal('status', 'active')){
        try {
            const pinList = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )

            return pinList

        } catch (error) {
            console.log("Appwrite services :: getPinList :: error",error);

            return false
        }

    }

    async uploadFile(file : any){
        try {
            const newFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

            return newFile
        } catch (error) {
            console.log("Appwrite services :: uploadFile :: error",error);
            return false
        }
    }

    async deleteFile(fileId : string){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite services :: deleteFile :: error",error);
            return false
        }
    }

    getFilePreview(fileId : string) {
        try {
            const preview = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            return preview
        } catch (error) {
            console.log("Appwrite services :: previewFile :: error",error);
            return false
        }
    }
}


const services = new Services()
export default services
