# Interactive Book Library

This is a simple and modern book library application built with Next.js and Tailwind CSS. The goal of this project is to provide a clean, practical way to manage a personal book collection with full CRUD functionality, smooth UI interactions, and a responsive layout.

The app focuses on clarity, usability, and real-world frontend best practices rather than unnecessary complexity.

## Features

- **Display Books**: Show books with cover images, title, author, rating, and category
- **Search & Filter**: Search books by title or author
- **CRUD Operations**: Create, Read, Update, and Delete books
- **Grid/List View**: Toggle between grid and list views for optimal browsing
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices
- **Form Validation**: Built-in validation using Zod for data integrity
- **Loading States**: Skeleton loading for better user experience
- **Error Handling**: Comprehensive error handling with retry functionality
- **Server-Side Rendering**: Fast initial page loads with Next.js SSR

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Styling**: Tailwind CSS v4 with custom configuration
- **State Management**: React Hooks
- **Data Validation**: Zod
- **Mock API**: JSON Server
- **Build Tool**: Turbopack (Next.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ChanmithK/linearsix-project.git
cd linearsix-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development servers:

```bash
# In one terminal, start the API server:
npm run dev:api

# In another terminal, start the Next.js app:
npm run dev
```

Or run both simultaneously:

```bash
npm run dev:all
```

The application will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

## Scripts

- `npm run dev`: Start the Next.js development server
- `npm run dev:api`: Start the JSON Server API
- `npm run dev:all`: Start both servers simultaneously

## Project Structure

```
linearsix/
├── app/
│   ├── page.tsx          # Main page with SSR
│   ├── client-page.tsx   # Client component with interactivity
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── book-card.tsx     # Book display in grid view
│   ├── book-row.tsx      # Book display in list view
│   ├── book-form-modal.tsx # Add/edit book form
│   ├── confirm-dialog.tsx # Delete confirmation dialog
│   ├── header-bar.tsx    # Application header with controls
│   ├── rating-stars.tsx  # Star rating component
│   ├── empty-state.tsx   # Empty state component
│   ├── book-card-skeleton.tsx # Loading skeleton for grid view
│   └── book-row-skeleton.tsx # Loading skeleton for list view
├── lib/
│   ├── api.ts            # API client functions
│   ├── types.ts          # TypeScript type definitions
│   └── validators.ts     # Zod validation schemas
├── public/               # Static assets
└── db.json               # JSON Server database
```

## API Endpoints

The application uses JSON Server as a mock backend:

- `GET /books` - Get all books
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## Environment Variables

The application uses the following environment variable:

- `NEXT_PUBLIC_API_URL` - Base URL for the API (defaults to `http://localhost:3001`)

## How to Use

1. **Browse Books**: View your collection in either grid or list format
2. **Search**: Use the search bar to filter books by title or author
3. **Add Books**: Click "Add New Book" to enter book details
4. **Edit Books**: Click "Edit" on any book to update its details
5. **Delete Books**: Click "Delete" to remove a book from your collection
6. **Toggle Views**: Switch between grid and list views using the toggle button

## Data Model

Each book has the following properties:

```typescript
interface Book {
  id: number;
  title: string; // Book title (min 2 characters)
  author: string; // Author name (min 2 characters)
  rating: number; // Rating from 0 to 5
  category: string; // Book category (min 2 characters)
  coverUrl: string; // URL to book cover image
}
```
