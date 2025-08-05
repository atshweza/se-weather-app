import { publicIpv4 } from 'public-ip';

import { appConfig } from '@/utils/configs';
import getPastThreeDates from '@/utils/getPastThreeDates';

export async function GET() {
  const ip = await publicIpv4();

  if (!appConfig.apiKey) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const options = { method: 'GET' };
    const dates = getPastThreeDates();
    const results: unknown[] = [];

    for (const date of dates) {
      const url = `${appConfig.apiWeatherBaseUrl}/v1/history.json?key=${appConfig.apiKey}&q=${ip}&dt=${date}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        return new Response(`Failed to fetch weather for ${date}`, { status: response.status });
      }

      const data = await response.json();
      results.push(data);
    }

    return Response.json(results);
  } catch (error) {
    return new Response(`Something went wrong fetching weather`, { status: 500 });
  }
}
