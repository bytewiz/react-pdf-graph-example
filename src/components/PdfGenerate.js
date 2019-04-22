import React from "react";
import Graph from "./Graph";
import jsPDF from "jspdf"; // check the docs for this: https://parall.ax/products/jspdf
import html2canvas from 'html2canvas';

const styles = {
  fontFamily: "arial",
  textAlign: "center",
  padding: '50px'
};

const btnStyle = {
  cursor: 'pointer',
  padding: '10px 20px',
  borderRadius: '5px',
  outline: 'none',
  fontSize: '20px',
}
const Prints = () => (
  // graph needs to be render but so we just place it outside of the view
  <div style={{ position: 'absolute', left: 0, top: -500 }}>
    <div id="printThis">
      <Graph />
    </div>
  </div>
);

const print = () => {
  const input = document.getElementById('printThis');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      // Page 1
      pdf.text(20, 20, 'This could be a headline for the report')
      pdf.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
      // Page 2 (uncomment next line for adding page 2)
      // pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 15, 40)
      pdf.save("download.pdf");
    })
};

export default function PDF() {
  return (
    <div style={styles}>
      <button
        style={btnStyle}
        onClick={print}
      >
        Download PDF
      </button>
      <Prints />
    </div>
  );
}