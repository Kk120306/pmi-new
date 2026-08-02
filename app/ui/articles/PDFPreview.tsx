type PDFPreviewProps = {
    fileUrl: string;
    title?: string;
};

const PDFPreview = ({
    fileUrl,
    title = 'Document preview',
}: PDFPreviewProps) => {
    if (!fileUrl) {
        return (
            <p className="text-center text-red-600">
                No document is available for this entry.
            </p>
        );
    }

    const isDirectUrl =
        fileUrl.startsWith('/') ||
        fileUrl.startsWith('https://') ||
        fileUrl.startsWith('http://');
    const embedUrl = isDirectUrl
        ? fileUrl
        : `https://drive.google.com/file/d/${fileUrl}/preview`;

    return (
        <div className="my-8 h-[72vh] min-h-[560px] w-full overflow-hidden rounded-xl border border-black/10 bg-zinc-100 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.45)]">
            <iframe
                src={embedUrl}
                className="h-full w-full"
                title={title}
                allow="autoplay"
            />
        </div>
    );
};

export default PDFPreview;
