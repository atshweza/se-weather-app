# 🌦️ SE Weather App

A modern weather app built with **Next.js**, **Tailwind CSS**, **Zustand**, and the WeatherAPI.com API.

## 🌐 Live Demo
# SE Weather App

[Live Link](https://se-weather-app.vercel.app/)

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
# Weather API Design Decisions

## Brief Explanation of Design Decisions and Trade-offs

When building this weather application, we had to carefully select an
API provider that met both our functional requirements and cost
limitations.

### API Choice: WeatherAPI.com vs Weatherstack

#### WeatherAPI.com

-   **Free Tier:** 1 million requests/month
-   **Features:** Current weather, 14-day forecast, historical data
-   **Trade-off:** Although the free tier has a generous 1 million
    monthly requests, heavy usage or server-side polling can quickly
    consume this allowance.

#### Weatherstack

-   **Free Tier:** 100 requests/month
-   **Features:** Current weather only (no forecast, no historical data)
-   **Trade-off:** The low request limit and missing historical/forecast
    functionality make it unsuitable for our use case.

### Why We Chose WeatherAPI.com

1.  **Feature Completeness:** Historical and forecast weather data are
    essential for the app.
2.  **Generous Free Tier:** While the 1 million/month free tier can
    still be exhausted quickly with high traffic, it's far better than
    Weatherstack's 100/month.
3.  **Developer Experience:** WeatherAPI.com offers clear documentation
    and easy integration.

### Considerations

-   **API Call Limitations:** Even with 1 million calls/month, a
    high-traffic app using server-side requests could hit the limit
    quickly.
-   **Caching Strategy:** Implemented client-side and server-side
    caching to reduce redundant API calls.
