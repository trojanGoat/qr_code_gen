# Dynamic Contact QR Code Generator

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A clean, modern QR code generator intended to create dynamic vCard contact codes with embedded logos for website footers and public portfolios.

## Structure

- `src/` - Contains the Python script to generate the QR code (`generate.py`).
- `public/assets/` - Contains the static `contact.vcf` (vCard) file.
- `public/images/` - Contains the input logo and the generated QR code (`contact_qr.png`).
- `examples/` - Contains a sample HTML/CSS snippet demonstrating how to elegantly integrate the QR code widget into a global footer.

## Quick Start

1. **Setup Python Environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install "qrcode[pil]"
   ```

2. **Customize vCard**
   Edit `public/assets/contact.vcf` with your actual contact information. Ensure this file is accessible publicly on your domain, e.g., `https://yourdomain.com/contact.vcf`.

3. **Add Your Logo**
   Replace `public/images/logo.png` with your own square logo. A transparent background works best.

4. **Generate the QR Code**
   Run the generator script. Make sure to update the `target_url` in `src/generate.py` to point to your live vCard URL first.
   ```bash
   python src/generate.py
   ```
   This will output `contact_qr.png` into the `public/images/` folder.

5. **Integrate into Your Website**
   Check `examples/footer.html` for a clean, modern snippet (HTML & CSS) to display the QR code with the "Scan to Save Contact" call-to-action in your website's footer.

## Semantic Versioning
This project uses [Semantic Versioning 2.0.0](https://semver.org/).

## License
MIT License.
