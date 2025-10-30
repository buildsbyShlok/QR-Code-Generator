    const generateBtn = document.getElementById('generate');
    const downloadBtn = document.getElementById('download');
    const textInput = document.getElementById('text');
    const sizeSelect = document.getElementById('size');
    const foreColorInput = document.getElementById('foreColor');
    const backColorInput = document.getElementById('backColor');
    const qrcodeDiv = document.getElementById('qrcode');
    const errorP = document.getElementById('error');
    let qrcode = null;
    
    function generateQRCode() {
        const text = textInput.value.trim();
        const size = parseInt(sizeSelect.value);
        const foreColor = foreColorInput.value;
        const backColor = backColorInput.value;
        
        qrcodeDiv.innerHTML = '';
        errorP.textContent = '';
        downloadBtn.style.display = 'none';
        
        if (text === '') {
            errorP.textContent = 'Please enter some text or URL';
            return;
        }
        
        try {
            qrcode = new QRCode(qrcodeDiv, {
                text: text,
                width: size,
                height: size,
                colorDark: foreColor,
                colorLight: backColor,
                correctLevel: QRCode.CorrectLevel.H
            });
            setTimeout(() => {
                downloadBtn.style.display = 'block';
                downloadBtn.style.animation = 'fadeIn 0.5s ease-out';
            }, 300);
        } catch (error) {
            errorP.textContent = 'Error generating QR code. Please try again.';
            console.error('QR Code generation error:', error);
        }
    }
    function downloadQRCode() {
        const img = qrcodeDiv.querySelector('img');
        if (!img) return;
        let fileName = 'qrcode.png';
        const inputText = textInput.value.trim();

        if (inputText.startsWith('http')) {
            try {
                const url = new URL(inputText);
                fileName = `qrcode-${url.hostname}.png`;
            } catch (e) {
            }
        } else if (inputText.length > 0) {
            const shortText = inputText.substring(0, 20).replace(/\s+/g, '-');
            fileName = `qrcode-${shortText}.png`;
        }

        const canvas = document.createElement('canvas');
        const size = parseInt(sizeSelect.value);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = backColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
    textInput.value = "https://example.com";
    generateQRCode();
    textInput.value = "";
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });