-- Average price by day only (all states included)
SELECT
    date,
    avg(price_per_ounce) as `avg_price_per_ounce`, 
    'All U.S.' as `jurisdiction`
FROM `cluutch.api_cluutch_io.quotes_transformed` as q
group by date
order by date
