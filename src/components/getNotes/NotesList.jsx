import { useContext, useState } from "react";
import NotesContext from "../../context/NotesContext";

/* eslint-disable react/prop-types */
export default function NotesList({
  el,
  setShowOption,
  handleRemoveNote,
  showOption,
}) {
  const { setShowUpdateModal , setShareModal } = useContext(NotesContext);

  return (
    <tr className="bg-white border-b dark:bg-[#353535] dark:border-gray-700 hover:bg-[#4a4a4a]">
 <td className="px-4 py-3 font-medium dark:text-white custom-td">
  {el.title}
</td>
  <td className="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-left">
  {el.content}
</td>


  <td className="px-4 py-3 font-medium whitespace-nowrap dark:text-white relative">
    <div
      onClick={() => {
        setShowOption({
          isActive: el.id !== showOption.id ? true : !showOption.isActive,
          id: el.id,
        });
        console.log(showOption.id, el.id);
      }}
      className="cursor-pointer text-center relative"
    >
      <span className="inline-block text-gray-600 dark:text-gray-300">. . .</span>
      <div
        className={`options absolute flex flex-col gap-4 z-10 right-[-50px] top-0 bg-[#2f2f2f] p-4 rounded-lg shadow-lg transition-all duration-300 ${
          showOption.id == el.id && showOption.isActive
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] pointer-events-none"
        }`}
      >
        {/* Edit Button */}
        <button
          className="flex items-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() =>
            setShowUpdateModal((prev) => ({
              ...prev,
              id: el.id,
              isShow: true,
            }))
          }
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="..." /> {/* Simplified for brevity */}
          </svg>
          <span>Edit</span>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveNote(el.id)}
          className="flex items-center gap-2 py-2 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="..." /> {/* Simplified for brevity */}
          </svg>
          <span>Delete</span>
        </button>

        {/* Share Button */}
        <button
          className="flex items-center gap-2 py-2 px-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => setShareModal(true)}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="..." /> {/* Simplified for brevity */}
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  </td>
</tr>
  );
}
