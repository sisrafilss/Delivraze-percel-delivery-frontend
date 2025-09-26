import { ParcelRequestForm } from "@/components/modules/Sender/ParcelRequestForm";

const ParcelRequestPage = () => {
  return (
    <div className=" min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10 mx-auto">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[600px]">
            <ParcelRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelRequestPage;
