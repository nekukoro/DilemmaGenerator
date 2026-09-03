
// ジレンマの型
const templates = [
  {
    id: "prisoners",
    title: "囚人のジレンマ",
    text: "{{Action1}}を行ったと思われる <span>{{n1}}人</span> の{{Creature1}}が、別々に取り調べを受けている。全員が{{Action2}}をすれば<span>刑期は {{n2}}年</span> で、全員が{{Action3}}をすれば <span>刑期は{{n3}}年。</span>自分だけが{{Action2}}をして他人が{{Action3}}をすれば、自分の<span>刑期は {{n4}}年</span> で済む。あなたなら、どの選択を取るだろうか。"
  },
  {
    id: "trolley",
    title: "トロッコ問題",
    text: "暴走した{{ProperNoun1}}が、<span>{{n1}}人</span> の{{Creature1}}に向かって進んでいる。レバーを引けば{{ProperNoun1}}の進路が変わり、その先にいる <span>{{n2}}人</span> の{{Creature2}}が{{Action1}}をすることになる。あなたはレバーを引くだろうか。"
  },
  {
    id: "Epimenides",
    title: "エピメニデスのパラドックス",
    text: "{{Creature1}}が「すべての{{Creature1}}は{{ProperNoun1}}だ」と言った。もし彼が{{ProperNoun2}}ならこの発言は嘘になるし、{{ProperNoun1}}ならこの発言は真実になってしまう。"
  },
  {
    id: "Theseus",
    title: "テセウスの船",
    text: "ここに「{{Creature1}}の{{ProperNoun1}}」という{{ProperNoun1}}がある。それを構成する <span>{{n1}} %</span> のパーツが徐々に置き換えられたとき、過去の{{ProperNoun1}}と現在の{{ProperNoun1}}は「同じ{{Creature1}}の{{ProperNoun1}}」と言えるだろうか。"
  },
  {
    id: "unexpected",
    title: "抜き打ちテストのパラドックス",
    text: "{{Creature1}}が「来週の平日のどこかで{{Action1}}をするが、いつやるかは当日まで予測できないようにする。」と言った。しかし、木曜日までに行われなかったら金曜日に行われると予測でき、同様に木曜、水曜...と逆算すると、{{Action1}}は不可能であるという結論が導かれる。この結論は正しいだろうか。"
  },
  {
    id: "survival",
    title: "臓器くじ",
    text: "{{Creature1}}をくじで <span>{{n1}}人</span> 選び、その人の臓器を全て取り出し、{{Creature2}}に配る。これによって、くじに当たった <span>{{n1}}人</span> は死ぬが、その代わり提供を受けた <span>{{n2}}人</span> の{{Creature2}}が助かる。(くじに不正の余地はない。手術は絶対に失敗しない。他に臓器を得る手段はない。)このような行為は許されるだろうか。"
  },
  {
    id: "dictator",
    title: "独裁者ゲーム",
    text: "あなたに <span>{{n1}}万円</span> が与えられます。ただし、それを面識のない{{Creature1}}と分け合わなければなりません。あなたは分け方を完全に自由に決めることができ、受取人は無条件で提示された金額を受け取ることになっています。このとき、あなたはどのような配分にするだろうか。"
  },
  {
    id: "Carneades",
    title: "カルネアデスの板",
    text: "{{ProperNoun1}}が沈没し、海に投げ出された{{Creature1}}が、1人用の浮き輪にしがみついていた。そこへ別の溺れた{{Creature2}}が <span>{{n1}}人</span> やってきて浮き輪に掴まろうとしていたが、<span>1 + {{n1}}人</span> では沈んでしまうため、{{Creature1}}が{{Creature2}}を突き落とし、{{Creature1}}だけが助かった。これは正当な行為と言えるだろうか。"
  },
  {
    id: "grandfather",
    title: "親殺しのパラドクス",
    text: "{{Creature1}}はタイムマシンで過去に戻り、自分の先祖を{{Action1}}した。その結果、{{Creature1}}は存在しなくなるはずだが、存在しないなら{{Action1}}をすることも不可能になる。この矛盾の正体とは何だろうか。"
  },
  {
    id: "MontyHall",
    title: "モンティーホール問題",
    text: "あなたの前に<span>{{n1}}つ</span> の閉じた扉がある。うち1つには{{ProperNoun1}}が入っており、残りはハズレの{{ProperNoun2}}が入っている。最初にあなたが1つの扉を選ぶ。司会者が残りの扉のうちハズレの扉を<span>{{n2}}つ</span> 開けてみせる。ここであなたは他の扉に変更することができるとき、あなたは選択を変えるだろうか。"
  }
];

// 引数
const dictionary = {
  Action: ["自白", "ダンス", "SNS更新", "黙秘", "食事", "殺人", "発病", "死刑", "抜き打ちテスト", "初期化", "再起動", "人生リセット", "総辞職", "衆議院解散", "徹夜", "特殊詐欺", "課金"],
  Creature: ["囚人", "老人", "富豪", "アヒル", "AIロボット", "プログラマー", "アスタリスくん", "正直者", "嘘つき", "テセウス", "教師", "裁判官", "健康な人", "臓器移植を必要とする患者", "医師", "未就学児", "占い師", "悪魔", "インプゾンビ", "Vtuber"],
  ProperNoun: ["トロッコ", "三輪車", "飛行機", "AIロボット", "アスタリスくん", "正直者", "嘘つき", "船", "潜水艦", "観覧車", "ロケット", "宇宙船"],
  n: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 17, 50, 100, 999, "10,000", "100,000,000"]
};


// 抽選
function generateDilemma() {
  const targetArea = document.getElementById('resultArea');
  if (!targetArea) return;

  // テンプレ抽選
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  let text = selectedTemplate.text;
  console.log(`title: ${selectedTemplate.title}`)

  // プレースホルダー抽選
  const placeholderRegex = /\{\{([a-zA-Z]+)(\d+)\}\}/g;
  const selectedValues = {};

  const generatedHTML = text.replace(placeholderRegex, (match, type) => {
    if (selectedValues[match]) return selectedValues[match];

    const list = dictionary[type];
    if (!list) return match;

    const pick = list[Math.floor(Math.random() * list.length)];
    const formattedPick = `<span>${pick}</span>`;
    selectedValues[match] = formattedPick;
    console.log(` - ${match}に対して、"${pick}" が選ばれました。`)
    return formattedPick;
  });

  targetArea.innerHTML = `<p id="resultText">${generatedHTML}</p>`;


  dilemmaUI();
}





// UI
let glitchInterval = null;

function dilemmaUI() {
  const target = document.querySelector('#resultArea p');
  const btn = document.getElementById('relotteryBtn');
  
  if (!target) return;

  stopRandomGlitch();
  if (btn) btn.disabled = true;

  const charSpeed = 100;
  const highlightPause = 500;

  const nodes = Array.from(target.childNodes);
  target.innerHTML = '';

  const blocksToAnimate = [];

  const punctRegex = /[、。，．！？!?…]+/;

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      let i = 0;

      while (i < text.length) {
        const char = text[i];

        if (char === " " || char === " ") {
          target.appendChild(document.createTextNode(char));
          i++;
          continue;
        }

        // 次の文字が句読点/記号かチェック
        const nextChar = text[i + 1];
        if (nextChar && punctRegex.test(nextChar)) {
          // 直前の1文字 + 句読点/記号
          let chunk = char;
          let j = i + 1;
          while (j < text.length && punctRegex.test(text[j])) {
            chunk += text[j];
            j++;
          }

          // 塊として highlight
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = chunk;
          span.setAttribute('data-text', chunk);
          target.appendChild(span);

          blocksToAnimate.push({ element: span, type: 'char' });
          i++;
          i = j; // 句読点の終わりまでインデックスを進める
        } else {
          // 通常の1文字
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = char;
          target.appendChild(span);

          blocksToAnimate.push({ element: span, type: 'char' });
          i++;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SPAN") {
      node.classList.add('word', 'highlight');
      node.setAttribute('data-text', node.textContent);
      target.appendChild(node);
      blocksToAnimate.push({ element: node, type: 'highlight' });
    }
  });


  let currentDelay = 0;
  blocksToAnimate.forEach((item) => {
    if (item.type === 'char') {
      currentDelay += charSpeed;
    } else if (item.type === 'highlight') {
      currentDelay += charSpeed + highlightPause;
    }
    setTimeout(() => {
      item.element.classList.add('visible');
    }, currentDelay);
  });

  // すべての文字が出揃ったらボタンを有効化、グリッチを開始
  setTimeout(() => {
    if (btn) btn.disabled = false;

    const clone = setupGlitchClone(target);
    if (clone) {
      startRandomGlitch(clone);
    }
  }, currentDelay + 1000);
}


function setupGlitchClone(target) {
  stopRandomGlitch();

  // 親要素を相対位置にする
  const parent = target.parentNode || target.parentElement;
  if (parent) {
    parent.style.position = 'relative';
  }

  // クローン要素作成
  const clone = document.createElement('div');
  clone.className = 'glitch-clone-layer';

  clone.innerHTML = target.innerHTML;

  const cloneWords = clone.querySelectorAll('.word');
  cloneWords.forEach(w => {
    w.classList.add('visible');
    w.style.opacity = '1';
    w.style.transform = 'none';
  });

  target.insertAdjacentElement('afterend', clone);
  return clone;
}

function startRandomGlitch(cloneElement) {
  stopRandomGlitchTimerOnly();

  function trigger() {
    const nextDelay = Math.random() * 1400 + 400;

    glitchInterval = setTimeout(() => {
      execGlitch(cloneElement);
      trigger();
    }, nextDelay);
  }

  trigger();
}

function stopRandomGlitchTimerOnly() {
  if (glitchInterval) {
    clearTimeout(glitchInterval);
    glitchInterval = null;
  }
}

function stopRandomGlitch() {
  stopRandomGlitchTimerOnly();
  const oldClones = document.querySelectorAll('.glitch-clone-layer');
  oldClones.forEach(c => c.remove());
}

function execGlitch(clone) {
  try {
    if (!clone || !document.body.contains(clone)) return;

    // エリア抽選
    const topPercent = Math.floor(Math.random() * 55); 

    const heightPercent = Math.floor(Math.random() * 25) + 15; 
    const bottomPercent = Math.max(0, 100 - (topPercent + heightPercent));

    const leftPercent = Math.floor(Math.random() * 25); 
    const rightPercent = Math.floor(Math.random() * 25); 

    // ズレ幅抽選
    const shiftX = (Math.random() - 0.5) * 80;
    const shiftY = (Math.random() - 0.5) * 8;

    clone.style.setProperty('--clip-top', `${topPercent}%`);
    clone.style.setProperty('--clip-bottom', `${bottomPercent}%`);
    clone.style.setProperty('--clip-left', `${leftPercent}%`);
    clone.style.setProperty('--clip-right', `${rightPercent}%`);
    clone.style.setProperty('--shift-x', `${shiftX}px`);
    clone.style.setProperty('--shift-y', `${shiftY}px`);

    clone.classList.add('is-glitching');

    setTimeout(() => {
      clone.classList.remove('is-glitching');
    }, 120);

  } catch (err) {
    console.error("【ERROR in execGlitch】", err);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  dilemmaUI();
});

const relotteryBtn = document.getElementById('relotteryBtn');
if (relotteryBtn) {
  relotteryBtn.addEventListener('click', () => {
    relotteryBtn.disabled = true;

    setTimeout(() => {
      generateDilemma();
    }, 150);
  });
}
