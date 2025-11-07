# Search API

This module provides APIs to handle SKU search functionality for the EMI Shopping App.

## Endpoints

### 1. `GET /api/search`
- **Description**: Searches SKUs based on brand name, description, or SKU name.
- **Query Parameter**:
  - `query` (string): The search query entered by the user.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "sku_id": "123e4567-e89b-12d3-a456-426614174000",
        "sku_name": "Samsung Galaxy S23",
        "sku_brand": "Samsung",
        "price": 999.99,
        "sku_description": "The latest Samsung Galaxy smartphone.",
        "category": "Electronics"
      }
    ],
    "message": "Search results retrieved successfully."
  }
  ```

## Logic

- Queries the `sku_info` table for rows where:
  - `sku_brand` matches the search query (case-insensitive).
  - OR `sku_description` matches the search query (case-insensitive).
  - OR `sku_name` matches the search query (case-insensitive).

## Database Tables

- **`sku_info`**: Stores SKU details such as name, brand, price, and description.