# Gather Cute — Cost Studio (prototype)

An independent, single-page event quotation and profitability calculator.

## Review
- Source: `internal/cost-studio.html`.
- Open the HTML file in a browser (or preview on the feature branch). The tool is NOT linked from public pages.
- Defaults represent **illustrative budget allowances**, never supplier-approved prices.
- The platform fee defaults to an **unverified 19.26% assumption**; enter the actual fee from the contract.
- Owner labor = hours × hourly rate, distinct from residual business contribution.
- Contingency is excluded from available contribution.
- All changes save to localStorage on that browser/device; JSON provides portable import/export and CSV provides cost-line export.
- No backend, authentication, cloud persistence, or cross-device synchronization.

## Security boundary
**Not production-safe for confidential customer data.** The repository is public. Any file under the static deployment can be loaded by anyone who knows the URL, even without navigation links and despite robots noindex. Do not enter customer names, phone numbers, supplier negotiated prices, addresses, or other confidential information into a public-hosted build.

For a saleable multi-user back office, add authenticated routes, tenant-separated database records, role-based access, auditing, robust validation, and server-side access controls. Move the estimator behind authentication before publishing to production. External systems should not receive data unless explicitly configured.

## Suggested QA
1. Base figures: sale 35,000; fee 19.26%; cost 17,500; owner 6,000; reserve 1,500 → residual 3,259.
2. Raising supplier cost updates the residual downward.
3. Missing supplier quotations keep status CONDITIONAL.
4. Negative residual shows NO-GO.
5. JSON export, import, CSV export, add/remove cost row, reload persistence.
6. No links to the internal tool on existing public pages.

## Next stage
Implement a protected backend with project records, client permissions, accepted supplier quotes (with evidence), immutable activity events, scope versions and milestone/cashflow checks before launch or resale.
