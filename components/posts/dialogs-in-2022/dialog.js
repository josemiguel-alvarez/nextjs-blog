import { useRef } from "react";

export const Dialog = () => {
  const myDialog = useRef();

  return (
    <div>
      <button
        onClick={() => myDialog.current.showModal()}
        className="rounded border p-2"
      >
        Open dialog
      </button>
      <dialog ref={myDialog} className="rounded bg-slate-400">
        <div className="m-2 flex flex-col items-center">
          <p className="text-lg font-medium">Hello world!</p>
          <p>Press ESC or click the button to close.</p>
          <button
            className="rounded border border-white bg-white p-2"
            onClick={() => myDialog.current.close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};
