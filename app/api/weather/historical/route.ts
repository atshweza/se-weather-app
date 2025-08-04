import { publicIpv4 } from 'public-ip';

import { appConfig } from '@/utils/configs';
import getPastThreeDates from '@/utils/getPastThreeDates';

export async function GET() {
  const ip = await publicIpv4();
  try {
    const options = {
      method: 'GET',
    };
    const url = `${appConfig.apiWeatherBaseUrl}/current?access_key=${appConfig.apiKey}&query=${ip}&& historical_date=${getPastThreeDates}&interval=24`;
    console.log('url', url);
    const response = await fetch(url, options);

    if (!response.ok) {
      return new Response('Failed to fetch weather', { status: response.status });
    }
    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    return new Response(`Something went wrong fetching Weather`, { status: 500 });
  }
}
