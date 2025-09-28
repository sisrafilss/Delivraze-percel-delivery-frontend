export type Parcel = {
  _id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverEmail?: string;
  parcelType: string;
  weight: number;
  specialInstructions?: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  paymentMethod?: string;
  isPaid?: boolean;
  isBlocked?: boolean; // will hide for sender
  trackingId?: string;
  createdAt?: string; // will hide for sender
  updatedAt?: string; // will hide for sender
  statusLog?: {
    status: string;
    note: string;
    location: string;
    timestamp: string;
    updatedBy: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  }[];
};
