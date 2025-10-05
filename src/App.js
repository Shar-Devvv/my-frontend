import './App.css';
import { useState } from 'react';
import { jsPDF } from "jspdf"; 

function App() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
const [uploadedImage, setUploadedImage] = useState(null);

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Resume", 105, 20, null, null, "center");

  // Name Section
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${name}`, 20, 40);

  // Skills Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Skills:", 20, 60);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("• Frontend Development", 30, 70);
  doc.text("• React, Next.js", 30, 80);
  doc.text("• 4 years of experience", 30, 90);

  // Experience Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Experience:", 20, 110);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Worked at XYZ Company as Frontend Developer", 30, 120);
  doc.text("Worked at XYZ Company as Frontend Developer", 30, 130);
  doc.text("Worked at XYZ Company as Frontend Developer", 30, 140);
  doc.text("Worked at XYZ Company as Frontend Developer", 30, 150);
  doc.text("Worked at XYZ Company as Frontend Developer", 30, 160);

// Connection
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("Connect with me:", 20, 180);

// Social Media
doc.setFont("helvetica", "normal");
doc.text("LinkedIn", 70, 180);
doc.text("GitHub", 110, 180);
doc.text("Twitter", 150, 180);


  // Profile Image (top-right corner in circle)
  if (uploadedImage) {
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      
      doc.addImage(img, "PNG", 145, 30, 48, 48);

      // Add image inside circle (slightly smaller so it fits)

      // Save after adding image
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
