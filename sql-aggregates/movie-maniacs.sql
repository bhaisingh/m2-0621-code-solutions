select "firstName", "lastName", sum("pa"."amount") as "totalAmount"
from "customers" as "cu"
join "payments" as "pa" using("customerId")
group by "firstName", "lastName"
order by "totalAmount" desc
