WITH cte_film as (
    select "fi"."title", "fi"."description", "fi"."rating", sum("pa"."amount") as "totalAmount", "fi"."replacementCost"
    from "payments" as "pa"
    join "rentals" as "re" using("rentalId")
    join "inventory" as "in" using("inventoryId")
    join "films" as "fi" using("filmId")
    group by "fi"."title", "fi"."description", "fi"."rating", "fi"."replacementCost"
)
select "title", "description", "rating", sum("totalAmount" - "replacementCost") as "profit"
from cte_film
group by "title", "description", "rating"
order by "profit" desc
limit 5;