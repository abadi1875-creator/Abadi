'use strict';

const agentKnowledge = {
  greetings: ['مرحباً', 'أهلاً', 'السلام', 'هاي', 'هلا', 'صباح', 'مساء'],
  price: ['سعر', 'كم', 'تكلفة', 'قيمة', 'ريال', 'مليون', 'تفاوض', 'تخفيض'],
  location: ['وين', 'أين', 'موقع', 'حي', 'منطقة', 'مكان', 'عنوان', 'طريق'],
  features: ['مميزات', 'غرف', 'حمام', 'مسبح', 'مساحة', 'تشطيب', 'مرافق', 'جراج', 'حديقة'],
  visit: ['معاينة', 'زيارة', 'مشاهدة', 'جولة', 'موعد', 'أشوف', 'أزور'],
  finance: ['تمويل', 'بنك', 'قرض', 'دفعة', 'صندوق', 'تقسيط', 'دفع', 'أقساط'],
  contact: ['تواصل', 'اتصل', 'رقم', 'واتساب', 'جوال', 'ايميل'],
  availability: ['متاح', 'موجود', 'متوفر', 'باقي', 'حجز'],
  thanks: ['شكراً', 'شكرا', 'ممنون', 'يعطيك'],
};

const agentReplies = {
  greetings: [
    'أهلاً وسهلاً! 😊 أنا سامي، مستشارك العقاري الذكي. كيف يمكنني مساعدتك في فيلتنا الفاخرة؟',
    'مرحباً! أنا هنا لأجيب على جميع استفساراتك عن هذه الفيلا الاستثنائية. بماذا تريد أن تعرف؟',
  ],
  price: [
    'السعر المطلوب هو **٣,٥٠٠,٠٠٠ ريال** 💰\n\nهذا السعر تنافسي جداً مقارنة بالعقارات المماثلة في المنطقة. يمكن التفاوض للمشترين الجادين. هل تريد ترتيب معاينة؟',
    'الفيلا مطروحة بـ **٣.٥ مليون ريال** — وهو سعر عادل جداً لهذا المستوى من التشطيب والموقع. هل تريد معرفة خيارات التمويل المتاحة؟',
  ],
  location: [
    '📍 الفيلا تقع في **موقع استراتيجي مميز** يتميز بـ:\n• ٣ دقائق من المسجد\n• ٥ دقائق من المدارس الدولية\n• ١٠ دقائق من أقرب مول\n• هدوء وخصوصية تامة\n\nهل تريد الاطلاع على الخريطة التفصيلية؟',
  ],
  features: [
    '✨ أبرز مميزات الفيلا:\n• **٦ غرف نوم** فسيحة\n• **٥ حمامات** رخام فاخر\n• **مسبح خاص** مع إضاءة ليلية\n• **حديقة** مع نظام ري أوتوماتيكي\n• **كراج** يتسع لـ٤ سيارات\n• **نظام منزل ذكي** كامل\n• **صالة رياضية** خاصة\n• **تكييف مركزي** + طاقة شمسية\n\nهل تريد معرفة المزيد عن أي ميزة؟',
  ],
  visit: [
    '📅 يسعدنا ترتيب معاينة لك في أي وقت يناسبك!\n\nلحجز موعد:\n• **واتساب:** اضغط على الزر الأخضر\n• **هاتف:** 0500 000 000\n\nأو أرسل لي اسمك ورقمك وسأنسق لك فوراً! 😊',
  ],
  finance: [
    '💳 خيارات التمويل المتاحة:\n• **نقداً** — للبيع الفوري مع إمكانية التفاوض\n• **تمويل بنكي** — نساعدك في إجراءات البنك\n• **صندوق التنمية العقاري** — مؤهلة للصندوق\n• **دفعة أولى + أقساط** — قابل للنقاش\n\nأي خيار يناسبك؟',
  ],
  contact: [
    '📞 للتواصل المباشر:\n• **واتساب:** 0500 000 000\n• **هاتف:** 0500 000 000\n• **الفريق متاح** من ٨ص حتى ١٠م يومياً\n\nأو أرسل لي طلبك وسأحوّلك للمختص فوراً!',
  ],
  availability: [
    '✅ نعم، الفيلا **متاحة حالياً** للبيع!\n\nتنبيه مهم: هناك **٢٣ شخصاً** أبدوا اهتمامهم هذا الأسبوع، و**٥ معاينات** مجدولة. أنصحك بالتصرف بسرعة. هل تريد حجز معاينة؟',
  ],
  thanks: [
    'العفو! 😊 يسعدني دائماً مساعدتك. هل لديك أي استفسار آخر عن الفيلا؟',
    'هلا فيك! أي استفسار آخر؟ 🏡',
  ],
  default: [
    'سؤال ممتاز! 🤔 لمزيد من التفاصيل حول هذا الموضوع، أنصح بالتواصل المباشر مع مستشارنا عبر:\n**واتساب: 0500 000 000**\n\nهل يمكنني مساعدتك بشيء آخر؟',
    'شكراً لسؤالك! لإجابة دقيقة ومفصلة، تفضل بالتواصل مع فريقنا مباشرة. هل تريد معرفة شيء آخر عن الفيلا؟',
  ],
};

const quickReplies = ['كم السعر؟', 'ما مميزات الفيلا؟', 'أين الموقع؟', 'أريد معاينة', 'خيارات التمويل'];

const widgetHTML = `
<div id="ai-agent-btn" class="ai-btn" title="تحدث مع مستشارنا الذكي">
  <div class="ai-btn-avatar">🤖</div>
  <div class="ai-btn-ping"></div>
  <div class="ai-tooltip">تحدث مع سامي — مستشارك الذكي</div>
</div>
<div id="ai-chat" class="ai-chat">
  <div class="ai-header">
    <div class="ai-agent-info">
      <div class="ai-avatar">🤖</div>
      <div>
        <div class="ai-name">سامي</div>
        <div class="ai-status"><span class="ai-dot"></span> مستشار ذكي — متاح الآن</div>
      </div>
    </div>
    <div class="ai-header-btns">
      <a href="https://wa.me/966500000000" target="_blank" class="ai-wa-btn" title="انتقل لواتساب">💬</a>
      <button class="ai-close-btn" id="ai-close">✕</button>
    </div>
  </div>
  <div class="ai-messages" id="ai-messages">
    <div class="ai-msg bot">
      <div class="ai-bubble">أهلاً! 👋 أنا <strong>سامي</strong>، مستشارك العقاري الذكي.<br>يسعدني الإجابة على جميع استفساراتك عن هذه الفيلا الاستثنائية.<br><br>بماذا يمكنني مساعدتك؟</div>
      <div class="ai-time">الآن</div>
    </div>
  </div>
  <div class="ai-quick" id="ai-quick">
    ${quickReplies.map(r => `<button class="ai-quick-btn">${r}</button>`).join('')}
  </div>
  <div class="ai-input-area">
    <input type="text" id="ai-input" placeholder="اكتب سؤالك هنا..." autocomplete="off">
    <button id="ai-send" class="ai-send-btn">➤</button>
  </div>
</div>
`;

const widgetStyle = `
<style>
.ai-btn { position: fixed; bottom: 165px; left: 24px; width: 58px; height: 58px; background: linear-gradient(135deg, #1a3c5e, #2a5280); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 800; box-shadow: 0 6px 25px rgba(26,60,94,0.5); transition: all 0.3s ease; animation: ai-float 3s ease-in-out infinite; }
.ai-btn:hover { transform: scale(1.1); }
@keyframes ai-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.ai-btn-avatar { font-size: 26px; }
.ai-btn-ping { position: absolute; top: -3px; right: -3px; width: 16px; height: 16px; background: #ef4444; border-radius: 50%; border: 2px solid #fff; animation: ping-anim 1.5s infinite; }
@keyframes ping-anim { 0%{box-shadow:0 0 0 0 rgba(239,68,68,0.5)} 100%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
.ai-tooltip { position: absolute; left: 68px; background: #1a3c5e; color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.3s; font-family: 'Cairo', sans-serif; }
.ai-btn:hover .ai-tooltip { opacity: 1; }
.ai-chat { position: fixed; bottom: 20px; left: 20px; width: 360px; background: #0f0f0f; border: 1px solid rgba(201,168,76,0.2); border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); z-index: 900; display: flex; flex-direction: column; max-height: 540px; transform: scale(0.8) translateY(30px); transform-origin: bottom left; opacity: 0; pointer-events: none; transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); font-family: 'Cairo', sans-serif; direction: rtl; }
.ai-chat.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
.ai-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: linear-gradient(135deg, #1a3c5e, #0f2540); border-radius: 20px 20px 0 0; border-bottom: 1px solid rgba(201,168,76,0.15); flex-shrink: 0; }
.ai-agent-info { display: flex; align-items: center; gap: 10px; }
.ai-avatar { width: 42px; height: 42px; background: linear-gradient(135deg, #c9a84c, #9a7a2e); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.ai-name { font-size: 15px; font-weight: 800; color: #fff; }
.ai-status { font-size: 11px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
.ai-dot { width: 7px; height: 7px; background: #25d366; border-radius: 50%; animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
.ai-header-btns { display: flex; gap: 8px; }
.ai-wa-btn { width: 32px; height: 32px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: transform 0.2s; text-decoration: none; }
.ai-wa-btn:hover { transform: scale(1.1); }
.ai-close-btn { width: 32px; height: 32px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; }
.ai-close-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
.ai-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; scrollbar-width: thin; scrollbar-color: #333 transparent; }
.ai-messages::-webkit-scrollbar { width: 4px; }
.ai-messages::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
.ai-msg { display: flex; flex-direction: column; gap: 4px; }
.ai-msg.bot { align-items: flex-end; }
.ai-msg.user { align-items: flex-start; }
.ai-bubble { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.7; white-space: pre-line; }
.ai-msg.bot .ai-bubble { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); border-bottom-right-radius: 4px; }
.ai-msg.user .ai-bubble { background: linear-gradient(135deg, #c9a84c, #9a7a2e); color: #000; font-weight: 600; border-bottom-left-radius: 4px; }
.ai-time { font-size: 10px; color: rgba(255,255,255,0.3); padding: 0 4px; }
.typing-indicator .ai-bubble { display: flex; gap: 5px; align-items: center; padding: 12px 16px; }
.typing-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: typing-bounce 1.2s infinite; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
.ai-quick { display: flex; flex-wrap: wrap; gap: 7px; padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
.ai-quick-btn { background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25); color: #c9a84c; padding: 5px 11px; border-radius: 20px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: 'Cairo', sans-serif; transition: all 0.2s; white-space: nowrap; }
.ai-quick-btn:hover { background: rgba(201,168,76,0.2); border-color: #c9a84c; }
.ai-input-area { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0; }
#ai-input { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 25px; padding: 9px 16px; color: #fff; font-family: 'Cairo', sans-serif; font-size: 13px; outline: none; direction: rtl; transition: border-color 0.2s; }
#ai-input:focus { border-color: rgba(201,168,76,0.4); }
#ai-input::placeholder { color: rgba(255,255,255,0.3); }
.ai-send-btn { width: 38px; height: 38px; background: linear-gradient(135deg, #c9a84c, #9a7a2e); border: none; border-radius: 50%; color: #000; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0; }
.ai-send-btn:hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(201,168,76,0.4); }
@media (max-width: 480px) { .ai-chat { width: calc(100vw - 20px); left: 10px; bottom: 10px; } .ai-btn { bottom: 150px; } }
</style>
`;

document.head.insertAdjacentHTML('beforeend', widgetStyle);
document.body.insertAdjacentHTML('beforeend', widgetHTML);

const agentBtn = document.getElementById('ai-agent-btn');
const agentChat = document.getElementById('ai-chat');
const closeBtn = document.getElementById('ai-close');
const messagesEl = document.getElementById('ai-messages');
const inputEl = document.getElementById('ai-input');
const sendBtn = document.getElementById('ai-send');
const quickEl = document.getElementById('ai-quick');

agentBtn.addEventListener('click', () => {
  agentChat.classList.toggle('open');
  if (agentChat.classList.contains('open')) {
    agentBtn.style.opacity = '0';
    agentBtn.style.pointerEvents = 'none';
    setTimeout(() => inputEl.focus(), 400);
  }
});

closeBtn.addEventListener('click', () => {
  agentChat.classList.remove('open');
  agentBtn.style.opacity = '1';
  agentBtn.style.pointerEvents = 'all';
});

function detectIntent(text) {
  const lower = text.toLowerCase();
  for (const [intent, keywords] of Object.entries(agentKnowledge)) {
    if (keywords.some(kw => lower.includes(kw))) return intent;
  }
  return 'default';
}

function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function getTime() {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function addMessage(text, isBot) {
  const div = document.createElement('div');
  div.className = `ai-msg ${isBot ? 'bot' : 'user'}`;
  div.innerHTML = `<div class="ai-bubble">${text}</div><div class="ai-time">${getTime()}</div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'ai-msg bot typing-indicator';
  div.id = 'typing';
  div.innerHTML = `<div class="ai-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

function respond(userText) {
  addMessage(userText, false);
  quickEl.style.display = 'none';
  showTyping();
  const intent = detectIntent(userText);
  const replies = agentReplies[intent] || agentReplies.default;
  const reply = getRandom(replies);
  const delay = 800 + Math.random() * 600;
  setTimeout(() => { removeTyping(); addMessage(reply, true); }, delay);
}

sendBtn.addEventListener('click', () => {
  const txt = inputEl.value.trim();
  if (!txt) return;
  inputEl.value = '';
  respond(txt);
});

inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendBtn.click(); });

document.querySelectorAll('.ai-quick-btn').forEach(btn => {
  btn.addEventListener('click', () => respond(btn.textContent));
});

setTimeout(() => {
  if (!agentChat.classList.contains('open')) {
    agentChat.classList.add('open');
    agentBtn.style.opacity = '0';
    agentBtn.style.pointerEvents = 'none';
  }
}, 8000);