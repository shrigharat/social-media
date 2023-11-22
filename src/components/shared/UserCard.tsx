import { Models } from "appwrite"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LazyImage from "./LazyImage";

type UserCardProps = {
    user: Models.Document;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <Link to={`/profile/${user.$id}`} className="user-card">
            <div className="relative overflow-hidden rounded-full">
                <LazyImage 
                    imageUrl={
                        user.imageUrl || 
                        "/assets/icons/profile-placeholder.svg"
                    }
                    alt={ `${user.name}'s profile image` || "user profile image"} 
                    className="rounded-full w-10 h-10"
                />
            </div>
            <div className="flex items-start flex-col ">
                <p className="text-xs font-semibold text-light-1 text-center line-clamp-1">
                    {user.name}
                </p>
                <p className="text-xs text-light-3 text-center line-clamp-1">
                    @{user.username}
                </p>
            </div>
            <Button type="button" size="sm" className="ms-auto px-5 bg-primary-500/10 text-primary-500">
                Follow
            </Button>
        </Link>
    )
}

export default UserCard