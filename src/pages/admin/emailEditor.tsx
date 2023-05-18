/*eslint-disable @typescript-eslint/no-misused-promises */
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { type EditorRef } from "react-email-editor";
import EmailEditor from "react-email-editor";
import { api } from "~/utils/api";
import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

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
  const { isLoaded, userId } = useAuth();
  const designNames = api.email.getEmailDesignNames.useQuery();
  const savedesign = api.email.saveEmailDesign.useMutation();

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

  api.email.getEmailDesign.useQuery(
    {
      name: designToLoad,
    },
    {
      onSuccess: (data) => {
        //eslint-disable-next-line
        //@ts-ignore
        //eslint-disable-next-line
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

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <div>Loading...</div>;
      </main>
    );
  if (!userId) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    document.onkeydown = function (e) {
      if (e.key === "F12") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "i") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "c") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "j") {
        return false;
      }
      if (e.ctrlKey && e.key === "u") {
        return false;
      }
    };
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        <h1 className="text-2xl text-white">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/emailEditor" />
          <div className="absolute z-10 h-16 w-60 -translate-y-20 translate-x-10 bg-white object-contain"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Email Editor</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
                <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/apple-touch-icon.png"
        />
      </Head>
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
            <button
              onClick={() => setQueryEnabled(true)}
              disabled={designToLoad === ""}
            >
              Load
            </button>
          </div>
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
    </>
  );
}
