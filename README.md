# Log House Restaurant

Auto-generated website for Log House Restaurant — North Indian restaurant, Baner Rd, Baner, Pune, Maharashtra 411069.

## Tech Stack

- **backend**: Spring Boot 3.x + Spring Data JPA + Spring Security
- **hosting**: AWS App Runner (backend) + Vercel (frontend)
- **payment**: Razorpay
- **database**: PostgreSQL
- **frontend**: React 19 + Tailwind CSS + Shadcn/UI

## Features

- Mobile-First Responsive Design
- Interactive Digital Menu with High-Quality Images
- Online Ordering System with Cart and Checkout
- Razorpay Payment Gateway Integration
- Real-time Table Reservation System
- Clear Display of Address, Phone Number, and Opening Hours
- Embedded Google Map

## Running Locally

```bash
docker-compose up --build
```

The app will be available at http://localhost:8080

## Development

**Backend:**
```bash
cd backend && mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend && npm install && npm run dev
```
