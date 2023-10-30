import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { ResponseError } from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const createEmail = (answers: { [k: string]: { question: string; answer: string } }) => {
  const hashKey = Object.keys(answers).find((k) => answers[k].question === '');
  const configs = answers[hashKey as keyof typeof answers].answer.split(';').reduce(
    (acc, item) => {
      const dataRow = Buffer.from(item, 'base64').toString('ascii');

      if (dataRow.indexOf('@') !== -1) {
        return {
          ...acc,
          emails: dataRow.split(';').map((v) => {
            const [templateId, emailAddressConfig] = v.split('=');
            const internalIndicator = emailAddressConfig?.match(/\[\w+\]/)?.[0] || '[false]';
            const emailAddress = emailAddressConfig.replace(internalIndicator, '');
            return { templateId, emailAddress, isInternal: internalIndicator === '[true]' };
          }),
        };
      }

      const [k, v] = dataRow.split('.');
      return {
        ...acc,
        fields: {
          ...acc.fields,
          [k]: v,
        },
      };
    },
    {
      emails: [],
      fields: {},
    }
  );

  return configs.emails.map((item) => {
    const dynamic_template_data = Object.entries(configs.fields).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: answers[v as keyof typeof answers].answer,
      }),
      {}
    );

    return {
      templateId: item.templateId,
      from: item.emailAddress,
      personalizations: [
        {
          to: item.isInternal
            ? item.emailAddress
            : (dynamic_template_data as unknown as { email: string }).email,
          dynamic_template_data,
        },
      ],
    };
  });
};

const sendgridEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const answers = req.body?.answers;
      console.log('ANSWERS:', JSON.stringify(answers));
      if (Object.entries(answers || {}).length) {
        console.log('ANSWERS_NOT_EMPTY');
        const mails = createEmail(answers);
        console.log('EMAILS_CREATED:', JSON.stringify(mails));
        const queue = mails.map((mail) => sgMail.send(mail));
        console.log('AWAITING_EMAILS_TO_BE_SEND');
        await Promise.all(queue);
      }
      console.log('ALL_MESSAGES_DELIVERED');
      return res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.log('CHATCHED AN ERROR:', error);
      if ((error as ResponseError)?.code) {
        const { code: errorCode, response } = error as ResponseError;
        return res.status(errorCode).json(response);
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ message: 'SendGrid API call failed', error });
    }
  }
  console.log('UNKNOWN_METHOD:', req.method);
};

export default sendgridEmail;
