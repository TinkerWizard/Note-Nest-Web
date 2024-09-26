import { useEffect, useState } from 'react';
import { Note } from './Components/Note';
import { useNavigate, useParams } from 'react-router-dom';
import { Notes } from '../../Models/Notes';
import { TopBar } from '../../Utils/TopBar';
import { CreateNote } from "../../Utils/CreateNote";


export const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [searchNotes, setSearchNotes] = useState<Notes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Add searchTerm to state
  const navigate = useNavigate();
  const { username } = useParams();
  const [accessDeniedMessage, setAccessDeniedMessage] = useState('');
  const token = localStorage.token;

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch(`http://localhost:5000/notes/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          // Navigate to Access Denied page or show a warning
          const errorData = await response.json();
          setAccessDeniedMessage(errorData.accessDeniedMessage);
          // Example route
          navigate(`/access-denied`)
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Notes[] = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    }
    fetchNotes();
  }, []); // Fetch data once when component mounts

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/notes/${username}/search/?title=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchNotes(data.notes);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleClick = (_id: string) => { // Ensure `id` type matches NoteType
    navigate(`/note/${_id}`);
  }
  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };
  return (
    <div className='container'>
      {/* Desktop */}
      {accessDeniedMessage
        &&
        <h1 className='text-white' >{accessDeniedMessage}</h1>
      }
      <div className="d-none d-xl-block d-xxl-block container text-white mt-5">
        <TopBar username={username ?? ''} />
        {/*Create note and search bar -- div  */}
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <CreateNote />
          {/* Search Input */}
          <div className='d-flex' style={{ width: '80%' }}>
            <form className='d-flex justify-content-end  align-items-center gap-2' onSubmit={handleSearch} style={{ width: '100%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '50%' }}
              />
              <button className='btn text-white bg-primary' type='submit'>Search</button>
            </form>
          </div>
        </div>

        <div className="row">
          {searchTerm && searchNotes.length > 0 ? (
            searchNotes.map(note => (
              <div className="col-4" key={note._id}>
                <button className="btn w-100" onClick={() => handleClick(note._id)}>
                  <Note _id={note._id} title={note.title} note={note.content} />
                </button>
              </div>
            ))
          ) : (
            notes.map(note => (
              <div className="col-4" key={note._id}>
                <button className="btn w-100" onClick={() => handleClick(note._id)}>
                  <Note _id={note._id} title={note.title} note={note.content} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className='d-block d-sm-none text-white p-3'>
        <div className='d-flex justify-content-center align-items-start flex-column border-bottom py-2 gap-2 mb-3'>
          <TopBar username={username ?? ''} />
          <form action="" className='d-flex' onSubmit={handleSearch} style={{ width: '100%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='btn text-white' type='submit' >Search</button>
          </form>
        </div>
        <CreateNote />

        <div className="row">
          {searchTerm && searchNotes.length > 0 ? (
            searchNotes.map(note => (
              <div className="container" key={note._id}>
                <button className="btn w-100" onClick={() => handleClick(note._id)}>
                  <Note _id={note._id} title={note.title} note={note.content} />
                </button>
              </div>
            ))
          ) : (
            notes.map(note => (
              <div className="container" key={note._id}>
                <button className="btn w-100" onClick={() => handleClick(note._id)}>
                  <Note _id={note._id} title={note.title} note={note.content} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
