<h4>Portal OffTheWeb</h4>

<b>Preview:</b> <a href="https://portal.offtheweb.in/" target="_blank"  rel="noreferrer"> Portal OFFTHEWEB</a>
<br/>
<b>Description:</b> It is a portal for managing the blog website "<a href="https://offtheweb.in/" target="_blank"  rel="noreferrer">OFFTHEWEB</a>". where we need an I'd to login. It support to types of authentication as follows:
<br/>
&ensp;a). <b>Admin :</b> Admin can access anything on the portal including site analytics and blog activation and rejection.
<br/>
&ensp;b). <b>Employee:</b> Can see limited options such as dashboard and their tasks and blogs.

<h4>How to run: </h4>

1). Download the repository from "<a href="https://github.com/MOHDSHEES/portal_offtheweb" target="_blank"  rel="noreferrer">https://github.com/MOHDSHEES/portal_offtheweb</a>.
<br/>
2). Create the .env file in the root directory and create the following environment variables.
<br/>
&emsp;a). "MONGODB_URL" : Register on mongodb for database and provide the connection string as a value.
<br/>
&emsp;b). "SENDGRID_API_KEY" : Register on sendGrid and paste the connection string as a value.
<br/>
&emsp;c). "NEXTAUTH_SECRET" : Create any string value.
<br/>

<h4>For analytics to work: </h4>
&emsp;i). Register on google analytics and register site on google search console.
<br/>
&emsp;ii). Paste the "PROPERTYID", "CLIENT_EMAIL" and "PRIVATE_KEY" in .env.
<br/>
3). Open the terminal and run 'npm run dev'.

<br/>
<h4>Login credentials for testing:</h4>
<b>Email: </b>offtheweb@demo.com
<br/>
<b>Password: </b>offthewebdemo
