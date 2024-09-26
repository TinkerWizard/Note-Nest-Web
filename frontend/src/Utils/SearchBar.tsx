import { useState } from "react";
import { Form } from "react-bootstrap";



export const SearchBar: React.FC<{username: string}> = (username) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const handleSearchKeywordChange = (event: any) => {
        setSearchKeyword(event.target.value);
    };
    

    return (
        <div className="" style={{ width: '100%' }}>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search Notes..." className="bg-dark text-white custom-input" style={{ width: '50%' }}
                    onChange={handleSearchKeywordChange} />
                </Form.Group>
                <style>
                    {`
                        .custom-input::placeholder 
                        {
                            color: white;
                        }
                    `}
                </style>
            </Form>
        </div>
    );
}