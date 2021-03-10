-- Average price by day and jurisdiction
SELECT "date", avg(price_per_ounce) as "avg_price_per_ounce", j.name as "jurisdiction"
FROM public.v2_quotes as q
join v2_jurisdictions j
on q.v2_jurisdiction_id  = j.id
where date is not null
and price_per_ounce >= 20
group by "date", j.name 

-- Combined with
union 

-- Average price by day only (all jurisdictions included)
SELECT "date", avg(price_per_ounce) as "avg_price_per_ounce", 'All U.S.' as "jurisdiction"
FROM public.v2_quotes as q
where date is not null
and price_per_ounce >= 20
group by "date"