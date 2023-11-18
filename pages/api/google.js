// import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

async function fetchDataFromSearchConsole(req, res) {
  //   const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: process.cwd() + "/credentials.json",
  //     scopes: SCOPES,
  //   });
  //   console.log(auth);
  //   const webmasters = google.webmasters({ version: "v3", auth });

  try {
    const propertyId = process.env.PROPERTYID;
    const client_email = process.env.CLIENT_EMAIL;
    const private_key = process.env.PRIVATE_KEY.split(String.raw`\n`).join(
      "\n"
    );

    // const cli = new BetaAnalyticsDataClient();

    // Imports the Google Analytics Data API client library.

    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth: new GoogleAuth({
        projectId: propertyId,
        scopes: "https://www.googleapis.com/auth/analytics",
        credentials: {
          client_email: client_email,
          private_key: private_key,
        },
      }),
    });

    // Runs a simple report.

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "country" }],
      metrics: [
        { name: "activeUsers" },
        { name: "bounceRate" },
        { name: "engagementRate" },
        { name: "newUsers" },
        { name: "screenPageViews" },
        { name: "screenPageViewsPerSession" },
        { name: "scrolledUsers" },
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "userEngagementDuration" },
      ],
      dateRanges: [{ startDate: "360daysAgo", endDate: "yesterday" }],
      metricAggregations: ["TOTAL"],
    });

    const [resp] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: "month" }],
      metrics: [
        { name: "activeUsers" },
        { name: "bounceRate" },
        { name: "engagementRate" },
        { name: "newUsers" },
        { name: "screenPageViews" },
        { name: "screenPageViewsPerSession" },
        { name: "scrolledUsers" },
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "userEngagementDuration" },
      ],
      dateRanges: [{ startDate: "360daysAgo", endDate: "yesterday" }],
      metricAggregations: ["TOTAL"],
    });

    // console.log("Report result:");
    //   console.log(JSON.stringify(response.rows));
    //   response.rows.forEach((row) => {
    //     console.log(row.dimensionValues[0], row.metricValues[0]);
    //   });
    res.send({ all: response, months: resp });

    // runReport();
    // const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
    // const auth = new google.auth.GoogleAuth({
    //   keyFile: process.cwd() + "/credentials.json",
    //   scopes: SCOPES,
    // });

    // const webmasters = google.webmasters({ version: "v3", auth });

    // const response = await webmasters.searchanalytics.query({
    //   siteUrl: "https://www.offtheweb.in",
    //   requestBody: {
    //     startDate: "2023-01-01",
    //     endDate: "2023-02-01",
    //     dimensions: ["query", "page"],
    //   },
    // });

    // console.log("Search Console API response:", response.data);
    // return response.data;

    // // console.log("Search Console API response:", response.data);
    // return response.data;
  } catch (error) {
    console.error("Error fetching data from Search Console API:", error);
    res.send(error);
    // throw error;
  }
}

export default fetchDataFromSearchConsole;
