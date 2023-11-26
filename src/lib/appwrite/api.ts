import { IFollowerParams, INewPost, INewUser, INotificationParam, IUpdatePost, IUpdateUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { NOTIFICATION_TYPES, getAccountCreationNotification } from "@/constants";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        });
        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        );
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.notificationsCollectionId,
            ID.unique(),
            getAccountCreationNotification(newUser.$id)
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(
    user: {email: string; password: string}
) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        console.log({uploadedFile});
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post: INewPost) {
    console.log({createpost: post});
    try {
        const uploadedFile = await uploadFile(post.file[0]);
        if(!uploadedFile) throw Error;

        const fileUrl = getFilePreview(uploadedFile?.$id);

        if(!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        const tagsArray = post.tags?.replace(/ /g, '').split(',') || [];

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                author: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                tags: tagsArray,
                imageId: uploadedFile.$id,
                location: post.location
            }
        );
        if(!newPost) throw Error;

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export async function updatePost(post: IUpdatePost) {
    try {
        const hasFileToUpdate = post.file.length > 0;
        let image = {
            url: post.imageUrl,
            id: post.imageId
        };

        if(hasFileToUpdate) {
            const uploadedFile = await uploadFile(post.file[0]);
            if(!uploadedFile) throw Error;

            const imageUrl = getFilePreview(uploadedFile.$id);
            if(!imageUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = {
                url: imageUrl,
                id: uploadedFile.$id
            }
        }

        const tagsArray = post.tags?.replace(/ /g, '').split(',') || [];

        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.url,
                imageId: image.id,
                location: post.location,
                tags: tagsArray
            }
        )

        if (!updatedPost) {
            // Delete new file that has been recently uploaded
            if (hasFileToUpdate) {
              await deleteFile(image.id);
            }
      
            // If no new file uploaded, just throw error
            throw Error;
        }

        return updatedPost;

    } catch (error) {
        console.log(error);
    }
}

export async function getPosts({pageParam} : {pageParam: number}) {
    try {
        const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(9)];
        console.log({pageParam});
        if(pageParam) {
            queries.push(Query.cursorAfter(pageParam.toString()));
        }

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            queries
        )

        if(!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }

}

export async function getPostById(postId?: string) {
    if(!postId) throw Error;

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId
        );

        if(!post) throw Error;

        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            [Query.search('caption', searchTerm)]
        );

        if(!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
}

export async function sendNotification({
    recipientId, 
    senderId,
    senderUsername,
    type,
    postId
}: INotificationParam) {
    try {
        const newNotification = {
            type,
            recipientId,
            senderId,
            senderUsername,
            postId,
            timestamp: new Date().toISOString()
        }
        if(type === "newFollower" && recipientId && senderId) {
            const alreadyExists = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.notificationsCollectionId,
                [Query.equal('recipientId', recipientId), Query.equal('senderId', senderId), Query.equal('type', type)]
            )

            if (alreadyExists.documents) return false;
        }
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.notificationsCollectionId,
            ID.unique(),
            newNotification
        )
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost(postId?: string, postImageId?: string) {
    if(!postId || !postImageId) return;

    try {
        const success = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId
        );
        
        if(!success) throw Error;

        await deleteFile(postImageId);

        return {status: 200}
    } catch (error) {
        console.log(error);
    }
}

export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if(!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

export async function viewPost(postId: string, currentViews = 0) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId,
            {
                views: currentViews + 1
            }
        )

        if(!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

export async function savePost(postId: string, userId: string) {
    console.log({userId, postId});
    try {
        const success = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                post: postId,
                user: userId
            }
        )

        if(!success) throw Error;

        return success;
    } catch (error) {
        console.log(error);
    }
}

export async function unSavePost(savedDocumentId: string) {
    try {
        const success = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedDocumentId
        )

        if(!success) throw Error;

        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function getSavedPosts(userId?: string) {
    try {
        if(!userId) throw Error;

        const savedPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            [Query.search('user', userId)]
        )
        if(!savedPosts.documents) throw Error;

        return savedPosts.documents;
    } catch (error) {
        
    }
}

export async function getUserPosts(userId?: string) {
    if(!userId) return;

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            [
                Query.search('author', userId), 
                Query.orderDesc('$createdAt')
            ]
        )

        if(!posts) throw Error;

        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPosts(limit?: number) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(limit || 20)
            ]
        )

        if(!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
}

export async function getUsers(userId: string, limit?: number) {
    const queries = [
        Query.orderDesc('$createdAt'),
        Query.limit(limit || 20)
    ];
    if(userId) {
        queries.push(Query.notEqual('$id', [userId]))
    }
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            queries
        )

        if(!users) throw Error;

        return users;
    } catch (error) {
        console.log(error);
    }
}

export async function followUser({
    followerId, followingId, followerUsername, ref, refId
}: IFollowerParams) {
    if(!followerId || !followingId) throw Error;

    try {
        const followerDoc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.followersCollectionId,
            `${followerId.slice(0,10)}${followingId.slice(0,10)}`,
            {
                follower: followerId,
                following: followingId,
                ref: ref,
                refId: refId,
            }
        );

        await sendNotification({
            recipientId: followingId,
            senderId: followerId,
            senderUsername: followerUsername,
            type: NOTIFICATION_TYPES.NEW_FOLLOWER,
            postId: ''
        });

        if(!followerDoc) throw Error;

        return followerDoc;
    } catch (error) {
        console.log(error);
    }
}

export async function unFollowUser({
    followerId, followingId
    }: IFollowerParams
) {
    if(!followerId || !followingId) throw Error;

    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.followersCollectionId,
            `${followerId.slice(0,10)}${followingId.slice(0,10)}`,
        );

        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function getFollowers(userId?: string) {
    try {
        if(!userId) throw Error;

        const followers = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.followersCollectionId,
            [Query.equal('following', userId)]
        );

        if(!followers?.documents) return;

        return followers.documents;
    } catch (error) {
        console.log(error);
    }
}

export async function getFollowing(userId?: string) {
    try {
        if(!userId) throw Error;
        
        const followingDocs = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.followersCollectionId,
            [Query.equal('follower', userId)]
        )

        if(!followingDocs?.documents) throw Error;

        return followingDocs.documents;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById(userId?: string) {
    if(!userId) throw Error;

    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId
        );

        if(!user) throw Error;

        return user;
    } catch (error) {
        console.log(error);
    }
}

export async function updatedUser(user: IUpdateUser) {
    try {
        const hasFileToUpdate = user.file.length > 0;
        let image = {
            url: user.imageUrl,
            id: user.imageId
        };

        if(hasFileToUpdate) {
            const uploadedFile = await uploadFile(user.file[0]);
            if(!uploadedFile) throw Error;

            const imageUrl = getFilePreview(uploadedFile.$id);
            if(!imageUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = {
                url: imageUrl,
                id: uploadedFile.$id
            }
        }

        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            user.userId,
            {
                name: user.name,
                bio: user.bio,
                imageUrl: image.url,
                imageId: image.id,
            }
        );

        if(!updatedUser) {
            if(hasFileToUpdate) {
                await deleteFile(image.id);
            }
            throw Error;
        }

        return updatedUser;
    } catch (error) {
        console.log(error);
    }
}