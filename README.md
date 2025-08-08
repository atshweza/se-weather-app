# 🌦️ SE Weather App

A modern weather app built with **Next.js**, **Tailwind CSS**, **Zustand**, and the WeatherAPI.com API.

## 🌐 Live Demo

[Live Link](#) <!-- TBA -->

---

## 📦 Features

- Current weather details 
- 3-Day Forecast & 3-Day History:
- Auto-detects user's units (Metric/Imperial)
- Responsive design for desktop & mobile
- Local caching via Zustand with 1-hour expiry
- Search for locations by city name

---

## 🛠️ Technologies

- **Next.js** – App Router
- **Tailwind CSS** – Utility-first styling
- **Zustand** – Global state management (with persistence)
- **React Query** – Data fetching & caching
- **TypeScript** – Type safety

---

## 🧪 Testing

We use **Jest** and **React Testing Library** for unit and integration testing.

### ✅ What We Test

- UI components like `WeatherDetails`,`WeatherForecast`, `SearchInput`, `WeatherSummaryCard`
- Zustand store behavior (e.g., caching, default units)
- API logic with mocked responses
- Time and formatting utilities
- Conditional rendering (e.g., loading states, error messages)

### 📁 Test File Structure

```
components/
├── WeatherDetails.tsx
├── WeatherDetails.test.tsx     # Test for component

```

### ▶️ Running Tests

```bash
npm install
npm run test
```

To run in watch mode:

```bash
npm run test:watch
```

To get test coverage:

```bash
npm run test:coverage
```


## 🌍 Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_API_WEATHER_BASE_URL='https://api.weatherapi.com'
NEXT_PUBLIC_API_KEY='Request from Owner'
```

> 🔐 Alternatively, register and use your own key from [WeatherAPI.com](https://www.weatherapi.com/).

---

## 📁 Folder Structure

```
/public
  /logo           → app logo files
/app
  /components     → reusable UI components
  /hooks          → custom React hooks
  /styles         → tailwind styles & variables
  /api            → fetcher methods (server/client)
/store            → Zustand global store
/utils            → utilities (formatting, date logic)
```

---
