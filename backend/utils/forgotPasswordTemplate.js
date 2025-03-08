const forgotPasswordTemplate = ({ name, otp }) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 8px; width: 100%; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
        <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          We received a request to reset your password. Please use the OTP below to proceed with resetting your password:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <p style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 0;">${otp}</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6;">If you didn't request this, please ignore this email. Your account is still secure.</p>
        <p style="font-size: 16px; line-height: 1.6;">Thank you,</p>
        <p style="font-size: 16px; line-height: 1.6; font-weight: bold;">The Support Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          If you have any questions, feel free to contact us at <a href="mailto:support@example.com" style="color: #4CAF50; text-decoration: none;">support@example.com</a>.
        </p>
      </div>
    `;
  };
  
  export default forgotPasswordTemplate;
  