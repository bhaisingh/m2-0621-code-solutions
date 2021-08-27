select "cat"."name", count(*) as "totalNoOfMovies"
from "actors" as "ac"
join "castMembers" as "ca" using("actorId")
join "filmCategory" as "fi" using("filmId")
join "categories" as "cat" using("categoryId")
where "ac"."firstName" = 'Lisa'
and "ac"."lastName" = 'Monroe'
group by "cat"."name"