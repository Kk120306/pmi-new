const PDFPreview = ({ fileUrl }) => {
    if (!fileUrl) return <p className="text-center text-red-500">No file ID provided.</p>;
  
    const embedUrl = `https://drive.google.com/file/d/${fileUrl}/preview`;
  
    return (
      <div className="w-full max-w-4xl mx-auto h-[80vh] my-8 border rounded shadow overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          title="PDF Preview"
          allow="autoplay"
        ></iframe>
      </div>
    );
  };
  
  export default PDFPreview;
  