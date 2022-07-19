import React from 'react';
import {Button} from "@mui/material";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "@components/pdf/document";

const Pdf = () => {

  return (
    <div className="d-flex flex-column h-100">
      <PDFDownloadLink className="mb-3" document={<MyDocument />} fileName="document.pdf">
        Скачать
      </PDFDownloadLink>
      <PDFViewer className="flex-grow-1">
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default Pdf;