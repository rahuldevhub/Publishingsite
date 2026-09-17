"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { legacyContentToHtml } from "@/lib/blog-content-format";

type RichTextEditorProps = {
  id: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type ToolbarButtonProps = {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

function ToolbarButton({ label, children, onClick, active = false, disabled = false }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`rich-text-toolbar-button ${active ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function isAllowedEditorUrl(value: string): boolean {
  const href = value.trim();
  if ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#")) return true;
  try {
    const parsed = new URL(href);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function Toolbar({ editor }: { editor: Editor }) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [linkError, setLinkError] = useState("");

  function openLinkDialog() {
    setUrl(editor.getAttributes("link").href ?? "");
    setLinkError("");
    setShowLinkDialog(true);
  }

  function applyLink() {
    const href = url.trim();
    if (!isAllowedEditorUrl(href)) {
      setLinkError("Use a relative URL or a complete http/https URL.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setShowLinkDialog(false);
  }

  function removeLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkDialog(false);
  }

  return (
    <div className="rich-text-toolbar" role="toolbar" aria-label="Content formatting">
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <span aria-hidden="true">↶</span>
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <span aria-hidden="true">↷</span>
      </ToolbarButton>

      <label className="sr-only" htmlFor="rich-text-type">Text type</label>
      <select
        id="rich-text-type"
        aria-label="Text type"
        title="Text type"
        value={editor.isActive("heading", { level: 2 }) ? "h2" : editor.isActive("heading", { level: 3 }) ? "h3" : "paragraph"}
        onChange={(event) => {
          const type = event.target.value;
          if (type === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
          else if (type === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
          else editor.chain().focus().setParagraph().run();
        }}
        className="rich-text-type-select"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong aria-hidden="true">B</strong>
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em aria-hidden="true">I</em>
      </ToolbarButton>
      <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <span className="underline" aria-hidden="true">U</span>
      </ToolbarButton>
      <ToolbarButton label="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
        <mark aria-hidden="true">A</mark>
      </ToolbarButton>

      <div className="rich-text-link-control">
        <ToolbarButton label="Add or edit link" active={editor.isActive("link")} onClick={openLinkDialog}>
          <span aria-hidden="true">🔗</span>
        </ToolbarButton>
        {showLinkDialog && (
          <div className="rich-text-link-dialog" role="dialog" aria-label="Edit link">
            <label htmlFor="rich-text-link-url" className="text-xs font-medium text-gray-700">URL</label>
            <input
              id="rich-text-link-url"
              type="url"
              inputMode="url"
              autoFocus
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                setLinkError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
                if (event.key === "Escape") setShowLinkDialog(false);
              }}
              placeholder="/packages or https://example.com"
              className="rich-text-link-input"
            />
            {linkError && <p className="text-xs text-red-600" role="alert">{linkError}</p>}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={removeLink} disabled={!editor.isActive("link")} className="rich-text-link-action text-gray-600 disabled:opacity-40">
                Remove link
              </button>
              <button type="button" onClick={applyLink} className="rich-text-link-action bg-gray-900 text-white">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <span aria-hidden="true">•≡</span>
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <span aria-hidden="true">1≡</span>
      </ToolbarButton>
      <ToolbarButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <span aria-hidden="true">❝</span>
      </ToolbarButton>
      <ToolbarButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <span aria-hidden="true">☰</span>
      </ToolbarButton>
      <ToolbarButton label="Remove formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        <span aria-hidden="true">Tx</span>
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({ id, value, onChange, placeholder = "Write your post content here…" }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: false,
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        autolink: false,
        openOnClick: false,
        HTMLAttributes: {},
        isAllowedUri: (url) => isAllowedEditorUrl(url),
      }),
      TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: legacyContentToHtml(value),
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-required": "true",
        "aria-label": "Blog post content",
        "data-placeholder": placeholder,
        class: "rich-text-editor-content",
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.isEmpty ? "" : currentEditor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const normalized = legacyContentToHtml(value);
    if (editor.getHTML() !== normalized && !editor.isFocused) {
      editor.commands.setContent(normalized, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="rich-text-editor-loading" aria-label="Loading content editor" />;
  }

  return (
    <div className="rich-text-editor-shell">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
