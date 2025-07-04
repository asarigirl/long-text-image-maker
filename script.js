// === V3.0 完成版 ===

// --- HTMLの要素をすべて取得 ---
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const resultArea = document.getElementById('result-area');
const outputImage = document.getElementById('output-image');
const fontFamilySelect = document.getElementById('font-family-select');
const fontSizeInput = document.getElementById('font-size-input');
const lineHeightInput = document.getElementById('line-height-input');
const letterSpacingInput = document.getElementById('letter-spacing-input');
const bgColorInput = document.getElementById('bg-color-input');
const fontColorInput = document.getElementById('font-color-input');


// --- ボタンがクリックされたときの処理 ---
generateBtn.addEventListener('click', async () => {
    const text = textInput.value;
    if (text.trim() === "") {
        alert("テキストを入力してください。");
        return;
    }

    const selectedFont = `18px "${fontFamilySelect.value}"`;
    try {
        await document.fonts.load(selectedFont);
    } catch (err) {
        console.error("フォントの読み込みに失敗:", err);
        alert("フォントの読み込みに失敗しました。時間をおいて再試行してください。");
        return;
    }

    createImageFromText(text);
});


// --- テキストから画像を生成するメインの関数 ---
function createImageFromText(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // --- ユーザーが設定した値をすべて読み込む ---
    const fontFamily = fontFamilySelect.value;
    const fontSize = parseInt(fontSizeInput.value, 10);
    const lineHeightMultiplier = parseFloat(lineHeightInput.value);
    const letterSpacing = parseInt(letterSpacingInput.value, 10);
    const bgColor = bgColorInput.value;
    const fontColor = fontColorInput.value;
    const lineHeight = fontSize * lineHeightMultiplier;
    const fontName = `${fontSize}px "${fontFamily}"`;

    // --- 画像の基本設定 ---
    const imageWidth = 800;
    const padding = 40;
    const sidePadding = 50;

    // --- まず、必要な高さを計算する ---
    ctx.font = fontName;
    ctx.letterSpacing = `${letterSpacing}px`;
    const lines = getWrappedLines(ctx, text, imageWidth - sidePadding * 2);
    const textHeight = lines.length * lineHeight;
    const imageHeight = textHeight + padding * 2;

    // --- 計算したサイズでキャンバスを再設定 ---
    canvas.width = imageWidth;
    canvas.height = imageHeight;

    // --- キャンバスに描画する ---
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontName;
    ctx.letterSpacing = `${letterSpacing}px`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    lines.forEach((line, index) => {
        const x = sidePadding;
        const y = padding + index * lineHeight;
        ctx.fillText(line, x, y);
    });

    // --- 完成した画像を画面に表示 ---
    outputImage.src = canvas.toDataURL('image/png');
    resultArea.classList.remove('hidden');
    
    generateBtn.textContent = '画像を生成しました！';
    setTimeout(() => { generateBtn.textContent = '画像を出力する'; }, 2000);
}


// --- テキストを自動で折り返して、行の配列を返す関数 ---
function getWrappedLines(ctx, text, maxWidth) {
    const words = text.split('');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const char = words[i];
        if (char === '\n') {
            lines.push(currentLine);
            currentLine = '';
            continue;
        }
        const testLine = currentLine + char;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
            lines.push(currentLine);
            currentLine = char;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    return lines;
}