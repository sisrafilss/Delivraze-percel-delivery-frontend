import { ParcelRequestForm } from "@/components/modules/Sender/ParcelRequestForm";

const ParcelRequestPage = () => {
  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Send a Parcel</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about the pick-up and drop-off details to schedule a secure
          delivery.
        </p>
      </div>
      <div className="dashboard-panel mx-auto w-full max-w-3xl">
        <ParcelRequestForm />
      </div>
    </div>
  );
};

export default ParcelRequestPage;
