select "co"."name" as "Country", count(*) as "noOfCities"
from "countries" as "co"
join "cities" as "ci" using("countryId")
group by "co"."name"