"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TipTapToolbar from "./TipTapToolbar";



interface TipTapEditorProps {
  defaultContent?: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({
  defaultContent = "",
  onChange,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: defaultContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });
  return (
    <div
      suppressHydrationWarning
      className="border p-4 rounded-md mt-1 dark:bg-gray-800 flex flex-col h-full overflow-hidden"
    >
      <TipTapToolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="min-h-0 p-4 flex-grow overflow-y-auto border rounded-2xl 
                   [&>.ProseMirror]:h-full 
                   [&>.ProseMirror]:min-h-0 
                   [&>.ProseMirror]:flex 
                   [&>.ProseMirror]:flex-col"
      />
    </div>
  );
}
