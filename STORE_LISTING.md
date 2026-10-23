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
It adds one spreadsheet function, =NGRAMS().
• =NGRAMS(A1:A50) — counts 2-word phrases in the range.
• =NGRAMS(A1:A50, 3) — set the phrase length (1 to 5 words).
• =NGRAMS(A1:A50, 2, 3) — only phrases that repeat at least 3 times.
• =NGRAMS(A1:A50, 2, 2, TRUE) — ignore common stop-words (English + Polish).
It returns a table (phrase, count, %) that spills into the cells, most frequent first.

GOOD FOR
• SEO and content editors checking keyword density and phrase repetition.
• Writers cleaning up repetitive wording.
• Anyone auditing a column of titles, descriptions or product copy in bulk.

PRIVACY FIRST
=NGRAMS() is a pure custom function — it only processes the values you pass to it. It
requests no permissions, makes no network calls, collects no data, and sends nothing
anywhere.

---

## OAuth consent screen
- App name: Keyword n-gram counter
- User support email: kontakt@bartoszkoplin.pl
- App logo: store/icons/icon128.png
- Application home page: https://bartoszkoplin.pl
- Privacy policy URL: https://bartoszkoplin.pl/keyword-ngram-privacy/
- Terms of service URL: https://bartoszkoplin.pl/keyword-ngram-terms/
- Developer contact email: kontakt@bartoszkoplin.pl

## OAuth scopes
- **None.** The add-on is a pure custom function (`=NGRAMS()`) and requests no OAuth scopes.
  Data Access, the Marketplace SDK App Configuration, and `appsscript.json` must all list
  **no scopes** (they must match). With no scopes, **no OAuth verification is required**.

## Data usage
- Collects or transmits user data? **No.** `=NGRAMS()` only processes the values passed to
  it; the add-on makes no network requests and requests no permissions.

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
