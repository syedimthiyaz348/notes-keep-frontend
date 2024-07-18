import { useEffect, useState } from "react";
import Header from "../Header";
import SideMenu from "../SideMenu";
import "./index.css";
import Cookies from 'js-cookie'

const Home = () => {
  const [changingInput, setChangingInput] = useState(false);
  const [notesData, setNotesData] = useState([])

  useEffect(() => {
    callingApi()
  }, [])

  const createdData = notesData.filter(eachdata => eachdata.status === "created")

  const callingApi = async () => {
    const url = 'https://keep-notes-black.vercel.app/notes'
    const jwtToken = Cookies.get("jwtToken")
    const options = {
      method : 'GET',
      headers : {
        Authorization : `Bearer ${jwtToken}`
      }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    //console.log(data)
    if (response.ok === true) {
      const fetchedData = data.map(eachNote => (
        {
          id : eachNote._id,
          title: eachNote.title,
          content: eachNote.content,
          status: eachNote.status,
        }
      ))
      setNotesData(fetchedData)
    }
  }

  const HandlingTextInput = () => {
    setChangingInput(true);
  };

  const handlingNewInput = () => {
    setChangingInput(false);
  };

  const handlingCloseButton = () => {
    setChangingInput(false);
  }

  return (
    <div>
      <Header />
      <hr />
      <div className="below-header">
        <SideMenu />
        <div className="data-container">
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
            <form className="new-note-input-container">
              <input className="note-input" type="text" placeholder="Title" />
              <textarea
                onBlur={handlingNewInput}
                className="textarea-note-input"
                type="text"
                placeholder="Take a note.."
              />
              <div className="buttons">
                <button type="button">Create</button>
                <button onClick={handlingCloseButton} type="button">Close</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
