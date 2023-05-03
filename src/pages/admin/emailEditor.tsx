/*eslint-disable @typescript-eslint/no-misused-promises */
import { useRef } from "react";
import Link from "next/link";
import { type EditorRef } from "react-email-editor";
import EmailEditor from "react-email-editor";
import { api } from "~/utils/api";
import { useState } from "react";

/* 
import dynamic from "next/dynamic";

const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
}); 
*/

export default function Email() {
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [designToLoad, setDesignToLoad] = useState("");
  const [queryEnabled, setQueryEnabled] = useState(false);
  const designNames = api.subscription.getEmailDesignNames.useQuery();
  const savedesign = api.subscription.saveEmailDesign.useMutation();

  const saveDesign = () => {
    emailEditorRef.current?.saveDesign((design) => {
      savedesign
        .mutateAsync({ name: name, json: design })
        .then(() => alert(`Design ${name} saved`))
        .catch((err) => alert(err));
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.exportHtml((data) => {
      const { html } = data;
      navigator.clipboard
        .writeText(html)
        .then(() => alert("HTML saved to clipboard"))
        .catch((error) => alert(error));
    });
  };

  api.subscription.getEmailDesign.useQuery(
    {
      name: designToLoad,
    },
    {
      onSuccess: (data) => {
        //eslint-disable-next-line
        //@ts-ignore
        emailEditorRef.current?.loadDesign(data[0]!.json);
        setShowForm(false);
        setQueryEnabled(false);
      },
      enabled: queryEnabled,
    }
  );

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
      <div className="flex flex-row gap-4">
        <Link
          href="/admin/emailMailingList"
          className="text-xl font-bold text-gray-800 hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Email Mailing List
        </Link>
        <Link
          href="/admin/home"
          className="text-xl font-bold text-gray-800 hover:text-blue-700 hover:underline active:text-gray-500"
        >
          Admin Home
        </Link>
      </div>
      <div className="">
        <div className="flex flex-row gap-4">
          <input
            type="text"
            id="design_name"
            placeholder="Design Name"
            className="bg-gray-600 text-white"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button
            onClick={saveDesign}
            className="hover:text-blue-700 active:text-blue-400"
          >
            Save Design
          </button>
          <button
            onClick={() => {
              setShowForm(!showForm);
            }}
            className="hover:text-blue-700 active:text-blue-400"
          >
            Load Design
          </button>
          <div className={showForm ? "block" : "hidden"}>
            <label htmlFor="names">Which design would you like to load?</label>
            <select
              id="names"
              onChange={(e) => {
                setDesignToLoad(e.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled selected>
                Select Design
              </option>
              {designNames.data?.map((design) => (
                <option
                  key={design.name as string}
                  value={design.name as string}
                >
                  {design.name}
                </option>
              ))}
            </select>
            <button onClick={() => setQueryEnabled(true)}>Load</button>
          </div>
          <button
            onClick={exportHtml}
            className="hover:text-blue-700 active:text-blue-400"
            disabled={designToLoad === ""}
          >
            Export HTML
          </button>
        </div>

        <div className="h-screen overflow-hidden">
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
        </div>
      </div>
    </>
  );
}
