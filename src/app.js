document.addEventListener("DOMContentLoaded", () => {
    let currentLogo = null;

    // Initialize QR Code Styling
    const qrCode = new QRCodeStyling({
        width: 320,
        height: 320,
        image: "",
        qrOptions: {
            errorCorrectionLevel: "H" // Critical when using a large logo so code remains scannable
        },
        dotsOptions: {
            color: "#000000",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        cornersSquareOptions: {
            type: "extra-rounded"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10,
            imageSize: 0.4
        }
    });

    // Append to container
    qrCode.append(document.getElementById("qrCodePreview"));

    // DOM Elements - vCard Inputs
    const fName = document.getElementById("firstName");
    const lName = document.getElementById("lastName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const company = document.getElementById("company");
    const title = document.getElementById("title");
    const website = document.getElementById("website");

    // DOM Elements - Styling
    const dotsColor = document.getElementById("dotsColor");
    const bgColor = document.getElementById("bgColor");
    const dotsType = document.getElementById("dotsType");
    const cornersType = document.getElementById("cornersType");
    const logoUpload = document.getElementById("logoUpload");
    const logoFileName = document.getElementById("logoFileName");
    const logoSize = document.getElementById("logoSize");
    const downloadBtn = document.getElementById("downloadBtn");

    function generateVCard() {
        const fn = fName.value.trim() || fName.placeholder;
        const ln = lName.value.trim() || lName.placeholder;
        const ph = phone.value.trim() || phone.placeholder;
        const em = email.value.trim() || email.placeholder;
        const org = company.value.trim();
        const job = title.value.trim();
        const web = website.value.trim() || website.placeholder;

        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn};;;\nFN:${fn} ${ln}\n`;
        if (org) vcard += `ORG:${org}\n`;
        if (job) vcard += `TITLE:${job}\n`;
        vcard += `TEL;TYPE=CELL:${ph}\n`;
        vcard += `EMAIL;TYPE=WORK,INTERNET:${em}\n`;
        vcard += `URL:${web}\n`;
        vcard += `END:VCARD`;

        return vcard;
    }

    // Update function
    function updateQR() {
        qrCode.update({
            data: generateVCard(),
            image: currentLogo || "", 
            dotsOptions: {
                color: dotsColor.value,
                type: dotsType.value
            },
            backgroundOptions: {
                color: bgColor.value,
            },
            cornersSquareOptions: {
                type: cornersType.value
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 10,
                imageSize: parseFloat(logoSize.value)
            }
        });
    }

    // Add listeners to all inputs to trigger update
    [fName, lName, phone, email, company, title, website, dotsColor, bgColor, dotsType, cornersType, logoSize].forEach(el => {
        el.addEventListener("input", updateQR);
        el.addEventListener("change", updateQR);
    });

    // Handle Logo Upload
    logoUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            logoFileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                currentLogo = event.target.result;
                updateQR();
            };
            reader.readAsDataURL(file);
        } else {
            logoFileName.textContent = "Choose a file...";
            currentLogo = null;
            updateQR();
        }
    });

    // Handle Download
    downloadBtn.addEventListener("click", () => {
        qrCode.download({ name: "contact-qr", extension: "png" });
    });

    // Initial render
    updateQR();
});
