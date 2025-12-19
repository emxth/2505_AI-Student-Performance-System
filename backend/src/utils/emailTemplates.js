const getPasswordResetHTML = (resetUrl) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; }
        .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .warning { color: #dc2626; font-size: 14px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI Student System</h1>
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
            <p>Please click the button below to reset your password:</p>
            
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>If you cannot click the button, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
            
            <div class="warning">
                <p><strong>⚠️ This link will expire in 10 minutes.</strong></p>
                <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} AI Student Performance System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const getPasswordResetSuccessHTML = () => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>AI Student System</h1>
        </div>
        <div class="content">
            <h2>Password Reset Successful</h2>
            <p>Your password has been successfully reset.</p>
            <p>You can now log in to your account with your new password.</p>
            <p>If you did not make this change, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} AI Student Performance System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { getPasswordResetHTML, getPasswordResetSuccessHTML };