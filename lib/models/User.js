import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ]
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        // Must contain at least one uppercase, one lowercase, one number, and one special character
        // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v);
      },
      message: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)'
    }
  },

  phoneNumber: {
    type: String,
    required: true,
    // The package provides a clean string, but you can add basic validation
    match: [/^\d+$/, 'Invalid phone number format']
  },

  role: { type: String, default: "user" },

  dateOfBirth: {
    type: String,
    required: true,
    match: [/^\d{2}\/\d{2}\/\d{4}$/, 'Please use the format DD/MM/YYYY'],
  },

  gender: { type: String, enum: ["male", "female", "other"], required: true },

  address: {
    type: String,
    required: true,
  },

  // location: {
  //   latitude: Number,
  //   longitude: Number,
  // },

  location: {
    latitude: { type: Number, min: -90, max: 90 },
    longitude: { type: Number, min: -180, max: 180 }
  },

  workStatus: {
    type: String,
    enum: ["employed", "self-employed", "unemployed", "retired", "student", "other"],
    required: true
  },

  resetPasswordToken: {
    type: String,
    default: undefined
  },
  resetPasswordExpiry: {
    type: Date,
    default: undefined
  },

  workStatusOther: String,

  loanType: { type: String, required: true },

  loanAmount: {
    type: Number,
    required: true,
    min: [10000, 'Minimum loan amount is R10,000'],
    max: [10000000, 'Maximum loan amount is R10,000,000']
  },

  // loanBalance: { type: Number, default: 0 },
  loanBalance: {
    type: Number,
    default: function () {
      return this.loanAmount ? this.loanAmount * 1.05 : 0;
    },
    min: 0
  },

  repaymentMonths: {
    type: Number,
    required: true,
    min: [1, 'Repayment period must be at least 1 month'],
    max: [60, 'Repayment period cannot exceed 60 months']
  },

  approved: { type: Boolean, default: false },

  idDocument: {
    filename: String,
    url: String,
    publicId: String, // Cloudinary public_id for deletion/updates
    format: String,   // File format (jpg, png, pdf)
    bytes: Number,    // File size in bytes
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },

  notifications: {
    emailNotifications: { type: Boolean, default: true },
    paymentReminders: { type: Boolean, default: true },
    loanUpdates: { type: Boolean, default: true },
    promotionalEmails: { type: Boolean, default: false },
    smsNotifications: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: true },
  },

  preferences: {
    darkMode: { type: Boolean, default: false },
    language: { type: String, default: "en" },
    currency: { type: String, default: "PHP" },
    dateFormat: { type: String, default: "DD/MM/YYYY" },
  }

}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);


// UserSchema.virtual("age").get(function () {
//   const [day, month, year] = this.dateOfBirth.split("/");
//   const dob = new Date(year, month - 1, day);
//   const diff = Date.now() - dob.getTime();
//   return new Date(diff).getUTCFullYear() - 1970;
// });