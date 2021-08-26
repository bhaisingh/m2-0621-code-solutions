select "ad"."line1" as "Address", "ad"."district", "ci"."name" as "City Name", "co"."name" as "Country Name"
from "addresses" as "ad"
join "cities" as "ci" using ("cityId")
join "countries" as "co" using ("countryId")