# Keyword n-gram counter — Google Sheets add-on

Find repeated **1–5 word phrases** in your text. Useful for spotting over-used
phrases, checking keyword focus, and cleaning up repetitive copy.

- Analyze the **cells you select** in the sheet, or **text you paste** in the sidebar.
- Choose phrase lengths (1–5), a minimum repeat count, and optionally ignore stop-words (EN + PL).
- See the top phrases in the sidebar and write the full tables to a new sheet.

## Privacy & permissions (built to pass verification)

The add-on runs on the **current spreadsheet only** and makes **no network calls** —
nothing is sent anywhere. It uses only **non-sensitive** OAuth scopes:

- `spreadsheets.currentonly` — read the selected cells and write the results sheet.
- `script.container.ui` — show the sidebar.

Avoiding sensitive scopes (e.g. external URL fetching) keeps OAuth verification light.
A URL + meta-tag mode would require the sensitive `script.external_request` scope and a
heavier review — left for a possible v2.

## Files

```
appsscript.json  — manifest (runtime + OAuth scopes)
Code.gs          — n-gram engine + sidebar wiring + results writer
Sidebar.html     — the UI
```

## Try it in ~5 minutes (test deployment)

1. Open a Google Sheet → **Extensions → Apps Script**.
2. Paste the contents of `Code.gs` into the default `Code.gs` file.
3. **+ → HTML** → name it `Sidebar` → paste `Sidebar.html`.
4. Click the gear (Project settings) → **Show "appsscript.json"**, then paste `appsscript.json` over it.
5. Save. Reload the Sheet → menu **Keyword n-grams → Open analyzer**. Approve the scopes once.

### Faster, with clasp (optional)
```bash
npm i -g @google/clasp
clasp login
clasp create --type sheets --title "Keyword n-gram counter"
clasp push
```

## Publishing to Google Workspace Marketplace (later)

1. Create / link a **Google Cloud project** to the Apps Script project.
2. Configure the **OAuth consent screen** (app name, logo, support + privacy URLs).
3. Enable the **Google Workspace Marketplace SDK**, fill the **store listing** (name,
   description, screenshots, category), and submit.
4. Because only non-sensitive scopes are used, the review is lighter than for sensitive
   ones (no external-request justification needed).

## Author

Built by [Bartosz Koplin](https://bartoszkoplin.pl) · contact: kontakt@bartoszkoplin.pl

## License

All rights reserved. See [LICENSE](LICENSE). The source is published for transparency,
not for reuse.
