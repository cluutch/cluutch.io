// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery({ projectId: "cluutch" });

exports.getStrainInfo = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log("Trying to get strain info")

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    let query = `SELECT * FROM \`cluutch.api_cluutch_io.quotes_by_strain\``;
    const strain = req.query.strain || False
    if (strain) {
      console.log(`Strain provided ${strain}`)
      query = `${query} where strain = '${strain}'`
    } else {
      console.log("No strain provided")
      res.status(400)
      return;
    }
    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'us-central1',
    };
    
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log(`Job ${job.id} completed.`);

    if (rows.length > 0) {
      console.log(`Got ${rows.length} results, returning strain info.`)
      res.status(200).send(rows[0]);
    } else {
      console.log(`Did not get any results, will expand scope to quotes without price.`)
      let query2 = `SELECT * FROM \`cluutch.api_cluutch_io.quotes_by_strain_no_price\``;
      query2 = `${query2} where strain = '${strain}'`
      
      // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
      const options2 = {
        query: query2,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'us-central1',
      };
      
      // Run the query as a job
      const [job2] = await bigquery.createQueryJob(options2);
      console.log(`Job retry ${job2.id} started.`);

      // Wait for the query to finish
      const [rows2] = await job2.getQueryResults();

      // Print the results
      console.log(`Job retry ${job2.id} completed.`);
      if (rows2.length > 0) {
        console.log(`Backup got ${rows2.length} results, returning strain info.`)
        res.status(200).send(rows2[0]);
      } else {
        console.log("Could not find any results without price either. Exiting. Consider adding logic for cases where the strain has no price or strain info.")
        res.status(400);
      }
    }
  }
};