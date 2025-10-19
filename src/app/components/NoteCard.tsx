import { Note } from "@/types/Note";

export default function NoteCard({ note }: { note: Note }) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Date(note.send_at).toLocaleDateString(
    "en-US",
    dateOptions
  );

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {note.recipient_name || note.recipient_email}
        </h3>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {note.content}
      </p>
    </div>
  );
}
