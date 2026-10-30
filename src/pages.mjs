import { site, services, cities, partners, gallery } from './config.mjs';
import { guides } from './guides.mjs';
import { page, esc, icon } from './layout.mjs';

const pic = (name, alt, { eager = false, cls = '', dir = 'work' } = {}) =>
  `<picture><source type="image/webp" srcset="/assets/img/${dir}/${name}.webp"><img class="${cls}" src="/assets/img/${dir}/${name}.jpg" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;

// Small gold ornament between two lines, used above section titles.
const flourish = () =>
  `<span class="flourish" aria-hidden="true"><svg viewBox="0 0 24 30"><path d="M12 0v5" stroke="currentColor" stroke-width="1.2"/><rect x="8.5" y="5" width="7" height="4" rx="1" fill="currentColor"/><circle cx="12" cy="19" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 13.5v11M7.2 16.2l9.6 5.6M7.2 21.8l9.6-5.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span>`;

// Soft golden out-of-focus lights, like the tree lights in the hero photo (see .bokeh in main.css).
const bokeh = () => `<div class="bokeh" aria-hidden="true">${'<i></i>'.repeat(14)}</div>`;

// A glass Christmas ornament hanging on a gold string, with a snow removal scene inside.
const bauble = (s) => `
      <div class="bauble"><span class="bauble-cap"></span><div class="bauble-glass">${pic(s.ornament, `${s.title}: miniature crew inside a glass Christmas ornament`, { dir: 'ornaments' })}</div></div>`;

const moreSection = () => `
<section id="more" class="section more-section" aria-labelledby="more-title">
  <div class="container">
    <p class="kicker center reveal">${flourish()} Our partners</p>
    <div class="more-grid">
      <a class="more-card reveal" href="${site.lightsUrl}" target="_blank" rel="noopener" data-track="lights_click">
        <div class="more-photo">${pic('lights-holiday-mix', 'House outlined with permanent multicolour holiday lights')}</div>
        <div class="more-copy">
          <span class="more-brand">Partner · Year-round roofline lights</span>
          <h2 id="more-title">Make the house glow <span class="lights-text">like the tree inside</span></h2>
          <p>A discreet LED channel along the eaves that you program from an app: festive colours for December, soft white for the rest of the year.</p>
          <span class="btn btn-lights">Visit the lights site <span aria-hidden="true">→</span></span>
        </div>
      </a>
      <a class="more-card more-gutters reveal" href="${site.guttersUrl}" target="_blank" rel="noopener" data-track="gutters_click">
        <div class="more-photo">${pic('winter-icicles', 'Icicles hanging from a clogged gutter under heavy snow')}</div>
        <div class="more-copy">
          <span class="more-brand">Partner · Eavestrough care</span>
          <h2>Long icicles at the eaves <span class="grad-text">start in the gutter</span></h2>
          <p>Eavestroughs flushed, resealed and fitted with leaf guards, so melting snow runs off instead of freezing at the roof edge.</p>
          <span class="btn btn-ice">Visit the gutter site <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </div>
  </div>
</section>`;

const serviceOptions = [
  'Driveway', 'Dig out my car', 'Sidewalk, front path or porch', 'Rooftop, deck or balcony',
  'Pitched roof or icicles', 'Salt / de-icing', 'Plow bank blocking the driveway', 'Business lot or hauling away', 'Something else',
];

const propertyOptions = ['Fits 1 or 2 cars', 'Fits 3 or 4 cars', 'Long or shared (5+ cars)', 'No driveway, path and steps only', 'Business or multi-unit building'];

const leadForm = () => `
<section id="quote" class="quote-section" aria-labelledby="quote-title">
  <div class="container">
    <form class="lead-form" action="/api/lead" method="post" novalidate>
      <div class="form-head">
        <h2 id="quote-title">Tell us what is buried</h2>
        <p>A few details and we phone you back with a price.</p>
      </div>
      <div class="form-grid">
        <label>Name<input name="name" autocomplete="name" required maxlength="80" placeholder="First name is fine"></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="30" placeholder="(416) 000-0000"></label>
        <label class="span-2">Address<input name="address" autocomplete="street-address" maxlength="160" placeholder="Street and number"></label>
        <label>City
          <select name="city" required>
            <option value="">Where are you?</option>
            ${cities.map((c) => `<option>${c}</option>`).join('')}
            <option>Another GTA city</option>
          </select>
        </label>
        <label>Driveway size
          <select name="property">
            <option value="">Pick one</option>
            ${propertyOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label class="span-2">What needs clearing
          <select name="service" required>
            <option value="">Pick a job</option>
            ${serviceOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label><span>Email <span class="opt">(optional)</span></span><input name="email" type="email" autocomplete="email" maxlength="120" placeholder="name@example.com"></label>
        <label><span>Anything we should know <span class="opt">(optional)</span></span><input name="message" maxlength="1500" placeholder="Car on the street, gate code, slope…"></label>
      </div>
      <input class="hp" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign">
      <input type="hidden" name="utm_term"><input type="hidden" name="gclid"><input type="hidden" name="page">
      <button class="btn btn-call btn-lg btn-block" type="submit">Send and get a price</button>
      <p class="form-status" role="status" aria-live="polite"></p>
      <p class="form-alt"><a href="tel:${site.phone.tel}" data-track="phone_click"><span class="call-word">Call </span>${site.phone.display}</a></p>
    </form>
    <div class="trust-strip reveal">
      <div class="trust-main">
        <strong>Any hour</strong>
        <span>our line answers, and crews usually pull up about an hour after you ring, all over <b>Toronto &amp; the GTA</b></span>
      </div>
      <ul class="trust-list">
        <li>${icon('shield')} Liability insurance</li>
        <li>${icon('check')} Price agreed up front</li>
        <li>${icon('clock')} Nights and weekends</li>
        <li>${icon('camera')} Finished-job photos</li>
      </ul>
    </div>
  </div>
</section>`;

const partnerItem = (p) =>
  p.logo
    ? `<li><img src="${p.logo}" alt="${esc(p.name)}" height="36" loading="lazy"></li>`
    : `<li class="wm wm-${p.style}">${esc(p.name)}</li>`;

const marquee = () => `
<section class="partners" aria-label="Where you can find us and the gear we use">
  <p class="partners-title">Listed on, and the equipment we run</p>
  <div class="marquee">
    <ul class="marquee-track">${partners.map(partnerItem).join('')}</ul>
    <ul class="marquee-track" aria-hidden="true">${partners.map(partnerItem).join('')}</ul>
  </div>
</section>`;

const faqs = [
  ['How is the price worked out?', 'Prices depend on the size of the area, how deep and heavy the snow is, and whether salt or roof work is needed. Share your address and the job, and we quote a fixed amount before the crew starts.'],
  ['How soon can someone get here?', 'Most visits start about an hour after you phone. On the busiest storm nights the queue grows, so getting in touch early helps.'],
  ['Can you free a car parked on the street?', 'Yes. We sweep it off, loosen the ice around each tire and open a route to the street. Tell us the make, colour and roughly where it is parked.'],
  ['Can you break up the ridge from the snowplow?', 'Yes, the hard ridge where your driveway meets the road can be broken up and moved during the same visit.'],
  ['Do you go up on roofs?', 'We clear flat roofs, garage tops, terraces and balconies by hand, and pull it from the bottom metre or two of pitched roofs. We also bring down icicles and open drain paths through ice at the eaves.'],
  ['Which de-icer do you use?', 'Standard rock salt by default. For pets, new concrete or interlock we bring a milder ice melt at your request.'],
  ['Do you work for businesses and buildings?', 'Yes: shops, small plazas, condo and townhouse lots, with salting and truck removal of the piles when needed.'],
  ['Where do you go?', `Toronto and the surrounding GTA, including ${cities.slice(1, 14).join(', ')}.`],
];


const pains = [
  ['warn', 'A fall at your door', 'A guest, a courier or a neighbour slips on a glazed step. Beyond the injury, the owner of the property can be asked to answer for it.'],
  ['clock', 'A missed morning', 'Overnight the plow seals the driveway with a hard, frozen bank. The meeting starts at nine and the car is still not moving.'],
  ['house', 'A stained ceiling', 'Heat from the attic melts the snow, which refreezes where the roof overhangs. Water pooling behind that ice seeps inside.'],
  ['shovel', 'A strained back', 'A full shovel of slushy snow is heavier than it looks. Shovelling is a well-known trigger for back and heart trouble every winter.'],
];

// Animated snowfall layer (pure CSS, see .snow in main.css).
const snowfall = () => `<div class="snow" aria-hidden="true">${'<i></i>'.repeat(36)}</div>`;

const home = () => {
  const body = `
<section class="hero">
  <div class="hero-bg"><picture><source srcset="/assets/img/hero-ornaments.webp" type="image/webp"><img src="/assets/img/hero-ornaments.jpg" alt="Snowy Christmas tree hung with clear glass baubles, a tiny shovelling crew inside each one" width="740" height="714" fetchpriority="high"></picture></div>
  ${bokeh()}
  ${snowfall()}
  <div class="container hero-inner">
    <p class="eyebrow reveal">${icon('snow')} Around the clock · about an hour to your door</p>
    <h1 class="reveal"><span class="h1-main">Snow Removal</span><span class="h1-sub">Toronto &amp; GTA</span></h1>
    <p class="hero-services reveal">Driveways <i>·</i> Car Dig-Out <i>·</i> Sidewalks <i>·</i> Salting <i>·</i> Roofs</p>
    <p class="hero-lead reveal">Ring or text us the moment you need help. A crew pulls up to your driveway in about an hour.</p>
    <div class="hero-ctas reveal">
      <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
      <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Price my job</a>
    </div>
    <ul class="hero-trust reveal">
      <li>${icon('shield')} Covered by insurance</li>
      <li>${icon('truck')} At your door in ~1 hour</li>
      <li>${icon('clock')} No-cost estimate</li>
    </ul>
  </div>
</section>
${leadForm()}
${marquee()}
<section class="section services" aria-labelledby="services-title">
  ${bokeh()}
  <div class="container">
    <p class="kicker center reveal">${flourish()} Our services</p>
    <h2 id="services-title" class="section-title reveal">Six jobs we are called for most</h2>
    <div class="ornament-grid">
      ${services.filter((s) => s.ornament).map((s, i) => `
      <article id="${s.id}" class="ornament-card reveal" style="--i:${i}">
        ${bauble(s)}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <a href="#quote" class="link-arrow" data-track="quote_click">Price this job <span aria-hidden="true">→</span></a>
      </article>`).join('')}
    </div>
    <p class="section-sub extra-title reveal">We also take on:</p>
    <div class="services-grid">
      ${services.filter((s) => !s.ornament).map((s) => `
      <article id="${s.id}" class="service-card reveal">
        <span class="service-icon">${icon(s.icon)}</span>
        <div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <a href="#quote" class="link-arrow" data-track="quote_click">Ask about it <span aria-hidden="true">→</span></a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section id="work" class="section work" aria-labelledby="work-title">
  <div class="container">
    <p class="kicker center reveal">${flourish()} Straight from the crew</p>
    <h2 id="work-title" class="section-title reveal">Snapshots from Toronto jobs</h2>
    <p class="section-sub reveal">Unfiltered pictures the crews took right after finishing.</p>
    <div class="work-grid">
      ${gallery.map((g) => `
      <figure class="work-item reveal">${pic(g.img, g.alt)}<figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>
<section class="section pains" aria-labelledby="pains-title">
  <div class="container">
    <p class="kicker center reveal">${flourish()} Why not leave it</p>
    <h2 id="pains-title" class="section-title reveal">What an ignored snowfall <em>costs</em></h2>
    <p class="section-sub reveal">Lake-effect storms, thaws and sudden deep freezes mean Toronto snow rarely stays soft and harmless for long.</p>
    <div class="pain-grid">
      ${pains.map(([i, t, d]) => `
      <article class="pain-card reveal">
        <span class="pain-icon">${icon(i)}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`).join('')}
    </div>
    <div class="relief reveal">
      <p><strong>Leave the shovel in the garage.</strong> Phone us, and a crew does the heavy lifting while you stay warm inside.</p>
      <a class="btn btn-call" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    </div>
  </div>
</section>
<section class="section steps-section" aria-labelledby="how-title">
  <div class="container">
    <p class="kicker center reveal">${flourish()} The process</p>
    <h2 id="how-title" class="section-title reveal">Four steps to bare pavement</h2>
    <ol class="steps">
      <li class="reveal"><span class="step-icon">${icon('phone')}</span><strong>Send the details</strong><span>By phone, WhatsApp or the form. An address plus a snapshot of the snow is ideal.</span></li>
      <li class="reveal"><span class="step-icon">${icon('check')}</span><strong>Hear the price</strong><span>You know the full amount before anyone lifts a shovel.</span></li>
      <li class="reveal"><span class="step-icon">${icon('truck')}</span><strong>The truck pulls up</strong><span>Roughly an hour on, carrying every tool and de-icer the job needs.</span></li>
      <li class="reveal"><span class="step-icon">${icon('camera')}</span><strong>Look it over</strong><span>A few photos of the result land on your phone. Payment only after you are satisfied.</span></li>
    </ol>
  </div>
</section>
${moreSection()}
<section id="faq" class="section" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title" class="section-title reveal">Before you phone us</h2>
    ${faqs.map(([q, a]) => `<details class="faq reveal"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
  </div>
</section>
<section class="final-cta">
  ${bokeh()}
  ${snowfall()}
  <div class="container">
    <span class="final-drop" aria-hidden="true"><svg viewBox="0 0 24 30"><path d="M12 0v5" stroke="currentColor" stroke-width="1.2"/><rect x="8.5" y="5" width="7" height="4" rx="1" fill="currentColor"/><circle cx="12" cy="19" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 13.5v11M7.2 16.2l9.6 5.6M7.2 21.8l9.6-5.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg></span>
    <h2 class="reveal">Buried under fresh snow tonight?</h2>
    <p class="reveal">Pick up the phone or send a WhatsApp. The estimate costs nothing, and once you call, a crew heads out to you wherever you are in ${esc(site.area)}.</p>
    <div class="hero-ctas center reveal">
      <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
      <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Price my job</a>
    </div>
  </div>
</section>`;


  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return page({
    path: '/',
    title: `Snow Removal in Toronto & GTA: Driveways, Car Dig-Out, Sidewalks, Salting, Roofs`,
    description: `Buried driveway, car or front steps in Toronto or the GTA? Ring ${site.phone.display} at any hour and a crew is usually at your address within about sixty minutes. Salting and roofs too.`,
    body,
    schema: [faqSchema],
  });
};

const guidesIndex = () =>
  page({
    path: '/guides/',
    title: `Snow Notes for Toronto Homeowners | ${site.brand}`,
    description: 'Short reads on digging out cars, holiday hosting, icicles over doorways and choosing a de-icer.',
    body: `
<section class="section article-head">
  <div class="container narrow">
    <h1>Snow notes</h1>
    <p class="section-sub left">Notes from our crews on the questions Toronto homeowners ask us most.</p>
    <ul class="guide-list">
      ${guides.map((g) => `<li><a href="/guides/${g.slug}/"><strong>${esc(g.title)}</strong><span>${esc(g.description)}</span></a></li>`).join('')}
    </ul>
  </div>
</section>`,
  });

const guidePage = (g) =>
  page({
    path: `/guides/${g.slug}/`,
    title: `${g.title} | ${site.brand}`,
    description: g.description,
    schema: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description,
      publisher: { '@type': 'Organization', name: site.brand },
    }],
    body: `
<article class="section article">
  <div class="container narrow">
    <p class="crumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a></p>
    <h1>${esc(g.title)}</h1>
    ${g.body}
    <aside class="article-cta">
      <h2>Skip the shovel?</h2>
      <p>Our crews cover every corner of Toronto and the GTA. Estimates cost nothing, and help is typically at your address roughly an hour after you ring.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="/#quote" data-track="quote_click">Price my job</a>
        <a class="btn btn-outline" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} ${site.phone.display}</a>
      </div>
    </aside>
    <p class="more-guides"><strong>Other notes:</strong> ${guides.filter((o) => o !== g).map((o) => `<a href="/guides/${o.slug}/">${esc(o.short)}</a>`).join(' · ')}</p>
  </div>
</article>`,
  });

const thankYou = () =>
  page({
    path: '/thank-you/',
    title: `Request received | ${site.brand}`,
    description: 'We have your snow removal request.',
    noindex: true,
    body: `
<section class="section thanks">
  <div class="container narrow center">
    <span class="thanks-icon">${icon('check')}</span>
    <h1>Request received, thanks!</h1>
    <p>Expect our call shortly. Can't wait for it?</p>
    <a class="btn btn-primary btn-lg" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    <p class="muted">Meanwhile, check out <a href="#more">our partners</a>.</p>
  </div>
</section>
${moreSection()}
<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead'});</script>`,
  });

const privacy = () =>
  page({
    path: '/privacy/',
    title: `Privacy Policy | ${site.brand}`,
    description: `What ${site.brand} stores when you send a request, and how to have it removed.`,
    body: `
<article class="section article">
  <div class="container narrow">
    <h1>Privacy policy</h1>
    <p>When you use this site, ${esc(site.brand)} handles any personal data under PIPEDA, Canada's federal privacy act.</p>
    <h2>Data we receive</h2>
    <p>Whatever you type into the quote form: name, phone number, street address, city, driveway size, job type, and optionally an email and a note. We also log the ad or campaign tag attached to your visit, such as the gclid value from a Google ad, to judge which ads bring in customers.</p>
    <h2>What it is used for</h2>
    <p>Calling you back, pricing the job and carrying it out. Nobody outside our team buys or receives your contact details.</p>
    <h2>Cookies and tracking</h2>
    <p>Google's advertising and analytics tags may drop cookies for statistics and ad measurement. Block them in your browser, or turn off personalised advertising at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>.</p>
    <h2>Your rights</h2>
    <p>Ask for a copy of your data or its deletion by phone at <a href="tel:${site.phone.tel}">${site.phone.display}</a> or via <a href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp</a>.</p>
  </div>
</article>`,
  });

const lightsPage = () =>
  page({
    path: '/lights/',
    title: `Roofline LED lights for Toronto homes`,
    description: 'App-controlled LED lights mounted under the eaves, from our partner in Toronto & the GTA.',
    body: `
<style>.sticky-cta, .fab-lights { display: none; } .fab-call { bottom: calc(16px + env(safe-area-inset-bottom)); } body { padding-bottom: 0; }</style>
<section class="section lights-page">
  <div class="container lights-inner">
    <div class="lights-photo">${pic('lights-holiday-mix', 'Home outlined with permanent multicolour holiday lights', { eager: true })}</div>
    <div>
      <p class="kicker">From our partner</p>
      <h1>Holiday lights that <span class="lights-text">never come down</span></h1>
      <p>Our partner fixes a slim LED channel to the fascia under your eaves. In daylight it blends in with the trim; after dark it shows any colour or pattern you pick in the app.</p>
      <ul class="check-list">
        <li>${icon('check')} Festive scenes for Christmas, Diwali, game days and more</li>
        <li>${icon('check')} Timers, scenes and voice commands in one app</li>
        <li>${icon('check')} No ladder trips in the cold to hang or remove strings</li>
        <li>${icon('check')} Most installs wrap up in one visit</li>
      </ul>
      <a class="btn btn-lights btn-xl" href="${site.lightsUrl}" data-track="lights_click">Go to the lights website <span aria-hidden="true">→</span></a>
      <p class="muted"><a href="/">← Snow removal main page</a></p>
    </div>
  </div>
  <div class="container lights-ba">
    <h2>Day and night views</h2>
    <div class="lights-ba-grid">
      <figure><div class="lights-ba-img"><span class="ba-tag">Before</span><span class="ba-tag ba-tag-after">After</span>${pic('lights-ba-1', 'Two-storey home: by day on the left, permanent lights on at night on the right')}</div><figcaption>Two floors and an attached garage</figcaption></figure>
      <figure><div class="lights-ba-img"><span class="ba-tag">Before</span><span class="ba-tag ba-tag-after">After</span>${pic('lights-ba-3', 'Home with dormers: by day on the left, permanent lights on at night on the right')}</div><figcaption>Gables with dormer windows</figcaption></figure>
    </div>
    <a class="btn btn-lights btn-lg" href="${site.lightsUrl}" data-track="lights_click">More homes with roofline lights <span aria-hidden="true">→</span></a>
  </div>
</section>`,
  });

// Opened in the same tab right after a visitor taps a call button (see main.js).
const interestedPage = () =>
  page({
    path: '/interested/',
    title: `You may be interested | ${site.brand}`,
    description: 'Roofline lights, eavestrough care and other snow jobs that pair well with your call.',
    noindex: true,
    body: `
<section class="section interested-hero">
  ${bokeh()}
  <div class="container narrow center">
    <p class="kicker center reveal">${flourish()} You may be interested</p>
    <h1 class="reveal">A few more things for a cozy winter at home</h1>
    <p class="section-sub reveal">Whether you have just spoken with us or the line was busy, have a look at what else our team and partners can handle on the same street, the same week.</p>
  </div>
</section>
${moreSection()}
<section class="section add-ons" aria-labelledby="addons-title">
  <div class="container">
    <h2 id="addons-title" class="section-title reveal">Add it to the same visit</h2>
    <p class="section-sub reveal">Mention any of these on the phone and the crew brings what it needs.</p>
    <div class="mini-ornaments">
      ${services.filter((s) => s.ornament).map((s, i) => `
      <a class="mini-ornament reveal" href="/#${s.id}" style="--i:${i}">
        ${bauble(s)}
        <span>${esc(s.title)}</span>
      </a>`).join('')}
    </div>
    <div class="relief reveal">
      <p><strong>Line was busy?</strong> Try again in a minute, or send a WhatsApp message and we reply right away.</p>
      <a class="btn btn-call" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp')} <span>WhatsApp us</span></a>
    </div>
    <p class="center muted"><a href="/">← Snow removal main page</a></p>
  </div>
</section>`,
  });

const notFound = () =>
  page({
    path: '/404',
    title: `Page not found | ${site.brand}`,
    description: 'Page not found.',
    noindex: true,
    body: `
<section class="section">
  <div class="container narrow center">
    <h1>Nothing here but fresh snow</h1>
    <p>This address leads nowhere. Perhaps a typo, or an outdated link.</p>
    <a class="btn btn-primary" href="/">Head to the main page</a>
  </div>
</section>`,
  });

export const pages = () => [
  ['index.html', home()],
  ['guides/index.html', guidesIndex()],
  ...guides.map((g) => [`guides/${g.slug}/index.html`, guidePage(g)]),
  ['thank-you/index.html', thankYou()],
  ['privacy/index.html', privacy()],
  ['lights/index.html', lightsPage()],
  ['interested/index.html', interestedPage()],
  ['404.html', notFound()],
];

export const sitemapPaths = () => ['/', '/guides/', ...guides.map((g) => `/guides/${g.slug}/`), '/privacy/'];
