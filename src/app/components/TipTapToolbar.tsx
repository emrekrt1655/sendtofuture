"use client";

import { Editor } from "@tiptap/react";
import React from "react";
import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight,
  Highlighter, Underline, Text, Minus, Quote
} from "lucide-react";

interface TipTapToolbarProps {
  editor: Editor | null;
  className?: string; 
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  Icon: React.ElementType;
  title: string;
  disabled?: boolean;
  children?: React.ReactNode; 
}> = ({ onClick, isActive, Icon, title, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-md transition-colors duration-150 ease-in-out ${
      isActive
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "text-gray-400 hover:bg-gray-700 hover:text-white"
    } disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    <Icon className="w-5 h-5" />
  </button>
);


const TipTapToolbar: React.FC<TipTapToolbarProps> = ({ editor, className }) => {
  if (!editor) {
    return null;
  }

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };
  
  const setHighlightColor = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
  };

  return (
    <div className={`flex flex-wrap gap-2 p-2 border-b dark:border-gray-700 ${className}`}>
        
      <div className="flex items-center space-x-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} Icon={Bold} title="Bold" disabled={!editor.can().chain().focus().toggleBold().run()}/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} Icon={Italic} title="Italic" disabled={!editor.can().chain().focus().toggleItalic().run()}/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")} Icon={Strikethrough} title="Strikethrough" disabled={!editor.can().chain().focus().toggleStrike().run()}/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} Icon={Underline} title="Underline"/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive("code")} Icon={Code} title="Code"/>
      </div>
      
      <div className="w-px h-6 bg-gray-700 dark:bg-gray-700"></div>

      <div className="flex items-center space-x-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} Icon={Heading1} title="Heading 1"/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} Icon={Heading2} title="Heading 2"/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} Icon={Quote} title="Blockquote"/>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} isActive={false} Icon={Minus} title="Horizontal Rule"/>
      </div>

      <div className="w-px h-6 bg-gray-700 dark:bg-gray-700"></div>

      <div className="flex items-center space-x-1">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} Icon={List} title="Bullet List"/>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} Icon={ListOrdered} title="Ordered List"/>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} Icon={AlignLeft} title="Align Left"/>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} Icon={AlignCenter} title="Align Center"/>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} Icon={AlignRight} title="Align Right"/>
      </div>
      
      <div className="w-px h-6 bg-gray-700 dark:bg-gray-700"></div>

      <div className="flex items-center space-x-1">
        
        <div className="relative group">
            <ToolbarButton onClick={() => {}} isActive={false} Icon={Text} title="Text Color" />
            <input type="color" onChange={(e) => setTextColor(e.target.value)} 
                   className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                   value={editor.getAttributes('textStyle').color || "#ffffff"} 
            />
        </div>
        <ToolbarButton onClick={() => editor.chain().focus().unsetColor().run()} isActive={false} Icon={Text} title="Clear Color">
            <Text className="w-5 h-5" style={{ textDecoration: 'line-through' }} />
        </ToolbarButton>


        <div className="relative group">
            <ToolbarButton onClick={() => {}} isActive={editor.isActive('highlight')} Icon={Highlighter} title="Highlight Color" />
            <input type="color" onChange={(e) => setHighlightColor(e.target.value)} 
                   className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                   value={editor.getAttributes('highlight').color || "#ffc078"}
            />
        </div>
        <ToolbarButton onClick={() => editor.chain().focus().unsetHighlight().run()} isActive={false} Icon={Highlighter} title="Clear Highlight">
            <Highlighter className="w-5 h-5 text-red-500" />
        </ToolbarButton>
        
      </div>

    </div>
  );
};

export default TipTapToolbar;