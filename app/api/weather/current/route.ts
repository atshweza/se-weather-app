import { headers } from 'next/headers';

import { appConfig } from '@/utils/configs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchLocation = searchParams.get('q');
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for');

  let locationQuery = ip;
  if (searchLocation) locationQuery = searchLocation;
  try {
    const options = {
      method: 'GET',
    };
    if (!appConfig.apiKey) return new Response('Authorized', { status: 404 });

    const url = `${appConfig.apiWeatherBaseUrl}/v1/current.json?key=${appConfig.apiKey}&q=${locationQuery}&aqi=no&alerts=no`;

    const response = await fetch(url, options);

    if (!response.ok) {
      return new Response('Failed to fetch weather', { status: response.status });
    }
    const result = (await response.json()) as CurrentResponse;
    return Response.json(result);
  } catch (error) {
    return new Response(`Something went wrong fetching Weather`, { status: 500 });
  }
}
