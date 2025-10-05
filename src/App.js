import './App.css';
import { useState } from 'react';
import { jsPDF } from "jspdf"; 

function App() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
const [uploadedImage, setUploadedImage] = useState(null);

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Add Name



  doc.setFontSize(20);
  doc.text(`Name: ${name}`, 20, 30);



  
  // Add Image
  if (uploadedImage) {
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      doc.addImage(img, "PNG", 20, 50, 100, 100); // x,y,w,h
      doc.save("resume.pdf");
    };
  } else {
    doc.save("resume.pdf");
  }
};



  const handleClick = () => {
    if (!img) {
      alert("Please select an image first");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", img);

    fetch("https://my-backend-wo75.onrender.com/single", {
      method: "POST",
      body: formdata
    })
      .then((res) => res.json()) // assuming backend sends JSON
      .then((data) => {
        const imageUrl = `https://my-backend-wo75.onrender.com/uploads/${data.filename}`;
  setUploadedImage(imageUrl);// whatever backend sends
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <h1>Upload your image</h1>
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
      />

      <h1>Enter your Username</h1>
      <input
  type="text"
  value={name}              // bind input to state
  onChange={(e) => setName(e.target.value)}  // update state
/>

      <button onClick={handleClick}>Submit</button>

      <button onClick={handleClick}>Upload</button>

{uploadedImage && (
  <>
    <h2>Preview:</h2>
    <img src={uploadedImage} alt="preview" width="200" />
    <button onClick={handleDownloadPDF}>Download PDF</button>
  </>
)}

    </div>
  );
}

export default App;
