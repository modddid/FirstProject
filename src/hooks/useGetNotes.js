import { instance } from "../axios";

import{ useEffect, useState } from "react";

export default function useGetNotes() {
  const [notesLoding, setNotesLoading] = useState("idle");
  const [notes, setNotes] = useState([]);
  const GetNotes = async () => {
    setNotesLoading("pending");
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get(`/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotesLoading("fulfield");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
      setNotesLoading("rejected");
    }
  };

  useEffect(() => {
    GetNotes();
  }, [setNotes]);

  return {notesLoding, notes , setNotes};
}
