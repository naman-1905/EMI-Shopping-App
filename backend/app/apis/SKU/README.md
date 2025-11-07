# SKU API

This module provides APIs to handle SKU-related operations for the EMI Shopping App.

## Endpoints

### 1. `GET /api/sku/info/{skuId}`
- **Description**: Retrieves SKU details, including EMI plans, offers, and `product_image_1_url`, for a specific SKU ID.
- **Path Parameter**:
  - `skuId` (string): The SKU ID to fetch details for.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "sku_id": "123e4567-e89b-12d3-a456-426614174000",
      "sku_name": "Smartphone",
      "sku_brand": "BrandX",
      "price": 699.99,
      "sku_description": "Latest model with advanced features.",
      "category": "Electronics",
      "sku_image_handler": {
        "product_image_1_url": "https://example.com/product1.jpg"
      },
      "sku_price_buying_option_info": {
        "emi": true,
        "emi_3_month": 233.33,
        "emi_6_month": 116.67,
        "offer": true,
        "offer_value": 50.00,
        "offer_description": "Flat $50 off"
      }
    },
    "message": "SKU information retrieved successfully."
  }
  ```

## Logic

- Queries the `sku_info` table for the specified `sku_id`.
- Joins with the `sku_image_handler` table to fetch the `product_image_1_url`.
- Joins with the `sku_price_buying_option_info` table to fetch EMI plans and offers.

## Database Tables

- **`sku_info`**: Stores SKU details such as name, brand, price, and category.
- **`sku_image_handler`**: Stores image URLs for SKUs, linked via `sku_id`.
- **`sku_price_buying_option_info`**: Stores EMI plans and offers for SKUs, linked via `sku_id`.