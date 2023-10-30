import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const userIP = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;

    // For local development. Ip on localhost:3000 is ::1
    if (userIP === '::1') {
      return res.status(200).json({
        country: 'LV',
      });
    }

    // For prod build
    if (userIP) {
      const response = await fetch(`https://api.country.is/${userIP}`);
      const geo = await response.json();
      return res.status(200).json(geo);
    }

    return res.status(400);
  }
};

export default handler;
