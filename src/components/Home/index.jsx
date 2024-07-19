import { useEffect, useState } from "react";
import Header from "../Header";
import SideMenu from "../SideMenu";
import "./index.css";
import Cookies from "js-cookie";
import NoteItem from "../NoteItem";

const Home = () => {
  const [changingInput, setChangingInput] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uiRendering, setUiRendering] = useState(false)
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    callingApi();
  }, [uiRendering]);

  const createdData = notesData.filter(
    (eachdata) => eachdata.status === "created"
  );

  const callingApi = async () => {
    const url = "https://keep-notes-black.vercel.app/notes";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    //console.log(data)
    if (response.ok === true) {
      const fetchedData = data.map((eachNote) => ({
        id: eachNote._id,
        title: eachNote.title,
        content: eachNote.content,
        status: eachNote.status,
      }));
      setNotesData(fetchedData);
    }
  };

  const HandlingTextInput = () => {
    setChangingInput(true);
  };

  const handlingCloseButton = () => {
    setChangingInput(false);
  };

  const handlingTitle = (event) => {
    setTitle(event.target.value);
  };

  const handlingContent = (event) => {
    setContent(event.target.value);
  };

  const enteringNewNote = async event => {
    event.preventDefault()
    const url = 'https://keep-notes-black.vercel.app/addnote'
    const userNoteData = {title: title, content: content}
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
        Accept : "application/json"
      },
      body : JSON.stringify(userNoteData)
    };
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    setUiRendering(prevState => !prevState)
    setChangingInput(false);
  }

  return (
    <div>
      <Header />
      <hr />
      <div className="below-header">
        <SideMenu />
        <div className="data-container">
          <div className="note-page">
            {!changingInput && (
              <div className="note-input-container">
                <input
                  onClick={HandlingTextInput}
                  className="note-input"
                  type="text"
                  placeholder="Take a note.."
                />
              </div>
            )}
            {changingInput && (
              <form onSubmit={enteringNewNote} className="new-note-input-container">
                <input
                  onChange={handlingTitle}
                  className="note-input"
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  className="textarea-note-input"
                  type="text"
                  onChange={handlingContent}
                  placeholder="Take a note.."
                />
                <div className="buttons">
                  <button type="submit">Create</button>
                  <button onClick={handlingCloseButton} type="button">
                    Close
                  </button>
                </div>
              </form>
            )}
          </div>
          <ul className="note-list-container">
            {createdData.map((eachCreatedData) => (
              <NoteItem key={eachCreatedData.id} noteData={eachCreatedData} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
