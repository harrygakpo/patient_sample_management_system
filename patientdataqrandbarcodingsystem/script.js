document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patientForm');
    const output = document.getElementById('output');
    const viewInfoBtn = document.getElementById('viewInfo');
    const generateQRBtn = document.getElementById('generateQR');
    const printQRBtn = document.getElementById('printQR');
    const generateBarcodeBtn = document.getElementById('generateBarcode');
    const printBarcodeBtn = document.getElementById('printBarcode');
    const qrcodeDiv = document.getElementById('qrcode');
    const barcodeDiv = document.getElementById('barcode');

    let patientData = {};

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        patientData = {
            name: document.getElementById('name').value,
            id: document.getElementById('id').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            address: document.getElementById('address').value,
            bloodType: document.getElementById('bloodType').value,
            bloodTest: document.getElementById('bloodTest').value
        };
        output.style.display = 'block';
        form.style.display = 'none';
    });

    viewInfoBtn.addEventListener('click', function() {
        const dataString = encodeURIComponent(JSON.stringify(patientData));
        window.location.href = `data.html?data=${dataString}`;
    });

    generateQRBtn.addEventListener('click', function() {
        const qr = qrcode(0, 'M');
        const dataString = JSON.stringify(patientData);
        qr.addData(dataString);
        qr.make();
        qrcodeDiv.innerHTML = qr.createImgTag(5);
        printQRBtn.style.display = 'block';
    });

    printQRBtn.addEventListener('click', function() {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
        printWindow.document.write(qrcodeDiv.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    generateBarcodeBtn.addEventListener('click', function() {
        JsBarcode("#barcode", patientData.id, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true
        });
        printBarcodeBtn.style.display = 'block';
    });

    printBarcodeBtn.addEventListener('click', function() {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Print Barcode</title></head><body>');
        printWindow.document.write(barcodeDiv.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
});