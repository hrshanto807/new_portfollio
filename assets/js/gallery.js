/**
 * Cybernetic Project Gallery Lightbox & Responsive Slider
 * Features:
 *  - High-res multi-device viewport slider (Desktop, Laptop, Tablet, Mobile)
 *  - Thumbnail navigation strip with active neon indicators
 *  - Keyboard navigation (Left/Right arrows, Escape to exit)
 *  - Mobile touch swipe gestures (Swipe Left / Swipe Right)
 *  - 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    // Gallery Database
    const galleryData = {
        'inventory-pos': {
            title: 'Inventory POS – Multi-Tenant Enterprise SaaS Platform [23 Production Views]',
            caption: 'Enterprise-grade multi-tenant architecture with company database isolation, custom subdomains, touch barcode POS terminal, double-entry financial ledger, and SuperAdmin subscription monetization engine.',
            slides: [
                {
                    src: 'assets/images/inventory-pos/01_website_landing.png',
                    device: '01. Public SaaS Marketing Portal & Landing Page (2160×11709)',
                    desc: 'High-converting multi-tenant marketing website featuring dynamic subscription tier tables, interactive feature tour, customer testimonials, and instant company onboarding funnel.'
                },
                {
                    src: 'assets/images/inventory-pos/02_website_about.png',
                    device: '02. Platform Architecture & Company Overview (2160×5403)',
                    desc: 'Architectural overview outlining multi-branch inventory synchronization, offline-ready POS failover, cloud infrastructure SLA, and enterprise compliance.'
                },
                {
                    src: 'assets/images/inventory-pos/03_auth_login.png',
                    device: '03. Multi-Tenant Authentication & Subdomain Gatekeeper (2160×1350)',
                    desc: 'Secure authentication portal automatically detecting tenant subdomains, enforcing brute-force mitigation, session rate-limiting, and remember-me tokens.'
                },
                {
                    src: 'assets/images/inventory-pos/04_saas_dashboard.png',
                    device: '04. Executive Tenant ERP & Sales Analytics Dashboard (2160×3338)',
                    desc: 'Real-time mission control displaying daily gross revenue, net profit margin, live order count, low-stock threshold alerts, and cash-in-drawer telemetry.'
                },
                {
                    src: 'assets/images/inventory-pos/05_products_table.png',
                    device: '05. Product Inventory & Barcode Catalog (2160×1677)',
                    desc: 'Centralized product database with live stock status indicators, instant barcode search, category hierarchies, purchase vs selling margins, and bulk export.'
                },
                {
                    src: 'assets/images/inventory-pos/06_product_create_form.png',
                    device: '06. Advanced Product Creation & Variant Configuration (2160×1350)',
                    desc: 'Granular inventory item creation modal supporting barcode auto-generation, multi-tax tiers, unit conversions (Pcs/Box/Kg), and minimum safety stock alerts.'
                },
                {
                    src: 'assets/images/inventory-pos/07_pos_terminal.png',
                    device: '07. High-Throughput Touch POS Billing Terminal (2160×1542)',
                    desc: 'Ultra-fast cashier checkout interface with rapid barcode lookup, active cart calculations, multi-discount rules, customer linking, and one-click thermal receipt printing.'
                },
                {
                    src: 'assets/images/inventory-pos/08_modal_cash_register.png',
                    device: '08. Cash Register Drawer & Shift Balancing Modal (2160×1350)',
                    desc: 'Comprehensive shift cashier management tracking opening drawer float, midday cash deposits/withdrawals, closing totals, and cash reconciliation audits.'
                },
                {
                    src: 'assets/images/inventory-pos/09_modal_held_bills.png',
                    device: '09. Suspended Orders & Multi-Cart Held Bills Manager (2160×1350)',
                    desc: 'Multi-cart suspension modal allowing cashiers to put incomplete orders on hold, serve waiting retail customers, and restore draft carts instantly with zero data loss.'
                },
                {
                    src: 'assets/images/inventory-pos/10_modal_quick_create_customer.png',
                    device: '10. Rapid Customer CRM Onboarding Modal (2160×1350)',
                    desc: 'Inline checkout modal allowing store staff to register new customers in under 5 seconds with phone lookup, credit limit assignment, and loyalty tagging.'
                },
                {
                    src: 'assets/images/inventory-pos/11_sales_table.png',
                    device: '11. Sales Orders & Real-Time Transaction Ledger (2160×1551)',
                    desc: 'Master sales records logging invoice numbers, customer profiles, payment statuses (Paid/Partial/Due), cashier IDs, and one-click PDF reprint triggers.'
                },
                {
                    src: 'assets/images/inventory-pos/12_sales_invoice_document.png',
                    device: '12. Thermal & Printable Sales Invoice Document (2160×1826)',
                    desc: 'Standardized printable invoice and POS thermal slip complete with company logo, tax registration number, itemized breakdown, discounts, and barcode validation.'
                },
                {
                    src: 'assets/images/inventory-pos/13_purchases_table.png',
                    device: '13. Purchase Orders & Vendor Stock Inwarding (2160×1646)',
                    desc: 'Supply chain procurement table managing vendor purchase orders, inward stock verification, payment due dates, and automated weighted-average cost updating.'
                },
                {
                    src: 'assets/images/inventory-pos/14_customers_crm_table.png',
                    device: '14. Customer Directory & Credit Balance Ledger (2160×1551)',
                    desc: 'Full-featured CRM database tracking customer lifetime spend, outstanding credit receivables, phone directories, and transaction histories.'
                },
                {
                    src: 'assets/images/inventory-pos/15_suppliers_table.png',
                    device: '15. Supplier Directory & Accounts Payable Ledger (2160×1551)',
                    desc: 'Comprehensive vendor management portal tracking trade balances, total purchased value, outstanding accounts payable, and supplier contact details.'
                },
                {
                    src: 'assets/images/inventory-pos/16_accounts_ledger_table.png',
                    device: '16. Double-Entry Financial Accounts & Cashflow Ledger (2160×1541)',
                    desc: 'Enterprise accounting ledger recording cash, bank accounts, expenses, journal vouchers, debits, credits, and live trial balance reconciliations.'
                },
                {
                    src: 'assets/images/inventory-pos/17_reports_analytics.png',
                    device: '17. Business Intelligence & Profit/Loss Financial Reports (2160×1719)',
                    desc: 'Deep operational analytics generating daily/monthly sales velocity, gross vs net profit margin, tax liability summaries, and fast-moving inventory turnover rates.'
                },
                {
                    src: 'assets/images/inventory-pos/18_admin_companies_tenants.png',
                    device: '18. SuperAdmin Multi-Tenant Companies Directory (2160×1350)',
                    desc: 'Central SaaS control plane managing tenant company accounts, dedicated MySQL database provisioning, custom subdomain routing, and plan subscription status.'
                },
                {
                    src: 'assets/images/inventory-pos/19_admin_saas_plans.png',
                    device: '19. SuperAdmin SaaS Subscription Plans Engine (2160×1350)',
                    desc: 'Flexible SaaS monetization engine configuring tiered subscription plans (Starter/Pro/Enterprise), monthly/annual pricing, store limits, and feature flags.'
                },
                {
                    src: 'assets/images/inventory-pos/20_admin_platform_finance.png',
                    device: '20. SuperAdmin Platform Revenue & MRR Finance (2160×2006)',
                    desc: 'Global platform financial telemetry tracking Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), subscription renewals, and gateway payouts.'
                },
                {
                    src: 'assets/images/inventory-pos/21_admin_security_dashboard.png',
                    device: '21. SuperAdmin Security & System Audit Log Monitor (2160×1350)',
                    desc: 'Real-time platform security operations center monitoring brute-force attempts, IP blocking, failed logins, sensitive action audit logs, and session management.'
                },
                {
                    src: 'assets/images/inventory-pos/22_admin_roles_permissions.png',
                    device: '22. Granular RBAC Role & Permission Matrix (2160×1350)',
                    desc: 'Enterprise permission matrix assigning fine-grained capabilities across SuperAdmin, Tenant Admin, Branch Manager, Cashier, and Accountant roles.'
                },
                {
                    src: 'assets/images/inventory-pos/23_settings_form.png',
                    device: '23. Tenant Workspace Configuration & Tax Engine (2160×1368)',
                    desc: 'Multi-branch business workspace setup managing tax rules (VAT/GST), currency symbols, thermal receipt layouts, email SMTP, and automated backup schedules.'
                }
            ]
        },
        'bnsmsoft': {
            title: 'Inventory POS – Multi-Tenant Enterprise SaaS Platform [23 Production Views]',
            caption: 'Enterprise-grade multi-tenant architecture with company database isolation, custom subdomains, touch barcode POS terminal, double-entry financial ledger, and SuperAdmin subscription monetization engine.',
            slides: [
                {
                    src: 'assets/images/inventory-pos/01_website_landing.png',
                    device: '01. Public SaaS Marketing Portal & Landing Page (2160×11709)',
                    desc: 'High-converting multi-tenant marketing website featuring dynamic subscription tier tables, interactive feature tour, customer testimonials, and instant company onboarding funnel.'
                },
                {
                    src: 'assets/images/inventory-pos/02_website_about.png',
                    device: '02. Platform Architecture & Company Overview (2160×5403)',
                    desc: 'Architectural overview outlining multi-branch inventory synchronization, offline-ready POS failover, cloud infrastructure SLA, and enterprise compliance.'
                },
                {
                    src: 'assets/images/inventory-pos/03_auth_login.png',
                    device: '03. Multi-Tenant Authentication & Subdomain Gatekeeper (2160×1350)',
                    desc: 'Secure authentication portal automatically detecting tenant subdomains, enforcing brute-force mitigation, session rate-limiting, and remember-me tokens.'
                },
                {
                    src: 'assets/images/inventory-pos/04_saas_dashboard.png',
                    device: '04. Executive Tenant ERP & Sales Analytics Dashboard (2160×3338)',
                    desc: 'Real-time mission control displaying daily gross revenue, net profit margin, live order count, low-stock threshold alerts, and cash-in-drawer telemetry.'
                },
                {
                    src: 'assets/images/inventory-pos/05_products_table.png',
                    device: '05. Product Inventory & Barcode Catalog (2160×1677)',
                    desc: 'Centralized product database with live stock status indicators, instant barcode search, category hierarchies, purchase vs selling margins, and bulk export.'
                },
                {
                    src: 'assets/images/inventory-pos/06_product_create_form.png',
                    device: '06. Advanced Product Creation & Variant Configuration (2160×1350)',
                    desc: 'Granular inventory item creation modal supporting barcode auto-generation, multi-tax tiers, unit conversions (Pcs/Box/Kg), and minimum safety stock alerts.'
                },
                {
                    src: 'assets/images/inventory-pos/07_pos_terminal.png',
                    device: '07. High-Throughput Touch POS Billing Terminal (2160×1542)',
                    desc: 'Ultra-fast cashier checkout interface with rapid barcode lookup, active cart calculations, multi-discount rules, customer linking, and one-click thermal receipt printing.'
                },
                {
                    src: 'assets/images/inventory-pos/08_modal_cash_register.png',
                    device: '08. Cash Register Drawer & Shift Balancing Modal (2160×1350)',
                    desc: 'Comprehensive shift cashier management tracking opening drawer float, midday cash deposits/withdrawals, closing totals, and cash reconciliation audits.'
                },
                {
                    src: 'assets/images/inventory-pos/09_modal_held_bills.png',
                    device: '09. Suspended Orders & Multi-Cart Held Bills Manager (2160×1350)',
                    desc: 'Multi-cart suspension modal allowing cashiers to put incomplete orders on hold, serve waiting retail customers, and restore draft carts instantly with zero data loss.'
                },
                {
                    src: 'assets/images/inventory-pos/10_modal_quick_create_customer.png',
                    device: '10. Rapid Customer CRM Onboarding Modal (2160×1350)',
                    desc: 'Inline checkout modal allowing store staff to register new customers in under 5 seconds with phone lookup, credit limit assignment, and loyalty tagging.'
                },
                {
                    src: 'assets/images/inventory-pos/11_sales_table.png',
                    device: '11. Sales Orders & Real-Time Transaction Ledger (2160×1551)',
                    desc: 'Master sales records logging invoice numbers, customer profiles, payment statuses (Paid/Partial/Due), cashier IDs, and one-click PDF reprint triggers.'
                },
                {
                    src: 'assets/images/inventory-pos/12_sales_invoice_document.png',
                    device: '12. Thermal & Printable Sales Invoice Document (2160×1826)',
                    desc: 'Standardized printable invoice and POS thermal slip complete with company logo, tax registration number, itemized breakdown, discounts, and barcode validation.'
                },
                {
                    src: 'assets/images/inventory-pos/13_purchases_table.png',
                    device: '13. Purchase Orders & Vendor Stock Inwarding (2160×1646)',
                    desc: 'Supply chain procurement table managing vendor purchase orders, inward stock verification, payment due dates, and automated weighted-average cost updating.'
                },
                {
                    src: 'assets/images/inventory-pos/14_customers_crm_table.png',
                    device: '14. Customer Directory & Credit Balance Ledger (2160×1551)',
                    desc: 'Full-featured CRM database tracking customer lifetime spend, outstanding credit receivables, phone directories, and transaction histories.'
                },
                {
                    src: 'assets/images/inventory-pos/15_suppliers_table.png',
                    device: '15. Supplier Directory & Accounts Payable Ledger (2160×1551)',
                    desc: 'Comprehensive vendor management portal tracking trade balances, total purchased value, outstanding accounts payable, and supplier contact details.'
                },
                {
                    src: 'assets/images/inventory-pos/16_accounts_ledger_table.png',
                    device: '16. Double-Entry Financial Accounts & Cashflow Ledger (2160×1541)',
                    desc: 'Enterprise accounting ledger recording cash, bank accounts, expenses, journal vouchers, debits, credits, and live trial balance reconciliations.'
                },
                {
                    src: 'assets/images/inventory-pos/17_reports_analytics.png',
                    device: '17. Business Intelligence & Profit/Loss Financial Reports (2160×1719)',
                    desc: 'Deep operational analytics generating daily/monthly sales velocity, gross vs net profit margin, tax liability summaries, and fast-moving inventory turnover rates.'
                },
                {
                    src: 'assets/images/inventory-pos/18_admin_companies_tenants.png',
                    device: '18. SuperAdmin Multi-Tenant Companies Directory (2160×1350)',
                    desc: 'Central SaaS control plane managing tenant company accounts, dedicated MySQL database provisioning, custom subdomain routing, and plan subscription status.'
                },
                {
                    src: 'assets/images/inventory-pos/19_admin_saas_plans.png',
                    device: '19. SuperAdmin SaaS Subscription Plans Engine (2160×1350)',
                    desc: 'Flexible SaaS monetization engine configuring tiered subscription plans (Starter/Pro/Enterprise), monthly/annual pricing, store limits, and feature flags.'
                },
                {
                    src: 'assets/images/inventory-pos/20_admin_platform_finance.png',
                    device: '20. SuperAdmin Platform Revenue & MRR Finance (2160×2006)',
                    desc: 'Global platform financial telemetry tracking Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), subscription renewals, and gateway payouts.'
                },
                {
                    src: 'assets/images/inventory-pos/21_admin_security_dashboard.png',
                    device: '21. SuperAdmin Security & System Audit Log Monitor (2160×1350)',
                    desc: 'Real-time platform security operations center monitoring brute-force attempts, IP blocking, failed logins, sensitive action audit logs, and session management.'
                },
                {
                    src: 'assets/images/inventory-pos/22_admin_roles_permissions.png',
                    device: '22. Granular RBAC Role & Permission Matrix (2160×1350)',
                    desc: 'Enterprise permission matrix assigning fine-grained capabilities across SuperAdmin, Tenant Admin, Branch Manager, Cashier, and Accountant roles.'
                },
                {
                    src: 'assets/images/inventory-pos/23_settings_form.png',
                    device: '23. Tenant Workspace Configuration & Tax Engine (2160×1368)',
                    desc: 'Multi-branch business workspace setup managing tax rules (VAT/GST), currency symbols, thermal receipt layouts, email SMTP, and automated backup schedules.'
                }
            ]
        },
        'webrtc': {
            title: 'Real-Time WebRTC Video & Live Chat Platform [5 Interactive Views]',
            caption: 'Ultra-low latency (0.8ms) peer-to-peer audio/video streaming, custom WebSocket signaling, screen sharing, ICE network diagnostics, and end-to-end encrypted messaging.',
            slides: [
                {
                    src: 'assets/images/projects/webrtc/desktop.png',
                    device: '01. Active 1-on-1 Video Conference Room (1080p 60FPS)',
                    desc: 'High-definition peer-to-peer video streaming featuring real-time Opus 48kHz audio telemetry, floating glassmorphic media dock, and encrypted WebSocket signaling.'
                },
                {
                    src: 'assets/images/projects/webrtc/02_screenshare_presentation.jpg',
                    device: '02. Collaborative Screen Sharing & Architecture Presentation Studio',
                    desc: 'Zero-drop SFU presentation stage displaying live technical cloud topology, collaborative laser pointer annotation, floating presenter video bubbles, and real-time code snippet chat.'
                },
                {
                    src: 'assets/images/projects/webrtc/03_chat_collaboration.jpg',
                    device: '03. Real-Time Team Chat & Collaboration Workspace',
                    desc: 'Comprehensive team communication workspace featuring threaded discussion channels, syntax-highlighted code sharing, developer presence indicators, and live WebRTC audio rooms.'
                },
                {
                    src: 'assets/images/projects/webrtc/04_network_telemetry.jpg',
                    device: '04. WebRTC Connection Diagnostics & ICE Network Telemetry HUD',
                    desc: 'Real-time engineering observability HUD displaying round-trip latency (14ms), zero packet-loss ratio, adaptive bandwidth estimation (4.8 Mbps BWE), and active STUN/TURN ICE candidate pairs.'
                },
                {
                    src: 'assets/images/projects/webrtc/05_device_settings.jpg',
                    device: '05. Media Hardware Preferences, Audio Visualizer & E2EE Verification',
                    desc: 'Hardware test center with live face-framing camera preview, real-time dBFS microphone VU meter, hardware acoustic echo cancellation (AEC3), and DTLS-SRTP 256-bit encryption fingerprints.'
                }
            ]
        },
        'school': {
            title: 'EduTab – School Management & Result Engine',
            caption: 'High-concurrency academic result engine, automated GPA calculations, report card generator, and fee ledger management.',
            slides: [
                {
                    src: 'assets/images/projects/school/dashboard.png',
                    device: 'Academic ERP Dashboard (1440×900)',
                    desc: 'Executive institutional dashboard with active student headcount, class distribution, attendance telemetry, and quick admin shortcuts.'
                },
                {
                    src: 'assets/images/projects/school/marksheet.png',
                    device: 'Official Student Marksheet & GPA Engine',
                    desc: 'Automated transcript generation calculating GPA, letter grade, total marks, subject-wise breakdowns, and official school seal.'
                },
                {
                    src: 'assets/images/projects/school/merit_list.png',
                    device: 'Automated Merit List & Ranking',
                    desc: 'Batch result calculation sorting thousands of students by total marks and GPA with instant rank determination.'
                },
                {
                    src: 'assets/images/projects/school/broadsheet.png',
                    device: 'Institutional Broadsheet Matrix',
                    desc: 'Comprehensive multi-subject tabulation sheet displaying class-wide academic performance across exam sessions.'
                },
                {
                    src: 'assets/images/projects/school/marks_entry.png',
                    device: 'High-Speed Marks Entry Ledger',
                    desc: 'Teacher grading interface featuring keyboard navigation, validation rules, and automatic calculation of continuous assessments.'
                },
                {
                    src: 'assets/images/projects/school/fees_collection.png',
                    device: 'Fees Collection & Receipt Generator',
                    desc: 'Accounts module tracking student tuition payments, automated receipt printing, and outstanding balance ledgers.'
                },
                {
                    src: 'assets/images/projects/school/public_portal.png',
                    device: 'Public Result Portal',
                    desc: 'High-concurrency public student portal for instantaneous roll/registration based exam result lookup.'
                }
            ]
        },
        'construction': {
            title: 'Kadamati ERP – Construction Operations & Logistics',
            caption: 'Heavy machinery fleet tracking, BNBC compliance inspections, daily site labor payroll, and ৳25.5 Cr contractor billing.',
            slides: [
                {
                    src: 'assets/images/projects/construction/equipment.jpeg',
                    device: 'Equipment Fleet & Machinery',
                    desc: 'Heavy machinery tracking (Tower Cranes, Excavators, Concrete Mixers) with maintenance alerts, utilization ratios, and site deployments.'
                },
                {
                    src: 'assets/images/projects/construction/quality-control.jpeg',
                    device: 'Quality Control & BNBC Audits',
                    desc: 'Field inspection schedules, BNBC structural compliance audits, defect photo documentation, and Non-Conformance Reports (NCR).'
                },
                {
                    src: 'assets/images/projects/construction/labour.jpeg',
                    device: 'Site Labour & Wage Engine',
                    desc: 'Biometric attendance tracking across 12 active sites, trade categorization, daily wage calculations, and monthly payroll disbursement.'
                },
                {
                    src: 'assets/images/projects/construction/billing.jpeg',
                    device: 'Billing, Running Bills & Cashflow',
                    desc: 'Contractor milestone disbursements, ৳25.5 Cr contract portfolio tracking, running bill approvals, and net monthly cashflow.'
                },
                {
                    src: 'assets/images/projects/construction/client-portal.jpeg',
                    device: 'Client Progress Portal',
                    desc: 'Owner-facing milestone dashboard (Green Valley Residence), architectural drawing vault, and photographic site progress updates.'
                }
            ]
        },
        'manufacturing': {
            title: 'Apex Apparel & Accessories – Garment Manufacturing ERP [97 Verified Views]',
            caption: 'Complete enterprise manufacturing execution system (MES) & ERP covering customer orders, bill of materials, raw material requisitions, dyeing batches, assembly lines, finished inventory, payroll, and corporate accounting.',
            slides: [
                {
                    src: 'assets/images/projects/manufacturing/01_Authentication_and_Dashboard/01_Login_Screen.png',
                    device: 'Login Screen [Authentication and Dashboard]',
                    desc: 'Modern, clean responsive login portal with secure authentication and company branding'
                },
                {
                    src: 'assets/images/projects/manufacturing/01_Authentication_and_Dashboard/02_Executive_Dashboard.png',
                    device: 'Executive Dashboard [Authentication and Dashboard]',
                    desc: 'Interactive ERP executive dashboard featuring analytics, live KPI cards, data tables, and quick action widgets'
                },
                {
                    src: 'assets/images/projects/manufacturing/01_Authentication_and_Dashboard/03_User_Profile.png',
                    device: 'User Profile [Authentication and Dashboard]',
                    desc: 'User personal profile overview with personal details, designation, department, and activity history'
                },
                {
                    src: 'assets/images/projects/manufacturing/01_Authentication_and_Dashboard/04_Change_Password.png',
                    device: 'Change Password [Authentication and Dashboard]',
                    desc: 'Account security and credentials update screen'
                },
                {
                    src: 'assets/images/projects/manufacturing/02_Order_Management/05_Customer_Orders_Table.png',
                    device: 'Customer Orders Table [Order Management]',
                    desc: 'Customer orders master table with PO numbers, buyer, factory, delivery deadlines, and order status'
                },
                {
                    src: 'assets/images/projects/manufacturing/02_Order_Management/06_Create_Order_Form.png',
                    device: 'Create Order Form [Order Management]',
                    desc: 'Comprehensive multi-item garment manufacturing order creation form with dynamic style, color, size and costing calculations'
                },
                {
                    src: 'assets/images/projects/manufacturing/02_Order_Management/07_Order_Details_and_Costing.png',
                    device: 'Order Details and Costing [Order Management]',
                    desc: 'Order breakdown showing line item specs, currency conversions (USD/BDT), profit margins, and work order tracking'
                },
                {
                    src: 'assets/images/projects/manufacturing/02_Order_Management/08_Edit_Order_Form.png',
                    device: 'Edit Order Form [Order Management]',
                    desc: 'Customer order modification interface'
                },
                {
                    src: 'assets/images/projects/manufacturing/02_Order_Management/10_Customer_Order_Payments_Ledger.png',
                    device: 'Customer Order Payments Ledger [Order Management]',
                    desc: 'Financial payments received and outstanding balances per customer order'
                },
                {
                    src: 'assets/images/projects/manufacturing/03_Purchase_and_Materials/11_Raw_Material_Purchases_Table.png',
                    device: 'Raw Material Purchases Table [Purchase and Materials]',
                    desc: 'Raw material procurement purchase register with supplier invoice tracking and payment statuses'
                },
                {
                    src: 'assets/images/projects/manufacturing/03_Purchase_and_Materials/12_Create_Purchase_Form.png',
                    device: 'Create Purchase Form [Purchase and Materials]',
                    desc: 'Purchase order requisition form with supplier selection, stock type warehouse routing, and account payments'
                },
                {
                    src: 'assets/images/projects/manufacturing/03_Purchase_and_Materials/13_Raw_Materials_Directory.png',
                    device: 'Raw Materials Directory [Purchase and Materials]',
                    desc: 'Raw materials catalog listing item codes, units of measurement, and current stock status'
                },
                {
                    src: 'assets/images/projects/manufacturing/04_Stock_and_Factory_Operations/14_Raw_Material_Stock_Summary.png',
                    device: 'Raw Material Stock Summary [Stock and Factory Operations]',
                    desc: 'Live warehouse stock inventory levels, re-order alerts, and material availability'
                },
                {
                    src: 'assets/images/projects/manufacturing/04_Stock_and_Factory_Operations/15_Stock_Out_History.png',
                    device: 'Stock Out History [Stock and Factory Operations]',
                    desc: 'Material consumption log issued to dyeing and production floors'
                },
                {
                    src: 'assets/images/projects/manufacturing/04_Stock_and_Factory_Operations/16_Dyeing_Factory_Work_List.png',
                    device: 'Dyeing Factory Work List [Stock and Factory Operations]',
                    desc: 'Dyeing plant workflow and active dyeing batches'
                },
                {
                    src: 'assets/images/projects/manufacturing/04_Stock_and_Factory_Operations/17_Dyeing_to_Making_Factory.png',
                    device: 'Dyeing to Making Factory [Stock and Factory Operations]',
                    desc: 'Inter-factory production transfer from dyeing mills to making and sewing floor'
                },
                {
                    src: 'assets/images/projects/manufacturing/04_Stock_and_Factory_Operations/18_Stock_to_Making_Factory_Floor.png',
                    device: 'Stock to Making Factory Floor [Stock and Factory Operations]',
                    desc: 'Warehouse raw material issues directly dispatched to assembly and trims line'
                },
                {
                    src: 'assets/images/projects/manufacturing/05_Inventory_and_Deliveries/19_Inventory_Management.png',
                    device: 'Inventory Management [Inventory and Deliveries]',
                    desc: 'Finished goods inventory tracking and export batch reconciliation'
                },
                {
                    src: 'assets/images/projects/manufacturing/05_Inventory_and_Deliveries/20_Delivered_Products_Log.png',
                    device: 'Delivered Products Log [Inventory and Deliveries]',
                    desc: 'Delivered goods dispatch register with machine and operator attribution'
                },
                {
                    src: 'assets/images/projects/manufacturing/05_Inventory_and_Deliveries/21_Delivery_Shipments_Table.png',
                    device: 'Delivery Shipments Table [Inventory and Deliveries]',
                    desc: 'Finished orders delivery log with vehicle information and delivery verification'
                },
                {
                    src: 'assets/images/projects/manufacturing/05_Inventory_and_Deliveries/22_Create_Delivery_Shipment_Form.png',
                    device: 'Create Delivery Shipment Form [Inventory and Deliveries]',
                    desc: 'Outbound logistics shipment entry form'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/23_Customer_Factories_Table.png',
                    device: 'Customer Factories Table [Customers and Vendors]',
                    desc: 'Customer apparel manufacturing factory clients directory with contact details'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/24_Create_Customer_Form.png',
                    device: 'Create Customer Form [Customers and Vendors]',
                    desc: 'Onboard new client garment factory with business profile and contact points'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/25_International_Buyers_List.png',
                    device: 'International Buyers List [Customers and Vendors]',
                    desc: 'Global brand buyer brands directory (H&M, Zara, M&S, Levi\'s)'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/26_Create_Buyer_Form.png',
                    device: 'Create Buyer Form [Customers and Vendors]',
                    desc: 'New international apparel buyer registration'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/27_Suppliers_Directory.png',
                    device: 'Suppliers Directory [Customers and Vendors]',
                    desc: 'Raw material and trim vendor directory with purchase ledgers and contact info'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/29_Create_Supplier_Payment_Form.png',
                    device: 'Create Supplier Payment Form [Customers and Vendors]',
                    desc: 'Vendor payment disbursement entry voucher'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/30_Merchandisers_Directory.png',
                    device: 'Merchandisers Directory [Customers and Vendors]',
                    desc: 'Merchandising team member directory and customer factory assignments'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/31_Create_Merchandiser_Form.png',
                    device: 'Create Merchandiser Form [Customers and Vendors]',
                    desc: 'Merchandiser onboarding form'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/32_Commercial_Export_Documents.png',
                    device: 'Commercial Export Documents [Customers and Vendors]',
                    desc: 'Commercial proforma invoice registry and banking documents'
                },
                {
                    src: 'assets/images/projects/manufacturing/06_Customers_and_Vendors/33_Create_Commercial_Document_Form.png',
                    device: 'Create Commercial Document Form [Customers and Vendors]',
                    desc: 'Proforma invoice generation for export commercial banking'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/34_Employee_Directory_Table.png',
                    device: 'Employee Directory Table [HR Attendance and Payroll]',
                    desc: 'Staff and management personnel directory with department, designation and salary details'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/35_Create_Employee_Form.png',
                    device: 'Create Employee Form [HR Attendance and Payroll]',
                    desc: 'Comprehensive employee onboarding form with personal bio, emergency contacts, blood group, NID, and compensation'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/36_Daily_Attendance_Register.png',
                    device: 'Daily Attendance Register [HR Attendance and Payroll]',
                    desc: 'Daily clock-in and clock-out attendance timesheet'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/37_Clock_In_Attendance_Form.png',
                    device: 'Clock In Attendance Form [HR Attendance and Payroll]',
                    desc: 'Manual clock-in and daily shift time recording'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/38_Leave_Applications_List.png',
                    device: 'Leave Applications List [HR Attendance and Payroll]',
                    desc: 'Employee leave requests, approvals and balance tracking'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/39_Company_Holidays_Calendar.png',
                    device: 'Company Holidays Calendar [HR Attendance and Payroll]',
                    desc: 'Annual factory holidays schedule and gazetted observances'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/40_Employee_Overtime_Register.png',
                    device: 'Employee Overtime Register [HR Attendance and Payroll]',
                    desc: 'Factory floor production overtime tracking'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/41_Create_Overtime_Form.png',
                    device: 'Create Overtime Form [HR Attendance and Payroll]',
                    desc: 'Overtime hours submission voucher'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/42_Monthly_Payroll_Salary_List.png',
                    device: 'Monthly Payroll Salary List [HR Attendance and Payroll]',
                    desc: 'Monthly staff salary disbursements and payroll records'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/43_Generate_Salary_Payroll_Form.png',
                    device: 'Generate Salary Payroll Form [HR Attendance and Payroll]',
                    desc: 'Monthly payroll generation and allowances computation'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/44_Advance_Salary_Register.png',
                    device: 'Advance Salary Register [HR Attendance and Payroll]',
                    desc: 'Employee salary advance requests and recovery status'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/45_Create_Advance_Salary_Form.png',
                    device: 'Create Advance Salary Form [HR Attendance and Payroll]',
                    desc: 'Staff salary advance approval form'
                },
                {
                    src: 'assets/images/projects/manufacturing/07_HR_Attendance_and_Payroll/46_Company_Lenders_List.png',
                    device: 'Company Lenders List [HR Attendance and Payroll]',
                    desc: 'Corporate loan lenders and financial creditors ledger'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/47_Operating_Expenses_Table.png',
                    device: 'Operating Expenses Table [Finance and Accounts]',
                    desc: 'Operating expenses ledger with categorization and account tracing'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/49_Expense_Categories_List.png',
                    device: 'Expense Categories List [Finance and Accounts]',
                    desc: 'Chart of expense categories for financial accounting'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/50_Create_Expense_Category_Form.png',
                    device: 'Create Expense Category Form [Finance and Accounts]',
                    desc: 'New expense category creation form'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/51_Bank_and_Cash_Accounts.png',
                    device: 'Bank and Cash Accounts [Finance and Accounts]',
                    desc: 'Corporate bank accounts, cash vaults, and live balances'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/52_Create_Bank_Account_Form.png',
                    device: 'Create Bank Account Form [Finance and Accounts]',
                    desc: 'Add new banking entity, branch routing, and initial capital'
                },
                {
                    src: 'assets/images/projects/manufacturing/08_Finance_and_Accounts/53_Account_Full_Transaction_History.png',
                    device: 'Account Full Transaction History [Finance and Accounts]',
                    desc: 'Bank account general ledger audit trail and transaction statement'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/54_Purchase_Analytics_Report.png',
                    device: 'Purchase Analytics Report [Reports and Analytics]',
                    desc: 'Raw material procurement analytics with date-range filters and totals'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/55_Item_Wise_Purchase_Report.png',
                    device: 'Item Wise Purchase Report [Reports and Analytics]',
                    desc: 'Itemized material purchase breakdown by units and suppliers'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/56_Supplier_Due_Report.png',
                    device: 'Supplier Due Report [Reports and Analytics]',
                    desc: 'Outstanding accounts payable statement for all suppliers'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/57_Supplier_Ledger_Statement.png',
                    device: 'Supplier Ledger Statement [Reports and Analytics]',
                    desc: 'Comprehensive debit-credit running statement per supplier'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/58_Customer_Due_Report.png',
                    device: 'Customer Due Report [Reports and Analytics]',
                    desc: 'Accounts receivable report showing customer dues and credit exposure'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/59_Customer_Ledger_Statement.png',
                    device: 'Customer Ledger Statement [Reports and Analytics]',
                    desc: 'Customer financial statement of sales, invoices, and payment receipts'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/60_Attendance_HR_Report.png',
                    device: 'Attendance HR Report [Reports and Analytics]',
                    desc: 'Monthly human resources staff attendance summary report'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/61_Operating_Expense_Report.png',
                    device: 'Operating Expense Report [Reports and Analytics]',
                    desc: 'Monthly operational overhead breakdown by category'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/62_Salary_Payroll_Report.png',
                    device: 'Salary Payroll Report [Reports and Analytics]',
                    desc: 'Corporate compensation, payroll cost and bonus reporting'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/63_Work_Order_Production_Report.png',
                    device: 'Work Order Production Report [Reports and Analytics]',
                    desc: 'Factory floor production work orders execution status'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/64_Trial_Balance_Report.png',
                    device: 'Trial Balance Report [Reports and Analytics]',
                    desc: 'Corporate double-entry accounting trial balance'
                },
                {
                    src: 'assets/images/projects/manufacturing/09_Reports_and_Analytics/65_Financial_Balance_Sheet.png',
                    device: 'Financial Balance Sheet [Reports and Analytics]',
                    desc: 'Consolidated balance sheet showing total assets, debits, credits and bank equity'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/66_Production_Departments_List.png',
                    device: 'Production Departments List [Master Components and Setup]',
                    desc: 'Organizational production and corporate departments directory'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/67_Create_Department_Form.png',
                    device: 'Create Department Form [Master Components and Setup]',
                    desc: 'Add production or management department'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/68_Staff_Designations_List.png',
                    device: 'Staff Designations List [Master Components and Setup]',
                    desc: 'Job titles, roles, and hierarchy designations'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/69_Create_Designation_Form.png',
                    device: 'Create Designation Form [Master Components and Setup]',
                    desc: 'New employee designation creation'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/70_Units_of_Measurement.png',
                    device: 'Units of Measurement [Master Components and Setup]',
                    desc: 'Units of measurement master (Pcs, Yards, Gross, Kg, Roll, Dzn, Cone)'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/71_Garment_Colors_Master.png',
                    device: 'Garment Colors Master [Master Components and Setup]',
                    desc: 'Apparel lab-dip fabric and thread color palette catalog'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/72_Create_Color_Form.png',
                    device: 'Create Color Form [Master Components and Setup]',
                    desc: 'Add new garment color shade'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/73_Apparel_Sizes_Master.png',
                    device: 'Apparel Sizes Master [Master Components and Setup]',
                    desc: 'Standardized garment sizes (S, M, L, XL, XXL, Waist 32-38)'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/74_Create_Size_Form.png',
                    device: 'Create Size Form [Master Components and Setup]',
                    desc: 'Add custom garment sizing specification'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/75_Order_Types_Master.png',
                    device: 'Order Types Master [Master Components and Setup]',
                    desc: 'Commercial contract types (Direct Export, FOB Contract, Sample Development)'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/76_Create_Order_Type_Form.png',
                    device: 'Create Order Type Form [Master Components and Setup]',
                    desc: 'Create new production order classification'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/77_Stock_Warehouses_Master.png',
                    device: 'Stock Warehouses Master [Master Components and Setup]',
                    desc: 'Physical storage facility locations and designated stock rooms'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/78_Create_Stock_Warehouse_Form.png',
                    device: 'Create Stock Warehouse Form [Master Components and Setup]',
                    desc: 'Warehouse zone creation form'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/79_Factory_Units_Dyeing_and_Making.png',
                    device: 'Factory Units Dyeing and Making [Master Components and Setup]',
                    desc: 'Production facility plants, in-house mills, and external processing partners'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/80_Create_Factory_Unit_Form.png',
                    device: 'Create Factory Unit Form [Master Components and Setup]',
                    desc: 'Factory plant setup form'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/81_Industrial_Machines_Master.png',
                    device: 'Industrial Machines Master [Master Components and Setup]',
                    desc: 'Industrial sewing, dyeing, bar-tack and finishing machinery equipment registry'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/82_Create_Machine_Form.png',
                    device: 'Create Machine Form [Master Components and Setup]',
                    desc: 'Machinery asset registration with RPM, speed, model and origin country'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/83_Machine_Production_Sections.png',
                    device: 'Machine Production Sections [Master Components and Setup]',
                    desc: 'Floor sections (Heavy Sewing, Buttoning, High Temp Dyeing, Steam Press)'
                },
                {
                    src: 'assets/images/projects/manufacturing/10_Master_Components_and_Setup/84_Create_Machine_Section_Form.png',
                    device: 'Create Machine Section Form [Master Components and Setup]',
                    desc: 'Factory floor section division'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/85_Company_Profile_Settings.png',
                    device: 'Company Profile Settings [System Settings and Roles]',
                    desc: 'Company information, corporate address, financial currency, timezone, and tax format'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/86_Branch_Offices_Directory.png',
                    device: 'Branch Offices Directory [System Settings and Roles]',
                    desc: 'Corporate branches, head office, and regional production hubs'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/87_Create_Branch_Form.png',
                    device: 'Create Branch Form [System Settings and Roles]',
                    desc: 'Add regional enterprise branch office'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/88_Terms_and_Conditions_Settings.png',
                    device: 'Terms and Conditions Settings [System Settings and Roles]',
                    desc: 'Standard manufacturing contracts, AQL quality policies, and export trade terms'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/89_User_Roles_and_Permissions.png',
                    device: 'User Roles and Permissions [System Settings and Roles]',
                    desc: 'Granular role-based access control (RBAC) security permissions list'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/90_Create_Role_Form.png',
                    device: 'Create Role Form [System Settings and Roles]',
                    desc: 'Fine-grained permission assignment matrix covering all modules and actions'
                },
                {
                    src: 'assets/images/projects/manufacturing/11_System_Settings_and_Roles/91_White_Label_Branding.png',
                    device: 'White Label Branding [System Settings and Roles]',
                    desc: 'White-label customizations for ERP system logo, favicon, portal title, and footer'
                },
                {
                    src: 'assets/images/projects/manufacturing/12_Invoices_Challans_and_Printables/92_Official_Customer_Order_Invoice.png',
                    device: 'Official Customer Order Invoice [Invoices Challans and Printables]',
                    desc: 'High-detail professional Customer Order Invoice & Costing Breakdown'
                },
                {
                    src: 'assets/images/projects/manufacturing/12_Invoices_Challans_and_Printables/93_Official_Delivery_Challan_Document.png',
                    device: 'Official Delivery Challan Document [Invoices Challans and Printables]',
                    desc: 'Official Delivery Challan & Dispatch Gate Pass with order line items and authorization signatures'
                },
                {
                    src: 'assets/images/projects/manufacturing/12_Invoices_Challans_and_Printables/94_Purchase_Invoice_Document.png',
                    device: 'Purchase Invoice Document [Invoices Challans and Printables]',
                    desc: 'Official Raw Material Purchase Invoice & Supplier Receipt voucher'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/95_Modal_Add_Raw_Material.png',
                    device: 'Modal Add Raw Material [Interactive Modals]',
                    desc: 'Interactive modal dialog for quick-adding raw materials with units and item codes'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/96_Modal_Add_Operating_Expense.png',
                    device: 'Modal Add Operating Expense [Interactive Modals]',
                    desc: 'Modal popup for immediate expense disbursement recording'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/97_Modal_Add_Company_Holiday.png',
                    device: 'Modal Add Company Holiday [Interactive Modals]',
                    desc: 'Modal form for adding official company calendar holidays'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/98_Modal_Add_Measurement_Unit.png',
                    device: 'Modal Add Measurement Unit [Interactive Modals]',
                    desc: 'Modal for registering manufacturing units of measure'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/99_Modal_Add_Lender_Account.png',
                    device: 'Modal Add Lender Account [Interactive Modals]',
                    desc: 'Financial creditor onboarding modal'
                },
                {
                    src: 'assets/images/projects/manufacturing/13_Interactive_Modals/100_Modal_Add_Terms_and_Conditions.png',
                    device: 'Modal Add Terms and Conditions [Interactive Modals]',
                    desc: 'Interactive modal for drafting trade clauses and factory policies'
                }
            ]
        },
        'pos': {
            title: 'Asian Jewellery House – Retail POS & Inventory ERP',
            caption: 'High-value jewelry retail POS terminal featuring real-time daily gold rate telemetry, barcode scanner integration, split-payment checkout, and thermal sale memos.',
            slides: [
                {
                    src: 'assets/images/projects/pos/04_pos_cart_active.png',
                    device: 'Active POS Terminal & Cart Ledger',
                    desc: 'Real-time retail counter terminal with active cart, making charges calculation, dynamic tax, and instant discount adjustments.'
                },
                {
                    src: 'assets/images/projects/pos/03_pos_terminal.png',
                    device: 'Touch POS Terminal Interface',
                    desc: 'Fast touch-enabled product grid with category filters, rapid barcode scanning, and cashier shortcut controls.'
                },
                {
                    src: 'assets/images/projects/pos/05_pos_checkout_modal.png',
                    device: 'Multi-Payment Checkout Modal',
                    desc: 'Split-payment modal supporting cash, credit card, and mobile banking with automated change calculation.'
                },
                {
                    src: 'assets/images/projects/pos/07_pos_gold_rate_modal.png',
                    device: 'Dynamic Gold & Silver Rate Telemetry Modal',
                    desc: 'Real-time per-gram gold rate configurator (24K, 22K, 21K, 18K) updating product pricing instantly storewide.'
                },
                {
                    src: 'assets/images/projects/pos/06_pos_customer_modal.png',
                    device: 'Customer Registration & Credit Ledger',
                    desc: 'Quick in-modal customer KYC capture with phone number search and historical purchase tracking.'
                },
                {
                    src: 'assets/images/projects/pos/02_dashboard_overview.png',
                    device: 'Executive POS Operations Dashboard',
                    desc: 'Real-time sales velocity, daily cash register balance, inventory turnover metrics, and fast administrative shortcuts.'
                },
                {
                    src: 'assets/images/projects/pos/08_sales_list.png',
                    device: 'Sales Transaction Master Ledger',
                    desc: 'Audited sales transaction pipeline with date filtering, payment status chips, customer details, and invoice downloads.'
                },
                {
                    src: 'assets/images/projects/pos/09_sale_details_view.png',
                    device: 'Sale Details & Karat Breakdown View',
                    desc: 'Granular invoice audit view with itemized gross weight, net gold weight, stone deduction, making charge, and VAT.'
                },
                {
                    src: 'assets/images/projects/pos/10_sale_invoice_memo.png',
                    device: 'Official Printable Sale Memo Receipt',
                    desc: 'Customer-ready sale memo and thermal invoice formatted for high-precision jewelry retail compliance.'
                },
                {
                    src: 'assets/images/projects/pos/16_products_catalog_list.png',
                    device: 'Jewellery Products Catalog & Stock Ledger',
                    desc: 'Comprehensive inventory list with product images, barcode serials, metal karat categories, and live branch stock.'
                },
                {
                    src: 'assets/images/projects/pos/19_product_barcode_labels.png',
                    device: 'Thermal Barcode Tag Generator',
                    desc: 'Automated jewelry tag barcode generation for thermal label printers with price, karat code, and serial number.'
                }
            ]
        },
        'courier': {
            title: 'Automated Courier & Logistics Dispatch Engine',
            caption: 'High-throughput order dispatching, dynamic vehicle routing, GPS vehicle telemetry, and real-time delivery status updates.',
            slides: [
                {
                    src: 'assets/images/projects/courier/desktop.png',
                    device: 'Dispatcher Control Room (1920×1080)',
                    desc: 'Interactive GIS delivery map with GPS courier telemetry, fleet SLA metrics (99.4%), and automated parcel dispatch queue.'
                }
            ]
        },
        'multivendor': {
            title: 'Enterprise Multi-Vendor E-Commerce Platform & Marketplace [5 Interactive Views]',
            caption: 'Scalable marketplace architecture featuring vendor store management, catalog moderation, automated 8.5% commission splits, multi-vendor split cart checkout, and multi-currency payout ledger.',
            slides: [
                {
                    src: 'assets/images/projects/multivendor/desktop.png',
                    device: '01. Marketplace Operations Center & GMV Telemetry',
                    desc: 'Executive mission control tracking platform-wide GMV ($1.82M), active merchant storefronts (412 stores), live order velocity, and platform revenue trajectory.'
                },
                {
                    src: 'assets/images/projects/multivendor/02_vendor_merchant_portal.jpg',
                    device: '02. Vendor Merchant Portal & SKU Catalog Manager',
                    desc: 'Dedicated merchant back-office for Apex Tech Gear displaying monthly sales ($48,250), SKU inventory stock alerts, tiered pricing, and automated 8.5% platform commission calculation.'
                },
                {
                    src: 'assets/images/projects/multivendor/03_split_cart_checkout.jpg',
                    device: '03. Multi-Vendor Split Cart & Automated Logistics Checkout',
                    desc: 'Unified customer checkout interface splitting orders across multiple vendor warehouses with separate courier logistics, automated tax calculation, and tokenized bKash / Stripe payments.'
                },
                {
                    src: 'assets/images/projects/multivendor/04_commission_payout_ledger.jpg',
                    device: '04. Automated Commission Ledger & Merchant Settlement Engine',
                    desc: 'Audited financial disbursement ledger reconciling gross sales, automated 8.5% platform commission deductions, gateway fees, and automated bulk payouts via Stripe Connect & bKash.'
                },
                {
                    src: 'assets/images/projects/multivendor/05_marketplace_storefront.jpg',
                    device: '05. Consumer Marketplace Discovery Storefront & Flash Deals',
                    desc: 'High-converting customer shopping portal showcasing 400+ curated independent merchant brands, search filters, verified customer reviews, and unified cart synchronization.'
                }
            ]
        },
        'invoice': {
            title: 'Automated Invoice Generator & Billing Management System',
            caption: 'Enterprise financial management platform with multi-step invoice wizard, real-time tax calculation, printable PDF documents, and client ledger.',
            slides: [
                {
                    src: 'assets/images/projects/invoice/04_dashboard_overview.png',
                    device: 'Financial & Invoice Overview Dashboard',
                    desc: 'Real-time billing analytics, revenue flow, overdue invoice alerts, and fast navigation to billing workflows.'
                },
                {
                    src: 'assets/images/projects/invoice/05_invoices_ledger_table.png',
                    device: 'Invoices Master Ledger & Status Pipeline',
                    desc: 'Comprehensive invoice register with paid/pending status tags, search filters, and quick action menus.'
                },
                {
                    src: 'assets/images/projects/invoice/06_modal_invoice_detail_view.png',
                    device: 'Detailed Invoice Breakdown Modal',
                    desc: 'Line-item audit modal with itemized descriptions, quantity, unit pricing, discounts, and tax computation.'
                },
                {
                    src: 'assets/images/projects/invoice/08_invoice_wizard_step1_metadata.png',
                    device: 'Creation Wizard: Step 1 (Metadata & Due Dates)',
                    desc: 'Issue dates, due dates, currency selection, custom purchase order numbers, and invoice numbering scheme.'
                },
                {
                    src: 'assets/images/projects/invoice/09_invoice_wizard_step2_customer.png',
                    device: 'Creation Wizard: Step 2 (Client & Billing Details)',
                    desc: 'Typeahead customer search, auto-filled billing addresses, tax registration numbers, and client notes.'
                },
                {
                    src: 'assets/images/projects/invoice/10_invoice_wizard_step3_products_table.png',
                    device: 'Creation Wizard: Step 3 (Products & Line Items)',
                    desc: 'Dynamic product row additions, automatic subtotal calculations, and customizable tax rates.'
                },
                {
                    src: 'assets/images/projects/invoice/11_invoice_wizard_step4_finalize.png',
                    device: 'Creation Wizard: Step 4 (Final Review & Discounts)',
                    desc: 'Review summary, discount applications, shipping fees, terms and conditions, and instant publishing.'
                },
                {
                    src: 'assets/images/projects/invoice/12_printable_invoice_paper_document.png',
                    device: 'Official Printable Paper Invoice Document',
                    desc: 'High-fidelity formatted invoice ready for print, PDF export, and verified corporate client distribution.'
                },
                {
                    src: 'assets/images/projects/invoice/15_client_profile_360_offcanvas.png',
                    device: 'Client 360° Profile & Transaction Drawer',
                    desc: 'Slide-out client directory showing lifetime value, outstanding balance, and full invoice transaction history.'
                },
                {
                    src: 'assets/images/projects/invoice/22_financial_tax_reports.png',
                    device: 'Financial Tax & Revenue Reports',
                    desc: 'Automated VAT/Tax breakdown, monthly collection reports, and exportable financial audits.'
                }
            ]
        }
    };

    // Elements
    const modal = document.getElementById('project-gallery-modal');
    if (!modal) return;

    const container = document.getElementById('gallery-container') || modal.querySelector('.gallery-container');
    const backdrop = document.getElementById('gallery-backdrop');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    const viewmodeBtn = document.getElementById('gallery-viewmode-btn');
    const viewmodeLabel = document.getElementById('gallery-viewmode-label');
    const fullscreenBtn = document.getElementById('gallery-fullscreen-btn');
    const openRawBtn = document.getElementById('gallery-open-raw');
    const titleEl = document.getElementById('gallery-title');
    const deviceBadgeEl = document.getElementById('gallery-device-badge');
    const counterEl = document.getElementById('gallery-counter');
    const mainImg = document.getElementById('gallery-main-img');
    const slideWrap = document.getElementById('gallery-slide-wrap');
    const scrollHintEl = document.getElementById('gallery-scroll-hint');
    const captionEl = document.getElementById('gallery-caption');
    const thumbnailsWrap = document.getElementById('gallery-thumbnails');

    let currentProjectKey = 'inventory-pos';
    let renderedProjectKey = null;
    let currentSlideIdx = 0;
    let isFitMode = true;
    let touchStartX = 0;
    let touchEndX = 0;

    // Auto-detect image aspect ratio for full-width responsive view
    function updateImageAspect() {
        if (!mainImg || !mainImg.naturalWidth) return;
        // Only offer full-width scroll mode if it's an ultra-tall capture and wide enough (e.g. desktop full-page)
        const isScrollableCapture = (mainImg.naturalHeight > mainImg.naturalWidth * 1.3) && (mainImg.naturalWidth >= 700);
        if (isScrollableCapture) {
            if (viewmodeBtn) viewmodeBtn.style.display = 'inline-flex';
            if (isFitMode) {
                mainImg.classList.add('is-fit-mode');
                mainImg.classList.remove('is-scroll-mode', 'is-tall-capture');
                if (slideWrap) slideWrap.classList.remove('has-scroll-mode');
                if (scrollHintEl) scrollHintEl.style.display = 'none';
                if (viewmodeLabel) viewmodeLabel.textContent = 'Full Width';
            } else {
                mainImg.classList.remove('is-fit-mode');
                mainImg.classList.add('is-scroll-mode');
                if (slideWrap) slideWrap.classList.add('has-scroll-mode');
                if (scrollHintEl) scrollHintEl.style.display = 'inline-flex';
                if (viewmodeLabel) viewmodeLabel.textContent = 'Fit Height';
            }
        } else {
            mainImg.classList.add('is-fit-mode');
            mainImg.classList.remove('is-scroll-mode', 'is-tall-capture');
            if (slideWrap) slideWrap.classList.remove('has-scroll-mode');
            if (scrollHintEl) scrollHintEl.style.display = 'none';
            if (viewmodeBtn) viewmodeBtn.style.display = 'none';
        }
        if (slideWrap) slideWrap.scrollTop = 0;
    }

    if (mainImg) {
        mainImg.onload = updateImageAspect;
    }

    // Toggle View Mode (Full Width Scrollable vs Fit Screen)
    function toggleViewMode() {
        isFitMode = !isFitMode;
        updateImageAspect();
    }

    // Toggle Fullscreen
    function toggleFullscreen() {
        if (container) {
            container.classList.toggle('is-fullscreen');
        }
        if (!document.fullscreenElement) {
            if (modal.requestFullscreen) {
                modal.requestFullscreen().catch(() => {});
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        }
    }

    // Open Gallery
    function openGallery(projectKey, initialSlideIdx = 0) {
        if (!galleryData[projectKey]) {
            projectKey = 'inventory-pos';
        }
        currentProjectKey = projectKey;
        const totalSlides = (galleryData[projectKey].slides || []).length;
        const targetIdx = parseInt(initialSlideIdx, 10);
        currentSlideIdx = (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < totalSlides) ? targetIdx : 0;
        isFitMode = true; // Always fit by default to preserve original aspect ratio and prevent clipping

        renderGalleryUI();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close Gallery
    function closeGallery() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (container) container.classList.remove('is-fullscreen');
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
        document.body.style.overflow = '';
    }

    // Render Current Slide & Thumbnails
    function renderGalleryUI() {
        const project = galleryData[currentProjectKey];
        const slides = project.slides;
        const currentSlide = slides[currentSlideIdx];

        // Clean project title: remove redundant "[23 Production Views]"
        const cleanTitle = (project.title || '').replace(/\s*\[\d+\s+[^\]]+\]/g, '').trim();
        titleEl.textContent = cleanTitle;
        titleEl.title = project.title;

        // Clean slide device label: remove leading number "01. " and trailing raw resolution "(2160×11709)"
        const rawDevice = currentSlide.device || '';
        const cleanDevice = rawDevice.replace(/^\d+[\.\s\-]+/, '').replace(/\s*\(\d+×\d+\)/, '').trim();
        deviceBadgeEl.textContent = cleanDevice;
        deviceBadgeEl.title = rawDevice;

        const padNum = (n) => (n < 10 ? '0' + n : n);
        counterEl.textContent = `${padNum(currentSlideIdx + 1)} / ${padNum(slides.length)}`;
        captionEl.textContent = currentSlide.desc;
        if (openRawBtn) openRawBtn.href = currentSlide.src;

        // Image Transition
        mainImg.classList.add('fade-out');
        setTimeout(() => {
            mainImg.src = currentSlide.src;
            mainImg.alt = `${project.title} - ${currentSlide.device}`;
            mainImg.classList.remove('fade-out');
            if (mainImg.complete) {
                updateImageAspect();
            }
        }, 120);

        // Render Thumbnails (Optimized for up to 100+ views)
        if (renderedProjectKey !== currentProjectKey) {
            thumbnailsWrap.innerHTML = '';
            slides.forEach((s, idx) => {
                const thumbBtn = document.createElement('button');
                thumbBtn.className = `gallery-thumb-btn ${idx === currentSlideIdx ? 'active' : ''}`;
                thumbBtn.setAttribute('aria-label', `View ${s.device}`);
                thumbBtn.dataset.idx = idx;
                
                const thumbImg = document.createElement('img');
                thumbImg.src = s.src;
                thumbImg.alt = s.device;
                thumbImg.loading = 'lazy';
                
                const thumbLabel = document.createElement('span');
                thumbLabel.className = 'thumb-device-label';
                thumbLabel.textContent = `${idx + 1}`;

                thumbBtn.appendChild(thumbImg);
                thumbBtn.appendChild(thumbLabel);

                thumbBtn.addEventListener('click', () => {
                    currentSlideIdx = idx;
                    renderGalleryUI();
                });

                thumbnailsWrap.appendChild(thumbBtn);
            });
            renderedProjectKey = currentProjectKey;
        } else {
            const allThumbs = thumbnailsWrap.querySelectorAll('.gallery-thumb-btn');
            allThumbs.forEach((tb, i) => {
                if (i === currentSlideIdx) {
                    tb.classList.add('active');
                    tb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    tb.classList.remove('active');
                }
            });
        }
    }

    // Slide Controls
    function nextSlide() {
        const slides = galleryData[currentProjectKey].slides;
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        renderGalleryUI();
    }

    function prevSlide() {
        const slides = galleryData[currentProjectKey].slides;
        currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
        renderGalleryUI();
    }

    // Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (backdrop) backdrop.addEventListener('click', closeGallery);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (viewmodeBtn) viewmodeBtn.addEventListener('click', toggleViewMode);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        if (e.key === 'v' || e.key === 'V') toggleViewMode();
    });

    // Touch Swipe Gestures
    const stage = document.querySelector('.gallery-stage');
    if (stage) {
        stage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
            if (diff < 0) {
                nextSlide(); // Swipe Left -> Next
            } else {
                prevSlide(); // Swipe Right -> Prev
            }
        }
    }

    // Attach click events to all trigger buttons & project preview boxes
    document.addEventListener('DOMContentLoaded', () => {
        const triggers = document.querySelectorAll('[data-gallery-trigger]');
        triggers.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const key = btn.getAttribute('data-gallery-trigger') || 'inventory-pos';
                const slideIdx = parseInt(btn.getAttribute('data-slide-index') || '0', 10);
                openGallery(key, isNaN(slideIdx) ? 0 : slideIdx);
            });
        });
    });

    // Expose openGallery globally if needed
    window.openProjectGallery = openGallery;
})();
