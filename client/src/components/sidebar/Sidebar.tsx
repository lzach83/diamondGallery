import React from "react";
import UploadButton from "../uploadButton";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-3 gap-3">
      <h1 className="font-extrabold text-4xl text-center">Diamond Gallery</h1>
      <ul>
        <li>
          <UploadButton />
        </li>
      </ul>
    </div>
  );
}
