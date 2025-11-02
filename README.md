# Inventory Management System

An inventory management app with basic management capabilities for users built with React 19, NextJS 15, TailwindCSS and Prisma 

## Basic features:
- Adding new products
- Viewing products
- Analytics

The app is built using service from [Stack Auth](https://stack-auth.com/) for user authentication and management, storage is host on [NeonDB](https://neon.com/) with [Prisma](https://www.prisma.io/)

## 🚀 Quick Start

### Prerequisites

- NodeJS

## Installation

1. Clone the project from github

```bash
git clone https://github.com/thaiho110/inventory-management.git
cd inventory-management
```
2. Install dependencies

```bash
npm install
```
3. Initialize prisma
```bash
npx prisma generate
```
4. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Development

### Available Scripts

You can run:

- `npm run dev` - Starts the development server
- `npm run start` - Starts the development server
- `npm run build` - Initialize prisma and builds the app for production
- `npm run lint` - Lints the codebase
- `npm run postinstall` - Initialize prisma

### Continuous Integration

This project uses GitHub Actions for CI/CD. Every push and pull request to the main branch triggers:

- Dependency installation
- Code building process

