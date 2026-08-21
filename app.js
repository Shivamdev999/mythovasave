/* ==========================================================================
   MYTHOVA // AI SECOND BRAIN - INTERACTIVE ENGINE & INTELLIGENCE SIMULATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIngestionSimulator();
  initChatAssistant();
  initFaqAccordion();
});

// Ingestion Simulator Dataset (Telegram Ingest -> Notion Document)
// TikTok has been completely removed. Supported: Instagram, YouTube, X (Twitter)
const ingestionData = {
  instagram: {
    platform: 'Instagram Reel',
    platformIcon: 'instagram',
    url: 'https://instagram.com/reel/C8x9_viral_hook',
    title: '3-Second Visual Contrast Retention Hook',
    author: '@creatoreconomy',
    duration: '0:42',
    date: 'Just now',
    tags: ['#HookDesign', '#VideoEditing', '#RetentionHacks'],
    summary: 'Pattern interruption formula combining a 1.8-second 12% camera push-in, on-screen bold text pop, and high-frequency sound hit to spike initial 3-second retention past 85%.',
    transcript: '"If your first 3 seconds don\'t trigger immediate visual and audio pattern interruption, retention drops below 20%. Here is the exact 3-step formula: First, cut straight to the visual climax. Second, place high-contrast text directly at eye level. Third, duck background audio by -6dB..."',
    actionSteps: [
      'Apply 3-frame jump cut on 0:00.8 mark of video timeline.',
      'Set bold text animation with 0.15s spring in Premiere/CapCut.',
      'Drop sub-bass whoosh audio effect on frame 1.'
    ]
  },
  youtube: {
    platform: 'YouTube Shorts',
    platformIcon: 'youtube',
    url: 'https://youtube.com/shorts/ai_agent_pipeline_60s',
    title: 'Autonomous Multi-Agent Architecture for Content',
    author: 'AI Engineering Lab',
    duration: '0:58',
    date: 'Just now',
    tags: ['#AIAgents', '#SystemDesign', '#Mythova'],
    summary: 'Orchestrator-Worker agent pattern reducing hallucinations and automating multi-step audio transcription, Notion database categorization, and social asset generation.',
    transcript: '"Stop using single monolithic prompts for complex tasks. Route content through a dedicated Telegram orchestrator agent that delegates sub-tasks to specialized worker nodes for speech-to-text, synthesis, and database sync..."',
    actionSteps: [
      'Set webhook listener on Telegram bot token.',
      'Pipe audio payload to Whisper API for transcription.',
      'Map JSON structured payload to Notion database properties.'
    ]
  },
  twitter: {
    platform: 'X (Twitter) Thread',
    platformIcon: 'twitter',
    url: 'https://x.com/GrowthFounders/status/18294729',
    title: '10 High-Converting Landing Page Rules for SaaS',
    author: '@GrowthFounders',
    duration: 'Text Thread',
    date: 'Just now',
    tags: ['#ConversionRate', '#Copywriting', '#Growth'],
    summary: '10-part tactical breakdown for reducing bounce rate and boosting waitlist conversions through line-by-line clarity and scarcity-driven CTA placement.',
    actionSteps: [
      'Ensure single primary CTA above the hero fold.',
      'Address the silent customer objection directly in Section 2.',
      'Simulate the end product before asking for contact info.'
    ],
    transcript: '"1. One primary CTA above the fold. 2. Address the silent objection immediately. 3. Frame features strictly as time or revenue multipliers. 4. Use interactive simulators instead of static mockups..."'
  }
};

let currentIngestType = 'instagram';

function initIngestionSimulator() {
  const tabs = document.querySelectorAll('.ingest-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active', 'border-[#00FF66]', 'text-[#00FF66]', 'bg-[#00FF66]/10'));
      tabs.forEach(t => t.classList.add('text-neutral-400', 'border-transparent'));

      tab.classList.add('active', 'border-[#00FF66]', 'text-[#00FF66]', 'bg-[#00FF66]/10');
      tab.classList.remove('text-neutral-400', 'border-transparent');

      currentIngestType = tab.getAttribute('data-type');
      runIngestionSimulation(currentIngestType);
    });
  });

  const sendBtn = document.getElementById('tgSendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      runIngestionSimulation(currentIngestType);
    });
  }
}

function runIngestionSimulation(type) {
  const data = ingestionData[type] || ingestionData.instagram;
  const userMsgEl = document.getElementById('tgUserMsg');
  const typingEl = document.getElementById('tgTypingIndicator');
  const botReplyEl = document.getElementById('tgBotReply');
  const botReplyText = document.getElementById('tgBotReplyText');
  const tgInputEl = document.getElementById('tgInput');
  const notionPane = document.getElementById('notionDocPane');

  if (tgInputEl) tgInputEl.value = data.url;
  if (userMsgEl) userMsgEl.innerText = data.url;

  // Reset states
  if (botReplyEl) botReplyEl.classList.add('hidden');
  if (typingEl) typingEl.classList.remove('hidden');
  if (notionPane) notionPane.style.opacity = '0.35';

  // Step 1: Typing & Processing
  setTimeout(() => {
    if (typingEl) typingEl.classList.add('hidden');
    if (botReplyEl) {
      botReplyEl.classList.remove('hidden');
      botReplyText.innerHTML = `
        <div class="space-y-1.5">
          <p class="font-bold text-[#00FF66] flex items-center gap-1.5 text-xs">
            <span>⚡ Ingestion Complete (1.2s)</span>
          </p>
          <p class="text-xs text-neutral-200 font-sans">
            <strong>Extracted:</strong> "${data.title}"<br>
            <strong>Synced to:</strong> <code>Mythova Second Brain / Inbox</code><br>
            <strong>Tags:</strong> ${data.tags.join(' ')}
          </p>
        </div>
      `;
    }

    // Step 2: Populate Notion Workspace Card
    if (notionPane) {
      notionPane.style.opacity = '1';
      document.getElementById('notionTitle').innerText = data.title;
      document.getElementById('notionPlatform').innerText = data.platform;
      document.getElementById('notionCreator').innerText = data.author;
      document.getElementById('notionDuration').innerText = data.duration;
      document.getElementById('notionDate').innerText = data.date;
      document.getElementById('notionSummary').innerText = data.summary;
      document.getElementById('notionTranscript').innerText = data.transcript;

      const tagsContainer = document.getElementById('notionTags');
      if (tagsContainer) {
        tagsContainer.innerHTML = data.tags.map(t => 
          `<span class="notion-tag-pill bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20">${t}</span>`
        ).join('');
      }

      const actionsContainer = document.getElementById('notionActionSteps');
      if (actionsContainer) {
        actionsContainer.innerHTML = data.actionSteps.map(step => 
          `<li class="flex items-start gap-2 text-xs text-neutral-300">
            <span class="text-[#00FF66] font-bold">✓</span>
            <span>${step}</span>
           </li>`
        ).join('');
      }
    }
  }, 900);
}

// ============================================================================
// CONVERSATIONAL AI QUERY ASSISTANT (Chat with your saved Notion data)
// ============================================================================

const queryResponses = {
  stats: {
    user: "📊 Is week kitne posts save kiye aur kahan se?",
    bot: `
      <div class="space-y-2 text-xs">
        <p class="font-bold text-[#00FF66] font-mono">📊 Mythova Intelligence • Weekly Report</p>
        <p class="text-neutral-200">Aapne is hafte total <strong>32 pieces of content</strong> save kiye hain (+42% vs last week):</p>
        <div class="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1 font-mono text-[11px]">
          <div class="flex justify-between text-neutral-300"><span>📱 Instagram Reels:</span> <span class="text-[#00FF66] font-bold">18 saves</span></div>
          <div class="flex justify-between text-neutral-300"><span>🔴 YouTube Shorts:</span> <span class="text-[#00FF66] font-bold">9 saves</span></div>
          <div class="flex justify-between text-neutral-300"><span>🐦 X (Twitter) Threads:</span> <span class="text-[#00FF66] font-bold">5 saves</span></div>
        </div>
        <p class="text-neutral-400 text-[11px]">🔥 <strong>Top Category:</strong> #HookDesign & #Retention (14 clips)</p>
      </div>
    `
  },
  hook: {
    user: "💡 Mujhe SaaS video ke liye retention hook chahiye mere saved reels se.",
    bot: `
      <div class="space-y-2 text-xs">
        <p class="font-bold text-[#00FF66] font-mono">💡 2 Matching Hooks Found in Your Saved Notion Database:</p>
        <div class="p-2.5 rounded-lg bg-black/60 border border-[#00FF66]/30 space-y-1.5">
          <p class="text-white font-bold text-[11px]">1. The Visual Pattern Interruption (Saved Tuesday from @creatoreconomy):</p>
          <p class="text-neutral-300 text-[11px] italic">"Stop using single prompts for complex tasks..."</p>
          <p class="text-[#00FF66] text-[11px]">↳ Action: 1.8s rapid camera push-in + text pop at eye level.</p>
        </div>
        <div class="p-2.5 rounded-lg bg-black/60 border border-white/10 space-y-1">
          <p class="text-white font-bold text-[11px]">2. The Contrarian Claim (Saved Aug 14 from @GrowthFounders):</p>
          <p class="text-neutral-300 text-[11px] italic">"90% of SaaS founders make this single landing page mistake..."</p>
        </div>
        <p class="text-neutral-400 text-[11px]">📁 <span class="underline text-[#00FF66]">Open Notion Brief #104</span> for ready-to-use timeline presets.</p>
      </div>
    `
  },
  search: {
    user: "🔍 Find that video editing transition hack I saved 2 weeks ago.",
    bot: `
      <div class="space-y-2 text-xs">
        <p class="font-bold text-[#00FF66] font-mono">🔍 Exact Match Retrieved from Your Archive:</p>
        <div class="p-3 rounded-lg bg-black/60 border border-[#00FF66]/40 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white text-[11px]">"Dynamic Speed Ramp & Audio Ducking"</span>
            <span class="text-[10px] text-[#00FF66] font-mono">Instagram @creatoreconomy</span>
          </div>
          <p class="text-neutral-300 text-[11px]">
            <strong>Key Technique:</strong> 120fps clip ramped to 300% on motion beat + -8dB low-pass audio filter transition.
          </p>
          <p class="text-neutral-400 text-[10px] font-mono">Saved on: August 08 • Tag: #VideoEditing</p>
        </div>
        <p class="text-neutral-300 text-[11px]">Preset timeline project file Notion me linked hai!</p>
      </div>
    `
  }
};

function initChatAssistant() {
  const queryBtns = document.querySelectorAll('.chat-query-btn');
  queryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const qType = btn.getAttribute('data-query');
      executeAssistantQuery(qType);
    });
  });

  const customSend = document.getElementById('chatAssistantSend');
  const customInput = document.getElementById('chatAssistantInput');
  if (customSend && customInput) {
    customSend.addEventListener('click', () => {
      const val = customInput.value.trim();
      if (!val) return;
      
      let matchedKey = 'hook';
      if (val.toLowerCase().includes('week') || val.toLowerCase().includes('save') || val.toLowerCase().includes('kitne')) {
        matchedKey = 'stats';
      } else if (val.toLowerCase().includes('tutorial') || val.toLowerCase().includes('transition') || val.toLowerCase().includes('find')) {
        matchedKey = 'search';
      }
      
      executeCustomAssistantQuery(val, queryResponses[matchedKey].bot);
      customInput.value = '';
    });
  }
}

function executeAssistantQuery(qType) {
  const responseData = queryResponses[qType] || queryResponses.stats;
  const chatFeed = document.getElementById('assistantChatFeed');
  if (!chatFeed) return;

  const userHtml = `
    <div class="flex justify-end animate-fade-in">
      <div class="telegram-bubble-user p-3 max-w-[85%] text-xs">
        <p>${responseData.user}</p>
        <span class="text-[9px] text-neutral-300 float-right mt-1 ml-2 font-mono">Just now ✓✓</span>
      </div>
    </div>
  `;
  chatFeed.insertAdjacentHTML('beforeend', userHtml);
  chatFeed.scrollTop = chatFeed.scrollHeight;

  const typingId = 'typing_' + Date.now();
  const typingHtml = `
    <div id="${typingId}" class="flex items-center gap-2 animate-fade-in">
      <div class="telegram-bubble-bot p-3 flex items-center gap-1.5">
        <div class="telegram-typing-dot"></div>
        <div class="telegram-typing-dot"></div>
        <div class="telegram-typing-dot"></div>
      </div>
    </div>
  `;
  chatFeed.insertAdjacentHTML('beforeend', typingHtml);
  chatFeed.scrollTop = chatFeed.scrollHeight;

  setTimeout(() => {
    const typingNode = document.getElementById(typingId);
    if (typingNode) typingNode.remove();

    const botHtml = `
      <div class="flex items-start gap-2.5 animate-fade-in">
        <div class="w-7 h-7 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] flex-shrink-0 text-xs">
          ⚡
        </div>
        <div class="telegram-bubble-bot p-3.5 max-w-[90%] border border-white/10 shadow-lg">
          ${responseData.bot}
          <span class="text-[9px] text-[#888888] block text-right mt-2 font-mono">Mythova AI Agent • Just now</span>
        </div>
      </div>
    `;
    chatFeed.insertAdjacentHTML('beforeend', botHtml);
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }, 800);
}

function executeCustomAssistantQuery(customText, botReplyHtml) {
  const chatFeed = document.getElementById('assistantChatFeed');
  if (!chatFeed) return;

  const userHtml = `
    <div class="flex justify-end animate-fade-in">
      <div class="telegram-bubble-user p-3 max-w-[85%] text-xs">
        <p>${escapeHtml(customText)}</p>
        <span class="text-[9px] text-neutral-300 float-right mt-1 ml-2 font-mono">Just now ✓✓</span>
      </div>
    </div>
  `;
  chatFeed.insertAdjacentHTML('beforeend', userHtml);
  chatFeed.scrollTop = chatFeed.scrollHeight;

  const typingId = 'typing_' + Date.now();
  const typingHtml = `
    <div id="${typingId}" class="flex items-center gap-2 animate-fade-in">
      <div class="telegram-bubble-bot p-3 flex items-center gap-1.5">
        <div class="telegram-typing-dot"></div>
        <div class="telegram-typing-dot"></div>
        <div class="telegram-typing-dot"></div>
      </div>
    </div>
  `;
  chatFeed.insertAdjacentHTML('beforeend', typingHtml);
  chatFeed.scrollTop = chatFeed.scrollHeight;

  setTimeout(() => {
    const typingNode = document.getElementById(typingId);
    if (typingNode) typingNode.remove();

    const botHtml = `
      <div class="flex items-start gap-2.5 animate-fade-in">
        <div class="w-7 h-7 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] flex-shrink-0 text-xs">
          ⚡
        </div>
        <div class="telegram-bubble-bot p-3.5 max-w-[90%] border border-white/10 shadow-lg">
          ${botReplyHtml}
          <span class="text-[9px] text-[#888888] block text-right mt-2 font-mono">Mythova AI Agent • Just now</span>
        </div>
      </div>
    `;
    chatFeed.insertAdjacentHTML('beforeend', botHtml);
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }, 800);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const content = i.querySelector('.faq-content');
        const icon = i.querySelector('.faq-icon');
        if (content) content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        if (content) content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
