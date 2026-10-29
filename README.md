# Lizzy Toronto — сайт уборки снега в стиле «ёлочные шары»

Сайт уборки снега для Toronto & GTA: ночное синее небо, золотые огни, стеклянные ёлочные шары с миниатюрными бригадами внутри. Сделан на основе сайта quant-develope/Snowman-toronto (та же форма, те же каналы заявок).

Адрес: https://lizzy-toronto.unknwn-creation.workers.dev/ · телефон (365) 360-8470.

## Что где

| Что | Где |
|---|---|
| Телефон, WhatsApp, бренд, адрес сайта, GTM ID | `src/config.mjs` → `site` |
| Услуги (у первых шести поле `ornament` = картинка шара) | `src/config.mjs` → `services`, картинки — `public/assets/img/ornaments/` |
| Картинка в hero | `public/assets/img/hero-ornaments.jpg/.webp` (правая часть исходного макета) |
| Картинка для соцсетей | `public/assets/img/og-ornaments.jpg` |
| Тексты страниц, статьи | `src/pages.mjs`, `src/guides.mjs` |
| Стили / скрипты | `public/assets/css/main.css`, `public/assets/js/main.js` |

Сборка: `npm run build` → `dist/`. Нужен только Node 18+.

## Деплой на Cloudflare Workers

1. Cloudflare → Workers & Pages → Worker `lizzy-toronto` → Settings → Build → подключить репозиторий `quant-develope/lizzy-toronto` (или Create → Import a repository).
2. Ветка `main`, Root directory — пусто (корень), Build command — пусто (сборка указана в `wrangler.jsonc`), Deploy command — `npx wrangler deploy`.
3. Имя Worker берётся из `wrangler.jsonc` (`lizzy-toronto`).

## Заявки

Как у основного сайта: Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` в Settings → Variables and Secrets Worker'а `lizzy-toronto`) и Toronto CRM через service binding `CRM` → `crm-toronto1` (секреты не нужны). В Telegram в заголовке заявки виден адрес сайта, в CRM заявка приходит с полем `site` = `lizzy-toronto.unknwn-creation.workers.dev`.
