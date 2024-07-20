import React, { useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface Props {
  onChange: (value: string) => void;
  initialValue?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialValue, editable = true }: Props) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url; // Ensure you return the URL of the uploaded file
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialValue
      ? (JSON.parse(initialValue) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload, // Integrate the uploadFile function
  });

  useEffect(() => {
    if (editor) {
      editor.isEditable = editable;
    }
  }, [editor, editable]);

  const handleChange = () => {
    onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={handleChange}
        editable={editable}
      />
    </div>
  );
};

export default Editor;
