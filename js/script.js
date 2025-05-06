// Game state
const gameState = {
    currentScene: 0,
    playerChoices: [],
    gameOver: false
};

// Dialog and choice data structure for Payne Motors negotiation
const negotiationScenario = [
    {
        speaker: "counterpart",
        text: "Thank you for meeting with me today, Ms. Hastings. As you know, I represent the class of Hydra owners. We're seeking $3.22 billion in compensation plus a full recall and loaner vehicles. What's Payne Motors' position on this?",
        choices: [
            { text: "We're prepared to initiate a voluntary recall of all affected vehicles, but the compensation amounts you're seeking are unreasonable and not supported by the facts.", nextScene: 1 },
            { text: "We acknowledge there may be an issue with some vehicles and are investigating. How did you arrive at those compensation figures?", nextScene: 2 },
            { text: "We'd like to propose a more reasonable approach: a targeted recall program plus a $50 million compensation fund for verified damages.", nextScene: 3 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Unreasonable? My clients' vehicles are rolling away and causing fires! Each of those owners deserves compensation, and our figures are based on solid data and precedent.",
        choices: [
            { text: "We understand your concerns, but the data doesn't support claims of widespread defects. Many reported incidents involve improper use or maintenance.", nextScene: 4 },
            { text: "Let's focus on facts. Out of 1 million vehicles, we've only had a handful of verified incidents. A targeted approach makes more sense.", nextScene: 5 },
            { text: "We're willing to work with you, but we need a reasonable framework. What if we start with a full recall and discuss compensation separately?", nextScene: 6 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Our calculations are based on the number of accidents involving Hydras and the estimated number of vehicles with defective pawls. Each accident victim deserves $20,000, and each owner with defective pawls should receive $10,000.",
        choices: [
            { text: "Your accident rate assumption of 5.6% is significantly higher than industry averages. And you're assuming without evidence that all accidents were caused by faulty pawls.", nextScene: 7 },
            { text: "I appreciate the detailed breakdown. However, we need to establish causation between pawls and accidents before discussing compensation amounts.", nextScene: 8 },
            { text: "We recognize the need for some compensation, but these figures are inflated. We'd propose a more modest compensation structure based on actual damages.", nextScene: 9 }
        ]
    },
    {
        speaker: "counterpart",
        text: "I appreciate your proposal, but $50 million is far too low. My clients have suffered real damages, and they need fair compensation. I'm willing to discuss the structure, but not such a low amount.",
        choices: [
            { text: "We could increase the compensation fund to $100 million, but we would need a structured distribution process based on verified damages.", nextScene: 10 },
            { text: "What if we offer loaner vehicles during repairs for all affected customers in addition to the compensation fund?", nextScene: 11 },
            { text: "I understand your position. Let's discuss what your clients really need - is it maximum compensation or making sure their vehicles are safe?", nextScene: 12 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your maintenance argument is weak at best. The evidence clearly shows that these pawls are defective. This isn't about user error; it's about a design flaw that Payne Motors tried to hide.",
        choices: [
            { text: "I assure you we never intentionally concealed any issues. We're committed to customer safety, which is why we're offering a comprehensive recall.", nextScene: 13 },
            { text: "What if we agree to a third-party investigation to determine the actual failure rate and cause of the incidents?", nextScene: 14 },
            { text: "Rather than debate liability, let's focus on solutions. We're prepared to offer a $150 million compensation fund with loaner vehicles during repairs.", nextScene: 15 }
        ]
    },
    {
        speaker: "counterpart",
        text: "A targeted approach? The problem could affect any Hydra with these pawls. All owners are at risk, and all deserve to have their vehicles inspected and fixed.",
        choices: [
            { text: "You're right that all vehicles should be inspected. We'll commit to a full recall for all 1 million vehicles, but compensation should be limited to verified damages.", nextScene: 16 },
            { text: "We can expand the recall to all Hydras manufactured between 2018-2020, but we need more reasonable compensation terms.", nextScene: 17 },
            { text: "What if we prioritize higher-risk vehicles first, such as those in mountainous regions, while developing a full recall plan?", nextScene: 18 }
        ]
    },
    {
        speaker: "counterpart",
        text: "I appreciate your willingness to discuss a full recall. That's a good starting point. But my clients also deserve fair compensation for the risks they've been exposed to and the diminished value of their vehicles.",
        choices: [
            { text: "We could establish a tiered compensation system - higher amounts for those with documented incidents and a smaller amount for all affected owners.", nextScene: 19 },
            { text: "What if we provide extended warranties and free service for all recalled vehicles in addition to a more targeted compensation fund?", nextScene: 20 },
            { text: "We understand the concerns about vehicle value. What if we offer a trade-in value guarantee program for all affected Hydra owners?", nextScene: 21 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your accident rate assumptions are incorrect. Our data shows 5.6% of Hydras have been in accidents, which is higher than comparable vehicles. And the pawl defect creates a unique danger of uncontrolled rolling.",
        choices: [
            { text: "If we disagree on the data, let's have an independent expert analyze the accident rates to establish a factual basis for compensation.", nextScene: 22 },
            { text: "Even if we accept your accident rate, we need to determine what percentage was actually caused by pawl failures versus other factors.", nextScene: 23 },
            { text: "Let's move forward productively. We'll increase our offer to $200 million in total compensation with a structured claims process.", nextScene: 24 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Establishing causation is important, I agree. But my clients can't wait years for detailed investigations. They need their vehicles fixed now and compensation for diminished value.",
        choices: [
            { text: "We're committed to an expedited recall process. What if we start repairs immediately while establishing a reasonable claims process for compensation?", nextScene: 25 },
            { text: "We can begin the recall immediately and establish a $250 million compensation fund with an independent administrator to evaluate claims.", nextScene: 26 },
            { text: "What if we offer an immediate goodwill payment to all owners, then additional compensation based on verified impact?", nextScene: 27 }
        ]
    },
    {
        speaker: "counterpart",
        text: "I appreciate your acknowledgment that compensation is warranted. However, your proposed structure doesn't adequately address the magnitude of the issue. These aren't just defects; they're safety hazards.",
        choices: [
            { text: "Safety is our top priority. We'll commit to a comprehensive recall plan with loaner vehicles for higher-risk cases and a $300 million compensation fund.", nextScene: 28 },
            { text: "What if we agree to a public statement acknowledging the issue, in addition to the recall and a structured compensation program?", nextScene: 29 },
            { text: "Let's create a multi-part solution: immediate recall, extended warranties, a compensation fund, and a customer satisfaction program.", nextScene: 30 }
        ]
    },
    {
        speaker: "counterpart",
        text: "I appreciate your proposal for a $100 million fund, but that's still far below what my clients deserve. However, I'm willing to discuss a more structured approach rather than the full $3.22 billion.",
        choices: [
            { text: "What if we raise the fund to $200 million but distribute it based on verified damages? Those with documented incidents would receive more.", nextScene: 31 },
            { text: "What's your minimum acceptable compensation figure to settle this without going to trial? We both know litigation would be costly and time-consuming.", nextScene: 32 },
            { text: "We could establish a $225 million fund with an independent administrator determining fair distribution based on actual damages.", nextScene: 33 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Loaner vehicles are a basic expectation, not a concession. My clients need safe transportation while their potentially dangerous vehicles are being repaired.",
        choices: [
            { text: "You're right. We'll provide loaners for all customers during repairs and establish a $175 million compensation fund as well.", nextScene: 34 },
            { text: "What if we prioritize loaner vehicles for higher-risk users, such as those in mountainous areas, and provide rental reimbursement for others?", nextScene: 35 },
            { text: "We'll commit to loaner vehicles for all customers and raise our compensation offer to $200 million. Is that a framework we can work with?", nextScene: 36 }
        ]
    },
    {
        speaker: "counterpart",
        text: "My clients care about both safety and fair compensation. They trusted Payne Motors, and that trust was violated. A fix isn't enough - they deserve compensation for that breach of trust.",
        choices: [
            { text: "I understand the trust issue. What if we include a public statement acknowledging the problem, in addition to a recall and a $250 million compensation fund?", nextScene: 37 },
            { text: "Trust is rebuilt through actions. We'll commit to the recall, loaners, and a $275 million compensation fund administered fairly.", nextScene: 38 },
            { text: "We value our customers' trust. We'll establish a $300 million fund, plus extended warranties for all affected vehicles to demonstrate our long-term commitment.", nextScene: 39 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your commitment to customer safety is noted, but we still need to address the concealment issue. Internal documents suggest Payne Motors knew about the potential pawl problems before the vehicles were sold.",
        choices: [
            { text: "We disagree with that characterization, but we're focused on moving forward constructively. Our $300 million offer demonstrates our commitment to resolution.", nextScene: 40 },
            { text: "Without admitting any wrongdoing, we're prepared to offer a comprehensive settlement package that addresses all your concerns.", nextScene: 41 },
            { text: "Let's separate the recall from the compensation discussion. We'll start the recall immediately while we continue to negotiate fair compensation terms.", nextScene: 42 }
        ]
    },
    {
        speaker: "counterpart",
        text: "A third-party investigation would only delay compensation for my clients. We have enough evidence already to demonstrate the problem and Payne's knowledge of it.",
        choices: [
            { text: "What if we establish an expedited review process with an independent expert to validate claims quickly while ensuring fairness?", nextScene: 43 },
            { text: "We'll agree to a presumption of defect for all vehicles in the recall, simplifying the claims process while maintaining reasonable verification.", nextScene: 44 },
            { text: "Let's compromise: immediate recall, $275 million compensation fund, and an independent administrator to oversee distribution.", nextScene: 45 }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your $200 million offer is still insufficient. This is a serious safety issue affecting a million vehicles. The potential harm to consumers justifies a more substantial compensation package.",
        choices: [
            { text: "We understand the seriousness. Let's finalize a deal with a $300 million compensation fund, full recall with loaners, and a public acknowledgment.", nextScene: 46 },
            { text: "What specific compensation structure would satisfy your clients while still being financially viable for Payne Motors?", nextScene: 47 },
            { text: "We'll increase our offer to $325 million as a final proposal, coupled with the recall and loaners. This represents our best and final offer.", nextScene: 48 }
        ]
    },
    // Outcomes
    {
        speaker: "counterpart",
        text: "Your tiered compensation approach has merit. I'm willing to accept a $300 million fund with priority for those with documented incidents, full recall with loaners, and a public acknowledgment. We have a deal.",
        choices: [
            { text: "Excellent! Let's finalize the settlement agreement. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "I believe the extended warranties and service program add significant value. Combined with a $250 million compensation fund and full recall, we have a deal my clients can accept.",
        choices: [
            { text: "Perfect! I'm looking forward to implementing this resolution. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "The trade-in value guarantee is an innovative approach. Combined with the recall and a $275 million compensation fund, we have a deal that addresses my clients' concerns.",
        choices: [
            { text: "Great! Let's move forward with the settlement. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your offer is insufficient to compensate the class members for their damages and risks. We'll see you in court.",
        choices: [
            { text: "I understand. We remain open to reasonable settlement discussions. [NEGOTIATION FAILED]", nextScene: "failure" }
        ]
    },
    {
        speaker: "counterpart",
        text: "The independent expert analysis and expedited review process will work well for my clients. Combined with the $300 million fund and full recall, we have a deal.",
        choices: [
            { text: "Excellent! Let's draft the settlement agreement. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "The presumption of defect for all recalled vehicles will streamline the process. With the $275 million compensation fund, we can settle this matter.",
        choices: [
            { text: "Perfect! I'm looking forward to implementing the resolution. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "Your compromise is acceptable. Immediate recall, $275 million compensation, and an independent administrator. We have a settlement.",
        choices: [
            { text: "Excellent! Let's finalize the agreement. [DEAL COMPLETE]", nextScene: "success" }
        ]
    },
    {
        speaker: "counterpart",
        text: "I don't believe you're taking this problem seriously enough. My clients' safety is at risk, and your proposal doesn't reflect that reality.",
        choices: [
            { text: "I understand your concerns. We remain open to further discussions. [NEGOTIATION FAILED]", nextScene: "failure" }
        ]
    },
    // Final outcomes
    {
        speaker: "player",
        text: "Congratulations! You successfully negotiated a settlement that protects Payne Motors' interests while addressing customer concerns. The compensation is well below the plaintiffs' demand of $3.22 billion, and the ZOPA you identified was accurate.",
        choices: [
            { text: "Play Again", nextScene: "restart" }
        ]
    },
    {
        speaker: "player",
        text: "Unfortunately, you were unable to reach a settlement with Davis Parker. The case will now proceed to trial, exposing Payne Motors to potentially higher damages and significant PR damage. You might want to try again with a different negotiation approach, perhaps employing more tactical empathy or identifying better integration opportunities.",
        choices: [
            { text: "Try Again", nextScene: "restart" }
        ]
    }
];

// DOM elements - we'll initialize these properly when the DOM is loaded
let tabButtons;
let tabContents;
let playerBubble;
let counterpartBubble;
let playerMouth;
let counterpartMouth;
let choicesContainer;

// Tab functionality - Moved to the initialization function to ensure DOM is loaded
function initializeTabs() {
    // We'll use the global tabButtons and tabContents variables
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Tab clicked:', button.getAttribute('data-tab'));
            
            // Remove active class from all buttons and contents
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            } else {
                console.error('Tab content not found for:', tabId);
            }
        });
    });
}

// Function to display text with a typing effect
function typeText(element, text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// Function to animate mouth when speaking
function animateMouth(mouthElement, duration) {
    return new Promise(resolve => {
        const characterElement = mouthElement.closest('.character');
        characterElement.classList.add('talking');
        
        setTimeout(() => {
            characterElement.classList.remove('talking');
            resolve();
        }, duration);
    });
}

// Function to display a scene
async function displayScene(sceneIndex) {
    console.log('Displaying scene:', sceneIndex);
    
    // Clear choices
    if (choicesContainer) {
        choicesContainer.innerHTML = '';
    } else {
        console.error('Choices container not found');
        return;
    }
    
    // Get scene data
    let scene = negotiationScenario[sceneIndex];
    console.log('Scene data:', scene);
    
    // Handle special scene indices
    if (sceneIndex === 'success') {
        scene = negotiationScenario[negotiationScenario.length - 2]; // Success scene
        gameState.gameOver = true;
    } else if (sceneIndex === 'failure') {
        scene = negotiationScenario[negotiationScenario.length - 1]; // Failure scene
        gameState.gameOver = true;
    } else if (sceneIndex === 'restart') {
        // Reset game state and start over
        gameState.currentScene = 0;
        gameState.playerChoices = [];
        gameState.gameOver = false;
        displayScene(0);
        return;
    } else if (scene === undefined) {
        console.error('No scene found for index:', sceneIndex);
        // Fall back to the first scene if the specified one doesn't exist
        scene = negotiationScenario[0];
    }
    
    // Display dialogue with typing effect and mouth animation
    if (scene.speaker === "player") {
        console.log('Player is speaking:', scene.text);
        
        if (!playerBubble || !counterpartBubble) {
            console.error('Speech bubbles not found:', { playerBubble, counterpartBubble });
            return;
        }
        
        const textLength = scene.text.length;
        const typingDuration = textLength * 30; // Approximate typing duration
        
        try {
            await Promise.all([
                typeText(playerBubble, scene.text),
                animateMouth(playerMouth, typingDuration)
            ]);
            counterpartBubble.textContent = '';
        } catch (error) {
            console.error('Error displaying player dialogue:', error);
        }
    } else {
        console.log("Counterpart is speaking:", scene.text);
        
        if (!playerBubble || !counterpartBubble) {
            console.error('Speech bubbles not found:', { playerBubble, counterpartBubble });
            return;
        }
        
        const textLength = scene.text.length;
        const typingDuration = textLength * 30; // Approximate typing duration
        
        try {
            await Promise.all([
                typeText(counterpartBubble, scene.text),
                animateMouth(counterpartMouth, typingDuration)
            ]);
            playerBubble.textContent = '';
        } catch (error) {
            console.error('Error displaying counterpart dialogue:', error);
        }
    }
    
    // Display choices if any
    if (scene.choices && scene.choices.length > 0) {
        console.log('Displaying choices:', scene.choices);
        
        if (!choicesContainer) {
            console.error('Choices container not found');
            return;
        }
        
        scene.choices.forEach(choice => {
            try {
                const button = document.createElement('button');
                button.classList.add('choice-button');
                button.textContent = choice.text;
                
                button.addEventListener('click', () => {
                    console.log('Choice selected:', choice);
                    
                    // Store player's choice
                    gameState.playerChoices.push({
                        sceneIndex: sceneIndex,
                        choiceText: choice.text
                    });
                    
                    // Display player's dialogue
                    if (playerBubble) {
                        playerBubble.textContent = choice.text;
                    }
                    
                    // Proceed to next scene
                    setTimeout(() => {
                        displayScene(choice.nextScene);
                    }, 1000);
                });
                
                choicesContainer.appendChild(button);
            } catch (error) {
                console.error('Error creating choice button:', error);
            }
        });
    } else {
        console.log('No choices available for this scene');
    }
    
    // Update current scene in game state
    if (typeof sceneIndex === 'number') {
        gameState.currentScene = sceneIndex;
    }
}

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // Initialize the tabs
    initializeTabs();
    
    // Initialize global DOM references
    tabButtons = document.querySelectorAll('.tab-button');
    tabContents = document.querySelectorAll('.tab-content');
    playerBubble = document.querySelector('.player-bubble .dialogue');
    counterpartBubble = document.querySelector('.counterpart-bubble .dialogue');
    playerMouth = document.querySelector('.player .mouth');
    counterpartMouth = document.querySelector('.counterpart .mouth');
    choicesContainer = document.querySelector('.choices');
    
    console.log('DOM elements:', {
        playerBubble,
        counterpartBubble,
        playerMouth,
        counterpartMouth,
        choicesContainer
    });
    
    // Make sure the negotiation tab is active initially
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    const negotiationButton = document.querySelector('.tab-button[data-tab="negotiation"]');
    const negotiationContent = document.getElementById('negotiation');
    if (negotiationButton) negotiationButton.classList.add('active');
    if (negotiationContent) negotiationContent.classList.add('active');
    
    // Start with the first scene after a short delay to ensure everything is loaded
    setTimeout(() => {
        displayScene(0);
    }, 500);
});