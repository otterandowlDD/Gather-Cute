// Vercel Serverless Function for the static Gather Cute website.
// Returns country only; never exposes or stores the visitor IP address.
module.exports = function handler(req, res) {
  const raw = req.headers['x-vercel-ip-country'];
  const country = typeof raw === 'string' && /^[A-Z]{2}$/.test(raw)
    ? raw
    : null;
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Vary', 'X-Vercel-IP-Country');
  res.status(200).json({ country });
};
