// HTMLの要素を取得
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const resultArea = document.getElementById('result-area');
const outputImage = document.getElementById('output-image');

// ボタンがクリックされたときの処理
generateBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (text.trim() === "") {
        alert("テキストを入力してください。");
        return;
    }

    // 画像生成処理を実行
    createImageFromText(text);
});

// テキストから画像を生成するメインの関数
function createImageFromText(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // --- 画像の基本設定 ---
    const imageWidth = 800; // 画像の横幅
    const padding = 40;     // 上下の余白
    const sidePadding = 50; // 左右の余白
    const fontName = '18px "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif';
    const lineHeight = 32;  // 行の高さ

    // --- まず、必要な高さを計算する ---
    ctx.font = fontName;
    const lines = getWrappedLines(ctx, text, imageWidth - sidePadding * 2);
    const textHeight = lines.length * lineHeight;
    const imageHeight = textHeight + padding * 2;

    // --- 計算したサイズでキャンバスを再設定 ---
    canvas.width = imageWidth;
    canvas.height = imageHeight;

    // --- キャンバスに描画する ---
    // 背景を白で塗りつぶす
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 文字を描画する
    ctx.font = fontName;
    ctx.fillStyle = 'black';
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

    // ボタンのテキストを一時的に変更
    generateBtn.textContent = '画像を生成しました！';
    setTimeout(() => {
        generateBtn.textContent = '画像を出力する';
    }, 2000);
}

// テキストを自動で折り返して、行の配列を返す関数
function getWrappedLines(ctx, text, maxWidth) {
    const words = text.split(''); // 1文字ずつ分割
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const char = words[i];

        // 改行コードの場合は、強制的に改行
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