import { NOTIFICATION_MESSAGES } from "@/constants"
import { useUserContext } from "@/context/AuthContext"
import { multiFormatDateString } from "@/lib/utils"
import { INotificationForRecipient } from "@/types"
import { Link } from "react-router-dom"

const Notifications = () => {
  const {user} = useUserContext();
  const notifications = user?.notifications;
  
  return (
    
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
            src="/assets/icons/notification.svg" 
            alt="create post icon"
            width={36}
            height={36}  
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Notifications
          </h2>
        </div>
        <ul className="notifications-list max-w-5xl w-full flex flex-col gap-4">
          {
            !notifications?.length ? (
              <div className="no-notifications w-full h-40 flex flex-col justify-center items-center gap-4">
                <img 
                  src="/assets/icons/sleeping.svg" 
                  width={64}
                  height={64}
                  alt="no notifications icon" 
                />
                <p className="text-[#48484a] font-semibold">No notifications</p>
              </div>
            ) : (
                notifications.map((notification: INotificationForRecipient) => {
                  return (
                    <div className="notification-row w-full flex justify-between items-center bg-dark-3 border border-gray-900 py-4 px-4 rounded-md text-left">
                      <div>
                        {
                          notification?.senderUsername && (
                            <Link 
                              to={'/profile/' + notification.senderId} 
                              className="text-primary-500 mr-2"
                            >
                              @{notification.senderUsername}
                            </Link> 
                          )
                        }
                        {NOTIFICATION_MESSAGES[notification.type]}
                        <span className="text-gray-400 text-xs ml-4">
                          {multiFormatDateString(notification.timestamp)}
                        </span>
                      </div>
                      {
                        notification?.postId && (
                          <Link to={`/posts/${notification.postId}`} className="bg-primary-500/10 text-primary-500 ml-auto px-3 py-2 rounded-md">
                            Go to post
                          </Link>
                        )
                      }
                    </div>
                  )
                })
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Notifications