# Featured API

This module provides APIs to handle featured items and categories for the EMI Shopping App.

## Endpoints

### 1. `GET /api/featured/categories`
- **Description**: Retrieves categories with `special_tag = true` and their `featured_image_url`.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "category": "Electronics",
        "sku_image_handler": {
          "featured_image_url": "https://example.com/featured.jpg"
        }
      }
    ],
    "message": "Featured categories retrieved successfully."
  }
  ```

### 2. `GET /api/featured/skus`
- **Description**: Retrieves all SKU information for SKUs with `special_tag = true`, including `product_image_1_url`.
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
    "message": "All SKUs with special tags retrieved successfully."
  }
  ```

## Logic

1. **Featured Categories**:
   - Queries the `sku_info` table for rows where `special_tag = true`.
   - Joins with the `sku_image_handler` table to fetch the `featured_image_url`.

2. **Featured SKUs**:
   - Queries the `sku_info` table for rows where `special_tag = true`.
   - Joins with the `sku_image_handler` table to fetch the `product_image_1_url`.

## Database Tables

- **`sku_info`**: Stores SKU details such as name, brand, price, and category.
- **`sku_image_handler`**: Stores image URLs for SKUs, linked via `sku_id`.