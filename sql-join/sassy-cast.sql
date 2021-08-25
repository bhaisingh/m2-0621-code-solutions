select "firstName", "lastName"
from "actors" as "ac"
join "castMembers" as "ca" using ("actorId")
join "films" as "fi" using ("filmId")
where "fi"."title" = 'Jersey Sassy'