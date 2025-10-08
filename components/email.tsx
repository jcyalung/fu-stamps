export default function Email(email: string, confirmationURL: string) {
  return `
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:white; max-width:600px; margin:0 auto;">
  
  <!-- Header Box -->
  <tr>
    <td align="center" style="background-color:#FFFBEF; border-bottom:6px solid black; border-right:4px solid black; border:1px solid black; padding:20px;">
      <h1 style="font-family:'Montserrat',sans-serif; font-size:24px; color:black; margin:0 0 10px 0;">
        WELCOME TO
      </h1>
      <img src="https://odcuppltcnwouhdtvujd.supabase.co/storage/v1/object/public/img_bucket/title.png" alt="logo" style="display:block; max-width:100%; height:auto;" />
    </td>
  </tr>

  <!-- Greeting -->
  <tr>
    <td align="center" style="padding:20px 10px 0 10px; font-family:'Montserrat',sans-serif; font-size:20px; color:black; font-style:italic;">
      HELLO ${email},
    </td>
  </tr>

  <!-- Message -->
  <tr>
    <td align="center" style="padding:15px 10px 0 10px; font-family:'Montserrat',sans-serif; font-size:14px; color:black; font-weight:500; line-height:1.5;">
      Yay! Thank you so much for registering an account with Fu-Stamps. Before getting started and stamping, let's verify your email.
      <br /><br />
      Click on the button below to continue with registration and login with your new account! This link will expire in a week.
    </td>
  </tr>

  <!-- Verify Button -->
  <tr>
    <td align="center" style="padding:30px 10px 30px 10px;">
      <a href="${confirmationURL}" target="_blank" style="background-color:#FBCA29; display:inline-block; padding:15px 30px; text-decoration:none; color:black; font-family:'Montserrat',sans-serif; border-bottom:6px solid black; border-right:4px solid black; border:1px solid black;">
        <img src="https://odcuppltcnwouhdtvujd.supabase.co/storage/v1/object/public/img_bucket/VERIFY.png" alt="verify email button" style="display:block; max-width:100%; height:auto;" />
      </a>
    </td>
  </tr>

</table>
`;
}


/* export default function Email(email : string, confirmationURL : string) {
    return (`
            <div style="display:flex;flex-direction:row;align-items:center;background-color:white;width:280px;height:596px;">

              <!-- Header Box -->
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:26px;background-color:#FFFBEF;width:258px;height:101px;border-bottom:6px solid black;border-right:4px solid black;border:1px solid black;">
                <h1 style="font-family:'Montserrat',sans-serif;text-align:center;color:black;font-size:1.5rem;margin-top:14px;">
                  WELCOME TO
                </h1>
                <div style="position:relative;width:232px;height:auto;margin-top:-10px;">
                  <img src="https://odcuppltcnwouhdtvujd.supabase.co/storage/v1/object/public/img_bucket/title.png" alt="logo" style="object-fit:contain;width:100%;height:100%;" />
                </div>
              </div>

              <!-- Greeting -->
              <p style="font-family:'Montserrat',sans-serif;color:black;font-style:italic;font-weight:300;font-size:1.5rem;width:229px;margin-top:64px;">
                HELLO ${email},
              </p>

              <!-- Message -->
              <p style="font-family:'Montserrat',sans-serif;color:black;font-weight:500;font-size:0.875rem;width:235px;height:215px;margin-top:15px;">
                Yay! Thank you so much for registering an account with Fu-Stamps. Before getting started and stamping, let's verify your email.
                <br /><br />
                Click on the button below to continue with registration and login with your new account! This link will expire in a week.
              </p>

              <!-- Verify Button -->
              <a href="${confirmationURL}" target="_blank" style="display:inline-flex;justify-content:center;align-items:center;text-align:center;background-color:#FBCA29;width:222px;height:59px;border-bottom:6px solid black;border-right:4px solid black;border:1px solid black;margin-top:30px;cursor:pointer;text-decoration:none;">
                <img src="https://odcuppltcnwouhdtvujd.supabase.co/storage/v1/object/public/img_bucket/VERIFY.png"
                     alt="verify email button"
                     style="object-fit:contain;width:142px;height:39px;" />
              </a>

            </div>`
    )
} */