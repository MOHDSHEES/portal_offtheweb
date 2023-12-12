<h4>Portal OffTheWeb</h4>
<br/>
<b>Preview:</b> <a href="https://portal.offtheweb.in/"> Portal OFFTHEWEB</a>
<br/>
<b>Description:</b> It is a portal for managing the blog website "<a href="https://offtheweb.in/">OFFTHEWEB</a>".
<b>How to run: </b>
<br/>
1). Download the repository from "<a href="https://github.com/MOHDSHEES/portal_offtheweb">https://github.com/MOHDSHEES/portal_offtheweb</a>.
2). Create the .env file in the root directory and create the following environment variables.
<br/>
   a). "MONGODB_URL" : Register on mongodb for database and provide the connection string as a value.
   b). "SENDGRID_API_KEY" : Register on sendGrid and paste the connection string as a value.
   c). "NEXTAUTH_SECRET" : Create any string value.
   <br/>
   <b>For analytics to work: </b>
        i). Register on google analytics and register site on google search console.
       ii). Paste the "PROPERTYID", "CLIENT_EMAIL" and "PRIVATE_KEY" in .env.
3). Open the terminal and run 'npm run dev'.
