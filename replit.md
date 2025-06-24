# Sprout - Gamified Life Growth App

## Overview

Sprout is a mobile-first gamified habit tracking application that helps users build positive habits across different life categories. The app uses plant growth metaphors to visualize user progress, making habit formation engaging and rewarding. Users can track habits in health, finance, family, and personal development categories while earning XP, leveling up their virtual plant, and unlocking achievements.

## System Architecture

The application follows a full-stack TypeScript architecture with a clear separation between client and server components:

- **Frontend**: React-based single-page application (SPA) built with Vite
- **Backend**: Express.js API server with RESTful endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Deployment**: Replit-based deployment with auto-scaling

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for the Sprout theme
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for PostgreSQL with type-safe schema
- **API Design**: RESTful endpoints following standard HTTP conventions
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

### Database Schema
The application uses five main entities:
- **Users**: Profile information, XP, level, coins, and statistics
- **Categories**: Habit categories with individual progression systems
- **Habits**: Daily tasks with XP rewards and completion tracking
- **Achievements**: Unlockable badges based on user milestones
- **Goals & Rewards**: Long-term objectives and reward system

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle HTTP requests and interact with the storage layer
3. **Data Storage**: Drizzle ORM manages database operations with type safety
4. **Real-time Updates**: Optimistic updates and cache invalidation for responsive UX
5. **State Synchronization**: React Query manages client-side caching and background updates

The application implements a unidirectional data flow where user interactions trigger API calls, which update the database and invalidate cached data, causing UI re-renders with fresh data.

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Database**: Drizzle ORM, @neondatabase/serverless, connect-pg-simple
- **UI Framework**: Radix UI components, Tailwind CSS, Framer Motion
- **Development**: Vite, TypeScript, ESBuild

### Third-party Services
- **Database Hosting**: Neon PostgreSQL (serverless)
- **Deployment**: Replit with auto-scaling capabilities
- **Font Loading**: Google Fonts (Inter font family)

## Deployment Strategy

The application uses a Replit-based deployment strategy:

- **Development Mode**: `npm run dev` starts both client and server with hot reload
- **Production Build**: `npm run build` creates optimized bundles for both client and server
- **Production Server**: `npm run start` runs the production server
- **Database Migrations**: `npm run db:push` applies schema changes

The deployment is configured for auto-scaling with:
- Port 5000 for local development
- Port 80 for external access
- PostgreSQL 16 module for database support
- Node.js 20 runtime environment

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.