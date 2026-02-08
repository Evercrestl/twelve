import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: 'General Inquiry'
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    adminNotes: {
        type: String,
        default: null
    },
    repliedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ status: 1 });
ContactMessageSchema.index({ email: 1 });

const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);

export default ContactMessage;
