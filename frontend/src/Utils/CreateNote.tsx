import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const CreateNote: React.FC<{}> = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const { username } = useParams();

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }
    const handleContentChange = (event: any) => {
        setContent(event.target.value);
    }

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = async (event: any) => {
        const response = await fetch("http://localhost:5000/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content, username})
        });
        const data = await response.json();
        if (response.ok) {
            // Handle successful response (e.g., navigate to dashboard, store token)
            setShow(false);
            console.log('Note added successfully:', data);
            // handleClose();
            navigate(`/notes/${username}`);
        } else {
            // Handle errors (e.g., invalid credentials)
            console.log('Note is not added:', data.message);
        }
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Create Note
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="note.title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pick up Judith"
                  autoFocus
                  onChange={handleTitleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="note.content"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={handleContentChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}