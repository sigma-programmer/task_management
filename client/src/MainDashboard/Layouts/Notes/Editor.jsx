


import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './Editor.css';

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ]
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'background', 'align'
];

function Editor({ content, onChange }) {
  return (
    <div className="editor-container">
      <ReactQuill
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
      />
    </div>
  );
}

export default Editor;




// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Quill's CSS
// import './Editor.css'

// const modules = {
//   toolbar: [
//     [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//     [{ 'size': [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image'],
//     [{ 'align': [] }],
//     [{ 'color': [] }, { 'background': [] }],
//     ['clean'], // Remove formatting
//     ['table'] // Optional: Table functionality (requires custom module or manual implementation)
//   ]
// };

// const formats = [
//   'header', 'font', 'size',
//   'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'indent',
//   'link', 'image', 'color', 'background', 'align'
// ];

// function Editor() {
//   const [content, setContent] = useState("");

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   return (
//     <div className="editor-container">
//       <ReactQuill
//         value={content}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         placeholder="Write something..."
//       />
//     </div>
//   );
// }

// export default Editor;
