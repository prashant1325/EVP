const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    gstNumber: String,
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: String,
    city: String,
    state: String,
    postalCode: String,

    /* BUSINESS */
    businessType: String,
    yearsInBusiness: String,
    productsInterested: String,

    /* KYC */
    idProofType: String,
    idProofNumber: String,
    idProofFile: String,

    /* BANK */
    bankName: String,
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,

    /* ADDITIONAL */
    tradeLicenseNumber: String,
    contactPersonName: String,
    designation: String,
    alternateContact: String,
    gpsCoordinates: String,
    deliveryLocationPhoto: String,

    /* AUTH */
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
