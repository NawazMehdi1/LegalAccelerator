import { NextApiRequest, NextApiResponse } from 'next';

type Answer = {
  id: string;
  question: string;
  answer: string;
};

type Answers = {
  [key: string]: Answer;
};

interface ReformRequest extends NextApiRequest {
  body: {
    type: string;
    id: string;
    occurred_at: string;
    payload: {
      form: {
        id: string;
        created_at: string;
        name: string;
        status: string;
        link: string;
      };
      submission: {
        id: string;
        created_at: string;
        answers: Answers;
      };
    };
  };
}

const getDynamicData = (answers?: Answers) => {
  return Object.entries(answers || {}).reduce((acc, entry) => {
    const [k, v] = entry;
    return {
      ...acc,
      [k]: v,
    };
  }, {});
};

const handler = async (req: ReformRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('REQUEST_BODY:', JSON.stringify(req?.body));
    if (req.body?.type === 'form.submitted') {
      console.log('ANSWERS:', JSON.stringify(req.body?.payload?.submission?.answers));
      const answers = getDynamicData(req.body?.payload?.submission?.answers);
      console.log('MAPPED_ANSWERS:', JSON.stringify(answers));
      try {
        console.log('EMAIL_SERVICE_URL:', `${process.env.NEXT_PUBLIC_URL}api/mailer`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/mailer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers }),
        });
        if (response.status === 200) {
          console.log('RESPONSE GOOD:', response.status);
          return res.status(200).json({ message: 'ok' });
        }
        console.log('RESPONSE BAD:', response.status);
        return res.status(500).json(response);
      } catch (error: unknown) {
        console.log('CHATCHED AN ERROR:', error);
        return res.status(500).json({ error: JSON.stringify(error) });
      }
    }
    console.log('INVALID_TYPE:', req.body?.type);
    return res.status(500).json(req.body);
  }
  console.log('UNKNOWN_METHOD:', req.method);
};

export default handler;
