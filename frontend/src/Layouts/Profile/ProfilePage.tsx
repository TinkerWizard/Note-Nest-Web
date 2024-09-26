import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../Models/User";

interface minimalUser
{
    name: string,
    username: string,
    email: string
}
export const ProfilePage: React.FC<{}> = () => {
    const { username } = useParams();
    const [user, setUser] = useState<minimalUser>();
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:5000/users/profile/${username}`);
                const data: User = await response.json();
                console.log('Fetched User:', data.name);
                setUser({name: data.name, username: data.username, email: data.email});
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            }
        }
        fetchUser();
    }, []);
    return (
        <div className="container mt-5 text-white">
            <h1 className="text-white">{username}</h1>
            {
                user
                &&
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            }
        </div>
    );
}