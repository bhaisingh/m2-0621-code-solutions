WITH cte_revenue as (
    select "fi"."filmId", sum("pa"."amount") as "totalrevenue"
    from "payments" as "pa"
    join "rentals" as "re" using("rentalId")
    join "inventory" as "in" using("inventoryId")
    join "films" as "fi" using("filmId")
    group by "fi"."filmId"
),
    cte_cost as (
      select "fi"."filmId", sum("fi"."replacementCost") as "totalCost"
      from "films" as "fi"
      join "inventory" as "in" using("filmId")
      group by "fi"."filmId"
    )

select "fi"."title", "fi"."description", "fi"."rating" , sum("totalrevenue" - "totalCost") as "profit"
from "films" as "fi"
join "cte_revenue" as "ctr" using("filmId")
join "cte_cost" as "ctc" using("filmId")
group by "title", "description", "rating"
order by "profit" desc
limit 5;