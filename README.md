# Shigari Mobile World Website

Static, hosting-ready website for **Shigari Mobile World** (Gilgit-Baltistan, GB).

## Pages

- `index.html` — Home
- `mobiles.html` — Mobiles catalog (search + brand + price + category filters)
- `about.html` — About Us
- `contact.html` — Contact + map + WhatsApp form

## Update mobiles / prices

Edit:

- `assets/data/mobiles.json`

Each item includes:

- `brand`, `model`, `category` (Flagship / Mid-Range / Budget)
- `price` (number in PKR)
- `ram`, `storage`, `camera`, `battery`
- `image` (URL)

## Update contact info

Edit:

- `assets/js/site.js`

Update these values:

- `phoneDisplay`
- `phoneE164`
- `whatsappE164`
- `email`

## Local preview

Any static server works. Example (PowerShell):

```powershell
python -m http.server 5500
```

Then open:

- http://localhost:5500/

## Deploy

- **GitHub Pages**: push these files to a repo and enable Pages (deploy from `/` root).
- **Netlify**: drag-and-drop this folder or connect your repo.

No build step required.
