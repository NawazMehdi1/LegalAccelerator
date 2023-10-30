import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';
import core, { Page } from 'puppeteer-core';
let _page: Page;

async function getBrowser() {
  if (process.env.VERCEL) {
    return core.launch({
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  }

  return puppeteer.launch({
    headless: 'new',
    args: ['--disable-dev-shm-usage'],
  });
}

async function getPage() {
  if (_page) return _page;

  const browser = await getBrowser();
  _page = (await browser.newPage()) as Page;
  return _page;
}

export async function getPdf(path: string) {
  const page = await getPage();
  await page.goto(`${process.env.NEXT_PUBLIC_URL}/${path}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  const pdf = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: {
      left: '85px',
      right: '85px',
      top: '80px',
      bottom: '80px',
    },
  });
  return pdf;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> => {
  if (!req.query.file) return res.status(400).send('No file query specified.');

  try {
    const file = await getPdf(req.query.file as string);
    res.appendHeader('Content-Type', 'application/pdf');
    res.appendHeader('Content-Length', file.length.toString());
    res.status(200).end(file);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('The server encountered an error. You may have inputted an invalid query.');
  }
};

export default handler;
