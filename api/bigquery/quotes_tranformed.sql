SELECT *, CAST(DATE(scrape_date) AS DATE) as `date`
FROM `cluutch.api_cluutch_io.quotes`
order by scrape_date
