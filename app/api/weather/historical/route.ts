import { headers } from 'next/headers';

import { appConfig } from '@/utils/configs';
import getPastThreeDates from '@/utils/getPastThreeDates';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchLocation = searchParams.get('q');
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for');
  let locationQuery = ip;
  if (searchLocation) locationQuery = searchLocation;
  if (!appConfig.apiKey) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const options = { method: 'GET' };
    const dates = getPastThreeDates();
    const results: ForecastResponse[] = [];

    for (const date of dates) {
      const url = `${appConfig.apiWeatherBaseUrl}/v1/history.json?key=${appConfig.apiKey}&q=${locationQuery}&dt=${date}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        return new Response(`Failed to fetch weather for ${date}`, { status: response.status });
      }

      const data = (await response.json()) as ForecastResponse;
      results.push(data);
    }

    return Response.json(results);
  } catch (error) {
    return new Response(`Something went wrong fetching weather`, { status: 500 });
  }
}
