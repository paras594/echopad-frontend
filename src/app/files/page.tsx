import Container from "@/components/Container";
import PageTitle from "./PageTitle";
import FileUpload from "./FileUpload";
import FilesContainer from "./FilesContainer";
import RefetchFilesBtn from "./RefetchFilesBtn";

const Files = async () => {
  return (
    <div className="mt-4 overflow-y-auto scrollable-content h-[80vh] md:h-screen">
      <Container>
        <div className="flex justify-between items-center">
          <PageTitle />
          <div className="flex items-center gap-4">
            <RefetchFilesBtn />
            <div className="hidden md:block">
              <FileUpload />
            </div>
          </div>
        </div>

        <FilesContainer />
      </Container>
      <div className="h-40 w-full" />
      <div className="bg-white border-t-0 fixed bottom-0 left-0 right-0 py-4 md:hidden">
        <Container>
          <FileUpload btnClasses="btn-block" />
        </Container>
      </div>
    </div>
  );
};

export default Files;
