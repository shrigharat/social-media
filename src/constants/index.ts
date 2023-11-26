import { INotification, NotificationType } from "@/types";

export const userProfilePlaceholder = '/assets/icons/profile-placeholder.svg';

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/explore.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    requireLogin: true,
  },
  {
    imgURL: "/assets/icons/notification.svg",
    route: "/notifications",
    label: "Notifications",
    requireLogin: true,
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
    requireLogin: true,
  },
];


export const NOTIFICATION_TYPES = {
  COMMENT_MENTION: 'commentMention',
  COMMENT_ADDED: 'commentAdded',
  POST_LIKED : 'postLiked',
  POST_TAG : 'postTag',
  NEW_MESSAGE : 'newMessage',
  POST_TRENDING : 'postTrending',
  ACCOUNT_CREATED : 'accountCreated',
  NEW_FOLLOWER: 'newFollower'
} as const;

export const NOTIFICATION_MESSAGES = {
  commentMention: 'Mentioned you in a comment',
  postLiked: 'Liked your post',
  postTag: 'Tagged you in a post',
  newMessage: 'Messaged you',
  postTrending: 'Your post is trending',
  accountCreated: 'Congratulations on creating your account!',
  newFollower: 'Followed you recently',
  commentAdded: 'Added a comment on your post',
} as const;

export const getAccountCreationNotification = (userId: string) => ({
  recipientId: userId,
  type: NOTIFICATION_MESSAGES.accountCreated,
  timestamp: new Date().toISOString(),
  senderUsername: '',
  senderUserId: '',
  postId: '',
})

const populateNotifications = function(): INotification[] {
  let arr: INotification[] = [];
  for(let i=0; i<20; i++) {
    arr.push({
      type: NOTIFICATION_TYPES.NEW_MESSAGE,
      recipientId: 'abcd123',
      timestamp: "7th November 2023, at 12:35 PM",
      senderUsername: "photoliker123",
      senderId: '',
      postId: '',
    });
  }
  return arr;
}

export const getLabelTextByNotificationType = (type: NotificationType) => {
  switch(type) {
    case "commentMention": return "Comment";
    case "newFollower": return "Follower";
    case "postLiked": 
    case "postTag": 
    case "postTrending":
      return "Post";
    case "newMessage": return "Message";
    default: return "";
  }
}

export const dummyNotifications: INotification[] = populateNotifications();
  
export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    requireLogin: true,
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
    requireLogin: true,
  },
  {
    imgURL: "/assets/icons/notification.svg",
    route: "/notifications",
    label: "Notifications",
    requireLogin: true,
  }
];

export const POST_FORM_ACTIONS = {
  EDIT_MODE: 'edit',
  CREATE_MODE: 'create'
}
  