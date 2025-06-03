import FileCard from "@/components/file-card/FileCard";

const FilesList = ({ files = [] }: any) => {
  return (
    <>
      {files.map((file: any) => (
        <FileCard
          key={file._id}
          id={file._id}
          progress={100}
          uploading={false}
          fileName={file.fileName}
          filesCount={file.filesCount}
          fileUrl={file.fileUrl}
          publicId={file.publicId}
          format={file.format}
          resourceType={file.resourceType}
          createdAt={file.createdAt}
        />
      ))}
    </>
  );
};

export default FilesList;
