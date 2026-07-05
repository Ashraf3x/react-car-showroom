# Car Showroom

Car Showroom is a car discovery and showroom platform built with React and TailwindCSS. It uses the API Ninjas Cars API to fetch real car data.

## Features
- Search and browse cars
- Filter by brand, year, fuel type, and transmission
- View detailed car specs and images
- Save favorite cars to local storage
- Light and dark mode support
- English and Arabic translations (RTL support)

## Getting Started

1. Get an API key from [API Ninjas](https://api-ninjas.com/)
2. Create a `.env` file in the root directory and add your key:
```env
VITE_API_KEY=your_api_key_here
```

3. Install dependencies and run the development server:
```bash
npm install
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## Tech Stack
- React 19
- Vite
- TailwindCSS v4
- Zustand
- React Query
- React Hook Form + Zod
- i18next

## License
MIT
