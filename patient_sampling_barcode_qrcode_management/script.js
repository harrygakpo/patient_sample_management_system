function generateQRCode() {
    const data = getFormData();
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify(data),
        width: 128,
        height: 128
    });
}

function viewInfo() {
    const data = getFormData();
    localStorage.setItem('patientData', JSON.stringify(data));
    window.location.href = 'data.html';
}

function printQRCode() {
    const qrcode = document.getElementById("qrcode");
    if (qrcode.innerHTML) {
        const printWindow = window.open('', '', 'height=400,width=400');
        printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
        printWindow.document.write(qrcode.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert("Please generate a QR code first.");
    }
}

function generateBarcode() {
    const patientId = document.getElementById("id").value;
    JsBarcode("#barcode", patientId, {
        format: "CODE128",
        width: 2,
        height: 100,
    });
}

function printBarcode() {
    const barcode = document.getElementById("barcode");
    if (barcode.innerHTML) {
        const printWindow = window.open('', '', 'height=400,width=400');
        printWindow.document.write('<html><head><title>Print Barcode</title></head><body>');
        printWindow.document.write(barcode.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert("Please generate a barcode first.");
    }
}

function getFormData() {
    return {
        patientName: document.getElementById("name").value,
        patientId: document.getElementById("id").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        homeAddress: document.getElementById("address").value,
        bloodType: document.getElementById("bloodType").value,
        bloodTest: document.getElementById("bloodTest").value
    };
}

function loadSavedData() {
    const savedData = localStorage.getItem('patientData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById("name").value = data.patientName || '';
        document.getElementById("id").value = data.patientId || '';
        document.getElementById("age").value = data.age || '';
        document.getElementById("gender").value = data.gender || '';
        document.getElementById("address").value = data.homeAddress || '';
        document.getElementById("bloodType").value = data.bloodType || '';
        document.getElementById("bloodTest").value = data.bloodTest || '';
    }
}