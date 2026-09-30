-- Portfolio SQL: identify SKUs worth a pricing review.
-- Demo tables are simulated; thresholds are analyst-defined.
WITH benchmark AS (
  SELECT sku_id, category, selling_price, competitor_median_price, gross_margin_pct, units_sold
  FROM simulated_sku_pricing
), scored AS (
  SELECT *, selling_price / NULLIF(competitor_median_price, 0) AS price_competitiveness_index
  FROM benchmark
)
SELECT sku_id, category, price_competitiveness_index, gross_margin_pct, units_sold,
  CASE WHEN price_competitiveness_index >= 1.05 AND gross_margin_pct < 30 THEN 'REVIEW PRICE'
       WHEN price_competitiveness_index <= 0.97 AND gross_margin_pct >= 30 THEN 'PROTECT'
       ELSE 'MONITOR' END AS commercial_signal
FROM scored
WHERE units_sold >= 20
ORDER BY units_sold DESC, price_competitiveness_index DESC;