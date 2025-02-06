# AllRoad Invoice Management System

A web-based application that enables businesses to efficiently manage invoices, clients, delivery routes, payment methods, and financial reporting. Designed for scalability and ease of use, the system provides detailed tracking of financial transactions and automatic invoice generation.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Key Features](#key-features)
- [Technical Architecture](#technical-architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Project Purpose

The AllRoad Invoice Management System is built to streamline operations for delivery companies by automating invoice generation and providing powerful tools to manage clients, items, delivery routes, and payment tracking. The application is focused on improving efficiency and minimizing manual errors through an intuitive user interface and robust backend.

## Key Features

### Core Modules

- **User Authentication**
  - Role-based access for managers and admins.
  - Secure login/logout functionality.
  - Tracks all record modifications by the responsible manager.

- **Client Management**
  - Add, edit, and delete client profiles.
  - Store client details including company logo, address, and contact information.
  - Automatic population of client details during invoice creation.

- **Invoice Management**
  - Generate invoices with a unique numbering system: `FACMMYYYY[DeliveryCode][SequenceNumber]`.
  - Support multiple payment statuses: Paid, Unpaid, and Partially Paid.
  - Includes TVA calculation, item descriptions, and payment methods.
  - Preview and export invoices as PDFs.

- **Item/Product Management**
  - Add, update, and remove items.
  - Maintain details like unit price, description, and stock levels.

- **Delivery Route Management**
  - Manage and assign delivery routes with unique codes.
  - Link invoices to specific routes for improved tracking.

- **Payment Tracking**
  - Supports multiple payment methods (bank transfer, credit card, etc.).
  - Track partial and full payments with scheduled due dates.

### Future Enhancements

- Automated pre-invoice parsing via document scanning.
- Data analytics and insights dashboards.
- Automated reminder system for overdue payments.
- Enhanced inventory management and stock alerts.

## Technical Architecture

- **Frontend:**  
  - **Framework:** React.js  
  - **Styling:** Tailwind CSS  
  - **Features:** Interactive dashboard, dynamic forms for clients, items, invoices, and delivery routes; invoice preview and PDF generation.

- **Backend:**  
  - **Platform:** Node.js  
  - **Framework:** Express.js  
  - **Database:** PostgreSQL  
  - **Authentication:** JWT-based authentication for secure API access  
  - **Features:** RESTful API for CRUD operations, invoice PDF generation using libraries such as `pdfkit` or similar.

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/BohBOhTN/AllRoad_Invoice.git
cd AllRoad_Invoice
