// NoteCard.tsx
import React from "react";
import { Note } from "@/types/Note";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const router = useRouter();
  const displayContent = note.content;

  return (
    <div
      className="bg-gray-800 hover:bg-gray-700/80 transition duration-200 rounded-lg p-5 border border-gray-700/50 cursor-pointer 
                   flex flex-col min-h-[300px] w-full text-gray-200 relative"
    >
      <div className="absolute top-4 right-4 text-xs font-medium text-gray-400">
        {formatDate(note.send_at)}
      </div>

      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-xl text-left font-bold text-white mb-2 truncate">
          Recipent: {note.recipient_name || note.recipient_email}
        </h2>
        <div className="text-sm text-left text-gray-400 flex-grow overflow-hidden">
          <p
            className="line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: displayContent || "No message content.",
            }}
          ></p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex-shrink-0">
        {" "}
        <button
          onClick={() => {
            router.push(`/note/${note.id}`);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
