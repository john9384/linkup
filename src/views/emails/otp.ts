export const otpMail = (otp: string | number) => (`
  <html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Document</title>
    <link rel='stylesheet' href='css/email.css' />
    <style>
      body{ background-color: white; } h1{ font-size: 25px; }
    </style>
  </head>
  <body>
    <h1>Hello Growly user</h1>
    <main>
      <p>You have requested for an OTP. If this is not you, kindly login to your
        account to update your password</p>

      <p>
        Your one time password is
        <strong>${otp}</strong>. It will expire in 5 minutes.</p>

      <p>Thank you for being a valued member of Growly</p>
    </main>

  </body>
</html>
  `)
