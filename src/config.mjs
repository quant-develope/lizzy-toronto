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
  hours: 'Open around the clock, by phone or WhatsApp',
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
    text: 'Phone us when the driveway disappears under snow. The crew opens it edge to edge, scrapes the packed tracks and leaves bare pavement behind.',
    icon: 'truck',
    ornament: 'driveway',
  },
  {
    id: 'car-dig-out',
    title: 'Car Dig-Out',
    text: 'Parked on the street and buried overnight? We sweep the roof and windows, unpack the tires and shovel a runway to the street.',
    icon: 'snow',
    ornament: 'car-brush',
  },
  {
    id: 'walkways',
    title: 'Sidewalks & Walkways',
    text: 'A clean, safe path from the curb to your door: the public sidewalk, the front walk and the porch, cleared by hand with square edges.',
    icon: 'shovel',
    ornament: 'walkway',
  },
  {
    id: 'salting',
    title: 'Salting & De-Icing',
    text: 'Steps, ramps and walks treated after clearing, with regular salt or a gentler melt for pets and fresh concrete, so guests stay on their feet.',
    icon: 'drop',
    ornament: 'salting',
  },
  {
    id: 'roof',
    title: 'Roofs & Ice Dams',
    text: 'Weight taken off the roof before it leaks: snow pulled from the lower slope, icicles brought down over doors and drain paths opened in the ice at the eaves.',
    icon: 'house',
    ornament: 'roof',
  },
  {
    id: 'windrow',
    title: 'Windrow Clearing',
    text: 'The frozen wall the municipal plow leaves across your driveway mouth, chopped up and carried off so you are not trapped at home.',
    icon: 'road',
    ornament: 'car',
  },
  {
    id: 'flat-roofs',
    title: 'Flat Roofs, Decks & Balconies',
    text: 'Garage tops, rooftop terraces and condo balconies shovelled manually using plastic tools, with a fine layer of snow left to protect the surface.',
    icon: 'building',
  },
  {
    id: 'ice',
    title: 'Ice Removal',
    text: 'Glazed ruts and frozen slush chipped off the walk and driveway, then treated, so the ground under your boots is grippy again.',
    icon: 'snow',
  },
  {
    id: 'hauling',
    title: 'Commercial Lots & Snow Hauling',
    text: 'Store fronts, small plazas and building lots opened up for customers, and the banks trucked off site once there is no room to stack them.',
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
  { img: 'job-driveway', caption: 'Asphalt showing again', alt: 'Driveway next to a brick home after snow and ice were removed' },
  { img: 'job-walkway', caption: 'Front path opened to the door', alt: 'Shovelled path leading to the front door of a brick house in Toronto' },
  { img: 'job-flat-roof', caption: 'Weight off a flat roof', alt: 'Flat roof behind a row of Toronto homes with the heavy snow shovelled off' },
  { img: 'job-roof-deck', caption: 'Rooftop terrace usable again', alt: 'Rooftop terrace by a door with snow cleared away at night' },
  { img: 'job-roof-ledge', caption: 'Narrow roof ledge done by hand', alt: 'Snow shovel resting on a narrow roof ledge cleared beside a brick wall' },
  { img: 'winter-icicles', caption: 'Icicles we are called about', alt: 'Long icicles along a snow-covered gutter' },
];
