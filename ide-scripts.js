// Initialize CodeMirror Editor
const editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    lineNumbers: true,
    mode: "python",
    theme: "default",
    matchBrackets: true,
    autoCloseBrackets: true
});

// Language mode mapping
const languageModes = {
    'python': 'python',
    'javascript': 'javascript',
    'java': 'text/x-java',
    'cpp': 'text/x-c++src',
    'c': 'text/x-csrc'
};

// Language selector change handler
document.getElementById('languageSelector').addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    editor.setOption('mode', languageModes[selectedLanguage]);
});

// Analysis button handler
document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const code = editor.getValue();
    
    if (!code.trim()) {
        alert('Please enter some code to analyze');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });

        const data = await response.json();
        document.getElementById('analysisResult').textContent = data.analysis;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('analysisResult').textContent = 'Error analyzing code. Check console for details.';
    }
});

// Word count checker
function checkWordCount() {
    const explanation = document.getElementById('explanation').value;
    const words = explanation.trim().split(/\s+/);
    const wordCount = words.length;
    const warning = document.getElementById('warning');
    const submitBtn = document.getElementById('submitBtn');

    if (wordCount >= 50) {
        warning.classList.remove('red');
        warning.classList.add('green');
        warning.textContent = 'Good to go!';
        submitBtn.disabled = false;
    } else {
        warning.classList.remove('green');
        warning.classList.add('red');
        warning.textContent = `* Explanation should have at least 50 words. Current count: ${wordCount}`;
        submitBtn.disabled = true;
    }
}

// Placeholder functions
function runCode() {
    alert('Run Code functionality is currently a placeholder!');
}

function debugCode() {
    alert('Debug functionality is currently a placeholder!');
}

// // Disable copy-paste
// document.addEventListener('copy', (e) => {
//     e.preventDefault();
//     alert("Copy function is disabled on this page.");
// });

// document.addEventListener('paste', (e) => {
//     e.preventDefault();
//     alert("Paste function is disabled on this page.");
// });