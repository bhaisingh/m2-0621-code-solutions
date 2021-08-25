select "fi"."releaseYear", "ca"."name"
from "films" as "fi"
join "filmCategory" as "fic" using ("filmId")
join "categories" as "ca" using("categoryId")
where "fi"."title" = 'Boogie Amelie'