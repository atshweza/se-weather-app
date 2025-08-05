import { publicIpv4 } from 'public-ip';

import { appConfig } from '@/utils/configs';

export async function GET() {
  const ip = await publicIpv4();
  try {
    const options = {
      method: 'GET',
    };
    if (!appConfig.apiKey) return new Response('Authorized', { status: 404 });

    const url = `${appConfig.apiWeatherBaseUrl}/v1/current.json?key=${appConfig.apiKey}&q=${ip}&aqi=no&alerts=no`;

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
