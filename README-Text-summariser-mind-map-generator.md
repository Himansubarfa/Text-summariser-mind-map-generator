# Text Summariser & Mind Map Generator

A lightweight browser-based application that transforms user-provided content into a concise summary and a visual mind map. Developed during **2024–2025**, the project combines client-side text processing, keyword extraction, authentication UI, and HTML5 Canvas visualization into a single workflow.

## Overview

**Text Summariser & Mind Map Generator** is designed to help users process lengthy text and understand its main concepts visually.

The application follows a simple pipeline:

```text
User Authentication
        ↓
Enter Topic + Content
        ↓
Text Summarization
        ↓
Keyword Extraction
        ↓
Mind Map Generation
        ↓
Canvas Visualization
```

The implementation is entirely client-side in the supplied source. User accounts are maintained in memory, summarization is rule-based, keywords are selected using frequency analysis, and the mind map is rendered using the HTML5 Canvas API.

## Features

### 🔐 Authentication Interface

The application provides a login and sign-up experience.

- Login form
- Sign-up form
- Full-name, email, and password fields
- Duplicate email validation
- Basic credential validation
- Automatic login after successful registration
- Logout functionality
- Current user's name displayed in the application header

The authentication state and user records are stored in JavaScript memory rather than a persistent database. The supplied implementation initializes a demo account for testing. fileciteturn1file0L29-L37

### 📝 Content Summarization

Users can provide:

- A main topic
- Textual content to summarize

The summarization algorithm:

1. Splits the input into sentences.
2. Returns the original text when it contains three or fewer sentences.
3. Selects the first sentence.
4. Selects a sentence from the middle.
5. Selects the final sentence.
6. Combines the selected sentences into the summary.

This is a deterministic, rule-based extractive approach rather than an LLM-based summarization system. fileciteturn1file0L127-L165

### 🧠 Keyword Extraction

After summarization, the application identifies important keywords using basic frequency analysis.

The process:

1. Converts text to lowercase.
2. Splits text into words.
3. Removes punctuation.
4. Filters predefined stop words.
5. Ignores words shorter than four characters.
6. Counts word frequency.
7. Sorts words by frequency.
8. Selects up to eight keywords.

fileciteturn1file0L211-L231

### 🗺️ Mind Map Generation

The extracted keywords are displayed around a central topic.

The generated visualization contains:

- A central topic node
- Up to eight keyword nodes
- Connecting lines
- Circular nodes
- Keyword labels
- Automatic handling of long topic names
- Truncated long keywords
- Animated node appearance

fileciteturn1file0L234-L343

### 🎨 HTML5 Canvas Visualization

The mind map is rendered directly on an HTML5 `<canvas>`.

The canvas dimensions are dynamically set according to the mind-map container, allowing the visualization to adapt to the available display area. fileciteturn1file0L190-L208

### ✨ Animated Mind Map

The mind map uses `requestAnimationFrame()` to progressively draw the visualization over a one-second animation period.

The center node, connection lines, and surrounding keyword nodes grow into position based on an animation progress value. fileciteturn1file0L239-L249 fileciteturn1file0L336-L343

### 📱 Responsive Interface

The CSS includes responsive breakpoints for tablet and mobile layouts.

The application adjusts:

- Authentication card padding
- Logo size
- User-name visibility
- Tool-section spacing
- Mind-map container height

for smaller screen sizes. 

## Technology Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Application structure and forms |
| **CSS3** | Styling, responsive layouts, and UI presentation |
| **JavaScript** | Authentication, summarization, keyword extraction, interaction, and visualization |
| **HTML5 Canvas API** | Mind-map rendering |
| **Browser APIs** | DOM events, animation, and viewport handling |

## Architecture

The application follows a lightweight client-side architecture.

```text
┌──────────────────────────────────────┐
│             HTML Interface           │
│                                      │
│ Login / Signup / Content / Output    │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          JavaScript Logic            │
│                                      │
│ Authentication                       │
│ Content Processing                   │
│ Summarization                        │
│ Keyword Extraction                   │
│ Mind Map Generation                  │
└───────────────┬───────────────┬──────┘
                │               │
                ▼               ▼
       ┌──────────────┐   ┌───────────────┐
       │ Summary View │   │ Canvas Engine  │
       └──────────────┘   └───────┬───────┘
                                  │
                                  ▼
                           Visual Mind Map
```

## Detailed Processing Pipeline

### Step 1 — Authentication

The user either logs in or creates an account.

```text
Login / Sign Up
      ↓
Validate Input
      ↓
Set Current User
      ↓
Display Application
```

The sign-up flow validates required fields and prevents registration with an email already present in the in-memory user list. fileciteturn1file0L58-L79

### Step 2 — Content Input

The user enters a topic and the content they want to process.

```text
Topic:
Machine Learning

Content:
[User-provided text]
```

### Step 3 — Summarization

The text is converted into a shorter representation using the first, middle, and final sentences for longer input. fileciteturn1file0L147-L165

### Step 4 — Keyword Extraction

The summary is analyzed for frequently occurring non-stop words.

```text
Summary
   ↓
Normalize Text
   ↓
Remove Stop Words
   ↓
Count Frequencies
   ↓
Sort by Frequency
   ↓
Top 8 Keywords
```

### Step 5 — Visualization

The selected keywords are positioned radially around the user-defined topic.

```text
                    Keyword
                       │
                       │
          Keyword ── Main Topic ── Keyword
                       │
                       │
                    Keyword
```

The actual implementation calculates each keyword's position using evenly distributed angles around the center node. fileciteturn1file0L296-L317

## Project Structure

```text
Text-summariser-mind-map-generator/
│
├── index.html
├── style.css
├── main.js
└── README.md
```

### `index.html`

Defines:

- Authentication container
- Login form
- Sign-up form
- Main application
- Topic input
- Content textarea
- Summary area
- Mind-map section
- Canvas element
- About section
- Footer

### `style.css`

Handles:

- Authentication UI
- Application layout
- Forms
- Buttons
- Summary card
- Mind-map container
- Responsive layouts
- Visual styling
- Scrollbar customization

The supplied CSS also defines responsive behavior at `768px` and `480px` viewport widths.

### `main.js`

Contains the core application logic:

- DOM references
- Authentication
- User management
- Login/logout
- Content summarization
- Keyword extraction
- Mind-map generation
- Canvas rendering
- Animation
- Resize handling
- Initialization

The JavaScript waits for `DOMContentLoaded` before initializing the application logic. fileciteturn1file0L1-L16

## Example

Suppose the user enters:

```text
Topic:
Machine Learning

Content:
Machine learning is a branch of artificial intelligence.
Machine learning systems learn patterns from data.
These systems can be used for classification and prediction.
Machine learning is widely used in modern applications.
```

The application first creates a concise summary using selected sentences.

It then extracts frequently occurring meaningful terms and uses the resulting keywords as nodes around:

```text
              Machine Learning
                     ●
```

The final Canvas visualization places the extracted concepts around the central topic and connects them with lines.

## Engineering Concepts Demonstrated

This project demonstrates several practical concepts that are relevant in frontend development interviews:

### DOM Manipulation

JavaScript obtains and updates interface elements through `document.getElementById()` and related DOM APIs.

### Event-Driven Programming

The application responds to:

- Button clicks
- Form interactions
- Logout
- Window resizing
- User input

### Rule-Based Text Processing

The summarization algorithm uses sentence selection rather than machine learning. This makes the implementation deterministic and lightweight.

### Frequency-Based Keyword Extraction

Word frequencies are calculated and sorted to identify candidate concepts. fileciteturn1file0L217-L231

### Canvas Graphics

The project uses:

- `arc()`
- `fill()`
- `moveTo()`
- `lineTo()`
- `fillText()`
- `clearRect()`

to construct the visualization.

### Animation

`requestAnimationFrame()` is used to create a progressive rendering effect rather than drawing the complete mind map instantaneously.

### Responsive Web Design

CSS media queries adapt the interface for smaller displays.

## Important Technical Limitation

The authentication implementation should **not be considered production-grade authentication**.

User credentials are held in a JavaScript array in memory, including passwords in plaintext, and there is no backend authentication service or password hashing. fileciteturn1file0L29-L37

For a production implementation, authentication should be moved to a secure backend with:

- Password hashing
- Secure session/token management
- Input validation
- HTTPS
- Database persistence
- Authentication and authorization controls

Similarly, the summarization algorithm is intentionally simple and should not be represented as advanced NLP or generative AI.

## Limitations

Current limitations include:

- In-memory user storage
- No persistent database
- No secure backend authentication
- Rule-based extractive summarization
- Basic frequency-based keyword extraction
- No semantic relationship detection
- Fixed maximum of eight keyword nodes
- Limited interaction with Canvas nodes
- No export functionality
- No saved mind-map projects

## Future Improvements

### AI/NLP-Based Summarization

Replace the sentence-selection algorithm with an NLP or LLM-based summarization pipeline.

### Semantic Keyword Extraction

Use techniques such as:

- TF-IDF
- Named Entity Recognition
- Embeddings
- Transformer-based models

to identify concepts more accurately.

### Relationship Detection

Instead of placing keywords around the center independently, analyze relationships between concepts and generate hierarchical branches.

### Interactive Canvas

Add:

- Node dragging
- Zoom
- Pan
- Node editing
- Branch creation
- Delete/rearrange controls

### Persistent User Accounts

Introduce a backend and database for:

- User accounts
- Saved summaries
- Saved mind maps
- Project history

### Export

Allow users to export mind maps as:

- PNG
- SVG
- PDF
- JSON

## Running Locally

No package manager or build process is required by the supplied source.

### Option 1 — Open in Browser

Open:

```text
index.html
```

in a modern browser.

### Option 2 — VS Code Live Server

1. Open the repository in VS Code.
2. Install Live Server if necessary.
3. Open `index.html`.
4. Select **Open with Live Server**.

## Demo Account

The supplied JavaScript includes a demo account for testing:

```text
Email: demo@example.com
Password: password123
```

The login fields are also automatically populated with these demo credentials during initialization. fileciteturn1file0L363-L369

> **Security note:** This credential is included only as a development/demo feature and must not be used for a production authentication system.

## Project Information

| Property | Details |
|---|---|
| **Project Name** | Text Summariser & Mind Map Generator |
| **Repository** | `Text-summariser-mind-map-generator` |
| **Development Period** | 2024–2025 |
| **Project Type** | Frontend Web Application |
| **Primary Technologies** | HTML, CSS, JavaScript |
| **Visualization** | HTML5 Canvas |
| **Architecture** | Client-Side |
| **Summarization** | Rule-Based / Extractive |
| **Keyword Extraction** | Frequency-Based |

## Interview Discussion Points

An interviewer can evaluate this project through several technical areas:

### Why did you build it?

Explain the problem of converting lengthy information into a format that is easier to understand and revise.

### How does the summarization work?

Explain the sentence-splitting logic and selection of first, middle, and final sentences.

### Is it actually AI-powered?

Based on the supplied implementation, the core summarization and keyword extraction are **rule-based**, not LLM-based. Be explicit about this distinction.

### How does the mind map work?

Explain keyword extraction followed by radial positioning around the central topic using Canvas.

### Why Canvas?

Canvas provides direct control over drawing nodes, lines, text, and animations without requiring an external visualization framework.

### What would you improve?

Discuss semantic summarization, better keyword extraction, relationship detection, persistent storage, secure authentication, and interactive visualization.

## Learning Outcomes

Through this project, the following areas were explored:

- Frontend web development
- JavaScript application logic
- DOM manipulation
- Client-side authentication concepts
- Rule-based text summarization
- Keyword frequency analysis
- Canvas graphics
- Animation using `requestAnimationFrame`
- Responsive UI development
- Event-driven programming
- Basic information visualization

## Author

**Himansu Barfa**

Developed during **2024–2025** as a project exploring text processing, information visualization, and interactive frontend web development.

## License

No license information was provided in the supplied source. Add an appropriate `LICENSE` file if the repository is intended for public open-source distribution.


---

## About

MindMapper is a browser-based web application developed during 2024–2025 to help users transform lengthy text into a concise summary and a visual representation of its key concepts. The application combines content summarization, keyword extraction, and HTML5 Canvas visualization into a single workflow designed for learning, revision, and information organization.

Users begin by entering a main topic and supplying text content. The application applies a lightweight, rule-based summarization algorithm that analyzes sentences and selects representative content. For longer inputs, it uses the first, middle, and final sentences to create a shorter version of the original material. The summarized content is then processed for keyword extraction. Common stop words and short words are removed, remaining words are counted by frequency, and the most frequent terms are selected as candidate concepts.

These concepts are visualized as nodes around a central topic using HTML5 Canvas. Connection lines are drawn between the central topic and keyword nodes, while a progressive animation creates a dynamic presentation of the generated mind map. Long topic names are handled through line wrapping, and lengthy keywords are truncated to maintain readability.

The project also includes a client-side authentication interface with login, sign-up, duplicate-email validation, automatic login after registration, user-name display, and logout functionality. The implementation keeps user data in memory, making the authentication suitable for demonstration purposes rather than production security.

From an engineering perspective, MindMapper demonstrates practical knowledge of HTML, CSS, JavaScript, DOM manipulation, event handling, responsive design, text processing, frequency analysis, Canvas graphics, and animation with requestAnimationFrame. It also provides a foundation for future improvements such as NLP or LLM-based semantic summarization, advanced keyword extraction, relationship detection, interactive node editing, persistent storage, secure backend authentication, and export to PNG, SVG, or PDF.

The project was created to explore how traditional text can be converted into both concise and visual forms. By connecting summarization with mind-map generation, MindMapper provides users with two complementary ways to understand information: a reduced textual view for quick reading and a structured graphical view for recognizing major concepts and their connections. It demonstrates how a lightweight prototype can provide foundation for future intelligent systems.
