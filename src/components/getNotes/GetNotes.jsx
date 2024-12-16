import { useContext, useState } from "react";
import { instance } from "../../axios";
// components
import NotesList from "./NotesList";
import Loader from "../../components/Loader";
//style
import "./Skeleton.css";
import NotesContext from "../../context/NotesContext";


export default function GetNotes({ setIsConnected }) {
  const [showOption, setShowOption] = useState({ isActive: false, id: null });
  const { notes, notesLoding, setNotes ,setShowAddNoteModal , showAddNoteModal } = useContext(NotesContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  console.log(showAddNoteModal)



  const handleRemoveNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setNotes((prev) => prev.filter((el) => el.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
  
  <div>
  
  <div className="button-container">
    <span className="button-container-l"><button onClick={handleLogout}>Logout</button></span>
    <span className="button-container-a"><button onClick={() => setShowAddNoteModal(!showAddNoteModal)}>
      Add Note
    </button></span>
    
  </div>

  
  <table className="w-[90%] m-auto text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#1a1a1a] dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3">
          title
        </th>
        <th>note</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {notes && (
        <Loader loading={notesLoding} type="notes">
          {notes.map((el) => (
            <>
              {console.log("render")}
              <NotesList
                key={el.id}
                el={el}
                handleRemoveNote={handleRemoveNote}
                setShowOption={setShowOption}
                showOption={showOption}
              />
            </>
          ))}
        </Loader>
      )}
    </tbody>
  </table>
</div>
  </>
    
  );
}
