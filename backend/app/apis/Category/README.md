# Category API

This module provides APIs to handle category-related operations for the EMI Shopping App.

## Endpoints

### 1. `GET /api/category/unique`
- **Description**: Retrieves all unique categories from the `sku_info` table.
- **Response**:
  ```json
  {
    "success": true,
    "data": ["Electronics", "Clothing", "Home Appliances"],
    "message": "Unique categories retrieved successfully"
  }
  ```

### 2. `GET /api/category/:categoryName`
- **Description**: Retrieves all SKU items for a specific category, including image URLs.
- **Path Parameter**:
  - `categoryName` (string): The name of the category to filter by.
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
          "banner_image_url": "https://example.com/banner.jpg",
          "featured_image_url": "https://example.com/featured.jpg",
          "product_image_1_url": "https://example.com/product1.jpg"
        }
      }
    ],
    "message": "Items for category \"Electronics\" retrieved successfully"
  }
  ```

## Database Tables

- **`sku_info`**: Stores SKU details such as name, brand, price, and category.
- **`sku_image_handler`**: Stores image URLs for SKUs, linked via `sku_id`.