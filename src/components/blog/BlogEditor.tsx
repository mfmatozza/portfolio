import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, Code2,
  Link2, Unlink, ImagePlus, Sparkles, Eraser, Minus,
} from "lucide-react";
import { EffectMark, EFFECTS } from "@/lib/effectMark";
import { uploadImage } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Btn = ({ on, active, title, children }: { on: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={on}
    className={cn("p-1.5 rounded hover:bg-muted transition-colors", active && "bg-muted text-primary")}
  >
    {children}
  </button>
);

const Toolbar = ({ editor }: { editor: Editor }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const c = () => editor.chain().focus();

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "" ) return c().unsetLink().run();
    if (!/^(https?:\/\/|mailto:|\/)/i.test(url)) return toast.error("Use a full URL starting with https://");
    if (editor.state.selection.empty) {
      c().insertContent(`<a href="${encodeURI(url)}">${url}</a>`).run();
    } else c().extendMarkRange("link").setLink({ href: url }).run();
  };

  const onImage = async (f?: File) => {
    if (!f) return;
    try {
      toast.loading("Uploading image…", { id: "img" });
      const url = await uploadImage(f);
      c().setImage({ src: url, alt: f.name }).run();
      toast.success("Image added", { id: "img" });
    } catch (e: any) {
      toast.error(e.message, { id: "img" });
    }
  };

  const i = "w-4 h-4";
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border p-1.5 sticky top-0 bg-card z-10">
      <Btn title="Bold" on={() => c().toggleBold().run()} active={editor.isActive("bold")}><Bold className={i} /></Btn>
      <Btn title="Italic" on={() => c().toggleItalic().run()} active={editor.isActive("italic")}><Italic className={i} /></Btn>
      <Btn title="Strike" on={() => c().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough className={i} /></Btn>
      <span className="w-px h-5 bg-border mx-1" />
      <Btn title="Heading" on={() => c().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className={i} /></Btn>
      <Btn title="Subheading" on={() => c().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className={i} /></Btn>
      <Btn title="Bullet list" on={() => c().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className={i} /></Btn>
      <Btn title="Numbered list" on={() => c().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className={i} /></Btn>
      <Btn title="Quote" on={() => c().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className={i} /></Btn>
      <Btn title="Code block" on={() => c().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code2 className={i} /></Btn>
      <Btn title="Divider" on={() => c().setHorizontalRule().run()}><Minus className={i} /></Btn>
      <span className="w-px h-5 bg-border mx-1" />
      <Btn title="Add link" on={setLink} active={editor.isActive("link")}><Link2 className={i} /></Btn>
      <Btn title="Remove link" on={() => c().unsetLink().run()}><Unlink className={i} /></Btn>
      <Btn title="Insert image" on={() => fileRef.current?.click()}><ImagePlus className={i} /></Btn>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { onImage(e.target.files?.[0]); e.target.value = ""; }} />
      <span className="w-px h-5 bg-border mx-1" />
      <Sparkles className="w-3.5 h-3.5 text-primary mx-1" />
      {EFFECTS.map((fx) => (
        <button
          key={fx}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => c().setMark("effect", { kind: fx }).run()}
          className={cn(
            "px-2 py-1 rounded text-xs hover:bg-muted",
            editor.isActive("effect", { kind: fx }) && "bg-muted",
          )}
        >
          <span className={`fx-${fx}`} data-effect={fx}>{fx}</span>
        </button>
      ))}
      <Btn title="Remove effect" on={() => c().unsetMark("effect").run()}><Eraser className={i} /></Btn>
    </div>
  );
};

export const BlogEditor = ({ value, onChange }: { value: string; onChange: (html: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false } as any),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { target: "_blank", rel: "noopener" } }),
      Image,
      EffectMark,
    ],
    content: value,
    editorProps: { attributes: { class: "blog-content min-h-[400px] p-5 focus:outline-none" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false } as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
