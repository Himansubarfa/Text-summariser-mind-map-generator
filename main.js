// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    
    // Auth elements
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const loginSwitch = document.getElementById('login-switch');
    const signupSwitch = document.getElementById('signup-switch');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userNameDisplay = document.getElementById('user-name');
    
    // App elements
    const topicInput = document.getElementById('topic-input');
    const contentInput = document.getElementById('content-input');
    const summarizeBtn = document.getElementById('summarize-btn');
    const summaryBox = document.getElementById('summary-box');
    const summaryText = document.getElementById('summary-text');
    const generateMindmapBtn = document.getElementById('generate-mindmap-btn');
    const mindmapSection = document.getElementById('mindmap-section');
    const mindmapCanvas = document.getElementById('mindmap-canvas');
    
    // ==========================================
    // DATA STORAGE
    // ==========================================
    
    // In-memory data storage (instead of localStorage)
    let users = [
        { name: "Demo User", email: "demo@example.com", password: "password123" }
    ];
    let currentUser = null;
    
    // ==========================================
    // AUTHENTICATION FUNCTIONALITY
    // ==========================================
    
    // Auth form switch functionality
    loginSwitch.addEventListener('click', () => {
        loginSwitch.classList.add('active');
        signupSwitch.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });

    signupSwitch.addEventListener('click', () => {
        signupSwitch.classList.add('active');
        loginSwitch.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    // Signup functionality
    signupBtn.addEventListener('click', () => {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        if (users.some(user => user.email === email)) {
            alert('Email already in use');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        
        // Auto login after signup
        currentUser = newUser;
        showApp();
    });

    // Login functionality
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            showApp();
        } else {
            alert('Invalid email or password');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        authContainer.style.display = 'flex';
        appContainer.style.display = 'none';
        resetAppState();
    });

    // Reset app to initial state
    function resetAppState() {
        topicInput.value = '';
        contentInput.value = '';
        summaryBox.style.display = 'none';
        mindmapSection.style.display = 'none';
    }

    // Show app after successful authentication
    function showApp() {
        authContainer.style.display = 'none';
        appContainer.style.display = 'block';
        userNameDisplay.textContent = currentUser.name;
        
        // Clear auth form fields
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
    }
    
    // ==========================================
    // CONTENT SUMMARIZATION FUNCTIONALITY
    // ==========================================
    
    // Content summarization button handler
    summarizeBtn.addEventListener('click', () => {
        const content = contentInput.value.trim();
        
        if (!content) {
            alert('Please enter some content to summarize');
            return;
        }
        
        // Simple summarization algorithm
        const summary = summarizeContent(content);
        
        summaryText.textContent = summary;
        summaryBox.style.display = 'block';
    });

    // Simple content summarization function
    function summarizeContent(text) {
        // Split text into sentences
        const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        
        // If there are only a few sentences, return them all
        if (sentences.length <= 3) {
            return text;
        }
        
        // Extract key sentences (first, last, and one from the middle)
        const keyPoints = [
            sentences[0],
            sentences[Math.floor(sentences.length / 2)],
            sentences[sentences.length - 1]
        ];
        
        // Join the key sentences
        return keyPoints.join(' ');
    }
    
    // ==========================================
    // MIND MAP FUNCTIONALITY
    // ==========================================
    
    // Mind map generation button handler
    generateMindmapBtn.addEventListener('click', () => {
        const summary = summaryText.textContent;
        const topic = topicInput.value.trim() || "Main Topic";
        
        if (!summary) {
            return;
        }
        
        mindmapSection.style.display = 'block';
        
        // Scroll to mind map section
        mindmapSection.scrollIntoView({ behavior: 'smooth' });
        
        // Generate mind map with the user's specified topic
        generateMindMap(summary, topic);
    });
    
    // Mind map generation function with custom topic
    function generateMindMap(text, topic) {
        // Get canvas and context
        const canvas = mindmapCanvas;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        const container = document.getElementById('mindmap-container');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Extract keywords from text
        const keywords = extractKeywords(text);
        
        // Create mind map with the specified topic
        drawMindMap(ctx, keywords, canvas.width / 2, canvas.height / 2, topic);
    }

    // Extract keywords function
    function extractKeywords(text) {
        // Simple keyword extraction
        const words = text.toLowerCase().split(/\s+/);
        const stopWords = ['the', 'a', 'an', 'in', 'on', 'at', 'of', 'to', 'for', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'that', 'this', 'these', 'those', 'with', 'from', 'by', 'as', 'into'];
        
        // Filter out stop words and count word frequency
        const wordCount = {};
        
        words.forEach(word => {
            word = word.replace(/[.,?!;:()]/g, '');
            if (word.length > 3 && !stopWords.includes(word)) {
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        });
        
        // Sort by frequency
        const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
        
        // Return top keywords (limit to 8 for clarity)
        return sortedWords.slice(0, Math.min(8, sortedWords.length));
    }

    // Draw mind map function with custom topic
    function drawMindMap(ctx, keywords, centerX, centerY, mainTopic) {
        const centerRadius = 60;
        const nodeRadius = 40;
        
        // Animation variables
        let progress = 0;
        const animationDuration = 1000; // 1 second
        const startTime = Date.now();
        
        // Draw with animation
        function draw() {
            progress = Math.min(1, (Date.now() - startTime) / animationDuration);
            
            // Clear canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw center node
            ctx.beginPath();
            ctx.arc(centerX, centerY, centerRadius * progress, 0, Math.PI * 2);
            ctx.fillStyle = '#6e8efb';
            ctx.fill();
            
            // Draw center text
            if (progress > 0.5) {
                const fontSize = mainTopic.length > 15 ? '12px' : '14px';
                ctx.font = `${fontSize} Arial`;
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Handle long topic names by splitting into multiple lines if needed
                if (mainTopic.length > 25) {
                    const words = mainTopic.split(' ');
                    let line = '';
                    let lines = [];
                    
                    words.forEach(word => {
                        const testLine = line + word + ' ';
                        if (testLine.length > 20) {
                            lines.push(line);
                            line = word + ' ';
                        } else {
                            line = testLine;
                        }
                    });
                    
                    if (line.length > 0) {
                        lines.push(line);
                    }
                    
                    const lineHeight = 16;
                    const startY = centerY - ((lines.length - 1) * lineHeight / 2);
                    
                    lines.forEach((line, index) => {
                        ctx.fillText(line, centerX, startY + index * lineHeight);
                    });
                } else {
                    ctx.fillText(mainTopic, centerX, centerY);
                }
            }
            
            // Draw nodes around the center
            if (keywords.length > 0) {
                const angleStep = (Math.PI * 2) / keywords.length;
                
                for (let i = 0; i < keywords.length; i++) {
                    const angle = i * angleStep;
                    const distance = 150 * progress;
                    
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    
                    // Draw connection line
                    ctx.beginPath();
                    ctx.moveTo(centerX + Math.cos(angle) * centerRadius, centerY + Math.sin(angle) * centerRadius);
                    ctx.lineTo(x - Math.cos(angle) * nodeRadius, y - Math.sin(angle) * nodeRadius);
                    ctx.strokeStyle = '#a777e3';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    // Draw node
                    ctx.beginPath();
                    ctx.arc(x, y, nodeRadius * progress, 0, Math.PI * 2);
                    ctx.fillStyle = '#a777e3';
                    ctx.fill();
                    
                    // Draw text
                    if (progress > 0.7) {
                        ctx.font = '12px Arial';
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        
                        // For long keywords, truncate and add ellipsis
                        const keyword = keywords[i];
                        const displayText = keyword.length > 12 ? keyword.substring(0, 10) + '...' : keyword;
                        ctx.fillText(displayText, x, y);
                    }
                }
            }
            
            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(draw);
            }
        }
        
        // Start animation
        draw();
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (mindmapSection.style.display !== 'none') {
            const summary = summaryText.textContent;
            const topic = topicInput.value.trim() || "Main Topic";
            
            if (summary) {
                generateMindMap(summary, topic);
            }
        }
    });
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    // For convenience in testing, you can auto fill the login form
    document.getElementById('login-email').value = 'demo@example.com';
    document.getElementById('login-password').value = 'password123';
});