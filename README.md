# Keyword n-gram counter — Google Workspace Add-on

A Google Sheets add-on that counts how often **1–5 word phrases** repeat in text you paste.
Useful for spotting over-used phrases, checking keyword focus, and cleaning up repetitive copy.

Built as a **Google Workspace Add-on (CardService)**: you open it from the side panel, paste
text into a card, and see the top repeated phrases. It uses only the add-on's card UI and
computes everything from the text you paste.

## Privacy & permissions

**None.** The add-on requests **no OAuth scopes**. It does not read your spreadsheets or your
Google account, makes no network calls, and stores nothing — it only processes the text you
paste into its card. Because it needs no sensitive scopes, it requires **no OAuth verification**.

## How to use

1. Open a Google Sheet → side panel → **Keyword n-gram counter**.
2. Paste text into the card, pick the phrase length (1–5), a minimum count, and optionally
   ignore stop-words.
3. Click **Analyze** — the card shows the top repeated phrases with their counts and share (%).

## Files

```
appsscript.json  — Workspace Add-on manifest (homepage trigger; no OAuth scopes)
Code.gs          — CardService UI + the n-gram engine
```

## Try it in ~3 minutes

1. Open a Google Sheet → **Extensions → Apps Script**.
2. Paste the contents of `Code.gs` into the default `Code.gs` file (replace what is there).
3. Project settings → **Show "appsscript.json"**, then paste `appsscript.json` over it.
4. **Deploy → Test deployments → Install** → reopen the sheet → the add-on appears in the side panel.

## Publishing to Google Workspace Marketplace

1. Link a **Google Cloud project** to the Apps Script project.
2. Configure the **OAuth consent screen** (name, support + privacy URLs).
3. Enable the **Google Workspace Marketplace SDK** → App Configuration → integrate as a
   **Google Workspace Add-on** (point it to the deployment).
4. The add-on requests **no scopes**, so no OAuth verification (and no demo video) is required —
   the review is only the standard Marketplace listing review.

## Author

Built by [Bartosz Koplin](https://bartoszkoplin.pl) · contact: kontakt@bartoszkoplin.pl

## License

All rights reserved. See [LICENSE](LICENSE). The source is published for transparency,
not for reuse.
