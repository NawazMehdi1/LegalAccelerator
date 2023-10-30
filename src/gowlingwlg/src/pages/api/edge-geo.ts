import { geolocation } from '@vercel/edge';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(request: NextRequest) {
  const { country, region } = geolocation(request);
  return NextResponse.json({ country: country, region: region });
}
