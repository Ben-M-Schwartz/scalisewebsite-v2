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
        setName(designToLoad);
      },
      enabled: queryEnabled,
    }
  );

  /*   function onLoad() {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current?.loadDesign(templateJson);
  }

  function onReady() {
    // editor is ready
  } */

  if (!isLoaded)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <div>Loading...</div>;
      </main>
    );
  if (!userId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-950">
        <h1 className="text-2xl text-stone-100">
          This page is for band members only
        </h1>
        <div>
          <SignIn redirectUrl="/admin/emailEditor" />
          <div className="absolute z-10 h-16 w-60 -translate-y-24 translate-x-7 bg-white object-contain sm:-translate-y-20 sm:translate-x-10"></div>
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
      <main className="bg-stone-100">
        <div className="flex flex-row justify-center gap-4 py-6">
          <Link
            href="/admin/emailMailingList"
            className="text-xl font-bold text-red-800 underline hover:text-red-900 active:text-red-950"
          >
            Email Mailing List
          </Link>
          <Link
            href="/admin/home"
            className="text-xl font-bold text-red-800 underline hover:text-red-900 active:text-red-950"
          >
            Admin Home
          </Link>
        </div>
        <div className="">
          <div className="flex flex-row justify-center gap-4 pb-6">
            <input
              type="text"
              id="design_name"
              placeholder="Design Name"
              value={name}
              className="w-1/6 rounded-md bg-gray-600 px-2 text-stone-100"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <button
              onClick={saveDesign}
              className="rounded-md border bg-red-800 px-4 py-2 text-stone-100 hover:bg-red-900 active:bg-red-950"
            >
              Save Design
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
              }}
              className="rounded-md border bg-red-800 px-4 py-2 text-stone-100 hover:bg-red-900 active:bg-red-950"
            >
              Load Design
            </button>
            <div className={showForm ? "block" : "hidden"}>
              <label htmlFor="names">
                Which design would you like to load?
              </label>
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
                className="rounded-md border bg-red-800 px-4 py-2 text-stone-100 hover:bg-red-900 active:bg-red-950"
              >
                Load
              </button>
            </div>
            <button
              onClick={exportHtml}
              className="rounded-md border bg-red-800 px-4 py-2 text-stone-100 hover:bg-red-900 active:bg-red-950"
            >
              Export HTML
            </button>
          </div>

          <p className="text-center text-stone-950">
            If the editor doesn&apos;t load on a page refresh go back to the
            homepage and follow the link to this page again
          </p>
          <p className="text-center text-stone-950">
            NOTE: Nothing is auto saved. To save your design type the name above
            and click save. If you type the name of an already existing design
            it will override the previous database entry.
          </p>
          <p className="text-center text-stone-950">
            Name is auto entered on loading a design. Change it to save a new
            design.
          </p>

          <div className="h-screen overflow-hidden">
            <EmailEditor
              ref={emailEditorRef} /* onLoad={onLoad} onReady={onReady} */
            />
          </div>
        </div>
      </main>
    </>
  );
}
