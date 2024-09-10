import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  //file services
  async uploadFile(file) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileID) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const appwriteService = new DatabaseService();

export default appwriteService;
