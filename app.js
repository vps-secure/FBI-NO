// BTC Login Key format
const SECRET_BTC_KEY = "0x11112006_DEAD_BEEF_SECRET_DETECTIVE";

// Hidden Killer Secret Code (Only Known To You)
const WINNING_CODE = "DR_JULIAN_THORNE_0x1111_SOLVED";

// File System with embedded puzzles
const fileSystem = {
  "Root": {
    "System_Logs.git": {
      "COMMIT_20061111.txt": "DELETED COMMIT #441: 'Cleaned crime scene traces at 11:11 PM. Key cipher location: /Evidence/Photo_Exif.img'"
    },
    "Evidence_Files": {
      "Photo_Exif.img": "[CORRUPTED EXIF DATA] Coordinates: 33.5731 N, 7.5898 W | Cipher: 'VIGENERE_KEY_THORNE'",
      "Autopsy_Report.txt": "Victim: Eleanor Vance. Time of death: 11:11 PM (11/11/2006). Cause: Toxic substance matching Dr. Thorne's clinical inventory."
    },
    "Suspects_20_Matrix.txt": "1. Arthur Pendelton (Hacker)\n2. Dr. Julian Thorne (Physician)\n3. Vivian Cross (Friend)\n4. Marcus Vance (Brother)... [20 Suspects Logged]"
  }
};

function attemptLogin() {
  const input = document.getElementById("btc-key-input").value.trim();
  if (input === SECRET_BTC_KEY) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("desktop-screen").classList.remove("hidden");
    renderFileSystem();
    initSuspectsList();
  } else {
    document.getElementById("login-error").innerText = "ACCESS DENIED: INCORRECT BTC KEY.";
  }
}

function openWindow(id) { document.getElementById(id).classList.remove("hidden"); }
function closeWindow(id) { document.getElementById(id).classList.add("hidden"); }

function renderFileSystem() {
  const container = document.getElementById("file-system-container");
  container.innerHTML = "<h3>C:\\Drive Archives</h3><hr><br>";
  
  function walk(obj, path = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        container.innerHTML += `<div style="margin-top:8px;"><strong>📁 ${path}/${key}</strong></div>`;
        walk(obj[key], path + "/" + key);
      } else {
        container.innerHTML += `<div style="margin-left:15px; margin-top:4px;">📄 <strong>${key}</strong>: <span style="color:#444;">${obj[key]}</span></div>`;
      }
    }
  }
  walk(fileSystem["Root"], "C:");
}

const suspects = [
  "Arthur Pendelton", "Dr. Julian Thorne", "Vivian Cross", "Marcus Vance",
  "Samantha Blake", "Officer Miller", "Evelyn Reed", "Damian Vance",
  "Chloe Bennett", "Lucas Cole", "Nora Vance", "Ethan Hunt",
  "Sophia Loren", "Oliver Queen", "Emma Watson", "Liam Neeson",
  "Mia Wallace", "Noah Centineo", "Ava Gardner", "Jackson Teller"
];

function initSuspectsList() {
  const list = document.getElementById("suspects-list");
  list.innerHTML = suspects.map(s => `<div style="padding:6px; border-bottom:1px solid #ddd; cursor:pointer;" onclick="selectSuspect('${s}')">👤 ${s}</div>`).join('');
}

let currentSuspect = "Dr. Julian Thorne";
function selectSuspect(name) {
  currentSuspect = name;
  const history = document.getElementById("chat-messages");
  history.innerHTML += `<div style="color:#0055ea; margin-top:5px;"><em>--- Connected to chat with ${name} ---</em></div>`;
}

function handleSmsKey(e) { if(e.key === 'Enter') sendSms(); }

function sendSms() {
  const input = document.getElementById("sms-input");
  const history = document.getElementById("chat-messages");
  const val = input.value.trim();
  if (!val) return;

  history.innerHTML += `<div><strong>You:</strong> ${val}</div>`;
  
  setTimeout(() => {
    if (val.toLowerCase().includes("11:11") || val.toLowerCase().includes("eleanor")) {
      history.innerHTML += `<div style="color:#b22222;"><strong>${currentSuspect}:</strong> Why are you asking about 11:11 PM? That file was supposed to be deleted!</div>`;
    } else {
      history.innerHTML += `<div><strong>${currentSuspect}:</strong> I have nothing to say about that.</div>`;
    }
    history.scrollTop = history.scrollHeight;
  }, 800);

  input.value = "";
}

function verifyKiller() {
  const code = document.getElementById("final-code-input").value.trim();
  const output = document.getElementById("terminal-output");
  
  if (code === WINNING_CODE) {
    output.style.color = "#00ff00";
    output.innerText = "VERIFICATION SUCCESSFUL! ACCUSATION CONFIRMED.";
    setTimeout(() => {
      document.getElementById("reward-modal").classList.remove("hidden");
    }, 1200);
  } else {
    output.style.color = "#ff4444";
    output.innerText = "ERROR: INCORRECT KILLER CODE OR KEY PASSCODE.";
  }
}

