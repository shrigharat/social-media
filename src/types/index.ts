import { NOTIFICATION_TYPES } from "@/constants";
import { Models } from "appwrite";

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};
  
export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};
  
export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
};
  
export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
};
  
export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
    notifications?: INotificationForRecipient[];
};
  
export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export interface IPost extends Models.Document {
    location: string;
    caption: string;
    imageUrl: string;
    imageId: string;
    tags: string;
    postId: string;
}

export type IComment = {
    userImage: string;
    userName: string;
    text: string;
}

type NotificationKeys = keyof typeof NOTIFICATION_TYPES;
export type NotificationType = (typeof NOTIFICATION_TYPES)[NotificationKeys];

export type INotification = {
    type: NotificationType;
    recipientId: string;
    senderId: string;
    senderUsername: string;
    timestamp: string;
    postId: string;
}

export type INotificationParam = Omit<INotification, 'timestamp'>;

export type INotificationForRecipient = Omit<INotification, 'recipientId'>;