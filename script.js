/* === Final Version (Classic Style & Structured Layout) === */

:root {
    --bg-color: #f0f2f5;
    --container-bg: #ffffff;
    --text-primary: #1a237e;
    --text-secondary: #555555;
    --button-bg: #28a745;
    --button-hover-bg: #218838;
    --border-color: #dddddd;
    --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
    color: var(--text-secondary);
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

.container {
    width: 100%;
    max-width: 800px;
    background: transparent;
    padding: 0;
    border: none;
    box-shadow: none;
}

h1 { text-align: center; color: var(--text-primary); font-size: 2.2em; margin-bottom: 10px; }
p { text-align: center; margin-bottom: 25px; }

.section-card {
    background: var(--container-bg);
    padding: 25px 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-color);
    border: 1px solid var(--border-color);
    margin-bottom: 25px;
}
.section-card legend {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--text-primary);
    padding: 0 10px;
    margin-left: 10px;
}
.section-card legend .fas { margin-right: 8px; }

.controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px 20px;
}
.controls-grid div { display: flex; flex-direction: column; }
.controls-grid label { font-size: 14px; font-weight: 500; margin-bottom: 5px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }
.controls-grid select, .controls-grid input {
    width: 100%; box-sizing: border-box; padding: 8px;
    border: 1px solid #ccc; border-radius: 4px; font-size: 16px;
    height: 40px;
}
input[type="color"] { padding: 2px; height: 40px; }
.layout-control { grid-column: 1 / -1; }

.reset-wrapper { margin-top: 15px; text-align: right; }
#reset-btn {
    background: #999; font-size: 12px; padding: 5px 15px;
    color: white; border: none; border-radius: 4px; cursor: pointer;
}
#reset-btn:hover { background: #777; }
#reset-btn .fas { margin-right: 5px; }

#generate-btn {
    width: 100%; padding: 15px; font-size: 18px;
    font-weight: bold; color: #fff; background-color: var(--button-bg);
    border: none; border-radius: 4px; cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 20px;
}
#generate-btn:hover { background-color: var(--button-hover-bg); }

textarea {
    width: 100%; box-sizing: border-box; padding: 15px;
    border-radius: 4px; font-size: 16px; line-height: 1.7;
    border: 1px solid #ccc; resize: vertical; margin: 0; min-height: 250px;
}

#result-area { margin-top: 0; text-align: center; padding: 10px 0; }
#result-area p { font-size: 14px; margin-bottom: 15px; color: #777; }
#output-image { max-width: 100%; border: 1px solid var(--border-color); border-radius: 4px; }
.hidden { display: none; }

#download-btn {
    display: inline-block;
    text-decoration: none;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: var(--button-bg);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 20px;
}
#download-btn:hover { background-color: var(--button-hover-bg); }
#download-btn .fas { margin-right: 8px; }

.spinner {
    border: 3px solid rgba(255, 255, 255, 0.3); border-radius: 50%;
    border-top: 3px solid #fff; width: 20px; height: 20px;
    animation: spin 1s linear infinite; display: inline-block;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }