import { useNavigate, useParams } from "react-router-dom";

export const AccessDenied: React.FC<{}> = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/notes/${localStorage.getItem('username')}`);
    }
    return (
        <div className="text-center text-white mt-5">
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <button className="btn btn-info" onClick={handleClick}>Go back to your home</button>
        </div>
    );
}