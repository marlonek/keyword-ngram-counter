# Google Workspace Marketplace listing

Copy-paste blocks for the Marketplace SDK "Store listing" and the OAuth consent screen.
Keep in sync with each release.

---

## App name
Keyword n-gram counter

## Short description (tagline)
Count repeated 1–5 word phrases in your text — a simple keyword / phrase-frequency tool.

## Category
Productivity (alt: Business Tools)

## Detailed description

Keyword n-gram counter finds how often 1-, 2-, 3-, 4- and 5-word phrases repeat in your
text — so you can spot over-used phrases, check keyword focus, and tighten repetitive copy.

HOW IT WORKS
• Analyze the cells you select in the sheet, or paste text straight into the sidebar.
• Choose which phrase lengths to count (1 to 5 words).
• Set a minimum repeat count and optionally ignore common stop-words (English + Polish).
• See the top phrases in the sidebar and write the full tables (phrase, count, %) to a new sheet.

GOOD FOR
• SEO and content editors checking keyword density and phrase repetition.
• Writers cleaning up repetitive wording.
• Anyone auditing a column of titles, descriptions or product copy in bulk.

PRIVACY FIRST
The add-on runs on the current spreadsheet only. It makes no network calls, collects no
data, uses no tracking, and sends nothing anywhere — all processing happens in your sheet.

---

## OAuth consent screen
- App name: Keyword n-gram counter
- User support email: kontakt@bartoszkoplin.pl
- App logo: store/icons/icon128.png
- Application home page: https://bartoszkoplin.pl
- Privacy policy URL: https://bartoszkoplin.pl/keyword-ngram-privacy/
- Terms of service URL: https://bartoszkoplin.pl/keyword-ngram-terms/
- Developer contact email: kontakt@bartoszkoplin.pl

## OAuth scopes (from appsscript.json) and justifications
- `.../auth/spreadsheets.currentonly`
  Reads only the cells the user selects and writes the results table to a new tab in the
  same spreadsheet the add-on is opened in. It never accesses other spreadsheets.
- `.../auth/script.container.ui`
  Shows the add-on's sidebar interface inside Google Sheets.

Both scopes are **non-sensitive**, so no sensitive/restricted-scope verification is required.

## Data usage
- Collects or transmits user data? **No.** Everything runs locally in the current
  spreadsheet; the add-on makes no network requests.

---

## Marketplace graphic assets (in store/)
- App icons: `store/icons/icon32.png`, `icon48.png`, `icon64.png`, `icon96.png`, `icon128.png`
- Screenshots (1280×800): `store/screenshots/screenshot-1.png`, `screenshot-2.png`

## Pricing / availability
- Free. Language: English. Regions: all.

---

## Publishing checklist
1. Apps Script project → link a Google Cloud project (Project Settings → GCP project number).
2. Configure the OAuth consent screen (fields above) and publish it.
3. Enable the **Google Workspace Marketplace SDK** in the Cloud project.
4. Marketplace SDK → **App Configuration**: set the Apps Script deployment, visibility (Public),
   scopes, and developer links.
5. Marketplace SDK → **Store Listing**: paste the texts above, upload icons + screenshots.
6. Submit for review. (Non-sensitive scopes → lighter review; brand/logo check still applies.)
