# Serenithea Back Office App

This is the back-office application for Serenithea Hotel, a fictional hotel management platform. This dashboard allows hotel staff to manage bookings, rooms, guests, and view key metrics.

## ✨ Features

- **Dashboard:** View key metrics like sales, check-ins, and occupancy rate.
- **Bookings:** View, edit, and delete bookings.
- **Rooms:** Manage hotel rooms, including creating, editing, and deleting rooms.
- **Check-in/Check-out:** Easily manage guest check-ins and check-outs.
- **User Authentication:** Secure login for hotel staff.
- **Settings:** Update hotel-wide settings.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Backend:** [Supabase](https://supabase.io/)
- **Styling:** [Styled Components](https://styled-components.com/)
- **Data Fetching:** [React Query](https://tanstack.com/query/v5)
- **Routing:** [React Router](https://reactrouter.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Toasts/Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Bun](https://bun.sh/)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/muhendawi/serenithea-back-office-app.git
    cd serenithea-back-office-app
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Supabase URL and Key. You can find these in your Supabase project settings.

    ```env
    VITE_SUPABASE_URL="your-supabase-url"
    VITE_SUPABASE_KEY="your-supabase-key"
    ```

### Running the Application

To start the development server, run:

```bash
bun dev
```

The application will be available at `http://localhost:5173`.

## 📦 Build for Production

To build the application for production, run:

```bash
bun run build
```

This will create a `dist` folder with the production-ready files.
