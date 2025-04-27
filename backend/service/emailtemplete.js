const VERIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
      color: white;
      padding: 35px 24px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #818cf8, #4f46e5, #818cf8);
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      opacity: 0.95;
      color: white;
    }
    .content {
      padding: 40px 30px;
      color: #374151;
    }
    .highlight {
      color: #4f46e5;
      font-weight: 600;
    }
    .code-container {
      background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 30px 15px;
      text-align: center;
      margin: 35px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .code-container > div:first-child {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 15px;
    }
    .verification-code {
      font-size: 38px;
      font-weight: bold;
      letter-spacing: 10px;
      color: #1f2937;
      background-color: white;
      padding: 12px 24px;
      display: inline-block;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      margin: 15px 0;
      border: 1px solid #e5e7eb;
    }
    .code-container > div:last-child {
      font-size: 14px;
      color: #ef4444;
      font-weight: 500;
      margin-top: 12px;
    }
    .content p {
      font-size: 16px;
      margin-bottom: 20px;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
        margin: 0;
      }
      .content {
        padding: 30px 20px;
      }
      .verification-code {
        font-size: 30px;
        letter-spacing: 6px;
        padding: 10px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Stockify</div>
      <h3>Verify Your Email Address</h3>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">{name}</span>,</p>
      <p>Thank you for joining <strong>Stockify</strong>! To activate your account, please use the verification code below:</p>
      <div class="code-container">
        <div>Your verification code is:</div>
        <div class="verification-code">{verificationCode}</div>
        <div>This code expires in 15 minutes.</div>
      </div>
      <div >
        <p>Best regards,<br/><strong>The Stockify Team</strong></p>
      </div>
    </div>
  </div>
</body>
</html>`;

const PASSWORD_RESET_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
      color: white;
      padding: 35px 24px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #818cf8, #4f46e5, #818cf8);
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
        color: white;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
      color: #374151;
    }
    .highlight {
      color: #4f46e5;
      font-weight: 600;
    }
    .reset-button-container {
      margin: 35px 0;
      text-align: center;
    }
    .reset-button {
      display: inline-block;
      background: linear-gradient(to right, #4f46e5, #6366f1);
      color: white;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
      transition: all 0.3s ease;
    }
    .reset-button:hover {
      background: linear-gradient(to right, #4338ca, #4f46e5);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
    }
    .link-fallback {
      margin-top: 25px;
      padding: 20px;
      background-color: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .link-fallback p {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #6b7280;
    }
    .reset-link {
      word-break: break-all;
      color: #4f46e5;
      font-size: 14px;
    }
    .expiry-note {
      font-size: 14px;
      color: #ef4444;
      font-weight: 500;
      margin-top: 30px;
      text-align: center;
    }
    .signature {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
    }
    .signature strong {
      color: #4f46e5;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
        margin: 0;
      }
      .content {
        padding: 30px 20px;
      }
      .reset-button {
        display: block;
        padding: 16px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Stockify</div>
      <h3>Reset Your Password</h3>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">{name}</span>,</p>
      <p>We received a request to reset your password for your <strong>Stockify</strong> account. Click the button below to create a new password:</p>
      
      <div class="reset-button-container">
        <a href="{resetLink}" class="reset-button" target="_blank">Reset Password</a>
      </div>
      
      <div class="expiry-note">
        This link will expire in 1 hour.
      </div>
      
      <div class="link-fallback">
        <p>If the button above doesn't work, copy and paste this link into your browser:</p>
        <a href="{resetLink}" class="reset-link">{resetLink}</a>
      </div>
      
     
      
      <div class="signature">
        <p>Best regards,<br/><strong>The Stockify Team</strong></p>
      </div>
    </div>
  </div>
</body>
</html>`;

const PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.12);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
      color: white;
      padding: 35px 24px;
      text-align: center;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #818cf8, #4f46e5, #818cf8);
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      opacity: 0.95;
      color: white;
    }
    .content {
      padding: 40px 30px;
      color: #374151;
    }
    .highlight {
      color: #4f46e5;
      font-weight: 600;
    }
 .success-icon {
  text-align: center;
  margin: 20px 0 30px;
}

.success-icon .circle {
  width: 90px;
  height: 90px;
  background: linear-gradient(45deg, #10b981, #059669);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.2);
}

.success-icon .checkmark {
  width: 40px;
  height: 22px;
  border-bottom: 6px solid white;
  border-left: 6px solid white; 
  transform: rotate(315deg); 
  margin-bottom: 10px;
}
    .success-message {
      text-align: center;
      font-size: 22px;
      font-weight: 600;
      color: #10b981;
      margin: 20px 0;
    }
    .signature {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
    }
    .signature strong {
      color: #4f46e5;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
        margin: 0;
      }
      .content {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Stockify</div>
      <h3>Password Reset Successful</h3>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">{name}</span>,</p>

     <div class="success-icon">
  <div class="circle">
    <div class="checkmark"></div>
  </div>
</div>
      <div class="success-message">
        Your password has been successfully reset!
      </div>

      <p>Great news! Your Stockify account password has been successfully updated. Your account security is important to us, and this confirmation email is part of our security protocols.</p>

      <p>Thank you for using Stockify. We're committed to providing you with a secure and reliable platform for all your stock monitoring needs.</p>

      <div class="signature">
        <p>Best regards,<br/><strong>The Stockify Team</strong></p>
      </div>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
};
