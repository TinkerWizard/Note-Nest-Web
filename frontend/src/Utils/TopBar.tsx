import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

export const TopBar: React.FC<{ username: string }> = ({ username }) => {
    const navigate = useNavigate();
    const handleProfileClick = (username: string) => {
        navigate(`/profile/${username}`);
    };
    const handleLogout = () => {
        localStorage.setItem('token', '');
        navigate('/signin');
    }
    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block">
                <div className='d-flex justify-content-between align-items-center pt-3 pb-3 border-bottom mb-3' style={{ width: '100%' }}>
                    <button className='btn text-white' style={{ width: '10%' }}>Note Nest</button>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => handleProfileClick(username ?? '')}>Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {/* Mobile */}
            <div className="d-block d-sm-none">
                <div className='d-flex justify-content-evenly align-items-center' style={{ width: '100%' }}>
                    <button className='btn text-white fs-6 border'>Note Nest</button>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => handleProfileClick(username ?? '')}>Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

        </div>
    );
}