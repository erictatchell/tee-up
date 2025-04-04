"use client"

/**
 * Client side upload button, handles most interactions
 * 
 * @author erictatchell
 */

import { Paperclip, XCircle } from "@phosphor-icons/react/dist/ssr"

type FileProps = {
  files: File[];
  documentID: number;
  description: string;
  setFiles: (files: File[]) => void;
  submit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const UploadFile: React.FC<FileProps> = ({ files, setFiles, submit }) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles([...files, ...Array.from(selectedFiles)]);
    }
  };

  const resetFiles = () => {
    setFiles([]);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const removeFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  }

  return (
    <div className="grid">
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index} className="text-sm mb-3 flex">
              <button onClick={(e) => { e.preventDefault(); removeFile(file); }} type='reset' className="">
                <div className="flex items-center bg-gray-200 hover:bg-[#C4DAEC] p-1.5 rounded-lg">

                  <XCircle size={20} />
                  <p className="mx-1">
                    Clear

                  </p>
                </div>
              </button>
              <div className="flex mx-1 items-center">
                {file.name}
              </div>


            </li>
          ))}
        </ul >
      )}
      <label htmlFor="fileInput" className="cursor-pointer flex items-center">
        <div className="hover:bg-gray-100 bg-white p-2 rounded-lg border border-gray-500 w-48">
          <div className="flex items-center">
            <div className="flex items-center">
              <input
                id="fileInput"
                className="bg-transparent flex-1 border-none outline-none hidden"
                type="file"
                accept=".pdf, .docx, .jpg, .jpeg, .png"
                onChange={handleFileChange}
                multiple
              />
              <Paperclip size={24} weight='light' className="text-gray-400" />
              <div className="max-w-32 ml-2 flex-1 overflow-hidden">
                <span className={`${files.length > 0 ? 'text-md' : ''} text-gray-500 whitespace-nowrap text-lg tracking-wide overflow-hidden overflow-ellipsis`}>
                  {files.length > 0 ? `Attach files (${files.length})` : `Attach files`}
                </span>
              </div>
            </div>
          </div>
        </div >
      </label>
    </div>
  );
};

export default UploadFile;