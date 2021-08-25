select "firstName", "lastName", "amount"
from "payments" as "pa"
join "customers" as "cu" using ("customerId")
order by "amount" desc 
limit 10;