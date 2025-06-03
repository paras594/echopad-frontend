const Version = ({ version }: { version: string }) => (
  <p className="fixed bottom-0 w-full p-4 text-center mt-20 text-gray-300">
    v{version}
  </p>
);

export default Version;
