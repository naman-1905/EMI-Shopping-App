

CREATE TABLE public.sku_info (
    sno SERIAL PRIMARY KEY,
    sku_id UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    special_tag BOOLEAN DEFAULT FALSE,
    quantity NUMERIC(10,2) DEFAULT 0,
    price NUMERIC(10,2) NOT NULL,
    sku_description TEXT,
    category VARCHAR(100),
    best_selling BOOLEAN DEFAULT FALSE,
    sku_name VARCHAR(255) NOT NULL,
    sku_brand VARCHAR(255)
);

CREATE TABLE public.user_info (
    uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE public.user_preference (
    user_id UUID REFERENCES public.user_info(uid) ON DELETE CASCADE,
    sku_id UUID REFERENCES public.sku_info(sku_id) ON DELETE CASCADE,
    cart BOOLEAN DEFAULT FALSE,
    wishlist BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, sku_id)
);

CREATE TABLE public.user_address (
    ad_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uid UUID REFERENCES public.user_info(uid) ON DELETE CASCADE,
    state VARCHAR(100),
    city VARCHAR(100),
    pincode VARCHAR(10),
    landmark VARCHAR(255),
    flat_house VARCHAR(255),
    phone_number VARCHAR(20),
    special_address VARCHAR(255),
    receivers_name VARCHAR(255)
);

CREATE TABLE public.order_sku (
    order_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uid UUID REFERENCES public.user_info(uid) ON DELETE CASCADE,
    ad_id UUID REFERENCES public.user_address(ad_id) ON DELETE CASCADE,
    sku_id UUID REFERENCES public.sku_info(sku_id) ON DELETE CASCADE,
    ordered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ex_delivery_date DATE,
    cash BOOLEAN DEFAULT FALSE,
    mutual_fund_emi BOOLEAN DEFAULT FALSE,
    emi BOOLEAN DEFAULT FALSE,
    planned_month INT,
    quantity INT DEFAULT 1,
    final_price NUMERIC(10,2),
    cancel BOOLEAN DEFAULT FALSE,
    reason_of_cancellation TEXT
);

CREATE TABLE public.sku_image_handler (
    sku_id UUID REFERENCES public.sku_info(sku_id) ON DELETE CASCADE PRIMARY KEY,
    banner_image_url TEXT,
    featured_image_url TEXT,
    product_image_1_url TEXT
);

CREATE TABLE public.sku_price_buying_option_info (
    sno SERIAL PRIMARY KEY,
    sku_id UUID REFERENCES public.sku_info(sku_id) ON DELETE CASCADE,
    mutual_fund_emi BOOLEAN DEFAULT FALSE,
    emi BOOLEAN DEFAULT FALSE,
    emi_3_month INT,
    emi_6_month INT,
    emi_9_month INT,
    emi_12_month INT,
    emi_18_month INT,
    emi_24_month INT,
    emi_36_month INT,
    emi_48_month INT,
    emi_60_month INT,
    offer BOOLEAN DEFAULT FALSE,
    offer_value NUMERIC(10,2),
    offer_description TEXT
);
