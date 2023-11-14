import { google } from "googleapis";
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
    // let propertyId = "376972973";

    // // Imports the Google Analytics Data API client library.

    // // Using a default constructor instructs the client to use the credentials
    // // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    // const analyticsDataClient = new BetaAnalyticsDataClient();

    // // Runs a simple report.
    // async function runReport() {
    //   const [response] = await analyticsDataClient.runReport({
    //     property: `properties/${propertyId}`,
    //     dateRanges: [
    //       {
    //         startDate: "2020-01-20",
    //         endDate: "today",
    //       },
    //     ],
    //     dimensions: [
    //       {
    //         name: "Views",
    //       },
    //     ],
    //     metrics: [
    //       {
    //         name: "Pageviews",
    //       },
    //     ],
    //   });

    //   console.log("Report result:");
    //   response.rows.forEach((row) => {
    //     console.log(row.dimensionValues[0], row.metricValues[0]);
    //   });
    //   res.send(response);
    // }

    // runReport();
    const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
    const auth = new google.auth.GoogleAuth({
      keyFile: process.cwd() + "/credentials.json",
      scopes: SCOPES,
    });

    const webmasters = google.webmasters({ version: "v3", auth });

    const response = await webmasters.searchanalytics.query({
      siteUrl: "https://www.offtheweb.in",
      requestBody: {
        startDate: "2023-01-01",
        endDate: "2023-02-01",
        dimensions: ["query", "page"],
      },
    });

    console.log("Search Console API response:", response.data);
    return response.data;

    // // console.log("Search Console API response:", response.data);
    // return response.data;
  } catch (error) {
    console.error("Error fetching data from Search Console API:", error);
    res.send(error);
    // throw error;
  }
}

export default fetchDataFromSearchConsole;
