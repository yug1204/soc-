const QUIZ_DATA = {
  1: [
    { q: "Which OSI layer is responsible for routing packets?", opts: ["Data Link", "Network", "Transport", "Physical"], ans: 1 },
    { q: "What is the primary PDU (Protocol Data Unit) of the Transport layer?", opts: ["Frame", "Packet", "Segment", "Bit"], ans: 2 },
    { q: "Which layer handles MAC addresses?", opts: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"], ans: 1 },
    { q: "HTTP, FTP, and DNS operate at which layer of the OSI model?", opts: ["Layer 7 (Application)", "Layer 6 (Presentation)", "Layer 5 (Session)", "Layer 4 (Transport)"], ans: 0 },
    { q: "Which layer is responsible for encrypting and decrypting data?", opts: ["Session", "Presentation", "Application", "Transport"], ans: 1 },
    { q: "A switch primarily operates at which OSI layer?", opts: ["Physical", "Data Link", "Network", "Transport"], ans: 1 },
    { q: "A router operates at which OSI layer?", opts: ["Physical", "Data Link", "Network", "Application"], ans: 2 },
    { q: "Which protocol operates at the Transport layer to provide reliable delivery?", opts: ["UDP", "IP", "TCP", "ICMP"], ans: 2 },
    { q: "Which of these is NOT an OSI layer?", opts: ["Session", "Internet", "Presentation", "Data Link"], ans: 1 },
    { q: "What does the Physical layer transmit?", opts: ["Packets", "Frames", "Segments", "Bits"], ans: 3 },
    { q: "At which layer does IP (Internet Protocol) reside?", opts: ["Network", "Transport", "Data Link", "Session"], ans: 0 },
    { q: "Establishing, maintaining, and terminating connections is the job of which layer?", opts: ["Application", "Presentation", "Session", "Transport"], ans: 2 },
    { q: "Which layer ensures error-free transmission of frames over the physical medium?", opts: ["Physical", "Data Link", "Network", "Transport"], ans: 1 },
    { q: "What is the primary function of Layer 7?", opts: ["Routing", "Error checking", "End-user applications interaction", "Data representation"], ans: 2 },
    { q: "UDP is considered a connectionless protocol. What layer does it belong to?", opts: ["Network", "Transport", "Session", "Data Link"], ans: 1 },
    { q: "Which layer translates data into a mutually agreed-upon format (e.g., ASCII, JPEG)?", opts: ["Application", "Presentation", "Session", "Network"], ans: 1 },
    { q: "What is the PDU for Layer 3 (Network)?", opts: ["Bit", "Frame", "Packet", "Segment"], ans: 2 },
    { q: "Hubs operate at which OSI layer?", opts: ["Physical", "Data Link", "Network", "Transport"], ans: 0 },
    { q: "Which layer provides logical addressing (IP addresses)?", opts: ["Data Link", "Network", "Transport", "Session"], ans: 1 },
    { q: "Why is the OSI model important for a SOC Analyst?", opts: ["It's required for programming", "It helps pinpoint where a network attack is occurring", "It makes computers run faster", "It replaces the TCP/IP model entirely"], ans: 1 }
  ]
};

let currentQuizDay = null;
let currentQuestionIndex = 0;
let currentScore = 0;
let pendingXp = 0;

function startQuiz(dayNum, xp) {
  if (!QUIZ_DATA[dayNum]) {
    window.completeDay(dayNum, xp);
    return;
  }
  
  currentQuizDay = dayNum;
  currentQuestionIndex = 0;
  currentScore = 0;
  pendingXp = xp;
  
  document.getElementById('quiz-modal').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const quiz = QUIZ_DATA[currentQuizDay];
  const qData = quiz[currentQuestionIndex];
  
  const content = document.getElementById('quiz-content');
  
  let html = `
    <div class="quiz-header">
      <h2>Day ${currentQuizDay} Knowledge Check</h2>
      <div class="quiz-progress">Question ${currentQuestionIndex + 1} of ${quiz.length}</div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${((currentQuestionIndex) / quiz.length) * 100}%"></div>
      </div>
    </div>
    
    <div class="quiz-question">${qData.q}</div>
    <div class="quiz-options">
      ${qData.opts.map((opt, i) => `
        <button class="quiz-opt-btn" onclick="selectAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
  `;
  
  content.innerHTML = html;
}

function selectAnswer(index) {
  const quiz = QUIZ_DATA[currentQuizDay];
  const correct = quiz[currentQuestionIndex].ans;
  
  const btns = document.querySelectorAll('.quiz-opt-btn');
  
  btns.forEach(b => b.disabled = true);
  
  if (index === correct) {
    btns[index].classList.add('correct');
    currentScore++;
  } else {
    btns[index].classList.add('wrong');
    btns[correct].classList.add('correct');
  }
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
      renderQuestion();
    } else {
      showQuizResults();
    }
  }, 1200);
}

function showQuizResults() {
  const quiz = QUIZ_DATA[currentQuizDay];
  const content = document.getElementById('quiz-content');
  const passingScore = Math.ceil(quiz.length * 0.7);
  const passed = currentScore >= passingScore;
  
  let html = `
    <div class="quiz-results">
      <h2>Quiz Complete!</h2>
      <div class="quiz-score ${passed ? 'pass' : 'fail'}">${currentScore} / ${quiz.length}</div>
      <p>${passed ? 'Awesome job! You passed the assessment.' : 'You need at least 70% to pass. Review the material and try again!'}</p>
      
      <div class="quiz-actions">
        ${passed 
          ? `<button class="quiz-btn primary" onclick="finishPassedQuiz()">Claim ${pendingXp} XP & Complete Day</button>`
          : `<button class="quiz-btn warning" onclick="startQuiz(currentQuizDay, pendingXp)">Retry Quiz</button>
             <button class="quiz-btn secondary" onclick="closeQuiz()">Review Material</button>`
        }
      </div>
    </div>
  `;
  
  content.innerHTML = html;
}

window.finishPassedQuiz = function() {
  document.getElementById('quiz-modal').classList.add('hidden');
  window.completeDay(currentQuizDay, pendingXp);
}

window.closeQuiz = function() {
  document.getElementById('quiz-modal').classList.add('hidden');
}

window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
