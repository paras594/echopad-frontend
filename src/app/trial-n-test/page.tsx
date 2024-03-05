import dynamic from "next/dynamic";

const InstallPWABtn = dynamic(() => import("@/components/InstallPWABtn"), {
  ssr: false,
});

const TrialNTest = () => {
  return (
    <div>
      <InstallPWABtn />
    </div>
  );
};

export default TrialNTest;
