INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('11111111-1111-1111-1111-111111111111', TRUE, 120, 24999.00, 'Premium AMOLED smartwatch with GPS and heart rate tracking.', 'smart watch', TRUE, 'Galaxy Watch 6', 'Samsung'),
('22222222-2222-2222-2222-222222222222', FALSE, 200, 15999.00, 'Stylish fitness tracker with long battery life and sleep monitoring.', 'smart watch', FALSE, 'Mi Watch Revolve Active', 'Xiaomi'),
('33333333-3333-3333-3333-333333333333', TRUE, 90, 31999.00, 'Stainless steel smartwatch with SpO2 sensor and 5ATM water resistance.', 'smart watch', TRUE, 'Apple Watch SE (2nd Gen)', 'Apple'),
('44444444-4444-4444-4444-444444444444', FALSE, 150, 8999.00, 'Lightweight watch with step tracking and phone notifications.', 'smart watch', FALSE, 'NoiseFit Endure', 'Noise'),
('55555555-5555-5555-5555-555555555555', TRUE, 100, 24990.00, 'Round AMOLED display smartwatch with stress tracking.', 'smart watch', TRUE, 'Amazfit GTR 3', 'Amazfit'),
('66666666-6666-6666-6666-666666666666', FALSE, 180, 13499.00, 'Compact smartwatch with fitness and sleep tracking.', 'smart watch', FALSE, 'Realme Watch 3 Pro', 'Realme'),
('77777777-7777-7777-7777-777777777777', TRUE, 140, 27999.00, 'Advanced smartwatch with ECG and body composition features.', 'smart watch', TRUE, 'Samsung Galaxy Watch 4', 'Samsung'),
('88888888-8888-8888-8888-888888888888', FALSE, 160, 9990.00, 'Smartwatch with Alexa built-in and 100+ sports modes.', 'smart watch', FALSE, 'BoAt Xtend Smartwatch', 'boAt'),
('99999999-9999-9999-9999-999999999999', TRUE, 110, 34999.00, 'Premium titanium case smartwatch with Always-On Retina display.', 'smart watch', TRUE, 'Apple Watch Series 9', 'Apple'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 130, 17999.00, 'Smartwatch with GPS, call support, and fitness tracking.', 'smart watch', FALSE, 'Fire-Boltt Visionary', 'Fire-Boltt');


INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('11111111-1111-1111-1111-111111111111', TRUE, TRUE, 8500, 4300, 2950, 2250, 1550, 1200, 950, 850, 750, TRUE, 5.0, '5% off on Axis Bank Cards'),
('22222222-2222-2222-2222-222222222222', TRUE, TRUE, 5400, 2800, 1900, 1450, 1000, 800, 650, 550, 450, FALSE, NULL, NULL),
('33333333-3333-3333-3333-333333333333', TRUE, TRUE, 10800, 5600, 3800, 2900, 2100, 1600, 1300, 1100, 950, TRUE, 7.5, 'Flat 7.5% off on HDFC EMI'),
('44444444-4444-4444-4444-444444444444', TRUE, TRUE, 3000, 1550, 1050, 800, 600, 450, 380, 320, 290, FALSE, NULL, NULL),
('55555555-5555-5555-5555-555555555555', TRUE, TRUE, 8500, 4300, 2900, 2200, 1550, 1200, 950, 850, 750, TRUE, 10.0, 'Festival Offer: 10% Off'),
('66666666-6666-6666-6666-666666666666', TRUE, TRUE, 4600, 2400, 1650, 1250, 900, 700, 550, 450, 400, FALSE, NULL, NULL),
('77777777-7777-7777-7777-777777777777', TRUE, TRUE, 9500, 4900, 3300, 2500, 1800, 1400, 1100, 950, 850, TRUE, 5.0, 'Limited Time 5% Discount'),
('88888888-8888-8888-8888-888888888888', TRUE, TRUE, 3400, 1750, 1200, 900, 650, 500, 400, 350, 300, FALSE, NULL, NULL),
('99999999-9999-9999-9999-999999999999', TRUE, TRUE, 11900, 6100, 4100, 3100, 2200, 1700, 1300, 1150, 1000, TRUE, 8.0, '8% cashback on ICICI Cards'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, TRUE, 6100, 3100, 2050, 1550, 1100, 850, 650, 550, 500, TRUE, 5.0, 'New Year Offer: 5% Discount');


INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', TRUE, 80, 74999.00, 'Flagship phone with triple-lens camera and AMOLED display.', 'phone', TRUE, 'iPhone 15', 'Apple'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 150, 35999.00, '5G smartphone with 120Hz AMOLED screen and fast charging.', 'phone', FALSE, 'OnePlus Nord 3', 'OnePlus'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', TRUE, 100, 49999.00, 'High-performance smartphone with Snapdragon 8 Gen 2.', 'phone', TRUE, 'Samsung Galaxy S23', 'Samsung'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', FALSE, 180, 19999.00, 'Budget 5G phone with large battery and FHD+ display.', 'phone', FALSE, 'Redmi Note 12 5G', 'Xiaomi'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', TRUE, 90, 64999.00, 'Pro camera system and A16 chip with cinematic video mode.', 'phone', TRUE, 'iPhone 14 Pro', 'Apple'),
('abababab-abab-abab-abab-abababababab', FALSE, 200, 23999.00, 'All-rounder phone with 5000mAh battery and AMOLED display.', 'phone', FALSE, 'Realme 11 Pro+', 'Realme'),
('cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', TRUE, 130, 59999.00, 'Flagship killer with 80W charging and 50MP Sony IMX sensor.', 'phone', TRUE, 'OnePlus 11R', 'OnePlus'),
('efefefef-efef-efef-efef-efefefefefef', FALSE, 160, 18999.00, 'Slim 5G device with MediaTek Dimensity 700 and 90Hz display.', 'phone', FALSE, 'Poco X5 5G', 'Poco'),
('12121212-1212-1212-1212-121212121212', TRUE, 140, 99999.00, 'Ultra flagship with 200MP camera and S Pen support.', 'phone', TRUE, 'Samsung Galaxy S23 Ultra', 'Samsung'),
('13131313-1313-1313-1313-131313131313', FALSE, 170, 28999.00, 'Powerful mid-range phone with 120Hz AMOLED display.', 'phone', FALSE, 'iQOO Neo 7 5G', 'iQOO');



INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', TRUE, TRUE, 25500, 13200, 9100, 6900, 4900, 3700, 2850, 2400, 2000, TRUE, 5.0, '5% off on HDFC Credit Cards'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', TRUE, TRUE, 12200, 6300, 4400, 3400, 2450, 1850, 1450, 1250, 1100, FALSE, NULL, NULL),
('dddddddd-dddd-dddd-dddd-dddddddddddd', TRUE, TRUE, 16500, 8600, 5900, 4500, 3250, 2450, 1900, 1650, 1400, TRUE, 7.5, 'Flat 7.5% off on Axis EMI'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', TRUE, TRUE, 6600, 3400, 2300, 1750, 1250, 950, 750, 650, 550, FALSE, NULL, NULL),
('ffffffff-ffff-ffff-ffff-ffffffffffff', TRUE, TRUE, 21500, 11200, 7700, 5800, 4200, 3150, 2450, 2050, 1750, TRUE, 10.0, 'Festival Offer: 10% Off'),
('abababab-abab-abab-abab-abababababab', TRUE, TRUE, 8000, 4200, 2900, 2200, 1550, 1200, 950, 850, 750, FALSE, NULL, NULL),
('cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', TRUE, TRUE, 20000, 10400, 7200, 5400, 3900, 2950, 2300, 1900, 1600, TRUE, 5.0, '5% Cashback via ICICI EMI'),
('efefefef-efef-efef-efef-efefefefefef', TRUE, TRUE, 6300, 3300, 2250, 1700, 1200, 900, 700, 600, 500, FALSE, NULL, NULL),
('12121212-1212-1212-1212-121212121212', TRUE, TRUE, 33000, 17000, 11800, 8900, 6400, 4800, 3700, 3100, 2700, TRUE, 6.5, '6.5% off with Axis Bank Credit Cards'),
('13131313-1313-1313-1313-131313131313', TRUE, TRUE, 9700, 5000, 3450, 2600, 1850, 1400, 1100, 950, 850, TRUE, 5.0, 'New Year Offer: 5% Discount');


INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('14141414-1414-1414-1414-141414141414', TRUE, 70, 139999.00, '65-inch 4K OLED TV with Dolby Vision and Atmos sound.', 'tv', TRUE, 'LG OLED65C3', 'LG'),
('15151515-1515-1515-1515-151515151515', FALSE, 90, 89999.00, '55-inch QLED Smart TV with HDR10+ and 120Hz refresh rate.', 'tv', FALSE, 'Samsung Q60C QLED', 'Samsung'),
('16161616-1616-1616-1616-161616161616', TRUE, 110, 49999.00, '43-inch 4K UHD Android TV with built-in Chromecast.', 'tv', TRUE, 'Sony Bravia 43X74L', 'Sony'),
('17171717-1717-1717-1717-171717171717', FALSE, 130, 28999.00, '40-inch Full HD LED Smart TV with Google Assistant.', 'tv', FALSE, 'Mi 5A Series 40-inch', 'Xiaomi'),
('18181818-1818-1818-1818-181818181818', TRUE, 100, 74999.00, '55-inch 4K QLED TV with Google TV interface.', 'tv', TRUE, 'TCL 55C835 QLED', 'TCL'),
('19191919-1919-1919-1919-191919191919', FALSE, 120, 19999.00, '32-inch HD Ready Smart TV with Dolby Audio.', 'tv', FALSE, 'OnePlus TV Y1 32"', 'OnePlus'),
('20202020-2020-2020-2020-202020202020', TRUE, 85, 59999.00, '50-inch UHD Android TV with voice remote and HDR.', 'tv', TRUE, 'Redmi Smart TV X50', 'Xiaomi'),
('21212121-2121-2121-2121-212121212121', FALSE, 140, 15999.00, '32-inch HD Ready Smart TV with built-in Fire TV OS.', 'tv', FALSE, 'AmazonBasics 32-inch HD', 'AmazonBasics'),
('22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, 90, 99999.00, '65-inch Mini-LED QLED TV with Dolby Vision IQ and 120Hz panel.', 'tv', TRUE, 'Hisense 65U8K', 'Hisense'),
('23232323-2323-2323-2323-232323232323', FALSE, 100, 37999.00, '43-inch 4K Smart TV with PatchWall and built-in Chromecast.', 'tv', FALSE, 'Mi TV 5X 43"', 'Xiaomi');

INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('14141414-1414-1414-1414-141414141414', TRUE, TRUE, 47000, 24000, 16500, 12500, 9000, 7000, 5500, 4700, 4100, TRUE, 10.0, 'Festival Offer: 10% Off on LG OLED Series'),
('15151515-1515-1515-1515-151515151515', TRUE, TRUE, 30000, 15500, 10500, 8000, 5800, 4500, 3600, 3100, 2700, TRUE, 5.0, '5% Instant Discount with HDFC Bank'),
('16161616-1616-1616-1616-161616161616', TRUE, TRUE, 16600, 8600, 5800, 4400, 3200, 2500, 1950, 1650, 1450, FALSE, NULL, NULL),
('17171717-1717-1717-1717-171717171717', TRUE, TRUE, 9700, 5000, 3400, 2600, 1850, 1450, 1150, 950, 850, TRUE, 7.5, 'Flat 7.5% off on Axis EMI'),
('18181818-1818-1818-1818-181818181818', TRUE, TRUE, 25000, 13000, 8800, 6600, 4750, 3650, 2850, 2450, 2100, TRUE, 6.0, '6% Cashback on SBI Credit Cards'),
('19191919-1919-1919-1919-191919191919', TRUE, TRUE, 6600, 3400, 2300, 1750, 1250, 950, 750, 650, 550, FALSE, NULL, NULL),
('20202020-2020-2020-2020-202020202020', TRUE, TRUE, 20000, 10400, 7100, 5300, 3850, 2950, 2250, 1900, 1650, TRUE, 5.0, 'Extra 5% off via ICICI Credit Cards'),
('21212121-2121-2121-2121-212121212121', TRUE, TRUE, 5400, 2800, 1900, 1450, 1000, 800, 650, 550, 450, FALSE, NULL, NULL),
('22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, TRUE, 33300, 17100, 11800, 8900, 6400, 4800, 3700, 3100, 2700, TRUE, 8.0, '8% Cashback on ICICI Bank Cards'),
('23232323-2323-2323-2323-232323232323', TRUE, TRUE, 12600, 6500, 4400, 3400, 2450, 1850, 1450, 1250, 1100, FALSE, NULL, NULL);


INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('24242424-2424-2424-2424-242424242424', TRUE, 80, 42999.00, '8 kg Front Load Washing Machine with AI DD and Steam technology.', 'washing machine', TRUE, 'LG FHM1408BDL', 'LG'),
('25252525-2525-2525-2525-252525252525', FALSE, 110, 24999.00, '6.5 kg Top Load Smart Inverter Fully Automatic Washer.', 'washing machine', FALSE, 'LG T65SNSF1Z', 'LG'),
('26262626-2626-2626-2626-262626262626', TRUE, 90, 36999.00, '7 kg Front Load EcoBubble Washing Machine with Digital Inverter.', 'washing machine', TRUE, 'Samsung WW70T4020CX', 'Samsung'),
('27272727-2727-2727-2727-272727272727', FALSE, 130, 17999.00, '7 kg Semi-Automatic Washing Machine with Air Dry.', 'washing machine', FALSE, 'Whirlpool SUPERB ATOM 7.0', 'Whirlpool'),
('28282828-2828-2828-2828-282828282828', TRUE, 100, 32999.00, '8 kg Fully Automatic Front Load Washer with Hygienic Wash.', 'washing machine', TRUE, 'Bosch WAJ2846SIN', 'Bosch'),
('29292929-2929-2929-2929-292929292929', FALSE, 140, 20999.00, '6.5 kg Top Load Smart Washer with Eco Tub Clean.', 'washing machine', FALSE, 'Samsung WA65T4262GG', 'Samsung'),
('30303030-3030-3030-3030-303030303030', TRUE, 95, 25999.00, '7.5 kg Fully Automatic Top Load Washing Machine with Turbo 6 Pulsator.', 'washing machine', TRUE, 'IFB TL-REW 7.5KG', 'IFB'),
('31313131-3131-3131-3131-313131313131', FALSE, 120, 15999.00, '6 kg Semi-Automatic Top Load Washing Machine with ActiveWash.', 'washing machine', FALSE, 'Godrej WS 600 PDS', 'Godrej'),
('32323232-3232-3232-3232-323232323232', TRUE, 80, 49999.00, '9 kg Front Load Wi-Fi Enabled Washing Machine with SteamCare.', 'washing machine', TRUE, 'Bosch WGA254ASIN', 'Bosch'),
('33333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 150, 18999.00, '6.5 kg Fully Automatic Top Load Washer with Eco Bubble and Delay Start.', 'washing machine', FALSE, 'Haier HWM65-707NZP', 'Haier');



INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('24242424-2424-2424-2424-242424242424', TRUE, TRUE, 14500, 7500, 5100, 3850, 2800, 2150, 1700, 1450, 1250, TRUE, 5.0, '5% cashback on Axis Bank EMI'),
('25252525-2525-2525-2525-252525252525', TRUE, TRUE, 8500, 4400, 2950, 2250, 1550, 1200, 950, 850, 750, FALSE, NULL, NULL),
('26262626-2626-2626-2626-262626262626', TRUE, TRUE, 12300, 6300, 4400, 3400, 2450, 1850, 1450, 1250, 1100, TRUE, 7.5, 'Flat 7.5% off on HDFC EMI'),
('27272727-2727-2727-2727-272727272727', TRUE, TRUE, 6100, 3100, 2100, 1600, 1150, 850, 650, 550, 500, FALSE, NULL, NULL),
('28282828-2828-2828-2828-282828282828', TRUE, TRUE, 10900, 5600, 3850, 2950, 2150, 1650, 1300, 1100, 950, TRUE, 6.0, '6% Discount during Big Savings Days'),
('29292929-2929-2929-2929-292929292929', TRUE, TRUE, 7000, 3600, 2500, 1950, 1400, 1050, 800, 700, 600, FALSE, NULL, NULL),
('30303030-3030-3030-3030-303030303030', TRUE, TRUE, 8700, 4500, 3050, 2300, 1600, 1250, 1000, 850, 750, TRUE, 5.0, 'Limited Time Offer: 5% Discount'),
('31313131-3131-3131-3131-313131313131', TRUE, TRUE, 5300, 2750, 1850, 1450, 1000, 800, 650, 550, 450, FALSE, NULL, NULL),
('32323232-3232-3232-3232-323232323232', TRUE, TRUE, 16700, 8600, 5900, 4500, 3250, 2450, 1900, 1650, 1400, TRUE, 8.0, '8% cashback on ICICI Credit Card EMI'),
('33333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, TRUE, 6400, 3300, 2250, 1700, 1200, 900, 700, 600, 500, TRUE, 5.0, 'New Year Offer: 5% Discount');


INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('34343434-3434-3434-3434-343434343434', TRUE, 70, 54999.00, '11-inch tablet with Liquid Retina display and Apple M1 chip.', 'tablet', TRUE, 'iPad Air (5th Gen)', 'Apple'),
('35353535-3535-3535-3535-353535353535', FALSE, 120, 28999.00, '10.4-inch tablet with S Pen support and Snapdragon processor.', 'tablet', FALSE, 'Samsung Galaxy Tab S6 Lite', 'Samsung'),
('36363636-3636-3636-3636-363636363636', TRUE, 80, 19999.00, '10.5-inch Android tablet with large battery and Dolby speakers.', 'tablet', TRUE, 'Lenovo Tab M10 Plus (3rd Gen)', 'Lenovo'),
('37373737-3737-3737-3737-373737373737', FALSE, 150, 15999.00, '8-inch compact tablet with 4G LTE and HD display.', 'tablet', FALSE, 'Realme Pad Mini', 'Realme'),
('38383838-3838-3838-3838-383838383838', TRUE, 100, 74999.00, '12.4-inch Super AMOLED 120Hz display with S Pen and DeX support.', 'tablet', TRUE, 'Samsung Galaxy Tab S8+', 'Samsung'),
('39393939-3939-3939-3939-393939393939', FALSE, 130, 23999.00, '10-inch Android tablet with quad speakers and fast charging.', 'tablet', FALSE, 'Nokia T20 LTE', 'Nokia'),
('40404040-4040-4040-4040-404040404040', TRUE, 95, 87999.00, '12.9-inch Liquid Retina XDR display with M2 chip.', 'tablet', TRUE, 'iPad Pro (6th Gen)', 'Apple'),
('41414141-4141-4141-4141-414141414141', FALSE, 170, 17999.00, '10-inch tablet with large battery and stereo sound.', 'tablet', FALSE, 'Moto Tab G70', 'Motorola'),
('42424242-4242-4242-4242-424242424242', TRUE, 90, 31999.00, '11-inch AMOLED Android tablet with S Pen support.', 'tablet', TRUE, 'Samsung Galaxy Tab S7 FE', 'Samsung'),
('43434343-4343-4343-4343-434343434343', FALSE, 150, 13499.00, '8-inch tablet for kids with parental control mode.', 'tablet', FALSE, 'Lenovo Tab M8 HD', 'Lenovo');


INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('34343434-3434-3434-3434-343434343434', TRUE, TRUE, 18500, 9500, 6500, 4950, 3550, 2700, 2100, 1800, 1550, TRUE, 6.0, '6% Cashback on Axis Bank Cards'),
('35353535-3535-3535-3535-353535353535', TRUE, TRUE, 9700, 5000, 3400, 2600, 1850, 1400, 1100, 950, 850, FALSE, NULL, NULL),
('36363636-3636-3636-3636-363636363636', TRUE, TRUE, 6700, 3450, 2350, 1750, 1250, 950, 750, 650, 550, TRUE, 5.0, 'Limited Period Offer: 5% Off'),
('37373737-3737-3737-3737-373737373737', TRUE, TRUE, 5400, 2800, 1900, 1450, 1000, 800, 650, 550, 450, FALSE, NULL, NULL),
('38383838-3838-3838-3838-383838383838', TRUE, TRUE, 25000, 13000, 8800, 6600, 4750, 3650, 2850, 2450, 2100, TRUE, 8.0, '8% Cashback on HDFC Bank Credit Card'),
('39393939-3939-3939-3939-393939393939', TRUE, TRUE, 8200, 4250, 2850, 2200, 1550, 1200, 950, 850, 750, FALSE, NULL, NULL),
('40404040-4040-4040-4040-404040404040', TRUE, TRUE, 29000, 15200, 10400, 7850, 5650, 4300, 3350, 2850, 2500, TRUE, 7.5, '7.5% off during Republic Day Sale'),
('41414141-4141-4141-4141-414141414141', TRUE, TRUE, 6100, 3100, 2050, 1550, 1100, 850, 650, 550, 500, FALSE, NULL, NULL),
('42424242-4242-4242-4242-424242424242', TRUE, TRUE, 10600, 5500, 3750, 2850, 2100, 1600, 1250, 1100, 950, TRUE, 5.0, 'Festival Offer: Flat 5% Discount'),
('43434343-4343-4343-4343-434343434343', TRUE, TRUE, 4600, 2400, 1650, 1250, 900, 700, 550, 450, 400, FALSE, NULL, NULL);



INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('54545454-5454-5454-5454-545454545454', TRUE, 75, 17999.00, '27-inch Full HD IPS Monitor with 75Hz refresh rate.', 'monitor', TRUE, 'LG 27MP60G', 'LG'),
('55555555-5555-5555-5555-555555555559', FALSE, 100, 24999.00, '32-inch QHD 75Hz Monitor with HDR10 support.', 'monitor', FALSE, 'Samsung Odyssey G5 32"', 'Samsung'),
('56565656-5656-5656-5656-565656565656', TRUE, 85, 29999.00, '27-inch 2K Gaming Monitor with 165Hz refresh rate and 1ms response.', 'monitor', TRUE, 'Acer Nitro VG271U', 'Acer'),
('57575757-5757-5757-5757-575757575757', FALSE, 120, 11999.00, '24-inch LED Monitor with HDMI and Eye Care Technology.', 'monitor', FALSE, 'ASUS VP248', 'ASUS'),
('58585858-5858-5858-5858-585858585858', TRUE, 95, 39999.00, '34-inch Ultrawide QHD Monitor with HDR and curved design.', 'monitor', TRUE, 'LG Ultrawide 34WN80C', 'LG'),
('59595959-5959-5959-5959-595959595959', FALSE, 150, 9999.00, '22-inch Full HD LED Monitor with Flicker-Free Display.', 'monitor', FALSE, 'Dell SE2222H', 'Dell'),
('60606060-6060-6060-6060-606060606060', TRUE, 90, 20999.00, '27-inch 144Hz IPS Gaming Monitor with G-Sync compatible display.', 'monitor', TRUE, 'MSI Optix G27C6', 'MSI'),
('61616161-6161-6161-6161-616161616161', FALSE, 180, 16999.00, '24-inch IPS Monitor with USB-C and ergonomic stand.', 'monitor', FALSE, 'BenQ GW2485TC', 'BenQ'),
('62626262-6262-6262-6262-626262626262', TRUE, 110, 45999.00, '32-inch 4K UHD HDR Monitor for content creation.', 'monitor', TRUE, 'Dell UltraSharp U3223QE', 'Dell'),
('63636363-6363-6363-6363-636363636363', FALSE, 130, 13999.00, '23.8-inch Full HD LED Monitor with built-in speakers.', 'monitor', FALSE, 'HP M24fw', 'HP');


INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('54545454-5454-5454-5454-545454545454', TRUE, TRUE, 6100, 3100, 2100, 1600, 1150, 850, 650, 550, 500, TRUE, 5.0, '5% Cashback on HDFC Credit Card EMI'),
('55555555-5555-5555-5555-555555555559', TRUE, TRUE, 8500, 4400, 2950, 2250, 1550, 1200, 950, 850, 750, FALSE, NULL, NULL),
('56565656-5656-5656-5656-565656565656', TRUE, TRUE, 10100, 5200, 3550, 2700, 1950, 1500, 1150, 950, 850, TRUE, 7.0, '7% Off during Gaming Fest'),
('57575757-5757-5757-5757-575757575757', TRUE, TRUE, 4000, 2050, 1400, 1050, 750, 600, 480, 420, 370, FALSE, NULL, NULL),
('58585858-5858-5858-5858-585858585858', TRUE, TRUE, 13300, 6800, 4700, 3550, 2600, 2000, 1550, 1300, 1150, TRUE, 10.0, 'Festival Offer: 10% off on LG Monitors'),
('59595959-5959-5959-5959-595959595959', TRUE, TRUE, 3300, 1700, 1150, 850, 600, 480, 390, 330, 290, FALSE, NULL, NULL),
('60606060-6060-6060-6060-606060606060', TRUE, TRUE, 7000, 3600, 2450, 1900, 1350, 1000, 780, 670, 590, TRUE, 5.0, 'Limited Offer: 5% Cashback on Axis Cards'),
('61616161-6161-6161-6161-616161616161', TRUE, TRUE, 5650, 2900, 2000, 1500, 1100, 850, 650, 550, 470, FALSE, NULL, NULL),
('62626262-6262-6262-6262-626262626262', TRUE, TRUE, 15300, 7800, 5300, 4000, 2950, 2250, 1750, 1500, 1300, TRUE, 8.0, '8% Off on Dell 4K Monitors'),
('63636363-6363-6363-6363-636363636363', TRUE, TRUE, 4700, 2450, 1650, 1250, 900, 700, 550, 450, 400, FALSE, NULL, NULL);




INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('64646464-6464-6464-6464-646464646464', TRUE, 150, 12999.00, 'Wireless mechanical keyboard with RGB lighting and Bluetooth connectivity.', 'keyboard', TRUE, 'Logitech G915 TKL', 'Logitech'),
('65656565-6565-6565-6565-656565656565', FALSE, 180, 4999.00, 'Compact mechanical keyboard with Outemu blue switches.', 'keyboard', FALSE, 'Redragon K552 Kumara', 'Redragon'),
('66666666-6666-6666-6666-666666666669', TRUE, 140, 8999.00, 'Full-size gaming keyboard with per-key RGB and detachable wrist rest.', 'keyboard', TRUE, 'Corsair K60 RGB Pro', 'Corsair'),
('67676767-6767-6767-6767-676767676767', FALSE, 220, 2499.00, 'Wireless keyboard with long battery life and silent keys.', 'keyboard', FALSE, 'Logitech MK295 Silent', 'Logitech'),
('68686868-6868-6868-6868-686868686868', TRUE, 160, 15999.00, 'Low-profile mechanical keyboard with aluminum frame and hot-swappable switches.', 'keyboard', TRUE, 'Keychron K3 Pro', 'Keychron'),
('69696969-6969-6969-6969-696969696969', FALSE, 190, 1999.00, 'Compact wireless keyboard with number pad and media keys.', 'keyboard', FALSE, 'Dell KB700', 'Dell'),
('70707070-7070-7070-7070-707070707070', TRUE, 100, 10499.00, 'Mechanical keyboard with Cherry MX Red switches and RGB effects.', 'keyboard', TRUE, 'HyperX Alloy Origins', 'HyperX'),
('71717171-7171-7171-7171-717171717171', FALSE, 210, 3499.00, 'Slim Bluetooth keyboard for multi-device connectivity.', 'keyboard', FALSE, 'Microsoft Bluetooth Keyboard', 'Microsoft'),
('72727272-7272-7272-7272-727272727272', TRUE, 130, 6499.00, 'RGB mechanical keyboard with hot-swappable keys and USB-C.', 'keyboard', TRUE, 'Ant Esports MK3400V2', 'Ant Esports'),
('73737373-7373-7373-7373-737373737373', FALSE, 200, 2799.00, 'Standard membrane keyboard with spill-resistant design.', 'keyboard', FALSE, 'HP 230 Wireless Keyboard', 'HP');




INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('64646464-6464-6464-6464-646464646464', TRUE, TRUE, 4400, 2300, 1550, 1200, 850, 650, 520, 440, 380, TRUE, 5.0, '5% Cashback on HDFC Credit Card EMI'),
('65656565-6565-6565-6565-656565656565', TRUE, TRUE, 1700, 900, 620, 470, 340, 260, 210, 180, 160, FALSE, NULL, NULL),
('66666666-6666-6666-6666-666666666669', TRUE, TRUE, 3100, 1650, 1150, 880, 640, 490, 390, 340, 290, TRUE, 7.0, '7% Discount during Gaming Fest'),
('67676767-6767-6767-6767-676767676767', TRUE, TRUE, 870, 460, 310, 240, 180, 140, 110, 90, 80, FALSE, NULL, NULL),
('68686868-6868-6868-6868-686868686868', TRUE, TRUE, 5300, 2800, 1950, 1500, 1080, 820, 650, 550, 470, TRUE, 8.0, '8% Off on Keychron Store'),
('69696969-6969-6969-6969-696969696969', TRUE, TRUE, 660, 340, 230, 175, 125, 95, 75, 65, 55, FALSE, NULL, NULL),
('70707070-7070-7070-7070-707070707070', TRUE, TRUE, 3500, 1850, 1250, 950, 690, 530, 420, 360, 310, TRUE, 5.0, 'Flat 5% Discount on Gaming Accessories'),
('71717171-7171-7171-7171-717171717171', TRUE, TRUE, 1160, 620, 420, 320, 230, 180, 140, 120, 100, FALSE, NULL, NULL),
('72727272-7272-7272-7272-727272727272', TRUE, TRUE, 2170, 1140, 780, 590, 430, 330, 260, 220, 190, TRUE, 6.0, '6% Off on Ant Esports Products'),
('73737373-7373-7373-7373-737373737373', TRUE, TRUE, 930, 490, 330, 250, 180, 140, 110, 90, 80, FALSE, NULL, NULL);



INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('74747474-7474-7474-7474-747474747474', TRUE, 80, 89999.00, '15.6-inch gaming laptop with Intel i7 13th Gen and RTX 4060 GPU.', 'laptop', TRUE, 'ASUS TUF Gaming F15', 'ASUS'),
('75757575-7575-7575-7575-757575757575', FALSE, 110, 55999.00, '14-inch ultrabook with AMD Ryzen 5 and 16GB RAM.', 'laptop', FALSE, 'HP Pavilion Aero 13', 'HP'),
('76767676-7676-7676-7676-767676767676', TRUE, 100, 129999.00, '16-inch MacBook with M3 chip and Liquid Retina Display.', 'laptop', TRUE, 'MacBook Air M3', 'Apple'),
('77777777-7777-7777-7777-777777777779', FALSE, 140, 42999.00, '15.6-inch everyday laptop with Intel i5 12th Gen processor.', 'laptop', FALSE, 'Lenovo IdeaPad Slim 3i', 'Lenovo'),
('78787878-7878-7878-7878-787878787878', TRUE, 90, 74999.00, '14-inch business laptop with Intel i7 and 512GB SSD.', 'laptop', TRUE, 'Dell Inspiron 14 5000', 'Dell'),
('79797979-7979-7979-7979-797979797979', FALSE, 160, 38999.00, '14-inch student laptop with Intel i3 11th Gen and 8GB RAM.', 'laptop', FALSE, 'Acer Aspire 3', 'Acer'),
('80808080-8080-8080-8080-808080808080', TRUE, 95, 154999.00, '16-inch gaming powerhouse with AMD Ryzen 9 and RTX 4070 GPU.', 'laptop', TRUE, 'MSI Pulse GL76', 'MSI'),
('81818181-8181-8181-8181-818181818181', FALSE, 120, 62999.00, '15.6-inch laptop with Intel i7, 16GB RAM, and 512GB SSD.', 'laptop', FALSE, 'HP Victus 15', 'HP'),
('82828282-8282-8282-8282-828282828282', TRUE, 105, 102999.00, '15.6-inch creator laptop with OLED display and RTX 3050 GPU.', 'laptop', TRUE, 'ASUS Vivobook Pro 15 OLED', 'ASUS'),
('83838383-8383-8383-8383-838383838383', FALSE, 140, 47999.00, '14-inch compact laptop with Ryzen 5 5500U and FHD panel.', 'laptop', FALSE, 'Lenovo IdeaPad Flex 5', 'Lenovo');



INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('74747474-7474-7474-7474-747474747474', TRUE, TRUE, 30500, 15800, 10700, 8200, 5900, 4450, 3450, 2950, 2600, TRUE, 7.5, '7.5% Cashback on Axis Bank Credit Cards'),
('75757575-7575-7575-7575-757575757575', TRUE, TRUE, 19000, 9900, 6700, 5100, 3650, 2750, 2150, 1800, 1600, FALSE, NULL, NULL),
('76767676-7676-7676-7676-767676767676', TRUE, TRUE, 44000, 22700, 15400, 11800, 8450, 6400, 4950, 4200, 3700, TRUE, 5.0, 'Flat 5% Off on Apple MacBooks'),
('77777777-7777-7777-7777-777777777779', TRUE, TRUE, 14500, 7500, 5100, 3850, 2800, 2150, 1700, 1450, 1250, FALSE, NULL, NULL),
('78787878-7878-7878-7878-787878787878', TRUE, TRUE, 25000, 13000, 8800, 6600, 4750, 3650, 2850, 2450, 2100, TRUE, 6.0, '6% Cashback on HDFC Credit Cards'),
('79797979-7979-7979-7979-797979797979', TRUE, TRUE, 13000, 6800, 4600, 3450, 2500, 1900, 1450, 1250, 1100, FALSE, NULL, NULL),
('80808080-8080-8080-8080-808080808080', TRUE, TRUE, 52500, 27000, 18400, 14000, 10100, 7700, 5900, 5000, 4400, TRUE, 10.0, 'Festival Offer: 10% Off on MSI Gaming Laptops'),
('81818181-8181-8181-8181-818181818181', TRUE, TRUE, 21000, 10900, 7500, 5700, 4100, 3150, 2450, 2050, 1750, TRUE, 5.0, 'Flat 5% Discount on HP Victus Series'),
('82828282-8282-8282-8282-828282828282', TRUE, TRUE, 34500, 17800, 12100, 9250, 6650, 5050, 3900, 3300, 2900, TRUE, 8.0, '8% Cashback on ASUS OLED Laptops'),
('83838383-8383-8383-8383-838383838383', TRUE, TRUE, 15500, 8000, 5400, 4050, 2900, 2200, 1700, 1450, 1250, FALSE, NULL, NULL);



INSERT INTO public.sku_info 
(sku_id, special_tag, quantity, price, sku_description, category, best_selling, sku_name, sku_brand)
VALUES
('84848484-8484-8484-8484-848484848484', TRUE, 140, 29999.00, 'Wireless noise-cancelling over-ear headphones with LDAC support.', 'headphones', TRUE, 'Sony WH-1000XM5', 'Sony'),
('85858585-8585-8585-8585-858585858585', FALSE, 200, 15999.00, 'Wireless headphones with active noise cancellation and 30-hour battery.', 'headphones', FALSE, 'JBL Tour One', 'JBL'),
('86868686-8686-8686-8686-868686868686', TRUE, 120, 9999.00, 'Over-ear gaming headset with 7.1 surround sound and detachable mic.', 'headphones', TRUE, 'Logitech G Pro X', 'Logitech'),
('87878787-8787-8787-8787-878787878787', FALSE, 180, 3499.00, 'On-ear Bluetooth headphones with 20-hour battery and foldable design.', 'headphones', FALSE, 'boAt Rockerz 450 Pro', 'boAt'),
('88888888-8888-8888-8888-888888888889', TRUE, 160, 49999.00, 'Premium over-ear wireless headphones with spatial audio.', 'headphones', TRUE, 'Apple AirPods Max', 'Apple'),
('89898989-8989-8989-8989-898989898989', FALSE, 190, 11999.00, 'Wireless ANC headphones with multipoint Bluetooth connection.', 'headphones', FALSE, 'Sennheiser HD 450BT', 'Sennheiser'),
('90909090-9090-9090-9090-909090909090', TRUE, 150, 7999.00, 'Wireless over-ear headphones with deep bass and voice assistant.', 'headphones', TRUE, 'Sony WH-XB700', 'Sony'),
('91919191-9191-9191-9191-919191919191', FALSE, 170, 2499.00, 'Wireless on-ear headphones with fast charging and dual pairing.', 'headphones', FALSE, 'Zebronics Zeb-Thunder Pro', 'Zebronics'),
('92929292-9292-9292-9292-929292929292', TRUE, 130, 16999.00, 'Noise-cancelling wireless headphones with customizable EQ.', 'headphones', TRUE, 'Skullcandy Crusher ANC 2', 'Skullcandy'),
('93939393-9393-9393-9393-939393939393', FALSE, 210, 6999.00, 'Over-ear Bluetooth headphones with voice assistant and mic.', 'headphones', FALSE, 'Infinity Glide 510', 'Infinity');



INSERT INTO public.sku_price_buying_option_info
(sku_id, mutual_fund_emi, emi, emi_3_month, emi_6_month, emi_9_month, emi_12_month, emi_18_month, emi_24_month, emi_36_month, emi_48_month, emi_60_month, offer, offer_value, offer_description)
VALUES
('84848484-8484-8484-8484-848484848484', TRUE, TRUE, 10200, 5200, 3550, 2700, 1950, 1500, 1150, 950, 850, TRUE, 6.0, '6% Cashback on Sony Store'),
('85858585-8585-8585-8585-858585858585', TRUE, TRUE, 5400, 2800, 1900, 1450, 1000, 800, 650, 550, 450, FALSE, NULL, NULL),
('86868686-8686-8686-8686-868686868686', TRUE, TRUE, 3400, 1750, 1200, 900, 650, 500, 400, 350, 300, TRUE, 5.0, 'Flat 5% Off on Logitech Gaming Accessories'),
('87878787-8787-8787-8787-878787878787', TRUE, TRUE, 1200, 620, 420, 320, 230, 180, 140, 120, 100, FALSE, NULL, NULL),
('88888888-8888-8888-8888-888888888889', TRUE, TRUE, 16700, 8600, 5900, 4500, 3250, 2450, 1900, 1650, 1400, TRUE, 8.0, '8% Cashback on Apple Premium Resellers'),
('89898989-8989-8989-8989-898989898989', TRUE, TRUE, 4100, 2100, 1450, 1100, 790, 610, 470, 400, 350, FALSE, NULL, NULL),
('90909090-9090-9090-9090-909090909090', TRUE, TRUE, 2750, 1450, 950, 750, 540, 420, 330, 280, 250, TRUE, 5.0, 'Limited Time Offer: 5% Off'),
('91919191-9191-9191-9191-919191919191', TRUE, TRUE, 860, 440, 300, 230, 160, 130, 100, 85, 75, FALSE, NULL, NULL),
('92929292-9292-9292-9292-929292929292', TRUE, TRUE, 5700, 2950, 2000, 1550, 1100, 850, 650, 550, 470, TRUE, 7.0, '7% Cashback via ICICI Bank EMI'),
('93939393-9393-9393-9393-939393939393', TRUE, TRUE, 2350, 1220, 830, 640, 460, 350, 270, 230, 200, FALSE, NULL, NULL);
