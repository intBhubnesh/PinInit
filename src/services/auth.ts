import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf';

// Define the AuthServices class
export class AuthServices {
    private client: Client;
    private account: Account;

    constructor() {
        // Initialize the Appwrite client and set its configuration
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)         // API endpoint
            .setProject(conf.appwriteProjectId);   // Project ID

        console.log('Client initialised',conf.appwriteUrl);

        // Initialize the Account service
        this.account = new Account(this.client);
        console.log('Acount created',this.account);

    }

    // Method to sign up a user
    async signUp({ name, email, password }: { name: string; email: string; password: string }): Promise<any> {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.logIn({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthServices :: signUp :: error", error);
            throw new Error("An error occurred while signing up. Please try again later.");
        }
    }

    // Method to log in a user
    async logIn({ email, password }: { email: string; password: string }): Promise<object | null> {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error("AuthServices :: logIn :: error", error);
            throw new Error("Invalid credentials or network issue. Please try again.");
        }
    }

    // Method to get the current logged-in user's information
    async getUser(): Promise<any> {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("AuthServices :: getUser :: error", error);
            throw new Error("Unable to fetch user data. Please try again later.");
        }
        return null
    }

    // Method to log out the current user
    async logOut(): Promise<void> {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthServices :: logOut :: error", error);
            throw new Error("Error logging out. Please try again later.");
        }
    }
}

// Create an instance of the AuthServices class and export it
const authServices = new AuthServices();
export default authServices;
