import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type EditorRef } from "react-email-editor";

const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

export default function Email() {
  const emailEditorRef = useRef<EditorRef | null>(null);

  const saveDesign = () => {
    emailEditorRef.current?.saveDesign((design) => {
      console.log("saveDesign", design);
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.exportHtml((data) => {
      const { html } = data;
      console.log("exportHtml", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  function onLoad() {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current?.loadDesign(templateJson);
  }

  function onReady() {
    // editor is ready
  }

  return (
    <>
      <div className="">
        <div className="flex flex-row gap-4">
          <button
            onClick={saveDesign}
            className="hover:text-blue-700 active:text-blue-400"
          >
            Save Design
          </button>
          <button
            onClick={exportHtml}
            className="hover:text-blue-700 active:text-blue-400"
          >
            Export HTML
          </button>
        </div>

        <div className="h-screen overflow-hidden">
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
        </div>
      </div>
      <Link
        href="/admin/emailMailingList"
        className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
      >
        Email Mailing List
      </Link>
      <Link
        href="/admin/home"
        className="text-xl font-bold text-white hover:text-blue-700 hover:underline active:text-gray-500"
      >
        Admin Home
      </Link>
    </>
  );
}
