// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery({ projectId: "cluutch" });

const query = `SELECT * FROM \`cluutch.api_cluutch_io.dailies\` ORDER BY date desc`;

// For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
const options = {
  query: query,
  // Location must match that of the dataset(s) referenced in the query.
  location: 'us-central1',
};

exports.getDailies = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
    console.log(`Job ${job.id} completed.`);

    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(400)
    }
  }
};