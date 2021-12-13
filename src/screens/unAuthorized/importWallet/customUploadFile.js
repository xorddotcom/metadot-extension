/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { fonts } from '../../../utils';
import { FileChosen, UploadFile, UploadFileDiv } from './styledComponents';
import UploadFileIcon from '../../../assets/images/icons/uploadFile.svg';

const { subHeadingfontFamilyClass } = fonts;

const CustomUploadFile = () => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  const [fileName, setFileName] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target.result);
      console.log(text);
    };
    reader.readAsText(e.target.files[0]);
    setFileName(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <UploadFileDiv className={subHeadingfontFamilyClass}>
      <form onSubmit={(e) => e.preventDefault()}>
        {/*  our custom upload button --> */}
        <UploadFile htmlFor="actual-btn" onClick={handleClick}>
          <img src={UploadFileIcon} alt="upload-file-icon" style={{ marginRight: '1rem' }} />
          <div>Choose File</div>
        </UploadFile>

        <input
          id="upload-file"
          type="file"
          ref={hiddenFileInput}
          onChange={showFile}
          style={{ display: 'none' }}
        />

        {/* name of file chosen */}
        <FileChosen>{!isFilePicked ? 'No File Choosen' : fileName.name}</FileChosen>
      </form>
    </UploadFileDiv>
  );
};

export default CustomUploadFile;
