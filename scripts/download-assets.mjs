import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';

fs.mkdirSync('public/images', { recursive: true });
fs.mkdirSync('public/videos', { recursive: true });

const sites = [
  { url: 'https://www.nhnad.com/', name: 'nhnad' },
  { url: 'https://plan-az.com', name: 'plan-az' },
  { url: 'https://www.365mc.co.kr/networks/index.html', name: '365mc' },
  { url: 'https://lawandadvisors.com/', name: 'lawandadvisors' },
];

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
      if ([301, 302, 307].includes(res.statusCode)) {
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let totalDownloaded = 0;

  for (const site of sites) {
    const page = await browser.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise(r => setTimeout(r, 3000));

      const assets = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll('img')]
          .map(img => ({ src: img.src || img.currentSrc, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight, type: 'image' }))
          .filter(i => i.src && !i.src.startsWith('data:') && i.w > 80);

        const vids = [...document.querySelectorAll('video source, video[src]')]
          .map(v => ({ src: v.src || v.getAttribute('src'), type: 'video' }))
          .filter(v => v.src);

        const bgImgs = [...document.querySelectorAll('*')]
          .map(el => getComputedStyle(el).backgroundImage)
          .filter(bg => bg && bg !== 'none' && bg.includes('url('))
          .map(bg => {
            const m = bg.match(/url\(["']?(.*?)["']?\)/);
            return m ? { src: m[1], type: 'bgimage' } : null;
          })
          .filter(Boolean);

        return [...imgs, ...vids, ...bgImgs];
      });

      console.log(`[${site.name}] Found ${assets.length} assets`);

      let siteCount = 0;
      for (const asset of assets) {
        if (siteCount >= 8) break;
        try {
          const url = new URL(asset.src);
          const rawExt = path.extname(url.pathname).split('?')[0];
          const ext = rawExt || (asset.type === 'video' ? '.mp4' : '.jpg');
          const dir = asset.type === 'video' ? 'public/videos' : 'public/images';
          const filename = `${site.name}-${siteCount}${ext}`;
          await download(asset.src, `${dir}/${filename}`);
          siteCount++;
          totalDownloaded++;
          console.log(`  Downloaded: ${filename}`);
        } catch (e) { /* skip */ }
      }
    } catch (e) {
      console.log(`[${site.name}] Error: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nTotal downloaded: ${totalDownloaded}`);
}

main().catch(console.error);
