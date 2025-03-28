let seaweeds = []; // 儲存水草的資料
let iframe; // 儲存 iframe 元素
let canvas; // 儲存畫布元素

function setup() { // 初始值設定
  // 建立透明的畫布
  canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 將畫布置於 iframe 之上
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布，操作 iframe
  canvas.position(windowWidth * 0.1, windowHeight * 0.1); // 將畫布置於視窗中央

  // 建立滿版的 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // 將 iframe 置於畫布之下
  iframe.style('top', '0');
  iframe.style('left', '0');

  // 初始化 40 條水草
  for (let i = 0; i < 40; i++) {
    let x = random(width); // 隨機 X 座標
    let height = random(140, 220); // 隨機高度
    let color = [random(50, 150), random(100, 200), random(50, 150)]; // 隨機顏色 (RGB)
    let thickness = random(15, 35); // 隨機粗細
    let frequency = random(0.02, 0.08); // 隨機搖晃頻率
    seaweeds.push({ x: x, height: height, color: color, thickness: thickness, frequency: frequency });
  }
}

function draw() { // 畫圖
  clear(); // 清除畫布，保持透明背景
  
  // 繪製每條水草
  for (let seaweed of seaweeds) {
    let baseX = seaweed.x; // 水草底部的 X 座標
    let baseY = height; // 水草底部的 Y 座標
    let segments = 10; // 水草分成 10 個枝節
    let segmentHeight = seaweed.height / segments; // 每個枝節的高度
    
    // 設定水草的顏色和粗細
    stroke(seaweed.color[0], seaweed.color[1], seaweed.color[2], 150); // 設定顏色，加入透明度
    strokeWeight(seaweed.thickness); // 設定粗細
    noFill(); // 不填充
    
    beginShape(); // 開始繪製水草
    vertex(baseX, baseY); // 水草底部的起點
    
    for (let i = 1; i <= segments; i++) {
      let sway = sin(frameCount * seaweed.frequency + i) * (20 / i); // 每個枝節的搖晃幅度逐漸減小
      let x = baseX + sway; // 枝節的 X 座標
      let y = baseY - i * segmentHeight; // 枝節的 Y 座標
      vertex(x, y); // 添加枝節的頂點
    }
    
    endShape(); // 結束繪製水草
  }
}

function windowResized() { 
  resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
  canvas.position(windowWidth * 0.1, windowHeight * 0.1); // 調整畫布位置
}
