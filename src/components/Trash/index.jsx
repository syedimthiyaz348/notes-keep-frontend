import Header from "../Header";
import SideMenu from "../SideMenu";
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

const Trash = () => {
  const [notesData, setNotesData] = useState([]);
  useEffect(() => {
    callingApi();
  }, []);

  const trashData = notesData.filter(
    (eachdata) => eachdata.status === "trash"
  );

  const callingApi = async () => {
    const url = "https://keep-notes-black.vercel.app/notes";
    const jwtToken = Cookies.get("jwtToken");
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
  return (
    <div>
      <Header />
      <hr />
      <div className="below-header">
        <SideMenu />
        <div className="data-container">
          <h1>Trash</h1>
        </div>
      </div>
    </div>
  );
};

export default Trash;
