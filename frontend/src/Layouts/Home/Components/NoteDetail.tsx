import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Modal } from "react-bootstrap";
import { Notes } from '../../../Models/Notes';
export const NoteDetail: React.FC<{}> = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const token = localStorage.token;
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:5000/notes");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Notes[] = await response.json();
        console.log('Fetched notes:', data);
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }
    fetchNotes();
  }, []); // Fetch data once when component mounts
  const { _id } = useParams();
  console.log("note id:", _id);
  const filterArray = notes.filter((note) => {
    return _id === note._id;
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditClick = (_id: string, noteTitle: string, noteContent: string) => {
    handleShow();
    setTitle(noteTitle);
    setContent(noteContent);

  };

  //Modal state and methods
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

  const handleSave = async () => {
    console.log(title);
    const response = await fetch(`http://localhost:5000/notes/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id, title, content })
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Note updated successfully:', data);
      console.log("The note author:", data.username);
      navigate(`/notes/${data.username}`);
    }
    else {
      console.log("Note is not updated:", data.updatedMessage);
    }
  };

  const handleDeleteClick = async (_id: string) => {
    const response = await fetch(`http://localhost:5000/notes/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ _id })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Note Deleted");
      navigate(`/notes/${data.username}`);
    }
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-xl-block d-xxl-block container text-white mt-5">
        <div className="container m-5 d-flex justify-content-center align-items-center flex-column text-white">
          {
            filterArray.map((note) => (
              <div key={note._id} className="container rounded border border-secondary p-5" style={{ width: "80%" }}>
                <h4 className="text-wrap">{note.title}</h4>
                <p className="text-wrap">{note.content}</p>
                <div className='d-flex justify-content-evenly'>
                  <Button className='text-white' onClick={() => handleEditClick(note._id, note.title, note.content)}>Edit</Button>
                  <Button className='text-white' onClick={() => handleDeleteClick(note._id)}>Delete</Button>
                </div>
              </div>

            ))
          }
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="note.title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder="Pick up Judith"
                    autoFocus
                    onChange={handleTitleChange}
                    value={title}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="note.content"
                >
                  <Form.Label>Content</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={handleContentChange} value={content} />
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
        </div>
      </div>

      {/* Mobile */}
      <div className='d-block d-sm-none text-white p-3'>
      {
            filterArray.map((note) => (
              <div key={note._id} className="container rounded border border-secondary p-5" style={{ width: "90%" }}>
                <h4 className="text-wrap">{note.title}</h4>
                <p className="text-wrap">{note.content}</p>
                <div className='d-flex justify-content-evenly'>
                  <Button className='text-white' onClick={() => handleEditClick(note._id, note.title, note.content)}>Edit</Button>
                  <Button className='text-white' onClick={() => handleDeleteClick(note._id)}>Delete</Button>
                </div>
              </div>

            ))
          }
      </div>
    </div>

  );
}