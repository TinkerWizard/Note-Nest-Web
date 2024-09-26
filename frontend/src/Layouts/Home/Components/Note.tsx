
export const Note: React.FC<{_id: string, title: string, note: string}> = ({_id, title, note}) => {
    return(
        <div className="container rounded border p-5 d-flex justify-content-center align-items-center flex-column" style={{transition: 'none'}}>
            <h4 className="text-light text-wrap">{title.substring(0, 20)}</h4>
            <p className="text-light text-wrap">{note.substring(0,20)}...</p>

        </div>
    );
}