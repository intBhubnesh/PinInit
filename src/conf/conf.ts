interface AppwriteConfig {
    appwriteUrl: string;
    appwriteProjectId: string;
    appwriteDatabaseId: string;
    appwriteCollectionId: string;
    appwriteBucketId: string;
  }


const conf = {
    appwriteUrl : String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    appwriteProjectId : String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_URL),
    appwriteCollectionId : String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_URL),
    appwriteBucketId : String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_URL),
}

export default conf ;
