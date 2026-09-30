-- Portfolio SQL: locate the largest funnel leak by experience centre.
WITH funnel AS (
  SELECT store_id, visitors, consultations, qualified_leads, quotes, orders
  FROM simulated_store_funnel
), rates AS (
  SELECT *, consultations / NULLIF(visitors,0) AS visitor_to_consult,
    qualified_leads / NULLIF(consultations,0) AS consult_to_lead,
    quotes / NULLIF(qualified_leads,0) AS lead_to_quote,
    orders / NULLIF(quotes,0) AS quote_to_order
  FROM funnel
)
SELECT store_id, visitor_to_consult, consult_to_lead, lead_to_quote, quote_to_order,
  CASE WHEN quote_to_order = LEAST(visitor_to_consult, consult_to_lead, lead_to_quote, quote_to_order) THEN 'QUOTE -> ORDER'
       WHEN lead_to_quote = LEAST(visitor_to_consult, consult_to_lead, lead_to_quote, quote_to_order) THEN 'LEAD -> QUOTE'
       ELSE 'UPSTREAM' END AS diagnostic_focus
FROM rates
ORDER BY quote_to_order ASC;