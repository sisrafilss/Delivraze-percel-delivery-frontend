import { ParcelRequestForm } from "@/components/modules/Sender/ParcelRequestForm";

const ParcelRequestPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send a Parcel</h1>
        <p className="text-muted-foreground mt-1">
          Tell us about the pick-up and drop-off details to schedule a secure
          delivery.
        </p>
      </div>
      <div className="card-modern max-w-3xl mx-auto">
        <div className="p-6">
          <ParcelRequestForm />
        </div>
      </div>
    </div>
  );
};

export default ParcelRequestPage;
