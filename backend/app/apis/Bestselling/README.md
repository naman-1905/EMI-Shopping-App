# BestSelling API

This module provides APIs to handle best-selling items for the EMI Shopping App.

## Endpoints

### 1. `GET /api/bestselling/skus`
- **Description**: Retrieves all SKU information for SKUs with `best_selling = true`, including `product_image_1_url`.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "sku_id": "123e4567-e89b-12d3-a456-426614174000",
        "sku_name": "Smartphone",
        "sku_brand": "BrandX",
        "price": 699.99,
        "sku_description": "Latest model with advanced features.",
        "category": "Electronics",
        "sku_image_handler": {
          "product_image_1_url": "https://example.com/product1.jpg"
        }
      }
    ],
    "message": "Best-selling SKUs retrieved successfully."
  }
  ```

## Logic

- Queries the `sku_info` table for rows where `best_selling = true`.
- Joins with the `sku_image_handler` table to fetch the `product_image_1_url`.

## Database Tables

- **`sku_info`**: Stores SKU details such as name, brand, price, and category.
- **`sku_image_handler`**: Stores image URLs for SKUs, linked via `sku_id`.