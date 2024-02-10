document.getElementById('uploadInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
       const imgData = event.target.result;
       
       displayPopup(imgData);
    };
    
    reader.readAsDataURL(file);
 });


function displayPopup(imgData) {
    const popup = document.getElementById('frameOptionsPopup');
    popup.style.display = 'block';
    
    popup.dataset.imgData = imgData;
}


function selectFrame(frameType) {
    const popup = document.getElementById('frameOptionsPopup');
    const imgData = popup.dataset.imgData;
    const outputImage = document.getElementById('renderedImage');

    if (frameType === 'none') {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width; 
            canvas.height = img.height; 

            ctx.drawImage(img, 0, 0);
            outputImage.innerHTML = ''; 
            outputImage.appendChild(canvas);
            popup.style.display = 'none'; 
        };

        img.src = imgData;
    } else {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width; 
            canvas.height = img.height; 
            if (frameType === 'heart') {
                drawHeart(ctx, canvas.width / 2, canvas.height / 2, canvas.width / 2);
                ctx.clip();
            } else if (frameType === 'circle') {
                ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, Math.PI * 2);
                ctx.clip();
            } else if (frameType === 'square') {
                const minDimension = Math.min(canvas.width, canvas.height);
                const offsetX = (canvas.width - minDimension) / 2;
                const offsetY = (canvas.height - minDimension) / 2;
                canvas.width = minDimension;
                canvas.height = minDimension;
                ctx.drawImage(img, 0, 0, minDimension, minDimension, offsetX, offsetY, minDimension, minDimension);
            } else if (frameType === 'rectangle') {
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            outputImage.innerHTML = ''; 
            outputImage.appendChild(canvas);
            popup.style.display = 'none'; 
        };

        img.src = imgData;
    }
}

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size, y, x, y + size);
    ctx.bezierCurveTo(x - size, y, x - size / 2, y - size / 2, x, y - size / 2);
    ctx.closePath();
}


function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
}
