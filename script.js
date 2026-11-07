// ============================================================
// 設定
// ============================================================
// true: 選択肢の並びを毎回ランダムにする(正解の位置が決まっていると覚えられてしまうため)
// false: 下の questionSets に書いた順番のまま表示する
const SHUFFLE_CHOICES = true;

const STORAGE_KEY = "netguard-best";
const SOUND_KEY = "netguard-sound";

// 問題はここに固定しています。easyは3問、normalは5問、hardは14問です。
// 答え(a)が数字なら「1つ選ぶ問題」、[1, 3] のような配列なら「複数選ぶ問題」になります。
// 複数選ぶ問題は、正解をすべて選んだときだけ正解になります。（HARDの最後の4問）
const questionSets = {
  easy: [
    {
      q: "「amaz0n.example」というURLを見つけました。本物か確かめるには？",
      c: ["ロゴを見る", "URLのつづりを公式と比べる", "すぐログインする", "ページの色を見る"],
      a: 1,
      e: "「amazon」の o を数字の 0 に変えた偽サイトかもしれません。ロゴだけでなく、URLのつづりを確認しましょう。"
    },
    {
      q: "知らない人から「賞品が当たったよ」とリンクが届きました。どうする？",
      c: ["すぐ開く", "住所を送る", "開かず大人に相談する", "友だちに転送する"],
      a: 2,
      e: "知らない相手のリンクは偽サイトにつながることがあります。開かずに信頼できる大人に相談しましょう。"
    },
    {
      q: "本物のサイトか不安なとき、安全な開き方は？",
      c: ["メッセージのリンクを押す", "公式アプリから開く", "広告を押す", "知らない人に聞く"],
      a: 1,
      e: "公式アプリや自分で登録したブックマークから開くと、偽のリンクを避けやすくなります。"
    }
  ],

  normal: [
    {
      q: "「10分以内に確認しないとアカウント停止」とメールが来ました。どうする？",
      c: ["急いでリンクを開く", "パスワードを返信する", "リンクは使わず公式アプリから確認する", "友だちに転送する"],
      a: 2,
      e: "「今すぐ」と急がせるのは詐欺でよくある手口です。メールのリンクではなく公式アプリから確認しましょう。"
    },
    {
      q: "URLが「shop.example.login-check.com」でした。特に注意する場所は？",
      c: ["最初の shop", "URLの右側にある login-check.com", "ページの色", "ロゴ"],
      a: 1,
      e: "URLの右側にあるドメインを確認しましょう。この例では「login-check.com」がドメインです。"
    },
    {
      q: "差出人名は有名な会社ですが、メールアドレスのつづりが少し違います。どうする？",
      c: ["差出人名を信じてリンクを押す", "リンクや添付を開かず公式アプリから確認する", "パスワードを返信する", "添付を開いてみる"],
      a: 1,
      e: "差出人名は本物らしく見せられます。アドレスに違和感があれば、リンクや添付を開かないでください。"
    },
    {
      q: "検索結果の一番上にある広告なら、必ず安全？",
      c: ["必ず安全", "広告なら公式サイト", "偽サイトの広告もあるのでURLを確認する", "順位だけで判断できる"],
      a: 2,
      e: "検索広告が偽サイトにつながることもあります。公式アプリや登録済みブックマークから開きましょう。"
    },
    {
      q: "サイトのURLが公式と違う文字で終わっています。どうする？",
      c: ["似ていれば使う", "ログインして試す", "情報を入力せず公式のURLを確認する", "友だちの情報を入力する"],
      a: 2,
      e: "URLが少し違うだけでも偽サイトの可能性があります。個人情報を入力せず、公式アプリなどから確認しましょう。"
    }
  ],

  hard: [
    {
      q: "「amazon.example.com.fake-login.net」の本当のドメインは？",
      c: ["amazon", "example.com", "fake-login.net", "最初の単語"],
      a: 2,
      e: "このURLのドメインは右側の「fake-login.net」です。URLの途中に会社名があっても公式とは限りません。"
    },
    {
      q: "鍵マーク（HTTPS）があるサイトなら、必ず本物？",
      c: ["はい。鍵マークは本物の証明", "はい。偽サイトには鍵がない", "いいえ。通信を暗号化している印で、本物の証明ではない", "鍵マークがあれば必ず危険"],
      a: 2,
      e: "HTTPSは通信を暗号化しますが、サイトが本物だとは保証しません。URLや開いた経路も確認しましょう。"
    },
    {
      q: "検索結果の広告から開いたログイン画面で、安全に確認する方法は？",
      c: ["一番上なら信用する", "画面が似ていたら入力する", "信頼できるサイトから開き直す", "URLの一部に会社名が含まれていれば、公式サイトだと判断する"],
      a: 2,
      e: "検索広告が偽サイトにつながることもあります。ログイン情報を入れる前に、公式アプリなどから開き直しましょう。"
    },
    {
      q: "「paypaI.example」というURLで、最後の文字が大文字の I に見えます。何が心配？",
      c: ["URLの大文字・小文字は区別されないので、文字の形だけでは偽サイトとは判断できない", "l（小文字のL）とI（大文字のi）をまねた偽URLかもしれない", "文字が多いので安全", "URLは見なくてよい"],
      a: 1,
      e: "似た形の文字を使って公式URLに見せる偽サイトがあります。文字をよく比べ、公式アプリから確認しましょう。"
    },
    {
      q: "メール内のリンク先が、表示文字と違うURLでした。どうする？",
      c: ["メールの送信元名が公式企業ならリンクを開く", "URLの一部が公式サイトと同じなら開く", "押さずに信頼できるサイトから確認する", "友だちに押してもらう"],
      a: 2,
      e: "リンクの表示と実際の移動先が違うことがあります。怪しいリンクは押さず、公式の方法で確認しましょう。"
    },
    {
      q: "偽サイトにパスワードを入力してしまったかもしれません。最初にすることは？",
      c: ["そのまま様子を見る", "公式サイトにアクセスし、ログインしてパスワードを別のものに変更する", "警察（110番）や国民生活センターに今すぐ電話をかけ、パスワードを無効化してもらうよう依頼する", "メールを消して何もしない"],
      a: 1,
      e: "公式アプリや公式サイトからすぐパスワードを変更しましょう。同じパスワードを使っているサービスも変更し、信頼できる人に相談してください。"
    },
    {
      q: "本物そっくりのサイトが住所とカード番号を求めています。どう判断する？",
      c: ["見た目が本物なら入力する", "URLと開いた経路を確認し、不安なら入力しない", "住所だけ入力する", "サイトのURL（アドレスバー）の左側に「鍵マーク（🔒）」が表示されており、通信が暗号化されているので安全だと判断する"],
      a: 1,
      e: "見た目だけでは本物か判断できません。URLを確認し、不安なときは情報を入力せず公式アプリから確認しましょう。"
    },
    {
      q: "友だちから「この動画見て！」と短縮URLが送られました。危険な点はあるのか？",
      c: ["長さは関係ないので危険ではない", "短縮され、リンク先を確認しにくい", "友だちからなら問題ない", "短縮URLはすべて海外のサーバーで作られており、日本の警察が捜査できない"],
      a: 1,
      e: "短縮URLは、実際にどこへ移動するか分かりにくいことがあります。送った本人が安全を確認したか聞き、心配なら開かないでください。"
    },
    {
      q: "サイトの連絡先がフリーメールで、会社の公式サイトにある連絡先と違います。どうする？",
      c: ["書いてある情報を信じる", "AIに聞いて確認する", "別の方法で会社に確認する", "その連絡先にパスワードを送る"],
      a: 2,
      e: "連絡先が公式情報と違う場合は注意が必要です。サイトに書かれた連絡先ではなく、公式アプリなどで確認しましょう。"
    },
    {
      q: "偽サイトかどうか確信が持てません。いちばん安全な行動は？",
      c: ["試しにログインする", "不安でも急いで入力する", "ページを閉じ、確認する", "知られても大丈夫な情報だけ入力する"],
      a: 2,
      e: "迷ったときは入力しないことが大切です。ページを閉じ、公式アプリや信頼できる大人に確認しましょう。"
    },

    // ---- ここから複数選択の問題(a が配列) ----
    {
      q: "「アカウントを守るため、本人確認をしてください」というメールが届きました。安全な行動はどれ？",
      c: [
        "メールのリンクを押して、急いでログインする",
        "公式アプリや、自分で登録したブックマークからサービスを開いて確認する",
        "メールに書かれた電話番号に電話して、本物か聞いてみる",
        "公式サイトに載っている問い合わせ窓口に連絡して確認する"
      ],
      a: [1, 3],
      e: "メールのリンクや電話番号は、偽物の可能性があります。自分で開いた公式の画面や、公式サイトに載っている窓口で確認しましょう。"
    },
    {
      q: "偽サイトを見破るヒントになるものはどれ？",
      c: [
        "URLの右側にあるドメインが、公式のものと違う",
        "日本語がどこか不自然で、文字や言い回しがおかしい",
        "アドレスバーに鍵マーク（HTTPS）が表示されている",
        "暗証番号など、必要なさそうな情報まで入力させようとする"
      ],
      a: [0, 1, 3],
      e: "ドメインの違い、不自然な日本語、必要以上の情報の要求は、偽サイトでよく見られます。鍵マークは通信が暗号化されている印で、本物かどうかの目安にはなりません。"
    },
    {
      q: "身に覚えのない荷物の不在通知SMSに、URLが付いていました。正しい対応はどれ？",
      c: [
        "URLを開いて、再配達を申し込む",
        "配送会社の公式アプリや公式サイトで、荷物の状況を確認する",
        "SMSに返信して、本物かどうか聞いてみる",
        "URLは開かず、メッセージを削除したり迷惑メッセージとして報告したりする"
      ],
      a: [1, 3],
      e: "身に覚えのないSMSのURLは開かないのが基本です。返信すると「使われている番号」だと知らせてしまうこともあります。確認は公式アプリや公式サイトから行いましょう。"
    },
    {
      q: "街のポスターのQRコードを読み取ると、ログイン画面が表示されました。正しい行動はどれ？",
      c: [
        "表示されたURLを確認し、少しでも不安なら入力しない",
        "見た目が本物そっくりなら、そのままログインする",
        "ポスターに貼ってあるものだから、安全だと考える",
        "ログイン画面は使わず、公式アプリから開き直す"
      ],
      a: [0, 3],
      e: "QRコードはシールなどで貼り替えられることがあり、偽サイトへ誘導されるおそれがあります。URLを確認し、不安なときは入力せず公式アプリから開き直しましょう。"
    }
  ]
};

const levelNames = {
  easy: "EASY 🌱",
  normal: "NORMAL 🔥",
  hard: "HARD 👑"
};

// 「覚えておこう！」に順番に出るヒント
const tips = [
  "あやしいリンクは押さず、公式アプリから確認。",
  "URLは「右側のドメイン」が本体。途中に会社名があっても安心できないよ。",
  "「今すぐ」「アカウント停止」と急がせる連絡は、まず疑おう。",
  "鍵マーク（HTTPS）は暗号化の印。本物の証明ではないよ。",
  "検索広告も偽サイトのことがある。ブックマークから開くのが安全。",
  "短縮URLは行き先が見えない。送った人に確認してから開こう。",
  "同じパスワードの使い回しはNG。1つ漏れると全部あぶないよ。",
  "迷ったら入力しない。ページを閉じて、大人に相談しよう。"
];

const letters = ["A", "B", "C", "D"];

const quiz = document.querySelector("#quiz");
const levelSelect = document.querySelector("#levelSelect");
const aboutDialog = document.querySelector("#aboutDialog");
const soundToggle = document.querySelector("#soundToggle");
const tipText = document.querySelector("#tipText");

let currentLevel = "";
let currentQuestion = 0;
let score = 0;
let streak = 0;
let maxStreak = 0;
let answered = false;
let mistakes = [];
let currentChoices = [];
let soundOn = true;
let tipIndex = 0;
let currentMulti = false;      // いまの問題が「複数選択」かどうか
let selectedSet = new Set();   // 複数選択で、いま選んでいる番号

// ============================================================
// 便利な関数
// ============================================================
function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 答えを配列でそろえて返す(1つ選ぶ問題でも [番号] の形にする)
function getAnswers(item) {
  return Array.isArray(item.a) ? item.a : [item.a];
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start"
  });
}

// ============================================================
// 保存(ベスト記録・効果音の設定)
// ============================================================
function loadBest() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveBest(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 保存できない環境では何もしない
  }
}

function loadSoundSetting() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

function saveSoundSetting(isOn) {
  try {
    localStorage.setItem(SOUND_KEY, isOn ? "on" : "off");
  } catch {
    // 保存できない環境では何もしない
  }
}

function renderBest() {
  const best = loadBest();

  document.querySelectorAll("[data-best]").forEach(element => {
    const level = element.dataset.best;
    const total = questionSets[level].length;
    const record = best[level] && best[level].total === total ? best[level] : null;

    element.classList.remove("perfect");

    if (!record) {
      element.textContent = "未挑戦";
    } else if (record.score === total) {
      element.textContent = `🏆 ${record.score}/${total} パーフェクト`;
      element.classList.add("perfect");
    } else {
      element.textContent = `⭐ ベスト ${record.score}/${total}`;
    }
  });
}

// ============================================================
// 効果音
// ============================================================
let audioContext = null;

function getAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playNotes(notes, step = 0.15, length = 0.12) {
  if (!soundOn) return;

  const audio = getAudio();
  if (!audio) return;

  notes.forEach((frequency, index) => {
    const oscillator = audio.createOscillator();
    const volume = audio.createGain();
    const startTime = audio.currentTime + index * step;

    oscillator.frequency.value = frequency;
    volume.gain.setValueAtTime(0.15, startTime);
    volume.gain.exponentialRampToValueAtTime(0.001, startTime + length);

    oscillator.connect(volume);
    volume.connect(audio.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + length + 0.02);
  });
}

function playAnswerSound(isCorrect) {
  playNotes(isCorrect ? [660, 880] : [220]);
}

function updateSoundButton() {
  soundToggle.textContent = soundOn ? "🔊" : "🔇";
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  soundToggle.title = soundOn ? "効果音：オン" : "効果音：オフ";
}

// ============================================================
// 紙吹雪
// ============================================================
function launchConfetti() {
  if (prefersReducedMotion()) return;

  document.querySelector(".confetti")?.remove();

  const layer = document.createElement("div");
  layer.className = "confetti";
  layer.setAttribute("aria-hidden", "true");

  const colors = ["var(--yellow)", "var(--blue)", "var(--green)", "var(--red)", "var(--paper)"];

  for (let i = 0; i < 48; i++) {
    const piece = document.createElement("span");
    piece.style.setProperty("--x", `${Math.random() * 100}vw`);
    piece.style.setProperty("--w", `${6 + Math.random() * 7}px`);
    piece.style.setProperty("--dur", `${2.4 + Math.random() * 1.6}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.5}s`);
    piece.style.setProperty("--rot", `${360 + Math.random() * 540}deg`);
    piece.style.setProperty("--c", colors[i % colors.length]);
    layer.appendChild(piece);
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 4800);
}

// ============================================================
// クイズ本体
// ============================================================
function startQuiz(level) {
  currentLevel = level;
  currentQuestion = 0;
  score = 0;
  streak = 0;
  maxStreak = 0;
  mistakes = [];

  levelSelect.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
  scrollToElement(quiz);
}

function showQuestion() {
  answered = false;

  const questions = questionSets[currentLevel];
  const item = questions[currentQuestion];
  const percent = Math.round((currentQuestion / questions.length) * 100);

  // 選択肢の並びを決める(正解かどうかは選択肢と一緒に持ち歩く)
  const answers = getAnswers(item);
  const order = item.c.map((_, index) => index);
  if (SHUFFLE_CHOICES) shuffle(order);
  currentChoices = order.map(index => ({
    text: item.c[index],
    correct: answers.includes(index)
  }));

  currentMulti = Array.isArray(item.a);
  selectedSet = new Set();

  const streakBadge = streak >= 2 ? `<span class="streak">🔥 ${streak}連続</span>` : "";

  quiz.innerHTML = `
    <div class="quiz-top">
      <span>${levelNames[currentLevel]}　問題 ${currentQuestion + 1} / ${questions.length}</span>
      <span class="quiz-score">⭐ ${score}問正解${streakBadge}</span>
    </div>
    <div class="progress"><span style="width:${percent}%"></span></div>
    <span class="label">フィッシング見分けクイズ</span>
    ${currentMulti ? `<span class="label multi-tag">☑ 複数選択</span>` : ""}
    <h2 class="question">${escapeHTML(item.q)}</h2>
    ${currentMulti ? `<p class="multi-hint">当てはまるものを<strong>すべて</strong>選んでね（正解は <strong>${answers.length}つ</strong>）</p>` : ""}
    <div class="options">
      ${currentChoices.map((choice, index) => `
        <button class="option" data-index="${index}"${currentMulti ? ` aria-pressed="false"` : ""}>
          <span class="letter">${letters[index]}</span>
          <span>${escapeHTML(choice.text)}</span>
        </button>
      `).join("")}
    </div>
    <div id="feedback" class="hidden"></div>
    <div class="next-row">
      <button id="back" class="back">難易度を選び直す</button>
      ${currentMulti ? `<button id="check" class="next check" disabled>答えを選んでね</button>` : ""}
      <button id="next" class="next hidden">
        ${currentQuestion === questions.length - 1 ? "結果を見る" : "次の問題へ"} →
      </button>
    </div>
    <p class="kbd-hint">${currentMulti ? "キーボード：1〜4 で選ぶ ／ Enter で答え合わせ" : "キーボード：1〜4 で回答 ／ Enter で次へ"}</p>
  `;

  quiz.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      if (currentMulti) {
        toggleChoice(index);
      } else {
        answerQuestion([index]);
      }
    });
  });

  quiz.querySelector("#check")?.addEventListener("click", submitMulti);

  quiz.querySelector("#next").addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion === questions.length) {
      showResult();
    } else {
      showQuestion();
    }
  });

  quiz.querySelector("#back").addEventListener("click", showLevelSelect);

  // 解説を読んで下にスクロールしていたら、次の問題の頭に戻す
  if (quiz.getBoundingClientRect().top < 0) scrollToElement(quiz);
}

// 複数選択: 選ぶ・選びなおす(答え合わせの前)
function toggleChoice(index) {
  if (answered) return;

  const button = quiz.querySelectorAll(".option")[index];
  if (!button) return;

  if (selectedSet.has(index)) {
    selectedSet.delete(index);
  } else {
    selectedSet.add(index);
  }

  button.classList.toggle("selected", selectedSet.has(index));
  button.setAttribute("aria-pressed", String(selectedSet.has(index)));
  updateCheckButton();
  playNotes([520], 0.1, 0.06);
}

function updateCheckButton() {
  const check = quiz.querySelector("#check");
  if (!check) return;

  check.disabled = selectedSet.size === 0;
  check.textContent = selectedSet.size === 0
    ? "答えを選んでね"
    : `答え合わせ（${selectedSet.size}つ選択中）`;
}

function submitMulti() {
  answerQuestion([...selectedSet].sort((a, b) => a - b));
}

// selected: 選んだ番号の配列(1つ選ぶ問題でも [番号] の形で渡す)
function answerQuestion(selected) {
  if (answered || selected.length === 0) return;
  answered = true;

  const item = questionSets[currentLevel][currentQuestion];
  const correctIndexes = currentChoices
    .map((choice, index) => (choice.correct ? index : -1))
    .filter(index => index !== -1);
  const correctTexts = correctIndexes.map(index => currentChoices[index].text);
  const chosenTexts = selected.map(index => currentChoices[index].text);
  const hitCount = selected.filter(index => correctIndexes.includes(index)).length;

  // 正解は「選んだものが、正解とぴったり同じ」ときだけ
  const isCorrect = hitCount === correctIndexes.length && selected.length === correctIndexes.length;

  if (isCorrect) {
    score++;
    streak++;
    maxStreak = Math.max(maxStreak, streak);
  } else {
    streak = 0;
    mistakes.push({
      q: item.q,
      chosen: chosenTexts.join(" ／ "),
      correct: correctTexts.join(" ／ "),
      e: item.e
    });
  }

  playAnswerSound(isCorrect);

  quiz.querySelectorAll(".option").forEach((button, index) => {
    button.disabled = true;

    const isRight = correctIndexes.includes(index);
    const isChosen = selected.includes(index);

    button.classList.remove("selected");
    button.removeAttribute("aria-pressed");

    if (isRight && (isChosen || !currentMulti)) {
      button.classList.add("correct");   // 正解(1つ選ぶ問題では、選ばなかった正解もここで見せる)
    } else if (isChosen) {
      button.classList.add("wrong");     // まちがって選んだもの
    } else if (isRight) {
      button.classList.add("missed");    // 複数選択で選び忘れた正解
    }
  });

  const feedback = quiz.querySelector("#feedback");
  const streakText = isCorrect && streak >= 3 ? `　🔥 ${streak}連続！` : "";
  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;

  // 1つ選ぶ問題は答えの文章、複数選択は選択肢の記号(A・C・D)で伝える
  const answerText = currentMulti
    ? correctIndexes.map(index => letters[index]).join("・")
    : correctTexts.map(text => `「${escapeHTML(text)}」`).join("と");
  const headline = isCorrect
    ? `🎉 正解！${streakText}`
    : `😮 おしい！正解は${answerText}`;

  // 複数選択で外したときは、どこが惜しかったかを教える
  let detail = "";

  if (currentMulti && !isCorrect) {
    const notes = [];
    if (hitCount > 0) notes.push(`${hitCount}つは合っていたよ`);
    if (hitCount < correctIndexes.length) notes.push(`選び忘れが${correctIndexes.length - hitCount}つ`);
    if (selected.length > hitCount) notes.push(`ちがうものが${selected.length - hitCount}つ混ざっていたよ`);
    detail = `<br><span class="partial">${notes.join("・")}</span>`;
  }

  feedback.innerHTML = `
    <strong>${headline}</strong>
    ${detail}
    <br>${escapeHTML(item.e)}
  `;

  quiz.querySelector("#check")?.classList.add("hidden");

  const next = quiz.querySelector("#next");
  next.classList.remove("hidden");
  next.focus({ preventScroll: true });
  feedback.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "nearest"
  });
}

function getRank(score, total) {
  const ratio = score / total;

  if (ratio === 1) {
    return { emoji: "🏆", title: "ネットガードマスター", stars: 3, message: "すごい！全問正解！あなたはもうだまされない！" };
  }
  if (ratio >= 0.7) {
    return { emoji: "🛡️", title: "ガードナイト", stars: 2, message: "いい感じ！あと少しでパーフェクト！" };
  }
  if (ratio >= 0.4) {
    return { emoji: "🔍", title: "みならいガード", stars: 1, message: "解説を読んで、もう一度チャレンジ！" };
  }
  return { emoji: "🐣", title: "ひよこガード", stars: 0, message: "ここからが成長のチャンス！解説を読んで再挑戦しよう！" };
}

function showResult() {
  const total = questionSets[currentLevel].length;
  const rank = getRank(score, total);

  // ベスト記録の更新
  const best = loadBest();
  const previous = best[currentLevel]?.total === total ? best[currentLevel] : null;
  const isNewBest = score > 0 && (!previous || score > previous.score);

  if (isNewBest) {
    best[currentLevel] = { score, total };
    saveBest(best);
  }

  const starsHTML = [0, 1, 2].map(index => `
    <span class="${index < rank.stars ? "on" : "off"}" style="--i:${index}">${index < rank.stars ? "★" : "☆"}</span>
  `).join("");

  const reviewHTML = mistakes.length ? `
    <details class="review">
      <summary>📝 まちがえた問題をふりかえる（${mistakes.length}問）</summary>
      ${mistakes.map((item, index) => `
        <div class="review-item">
          <p class="review-q"><span class="review-no">${index + 1}</span>${escapeHTML(item.q)}</p>
          <p class="review-row bad"><span>× あなたの答え</span>${escapeHTML(item.chosen)}</p>
          <p class="review-row good"><span>○ 正解</span>${escapeHTML(item.correct)}</p>
          <p class="review-e">${escapeHTML(item.e)}</p>
        </div>
      `).join("")}
    </details>
  ` : "";

  quiz.innerHTML = `
    <div class="result">
      <div class="result-emoji">${rank.emoji}</div>
      <span class="label">${levelNames[currentLevel]} クリア</span>
      <h2>${rank.title}</h2>
      <div class="stars" role="img" aria-label="星${rank.stars}つ（3つ中）">${starsHTML}</div>
      ${isNewBest ? `<span class="new-best">🎉 ベスト記録を更新！</span>` : ""}
      <p class="result-score">${score} / ${total} 問正解</p>
      <p class="result-message">${rank.message}</p>
      <ul class="result-stats">
        <li><strong>${maxStreak}</strong>最大連続正解</li>
        <li><strong>${mistakes.length}</strong>ふりかえる問題</li>
      </ul>
      ${reviewHTML}
      <div class="result-buttons">
        <button id="retry" class="restart">もう一度遊ぶ 🔁</button>
        <button id="chooseAgain" class="back">難易度を選び直す</button>
      </div>
    </div>
  `;

  quiz.querySelector("#retry").addEventListener("click", () => {
    startQuiz(currentLevel);
  });

  quiz.querySelector("#chooseAgain").addEventListener("click", showLevelSelect);

  if (score === total) {
    playNotes([523, 659, 784, 1047], 0.14, 0.18);
    launchConfetti();
  } else if (rank.stars >= 2) {
    playNotes([523, 659, 784], 0.14, 0.16);
    launchConfetti();
  }

  scrollToElement(quiz);
}

function showLevelSelect() {
  quiz.classList.add("hidden");
  levelSelect.classList.remove("hidden");
  renderBest();
  scrollToElement(levelSelect);
}

// ============================================================
// ヒント(覚えておこう！)
// ============================================================
function showTip() {
  tipText.textContent = tips[tipIndex];
  tipText.classList.remove("swap");
  void tipText.offsetWidth; // アニメーションを最初からやり直す
  tipText.classList.add("swap");
}

// ============================================================
// イベント
// ============================================================
document.querySelectorAll(".level").forEach(button => {
  button.addEventListener("click", () => {
    startQuiz(button.dataset.level);
  });
});

// ロゴ: トップに戻る
document.querySelector("#logo").addEventListener("click", event => {
  event.preventDefault();

  if (!quiz.classList.contains("hidden")) {
    quiz.classList.add("hidden");
    levelSelect.classList.remove("hidden");
    renderBest();
  }

  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
});

// 「ネット安全チャレンジ」タグ: 説明ダイアログ
function openAbout() {
  if (typeof aboutDialog.showModal === "function") {
    aboutDialog.showModal();
  } else {
    aboutDialog.setAttribute("open", "");
  }
}

function closeAbout() {
  if (typeof aboutDialog.close === "function") {
    aboutDialog.close();
  } else {
    aboutDialog.removeAttribute("open");
  }
}

document.querySelector("#aboutBtn").addEventListener("click", openAbout);
document.querySelector("#aboutClose").addEventListener("click", closeAbout);

document.querySelector("#aboutStart").addEventListener("click", () => {
  closeAbout();
  if (!levelSelect.classList.contains("hidden")) scrollToElement(levelSelect);
});

// 外側(暗い部分)をクリックしても閉じる
aboutDialog.addEventListener("click", event => {
  if (event.target === aboutDialog) closeAbout();
});

// 効果音のオン・オフ
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  saveSoundSetting(soundOn);
  updateSoundButton();
  playNotes([660]);
});

// ヒントを切り替える
document.querySelector("#tipNext").addEventListener("click", () => {
  tipIndex = (tipIndex + 1) % tips.length;
  showTip();
});

// ベスト記録のリセット
document.querySelector("#resetBest").addEventListener("click", () => {
  if (confirm("ベスト記録をすべて消しますか？")) {
    saveBest({});
    renderBest();
  }
});

// キーボード操作: 1〜4 / A〜D で回答(複数選択は選ぶ)、Enter で次へ(複数選択は答え合わせ)
document.addEventListener("keydown", event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (aboutDialog.open) return;
  if (quiz.classList.contains("hidden")) return;

  const key = event.key.toLowerCase();
  const options = quiz.querySelectorAll(".option");

  if (!answered && options.length && key.length === 1) {
    let index = "1234".indexOf(key);
    if (index === -1) index = "abcd".indexOf(key);

    if (index !== -1 && index < options.length) {
      event.preventDefault();

      if (currentMulti) {
        toggleChoice(index);
      } else {
        answerQuestion([index]);
      }
      return;
    }
  }

  // 複数選択: Enter で答え合わせ(選択肢ボタンにフォーカスがあっても、選び直しにはしない)
  if (key === "enter" && currentMulti && !answered
      && (event.target === document.body || event.target.closest(".option"))) {
    event.preventDefault();
    if (selectedSet.size > 0) submitMulti();
    return;
  }

  // ボタンにフォーカスがあるときは、ボタン本来の動作(Enter)に任せる
  if (key === "enter" && answered && !event.target.closest("button")) {
    const next = quiz.querySelector("#next");

    if (next && !next.classList.contains("hidden")) {
      event.preventDefault();
      next.click();
    }
  }
});

// ============================================================
// 初期表示
// ============================================================
soundOn = loadSoundSetting();
updateSoundButton();
renderBest();
tipIndex = Math.floor(Math.random() * tips.length);
showTip();
