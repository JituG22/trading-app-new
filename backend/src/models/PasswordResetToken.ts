import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

export interface IPasswordResetToken extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
  isExpired(): boolean;
  markAsUsed(): Promise<void>;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      index: { expireAfterSeconds: 0 }, // MongoDB TTL index
    },
    used: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
passwordResetTokenSchema.index({ userId: 1, used: 1 });
passwordResetTokenSchema.index({ token: 1, used: 1, expiresAt: 1 });

// Instance method to check if token is expired
passwordResetTokenSchema.methods.isExpired = function (): boolean {
  return new Date() > this.expiresAt;
};

// Instance method to mark token as used
passwordResetTokenSchema.methods.markAsUsed = async function (): Promise<void> {
  this.used = true;
  await this.save();
};

// Static method to create a new reset token
passwordResetTokenSchema.statics.createResetToken = async function (
  userId: mongoose.Types.ObjectId,
  expirationMinutes: number = 30
) {
  // Generate a secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token before storing
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Calculate expiration time
  const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

  // Invalidate any existing unused tokens for this user
  await this.updateMany({ userId, used: false }, { used: true });

  // Create new token
  const tokenDoc = await this.create({
    userId,
    token: hashedToken,
    expiresAt,
  });

  // Return the unhashed token (to be sent via email)
  return {
    token: resetToken,
    hashedToken,
    expiresAt,
    tokenId: tokenDoc._id,
  };
};

// Static method to find valid token
passwordResetTokenSchema.statics.findValidToken = async function (
  token: string
) {
  // Hash the provided token to compare with stored hash
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return this.findOne({
    token: hashedToken,
    used: false,
    expiresAt: { $gt: new Date() },
  }).populate("userId", "firstName lastName email");
};

// Static method to cleanup expired tokens (can be run periodically)
passwordResetTokenSchema.statics.cleanupExpired = async function () {
  return this.deleteMany({
    $or: [{ used: true }, { expiresAt: { $lt: new Date() } }],
  });
};

const PasswordResetToken = mongoose.model<IPasswordResetToken>(
  "PasswordResetToken",
  passwordResetTokenSchema
);

export default PasswordResetToken;
