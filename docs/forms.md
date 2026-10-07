# Conversation form

The homepage contains a static Astro form named `conversation`. It includes the PDF's three program questions and all five evaluation journey choices, plus name, email, and optional organization.

## Netlify setup

1. Deploy the repository to Netlify using `pnpm build` and publish directory `dist` (configured in `netlify.toml`).
2. Enable form detection in Netlify's Forms settings and deploy again if needed.
3. Confirm the `conversation` form appears in the Forms dashboard.
4. Submit a test inquiry on the deployed site. Verify the submission in the dashboard and the redirect to `/thank-you/`.
5. Add email notifications in Netlify's submission notification settings using the actual company inbox.

Form detection and notification settings are account-level setup, not repository configuration. No recipient address is fabricated in the site.

The regular Astro localhost preview supports field validation and the mobile menu but cannot receive Netlify form submissions. Submitting locally shows an explicit unsent message and preserves the entered information. The hosted form uses a native HTML POST, required-field validation, and a hidden honeypot.

References: https://docs.netlify.com/manage/forms/setup/ and https://docs.netlify.com/manage/forms/notifications/
