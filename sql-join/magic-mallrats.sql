select "cu"."firstName", "cu"."lastName"
from "customers" as "cu"
join "rentals" as "re" using ("customerId")
join "inventory" as "in" using ("inventoryId")
join "films" as "fi" using ("filmId")
where "fi"."title" = 'Magic Mallrats'