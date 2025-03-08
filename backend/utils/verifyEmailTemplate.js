const verifyEmailTemplate = ({name , url})=>{
    return `
    <!-- verifyEmailTemplate.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            text-align: center;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 500px;
            margin: 20px auto;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            font-size: 12px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Verify Your Email Address</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please verify your email address to complete the registration process.</p>
        <a href="${url}" class="button">Verify Email</a>
        <p class="footer">If you didn’t sign up for this account, you can ignore this email.</p>
    </div>
</body>
</html>

    `
}

export default verifyEmailTemplate;
