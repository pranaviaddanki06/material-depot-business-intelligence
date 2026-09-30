# Data dictionary

| Field | Grain | Meaning | Status |
|---|---|---|---|
| sku_id | SKU | Stable product identifier | Simulated |
| category | SKU | Commercial category | Public-context framing |
| selling_price | SKU snapshot | Modeled customer price | Simulated |
| competitor_median_price | SKU snapshot | Modeled comparable-market median | Simulated |
| vendor_cost | SKU snapshot | Modeled landed cost | Simulated |
| gross_margin_pct | SKU/order | (selling price - vendor cost) / selling price | Derived |
| visitors | Store/day | Experience-centre traffic | Simulated |
| consultations | Store/day | Visitor conversations | Simulated |
| quotes | Store/day | Commercial quotations | Simulated |
| orders | Store/day | Completed orders | Simulated |

The production version would replace these fields with governed internal sources and documented business definitions.