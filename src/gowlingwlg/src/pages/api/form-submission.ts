import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const actionUrl = req?.headers?.['x-action-url'] as string;
      await fetch(actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': req?.headers?.['content-type'] as string,
        },
        body: req.body,
      });
    } catch (error) {
      console.error('ERROR', error);
      return res.status(500).json(error);
    }
    return res.status(200).json({ message: 'ok' });
  }
  return res.status(404).json({ error: 'Method not allowed' });
};

export default handler;
