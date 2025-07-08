// === Final Version (Bug Fixed) ===

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const outputImage = document.getElementById('output-image');
    const downloadBtn = document.getElementById('download-btn');
    const previewPrompt = document.getElementById('preview-prompt');
    const controls = {
        fontFamily: document.getElementById('font-family-select'),
        fontSize: document.getElementById('font-size-input'),
        lineHeight: document.getElementById('line-height-input'),
        letterSpacing: document.getElementById('letter-spacing-input'),
        bgColor: document.getElementById('bg-color-input'),
        fontColor: document.getElementById('font-color-input'),
        layout: document.getElementById('layout-select'),
        resetBtn: document.getElementById('reset-btn'),
    };
    const defaultValues = {
        fontFamily: 'Noto Sans JP',
        fontSize: '16',
        lineHeight: '1.1',
        letterSpacing: '0',
        bgColor: '#FFFFFF',
        fontColor: '#000000',
        layout: '800',
    };

    const allControls = [textInput, controls.fontFamily, controls.fontSize, controls.lineHeight, controls.letterSpacing, controls.bgColor, controls.fontColor, controls.layout];
    allControls.forEach(control => {
        control.addEventListener('input', debouncedUpdate);
    });
    controls.resetBtn.addEventListener('click', resetToDefaults);
    generateBtn.addEventListener('click', () => createImageFromText(true)); // 手動クリックを明確に

    let debounceTimer;
    function debouncedUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => createImageFromText(false), 400);
    }

    function resetToDefaults() {
        controls.fontFamily.value = defaultValues.fontFamily;
        controls.fontSize.value = defaultValues.fontSize;
        controls.lineHeight.value = defaultValues.lineHeight;
        controls.letterSpacing.value = defaultValues.letterSpacing;
        controls.bgColor.value = defaultValues.bgColor;
        controls.fontColor.value = defaultValues.fontColor;
        controls.layout.value = defaultValues.layout;
        debouncedUpdate();
    }
    
    async function createImageFromText(isManualClick = false) { // isManualClickのデフォルトをfalseに
        if (isManualClick) {
            const btnText = generateBtn.querySelector('#btn-text') || generateBtn;
            const spinnerArea = document.getElementById('spinner-area');
            generateBtn.disabled = true;
            if(btnText) btnText.textContent = '生成中...';
            if(spinnerArea) spinnerArea.innerHTML = '<div class="spinner"></div>';
        }

        try {
            const text = textInput.value;
            if (text.trim() === "") {
                outputImage.classList.add('hidden');
                downloadBtn.classList.add('hidden');
                previewPrompt.classList.remove('hidden');
                return;
            }

            await document.fonts.load(`18px "${controls.fontFamily.value}"`);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const fontFamily = controls.fontFamily.value;
            const fontSize = parseInt(controls.fontSize.value, 10);
            const lineHeightMultiplier = parseFloat(controls.lineHeight.value);
            const letterSpacing = parseInt(controls.letterSpacing.value, 10);
            const bgColor = controls.bgColor.value;
            const fontColor = controls.fontColor.value;
            const imageWidth = parseInt(controls.layout.value, 10);
            const lineHeight = fontSize * lineHeightMultiplier;
            const fontName = `${fontSize}px "${fontFamily}"`;
            const padding = 50;
            const sidePadding = 60;
            
            ctx.font = fontName;
            ctx.letterSpacing = `${letterSpacing}px`;
            const lines = getWrappedLines(ctx, text, imageWidth - sidePadding * 2);
            const textHeight = lines.length * lineHeight;
            const imageHeight = textHeight + (padding * 2);

            canvas.width = imageWidth;
            canvas.height = imageHeight > 0 ? imageHeight : 100;

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = fontName;
            ctx.letterSpacing = `${letterSpacing}px`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            lines.forEach((line, index) => {
                const x = sidePadding;
                const y = padding + (index * lineHeight);
                ctx.fillText(line, x, y);
            });
            
            const imageUrl = canvas.toDataURL('image/png');
            outputImage.src = imageUrl;
            downloadBtn.href = imageUrl;
            
            outputImage.classList.remove('hidden');
            downloadBtn.classList.remove('hidden');
            previewPrompt.classList.add('hidden');
            
        } catch (err) {
            console.error("画像生成中にエラー:", err);
            alert("画像生成に失敗しました。");
        } finally {
            if (isManualClick) {
                generateBtn.disabled = false;
                const btnText = document.getElementById('btn-text');
                const spinnerArea = document.getElementById('spinner-area');
                if(btnText) btnText.textContent = '手動でプレビュー更新';
                if(spinnerArea) spinnerArea.innerHTML = '';
            }
        } // ← 【ここが修正点です！】私のミスで、この閉じ括弧が抜けていました。
    }

    function getWrappedLines(ctx, text, maxWidth) {
        const lines = [];
        const paragraphs = text.split('\n');
        paragraphs.forEach(paragraph => {
            if (paragraph === "") { lines.push(""); return; }
            let currentLine = '';
            for (let i = 0; i < paragraph.length; i++) {
                const char = paragraph[i];
                const testLine = currentLine + char;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = char;
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);
        });
        return lines;
    }
});