import "./index.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const NoteItem = (props) => {
  const { noteData } = props;
  const { id, title, content } = noteData;
  const handlingDeleteButton = () => {
    const url = `https://keep-notes-black.vercel.app/updatenote/${id}`
  }
  return (
    <li className="note-container">
      <h1>{title}</h1>
      <p>{content}</p>
      <div className="editing-icons">
        <DeleteOutlineIcon onClick={handlingDeleteButton} />
        <EditOutlinedIcon />
        <ArchiveOutlinedIcon />
      </div>
    </li>
  );
};

export default NoteItem;
