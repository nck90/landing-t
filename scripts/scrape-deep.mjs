import puppeteer from 'puppeteer';
import fs from 'fs';

const sites = [
  { url: 'https://www.plus-ex.com/', name: 'plus-ex' },
  { url: 'https://lawandadvisors.com/', name: 'lawandadvisors' },
  { url: 'https://www.studio505.co.kr', name: 'studio505' },
  { url: 'https://plan-az.com', name: 'plan-az' },
  { url: 'https://www.365mc.co.kr/networks/index.html', name: '365mc' },
];

async function scrapeSite(browser, site) {
  const page = await browser.newPage();
  const dir = `docs/design-references/${site.name}`;
  fs.mkdirSync(dir, { recursive: true });

  console.log(`[${site.name}] Loading...`);
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise(r => setTimeout(r, 4000));
  } catch(e) {
    console.log(`[${site.name}] Load partial: ${e.message}`);
  }

  // Screenshot at load
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: `${dir}/v4-hero.png`, fullPage: false });

  // Extract interaction/animation data
  const data = await page.evaluate(() => {
    const result = {
      videos: [],
      animations: [],
      scrollBehavior: null,
      transitions: [],
      interactiveElements: [],
      sectionCount: 0,
      hasScrollSnap: false,
      hasLenis: false,
      hasGSAP: false,
      hasSwiperOrSlider: false,
      cssAnimations: [],
      keyElements: [],
    };

    // Videos
    result.videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
      width: v.videoWidth,
      height: v.videoHeight,
    }));

    // Check libraries
    result.hasLenis = !!document.querySelector('.lenis, [data-lenis]');
    result.hasGSAP = typeof window.gsap !== 'undefined';
    result.hasSwiperOrSlider = !!document.querySelector('.swiper, .slick, .splide, [class*="carousel"]');
    result.hasScrollSnap = getComputedStyle(document.documentElement).scrollSnapType !== 'none'
      || getComputedStyle(document.body).scrollSnapType !== 'none';

    // Count sections
    const main = document.querySelector('main') || document.body;
    result.sectionCount = main.children.length;

    // CSS animations on page
    const sheets = document.styleSheets;
    try {
      for (const sheet of sheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSKeyframesRule) {
              result.cssAnimations.push(rule.name);
            }
          }
        } catch(e) {}
      }
    } catch(e) {}

    // Interactive elements
    result.interactiveElements = [...document.querySelectorAll('[data-aos], [class*="animate"], [class*="reveal"], [class*="parallax"], [class*="scroll"]')]
      .slice(0, 20)
      .map(el => ({ tag: el.tagName, classes: el.className?.toString?.()?.slice(0, 150) }));

    // Key visual elements
    const heroEl = document.querySelector('section, .hero, .main-visual, [class*="hero"], [class*="visual"]');
    if (heroEl) {
      result.keyElements.push({
        name: 'hero',
        tag: heroEl.tagName,
        classes: heroEl.className?.toString?.()?.slice(0, 200),
        height: heroEl.getBoundingClientRect().height,
        bg: getComputedStyle(heroEl).backgroundColor,
        hasVideo: !!heroEl.querySelector('video'),
        hasCanvas: !!heroEl.querySelector('canvas'),
      });
    }

    return result;
  });

  console.log(`[${site.name}] Videos: ${data.videos.length}, Animations: ${data.cssAnimations.length}, ScrollSnap: ${data.hasScrollSnap}, Lenis: ${data.hasLenis}, GSAP: ${data.hasGSAP}`);

  // Scroll through and take section screenshots
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  let idx = 0;
  for (let y = 900; y < Math.min(pageHeight, 8000); y += 900) {
    await page.evaluate(sy => window.scrollTo(0, sy), y);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: `${dir}/v4-scroll-${idx}.png`, fullPage: false });
    idx++;
  }

  fs.writeFileSync(`docs/research/${site.name}/interactions.json`, JSON.stringify(data, null, 2));
  fs.mkdirSync(`docs/research/${site.name}`, { recursive: true });
  fs.writeFileSync(`docs/research/${site.name}/interactions.json`, JSON.stringify(data, null, 2));

  // Download videos if found
  if (data.videos.length > 0) {
    const videoUrls = data.videos.map(v => v.src).filter(Boolean);
    fs.writeFileSync(`docs/research/${site.name}/video-urls.json`, JSON.stringify(videoUrls, null, 2));
    console.log(`[${site.name}] Video URLs saved: ${videoUrls.length}`);
  }

  await page.close();
  return data;
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const results = {};

  for (const site of sites) {
    try {
      results[site.name] = await scrapeSite(browser, site);
    } catch(e) {
      console.log(`[${site.name}] FAILED: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\n=== SUMMARY ===');
  for (const [name, data] of Object.entries(results)) {
    console.log(`${name}: ${data.videos?.length || 0} videos, ${data.cssAnimations?.length || 0} CSS anims, snap:${data.hasScrollSnap}, lenis:${data.hasLenis}, gsap:${data.hasGSAP}`);
  }
}

main().catch(console.error);
