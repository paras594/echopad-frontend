"use client";

import clsx from "clsx";
import React, { useCallback, useEffect } from "react";
import {
  LuBold,
  LuCode2,
  LuItalic,
  LuLink,
  LuListOrdered,
  LuUnderline,
} from "react-icons/lu";

const ToolbarBtn = ({ isActive, children, onClick }: any) => {
  const baseClassName = `w-8 h-8 flex items-center justify-center text-lg rounded-lg transition-colors duration-300`;

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseClassName,
        isActive ? "bg-primary hover:bg-hover text-white" : "hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
};

const Toolbar = ({ editor }: { editor: any }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    if (!editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    }
  }, [editor]);

  return (
    <div className="overflow-x-auto  max-w-[100svw] sm:max-w-[calc(100vw-2rem)] scrollable-content border-b">
      <div className="py-2 bg-white sticky top-0 z-50 flex gap-2 px-2">
        <select
          name="heading"
          id="heading"
          defaultValue="paragraph"
          className="rounded bg-white"
          value={editor?.getAttributes("heading").level || "paragraph"}
          onChange={(e) => {
            if (e.target.value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: +e.target.value })
                .run();
            }
          }}
        >
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="paragraph">Normal</option>
        </select>
        <div className="flex items-center gap-2">
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor?.isActive("bold")}
          >
            <LuBold />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
            isActive={editor?.isActive("italic")}
          >
            <LuItalic />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleUnderline().run();
            }}
            isActive={editor?.isActive("underline")}
          >
            <LuUnderline />
          </ToolbarBtn>
          <ToolbarBtn onClick={setLink} isActive={editor?.isActive("link")}>
            <LuLink />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            isActive={editor?.isActive("orderedList")}
          >
            <LuListOrdered />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            isActive={editor?.isActive("codeBlock")}
          >
            <LuCode2 />
          </ToolbarBtn>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
