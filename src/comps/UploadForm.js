import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const types = ["image/png", "image/jpeg", "image/gif", "image/png"];
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    // console.log("changed", e.target.files);
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("pls select an image");
    }
  };

  return (
    <form>
      <label htmlFor="file">
      +
      <input type="file" id="file" onChange={changeHandler} />
      </label>

      <div>
        {file && <div className="file">{file.name}</div>}
        {error && <div className="error">{error}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
