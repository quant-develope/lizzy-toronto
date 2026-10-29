// Site-wide settings. Change values here and rebuild (`npm run build`).
export const site = {
  brand: 'Snow Removal Toronto',
  // Production URL, used for canonical links, sitemap and structured data.
  url: 'https://lizzy-toronto.unknwn-creation.workers.dev',
  phone: { display: '(365) 360-8470', tel: '+13653608470' },
  // WhatsApp chat for the green floating button (international format, digits only).
  whatsapp: '13653608470',
  // Sister sites promoted in "You may be interested" and the garland button.
  lightsUrl: 'https://lights-toronto.unknwn-creation.workers.dev/',
  guttersUrl: 'https://gutters-toronto.unknwn-creation.workers.dev/',
  hours: 'Call or message us any time',
  area: 'Toronto & the GTA',
  // Google Tag Manager container ID, e.g. 'GTM-XXXXXXX'. Empty = no GTM.
  // Conversions are pushed to dataLayer: generate_lead, phone_click, quote_click.
  gtmId: '',
};

// Services with `ornament` are shown as glass Christmas ornaments (images in
// public/assets/img/ornaments/, .jpg + .webp); the rest are listed as extra services.
export const services = [
  {
    id: 'driveways',
    title: 'Driveways',
    text: 'Call us anytime and a crew clears your driveway down to the pavement, from single-car pads to long shared laneways.',
    icon: 'truck',
    ornament: 'driveway',
  },
  {
    id: 'car-dig-out',
    title: 'Car Dig-Out',
    text: 'Car buried after a storm? We brush it off, clear around the wheels and dig a path to the street so you can drive away.',
    icon: 'snow',
    ornament: 'car-brush',
  },
  {
    id: 'walkways',
    title: 'Sidewalks & Walkways',
    text: 'Shovelled by hand right down to the pavement: front walk, porch, steps and the city sidewalk in front of your home.',
    icon: 'shovel',
    ornament: 'walkway',
  },
  {
    id: 'salting',
    title: 'Salting & De-Icing',
    text: 'Rock salt or pet-friendly ice melt on steps, walks and driveways, so freezing rain and refreeze do not turn them into a rink.',
    icon: 'drop',
    ornament: 'salting',
  },
  {
    id: 'roof',
    title: 'Roofs & Ice Dams',
    text: 'Snow raked off sloped roofs, dangerous icicles knocked down and ice dams opened before meltwater gets into your ceiling.',
    icon: 'house',
    ornament: 'roof',
  },
  {
    id: 'windrow',
    title: 'Windrow Clearing',
    text: 'The heavy ridge of packed snow the city plow leaves at the end of your driveway is cleared, so you can get the car out.',
    icon: 'road',
    ornament: 'car',
  },
  {
    id: 'flat-roofs',
    title: 'Flat Roofs, Decks & Balconies',
    text: 'Heavy snow shovelled off flat roofs, garage roofs, rooftop decks and balconies by hand, without damaging the membrane.',
    icon: 'building',
  },
  {
    id: 'ice',
    title: 'Ice Removal',
    text: 'Packed snow and ice scraped off driveways and walkways, then salted, so you can walk to the car without slipping.',
    icon: 'snow',
  },
  {
    id: 'hauling',
    title: 'Commercial Lots & Snow Hauling',
    text: 'Parking lots, plazas and storefronts cleared, and the piles loaded and hauled away when there is nowhere left to push them.',
    icon: 'warn',
  },
];

// Service area for the form and structured data.
export const cities = [
  'Toronto', 'North York', 'Etobicoke', 'Scarborough', 'East York', 'York', 'Mississauga', 'Brampton',
  'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Burlington', 'Pickering',
  'Ajax', 'Whitby', 'Oshawa', 'Newmarket', 'Aurora', 'Milton',
];

// Partner marquee. Shown as text wordmarks; to use real logo files put
// them in public/assets/img/partners/ and set `logo: '/assets/img/partners/x.svg'`.
export const partners = [
  { name: 'Home Depot Pro', style: 'hd' },
  { name: 'HomeStars', style: 'hs' },
  { name: 'Bark', style: 'bark' },
  { name: 'Three Best Rated', style: 'tbr' },
  { name: 'Houzz', style: 'houzz' },
  { name: 'HomeAdvisor', style: 'ha' },
  { name: "Lowe's", style: 'lowes' },
  { name: 'Toro', style: 'brand' },
  { name: 'Boss Snowplow', style: 'brand' },
  { name: 'Western', style: 'brand' },
  { name: 'Ariens', style: 'brand' },
];

// Photos from real jobs in Toronto. Images live in public/assets/img/work/
// as .jpg + .webp with the same name; pass the name without extension.
export const gallery = [
  { img: 'job-driveway', caption: 'Driveway cleared and de-iced', alt: 'Long driveway beside a brick house cleared of snow and ice' },
  { img: 'job-walkway', caption: 'Front walk shovelled to the pavement', alt: 'Front walkway to a Toronto brick house shovelled clear between snowbanks' },
  { img: 'job-flat-roof', caption: 'Flat roof cleared', alt: 'Flat roof cleared of heavy snow behind Toronto houses at night' },
  { img: 'job-roof-deck', caption: 'Rooftop deck cleared', alt: 'Rooftop deck outside a door cleared of snow at night' },
  { img: 'job-roof-ledge', caption: 'Roof edge cleared by hand', alt: 'Narrow flat roof along a brick wall cleared with a snow shovel' },
  { img: 'winter-icicles', caption: 'Icicles and ice on the eaves', alt: 'Icicles hanging from a gutter under heavy snow' },
];
