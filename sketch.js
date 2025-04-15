let button1, button2, button3, button4, homeButton; // 將 homeButton 定義為全域變數
let sprite9, sprite12, spriteAction2, spriteAction3, spriteAction4, spriteAction5;
let currentSprite = null;
let frameIndex = 0;
let frameDelay = 10; // 控制動畫速度
let frameCounter = 0;
let iframe; // 用於嵌入 iframe
let showSubOptions = false; // 控制子選項是否顯示
let subButtons = []; // 儲存子選項按鈕
let menuY = -200; // 選單的初始位置（隱藏在畫布上方）
let targetMenuY = -200; // 選單的目標位置
let menuHeight = 200; // 選單的高度
let subOptionsVisible = false; // 控制子選項是否顯示
let stars = []; // 儲存星形的陣列

function preload() {
  sprite9 = loadImage('9.png'); // 如果圖片在 images 資料夾中
  sprite12 = loadImage('動作1.png'); // 載入圖片精靈動作1.png
  spriteAction2 = loadImage('動作2.png'); // 載入圖片精靈動作2.png
  spriteAction3 = loadImage('動作3.png'); // 載入圖片精靈動作三.png
  spriteAction4 = loadImage('動作四.png'); // 載入圖片精靈動作四.png
  spriteAction5 = loadImage('動作五.png'); // 載入圖片精靈動作五.png
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗大小

  // 初始化星形
  for (let i = 0; i < 50; i++) {  // 隨機產生 50 顆星形
    stars.push({ // 隨機產生星形的屬性
      x: random(width),  // 隨機 x 座標
      y: random(height),  // 隨機 y 座標
      size: random(10, 30),  // 隨機大小
      color: color(random(255), random(255), random(255))  // 隨機顏色
    });
  }

  // 更新按鈕的位置
  button1 = createButton('自我介紹');
  button1.position(180, 50); // 將「自我介紹」移到原「作品集」的位置
  button1.size(100, 50);
  button1.style('font-size', '20px');
  button1.style('background-color', '#fcf6bd');
  button1.style('border', '1px solid #fcf6bd');
  button1.style('border-radius', '10px');
  button1.mouseOver(() => currentSprite = { sprite: sprite9, frames: 9, width: 96, height: 105 });
  button1.mouseOut(() => currentSprite = null);
  button1.mousePressed(() => showIframe('https://stella0808.github.io/20250412/')); // 按下按鈕顯示 iframe

  button2 = createButton('作品集');
  button2.position(50, 50); // 將「作品集」移到原「自我介紹」的位置
  button2.size(100, 50);
  button2.style('font-size', '20px');
  button2.style('background-color', '#fcf6bd');
  button2.style('border', '1px solid #fcf6bd');
  button2.style('border-radius', '10px');
  button2.mouseOver(() => currentSprite = { sprite: spriteAction2, frames: 8, width: 126, height: 108 });
  button2.mouseOut(() => currentSprite = null);
  button2.mousePressed(() => toggleSubOptions());
  button2.mouseOut(() => {
    setTimeout(() => {
      if (!isMouseOverSubButtons() && !isMouseOverButton2()) {
        subOptionsVisible = false;
      }
    }, 100);
  });

  // 新增子選項
  let subOptions = [
    { label: '3/3作品', url: 'https://stella0808.github.io/20250303/' }, 
    { label: '3/10作品', url: 'https://stella0808.github.io/20250310/' },
    { label: '3/17作品', url: 'https://stella0808.github.io/20250317/' },
    { label: '3/24作品', url: 'https://stella0808.github.io/20250324/' },
    { label: 'HackMD報告', url: 'https://hackmd.io/@PMQvdaUjQhiyuBOw7P0pgQ/Byi7DL03kx' }
  ];

  let yOffset = 110; // 子選項的初始垂直位置
  subOptions.forEach((option, index) => {
    let subButton = createButton(option.label);
    subButton.position(50, yOffset + index * 60); // 子選項跟隨「作品集」按鈕
    subButton.size(100, 50);
    subButton.style('font-size', '16px');
    subButton.style('background-color', '#fcf6bd');
    subButton.style('border', '1px solid #fcf6bd');
    subButton.style('border-radius', '10px');
    subButton.mousePressed(() => showIframe(option.url));
    subButton.hide();
    subButtons.push(subButton);
  });

  // 建立第三個按鈕（教學影片）
  button3 = createButton('教學影片'); // 設定第三個按鈕
  button3.position(310, 50); // 設定在第二個按鈕右邊
  button3.size(100, 50); // 設定按鈕大小
  button3.style('font-size', '20px'); // 設定按鈕字型大小
  button3.style('background-color', '#fcf6bd'); // 設定按鈕背景顏色
  button3.style('border', '1px solid #fcf6bd'); // 設定按鈕邊框顏色
  button3.style('border-radius', '10px'); // 設定按鈕圓角
  button3.mouseOver(() => currentSprite = { sprite: spriteAction3, frames: 9, width: 83, height: 114 });
  button3.mouseOut(() => currentSprite = null); // 滑鼠移出時不顯示動畫
  button3.mousePressed(() => showIframe('https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week8/20250407_101522.mp4')); // 按下按鈕顯示 iframe

  // 建立第四個按鈕（測驗題） 
  button4 = createButton('測驗題');
  button4.position(440, 50); // 設定在第三個按鈕右邊
  button4.size(100, 50); // 設定按鈕大小
  button4.style('font-size', '20px'); // 設定按鈕字型大小
  button4.style('background-color', '#fcf6bd'); // 設定按鈕背景顏色
  button4.style('border', '1px solid #fcf6bd'); // 設定按鈕邊框顏色
  button4.style('border-radius', '10px'); // 設定按鈕圓角
  button4.mouseOver(() => currentSprite = { sprite: spriteAction4, frames: 9, width: 104, height: 112 }); // 動作四
  button4.mouseOut(() => currentSprite = null); // 滑鼠移出時不顯示動畫
  button4.mousePressed(() => showIframe('https://stella0808.github.io/20240413/')); // 按下按鈕顯示 iframe

  // 新增首頁按鈕
  homeButton = createButton('首頁'); // 將 homeButton 定義為全域變數
  homeButton.position(570, 50); // 設定在測驗題右邊
  homeButton.size(100, 50); // 設定按鈕大小
  homeButton.style('font-size', '20px'); // 設定按鈕字型大小
  homeButton.style('background-color', '#fcf6bd'); // 設定按鈕背景顏色
  homeButton.style('border', '1px solid #fcf6bd'); // 設定按鈕邊框顏色
  homeButton.style('border-radius', '10px'); // 設定按鈕圓角
  homeButton.mouseOver(() => currentSprite = { sprite: spriteAction5, frames: 7, width: 101, height: 100 }); // 動作五
  homeButton.mouseOut(() => currentSprite = null); // 滑鼠移出時不顯示動畫
  homeButton.mousePressed(() => {
    if (iframe) {
      iframe.remove(); // 移除 iframe
      iframe = null; // 清空 iframe 變數
    }
  });
}

function draw() {
  // 設定背景顏色隨滑鼠垂直位置變化
  let topColor = color('#d0f4de'); // 頂部顏色
  let bottomColor = color('#a9def9'); // 底部顏色
  let lerpAmount = constrain(mouseY / height, 0, 1); // 根據滑鼠位置計算顏色比例
  let currentColor = lerpColor(topColor, bottomColor, lerpAmount); // 計算當前顏色

  // 填充背景顏色
  background(currentColor);

  // 繪製星形
  stars.forEach(star => { // 繪製每顆星形
    let distanceFactor = map(mouseX, 0, width, 0.5, 2); // 根據滑鼠位置調整星形大小
    fill(star.color); // 設定星形顏色
    noStroke(); // 不繪製邊框
    drawStar(star.x, star.y, star.size * distanceFactor, star.size * 0.5 * distanceFactor, 5); // 繪製星形
  }); 

  // 判斷滑鼠是否在範圍內
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 400) { // 如果滑鼠在畫布範圍內
    targetMenuY = 50; // 顯示選單按鈕的目標位置
  } else {
    targetMenuY = -200; // 隱藏選單按鈕的目標位置
  }

  // 平滑移動按鈕
  menuY = lerp(menuY, targetMenuY, 0.1); // 使用線性插值平滑移動按鈕位置

  // 更新按鈕的位置
  button1.position(180, menuY); // 自我介紹按鈕
  button2.position(50, menuY); // 作品集按鈕
  button3.position(310, menuY); // 教學影片按鈕
  button4.position(440, menuY); // 測驗題按鈕
  homeButton.position(570, menuY); // 首頁按鈕

  // 顯示或隱藏按鈕
  if (menuY > -190) { // 當按鈕接近可見範圍時顯示
    button1.show(); 
    button2.show();
    button3.show();
    button4.show();
    homeButton.show();
    subButtons.forEach(button => button.show()); // 顯示子選項按鈕
  } else { // 當按鈕隱藏時隱藏
    button1.hide();
    button2.hide();
    button3.hide();
    button4.hide();
    homeButton.hide();
    subButtons.forEach(button => button.hide()); // 隱藏子選項按鈕
  }

  // 如果有當前的圖片精靈，顯示動畫
  if (currentSprite) {
    frameCounter++; // 增加幀計數器
    if (frameCounter >= frameDelay){ // 如果達到幀延遲
      frameCounter = 0; // 重置幀計數器
      frameIndex = (frameIndex + 1) % currentSprite.frames; // 更新幀索引
    }

    let sx = frameIndex * currentSprite.width; // 計算當前幀的 x 座標
    image( 
      currentSprite.sprite, // 顯示當前幀的圖片精靈
      50, 180,
      currentSprite.width, currentSprite.height, // 設定顯示的寬高
      sx, 0,
      currentSprite.width, currentSprite.height // 設定裁剪的寬高
    );
  }

  // 顯示或隱藏子選項
  if (subOptionsVisible) {
    subButtons.forEach(button => button.show()); // 顯示子選項按鈕
  } else {
    subButtons.forEach(button => button.hide()); // 隱藏子選項按鈕
  }
}

// 顯示 iframe 的函數
function showIframe(url) {
  // 如果已經有 iframe，先移除
  if (iframe) {
    iframe.remove();
  }

  // 建立新的 iframe
  iframe = createElement('iframe'); // 創建 iframe 元素
  iframe.attribute('src', url); // 設定 iframe 的來源網址
  iframe.position(windowWidth * 0.1, windowHeight * 0.2); // 顯示在視窗中間
  iframe.size(windowWidth * 0.8, windowHeight * 0.7); // 寬為視窗的 80%，高為視窗的 70%

  // 確保 iframe 的 z-index 較高
  iframe.style('position', 'absolute'); // 設置為絕對定位
  iframe.style('zIndex', '100'); // 提高 z-index，確保在其他元素之上
}

// 切換子選項顯示狀態的函數
function toggleSubOptions() {  // 切換子選項顯示狀態
  subOptionsVisible = !subOptionsVisible; // 切換顯示狀態
}

function isMouseOverSubButtons() { // 檢查滑鼠是否在子選項按鈕上
  return subButtons.some(button => { // 檢查每個子選項按鈕
    let x = button.x;
    let y = button.y;
    let w = button.width;
    let h = button.height;
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h; // 如果滑鼠在子選項按鈕上，返回 true
  });
}

function isMouseOverButton2() { // 檢查滑鼠是否在第二個按鈕上
  let x = button2.x;
  let y = button2.y;
  let w = button2.width;
  let h = button2.height;
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h; // 如果滑鼠在第二個按鈕上，返回 true
}

// 繪製星形的函數
function drawStar(x, y, radius1, radius2, npoints) { // 繪製星形
  let angle = TWO_PI / npoints; // 計算每個角度
  let halfAngle = angle / 2.0; // 計算每個角度的一半
  beginShape(); // 開始繪製形狀
  for (let a = 0; a < TWO_PI; a += angle) { // 循環繪製每個角度
    let sx = x + cos(a) * radius1; // 計算 x 座標
    let sy = y + sin(a) * radius1; // 計算 y 座標
    vertex(sx, sy); // 繪製頂點
    sx = x + cos(a + halfAngle) * radius2; // 計算 x 座標
    sy = y + sin(a + halfAngle) * radius2; // 繪製頂點
    vertex(sx, sy); // 繪製頂點
  }
  endShape(CLOSE);
}

// 確保下拉選單的 z-index 較高
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownButton) {
  dropdownButton.style.position = 'relative';
  dropdownButton.style.zIndex = '100';
}

if (dropdownMenu) {
  dropdownMenu.style.position = 'absolute';
  dropdownMenu.style.zIndex = '101';
}
