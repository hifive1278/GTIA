// Game state
const gameState = {
    currentScene: 0,
    playerChoices: [],
    gameOver: false
};

// Dialog and choice data structure for Payne Motors negotiation
const negotiationScenario = [
    // Scene 0: Opening
    {
        speaker: "counterpart",
        text: "Thank you for meeting with me today, Ms. Hastings. As you know, I represent the class of Hydra owners. We're seeking $3.22 billion in compensation plus a full recall and loaner vehicles. What's Payne Motors' position on this?",
        choices: [
            { text: "We acknowledge there may be an issue with some vehicles and are investigating. How did you arrive at those compensation figures?", nextScene: 1 },
            { text: "We're prepared to initiate a voluntary recall of all affected vehicles, but the compensation amounts you're seeking are unreasonable and not supported by the facts.", nextScene: 2 },
            { text: "Good god. You're an unusual looking specimen, aren't you, Mr. Parker?", nextScene: 3 }
        ]
    },
    // Scene 1: Explaining calculation
    {
        speaker: "counterpart",
        text: "Our calculations are based on the number of accidents involving Hydras and the estimated number of vehicles with defective pawls. Each accident victim deserves $20,000, and each owner with defective pawls should receive $10,000.",
        choices: [
            { text: "I appreciate the detailed breakdown. However, we need to establish causation between pawls and accidents before discussing compensation amounts.", nextScene: 4 },
            { text: "We'd like to propose a more reasonable approach: a targeted recall program plus a $70 million compensation fund for verified damages.", nextScene: 5 },
            { text: "We recognize the need for some compensation, but these figures are inflated. We'd propose a more modest compensation structure based on actual damages.", nextScene: 6 }
        ]
    },
    // Scene 2: Defending compensation
    {
        speaker: "counterpart",
        text: "Unreasonable? My clients' vehicles are rolling away and causing fires! Each of those owners deserves compensation, and our figures are based on solid data and precedent.",
        choices: [
            { text: "We understand your concerns, but the data doesn't support claims of widespread defects. Many reported incidents involve improper use or maintenance.", nextScene: 7 },
            { text: "Let's focus on facts. Out of 1 million vehicles, we've only had a handful of verified incidents. A targeted approach makes more sense.", nextScene: 8 },
            { text: "We're willing to work with you, but we need a reasonable framework. What if we start with a full recall and discuss compensation separately?", nextScene: 9 }
        ]
    },
    // Scene 3: Insulting response
    {
        speaker: "counterpart",
        text: "I'm not here to be insulted, Ms. Hastings. My clients' safety is at stake, and I expect a professional response to our serious concerns. Either address our demands appropriately or we'll see you in court.",
        choices: [
            { text: "I apologize for my unprofessional comment. Let's restart this discussion. We acknowledge there may be safety concerns and want to work toward a fair resolution.", nextScene: 10 },
            { text: "You're right, that was inappropriate. Let's focus on finding a solution. First, would you like a beer?", nextScene: 11 },
            { text: "Oh lighten up, Parker. Learn to take a joke. Now, about these ridiculous compensation demands of yours...", nextScene: "failure" }
        ]
    },
    // Scene 4: Causation discussion 
    {
        speaker: "counterpart",
        text: "We have clear evidence linking the pawl defects to accidents. The accident rate for Hydras is 5.6%, significantly higher than comparable vehicles. Owners need swift action, not lengthy investigations.",
        choices: [
            { text: "Safety is our priority. We'll offer an expedited review process with independent experts to validate claims quickly while ensuring fairness.", nextScene: 13 },
            { text: "We'll agree to a presumption of defect for all recalled vehicles to streamline the process, but we still need reasonable compensation terms.", nextScene: 14 },
            { text: "We propose a $350 million compensation fund with a structured claims process overseen by an independent administrator.", nextScene: 15 }
        ]
    },
    // Scene 5: $30M proposal response
    {
        speaker: "counterpart",
        text: "A $70 million fund is entirely insufficient. That's less than 1% of our claim. My clients have suffered real damages, and they deserve fair compensation. I'm willing to discuss the structure, but not such a low amount.",
        choices: [
            { text: "We could increase the compensation fund to $250 million but distribute it based on verified damages. Those with documented incidents would receive more.", nextScene: 16 },
            { text: "What if we offer loaner vehicles during repairs for all affected customers in addition to the compensation fund?", nextScene: 17 },
            { text: "Your clients' demands are outrageous. Our BATNA is to fight this in court where our legal team believes we'd only pay $71 million at most. Now, $69 million is our final offer. Clock is ticking.", nextScene: "failure" }
        ]
    },
    // Scene 6: Modest compensation response
    {
        speaker: "counterpart",
        text: "I'm glad you acknowledge the need for compensation. However, 'modest' doesn't address the magnitude of the issue. These defects have created significant safety risks and diminished vehicle values for all owners.",
        choices: [
            { text: "We could establish a tiered compensation system - higher amounts for those with documented incidents and a smaller amount for all affected owners.", nextScene: 19 },
            { text: "What if we provide extended warranties and free service for all recalled vehicles in addition to a compensation fund of $470 million?", nextScene: 20 },
            { text: "We understand the concerns about vehicle value. What if we offer a trade-in value guarantee program for all affected Hydra owners?", nextScene: 21 }
        ]
    },
    // Scene 7: Maintenance argument response
    {
        speaker: "counterpart",
        text: "Your maintenance argument is weak at best. The evidence clearly shows that these pawls are defective. This isn't about user error; it's about a design flaw that Payne Motors tried to hide.",
        choices: [
            { text: "I assure you we never intentionally concealed any issues. We're committed to customer safety, which is why we're offering a comprehensive recall with a $580 million fund.", nextScene: 22 },
            { text: "What if we agree to a public statement acknowledging the issue, in addition to the recall and a $470 million compensation fund?", nextScene: 23 },
            { text: "The notion that we 'tried to hide' anything is offensive and unfounded. Your clients caused these incidents through improper maintenance, and we have the data to prove it in court.", nextScene: "failure" }
        ]
    },
    // Scene 8: Targeted approach response
    {
        speaker: "counterpart",
        text: "A targeted approach? The problem could affect any Hydra with these pawls. All owners are at risk, and all deserve to have their vehicles inspected and fixed.",
        choices: [
            { text: "You're right that all vehicles should be inspected. We'll commit to a full recall for all 1 million vehicles, but compensation should be limited to verified damages.", nextScene: 25 },
            { text: "We can expand the recall to all Hydras manufactured between 2018-2020, but we need more reasonable compensation terms.", nextScene: 26 },
            { text: "What if we prioritize higher-risk vehicles first, such as those in mountainous regions, while developing a full recall plan?", nextScene: 27 }
        ]
    },
    // Scene 9: Separating recall and compensation
    {
        speaker: "counterpart",
        text: "I appreciate your willingness to discuss a full recall. That's a good starting point. But my clients also deserve fair compensation for the risks they've been exposed to and the diminished value of their vehicles.",
        choices: [
            { text: "What if we combine a full recall with a $580 million compensation fund? This represents a significant increase from our initial position.", nextScene: 28 },
            { text: "We could offer $630 million in total compensation with an expedited claims process and loaner vehicles during repairs.", nextScene: 29 },
            { text: "We're prepared to offer $700 million with a structured claims process, provided you can help us manage the PR aspects of this situation.", nextScene: 30 }
        ]
    },
    // Scene 10: After inappropriate remark - recovery attempt 1
    {
        speaker: "counterpart",
        text: "I accept your apology. Now, what's Payne Motors' actual position on our settlement demands? My clients need concrete solutions, not just acknowledgments.",
        choices: [
            { text: "We're prepared to offer a full recall with loaner vehicles and a $470 million compensation fund with a structured distribution process.", nextScene: 40 },
            { text: "We'll initiate an immediate recall and establish a $525 million fund with an independent administrator to evaluate claims fairly.", nextScene: 41 },
            { text: "We'll offer a comprehensive package: recall, loaner vehicles, $580 million in compensation, and extended warranties on all affected vehicles.", nextScene: 33 }
        ]
    },
    // Scene 11: After inappropriate remark - recovery attempt 2
    {
        speaker: "counterpart",
        text: "Alright then, apology accepted. I'll take a Guiness if you have.",
        choices: [
            { text: "Oh great choice, that's my favorite too. I just visited the factory in Dublin last summer!", nextScene: 31 },
            { text: "Here you go. Hey, how 'bout dem Mets, huh?", nextScene: 32 },
        ]
    },
    // Scene 12: After inappropriate remark - recovery attempt 3
    {
        speaker: "counterpart",
        text: "I appreciate your apology. Let me be clear though - while we can discuss the structure of compensation, waiting years for causation studies isn't acceptable. My clients need resolution now.",
        choices: [
            { text: "You're right, and we don't want to delay. We'll implement an expedited review process with a $470 million compensation fund as a starting point.", nextScene: 40 },
            { text: "We agree on the need for swift action. We'll begin recall immediately and establish a $525 million compensation fund with fair distribution criteria.", nextScene: 41 },
            { text: "We'll commit to immediate action with a $580 million fund, plus extended warranties on all affected vehicles to address both current and future concerns.", nextScene: 33 }
        ]
    },
    // Scene 13: Successful expedited review proposal
    {
        speaker: "counterpart",
        text: "The expedited review process is a step in the right direction. Combined with an appropriate compensation fund, this could work for my clients. What total compensation figure are you proposing?",
        choices: [
            { text: "We're prepared to offer a $700 million compensation fund, with full recall and the expedited review process we discussed.", nextScene: "success" }
        ]
    },
    // Scene 14: Successful presumption of defect
    {
        speaker: "counterpart",
        text: "The presumption of defect for all recalled vehicles would significantly streamline the process for my clients. What compensation amount are you proposing to accompany this approach?",
        choices: [
            { text: "We propose a $630 million compensation fund with the presumption of defect for all recalled vehicles.", nextScene: "success" }
        ]
    },
    // Scene 15: $150M with administrator - insufficient
    {
        speaker: "counterpart",
        text: "The independent administrator is a good idea, but $350 million doesn't adequately address the magnitude of harm to my clients. We need a more substantial figure to settle this matter.",
        choices: [
            { text: "That's our final offer. Our analysis shows this is more than fair for defects that haven't been definitively proven. Take it or leave it.", nextScene: "failure" }
        ]
    },
    // Scene 16: $100M verified damages - insufficient
    {
        speaker: "counterpart",
        text: "While the verified damages approach has merit, $250 million is still far below what my clients deserve. The total compensation package needs to reflect the serious nature of these defects.",
        choices: [
            { text: "I understand your concern. What if we increase the fund to $700 million while maintaining the verification process?", nextScene: "success" }
        ]
    },
    // Scene 17: Loaner vehicles response - basic expectation
    {
        speaker: "counterpart",
        text: "Loaner vehicles are a basic expectation, not a concession. My clients need safe transportation while their potentially dangerous vehicles are being repaired. What else are you offering?",
        choices: [
            { text: "You're right. We'll provide loaners for all customers during repairs and establish a $630 million compensation fund as well.", nextScene: "success" }
        ]
    },
    // Scene 18: Safety vs compensation discussion
    {
        speaker: "counterpart",
        text: "My clients care about both safety and fair compensation. They trusted Payne Motors, and that trust was violated. A fix isn't enough - they deserve compensation for that breach of trust.",
        choices: [
            { text: "We value our customers' trust. We'll establish a $700 million fund, plus extended warranties for all affected vehicles to demonstrate our long-term commitment.", nextScene: "success" }
        ]
    },
    // Scene 19: Tiered compensation success
    {
        speaker: "counterpart",
        text: "Your tiered compensation approach has merit. With the right total fund amount, this could address my clients' concerns while recognizing the different impacts they've experienced.",
        choices: [
            { text: "We propose a $700 million fund with priority for those with documented incidents, full recall with loaners, and a public acknowledgment.", nextScene: "success" }
        ]
    },
    // Scene 20: Extended warranties success
    {
        speaker: "counterpart",
        text: "The extended warranties and service program would add significant value for my clients beyond just monetary compensation. This shows a commitment to long-term customer relationships.",
        choices: [
            { text: "We're pleased to offer these extended warranties and service, combined with a $580 million compensation fund and full recall for all affected vehicles.", nextScene: "success" }
        ]
    },
    // Scene 21: Trade-in guarantee success
    {
        speaker: "counterpart",
        text: "The trade-in value guarantee is an innovative approach that directly addresses the diminished value concern. This could be a valuable component of a comprehensive settlement.",
        choices: [
            { text: "We're glad this addresses your concerns. We'll implement the trade-in guarantee program along with a $630 million compensation fund and full recall.", nextScene: "success" }
        ]
    },
    // Scene 22: Comprehensive recall with $250M
    {
        speaker: "counterpart",
        text: "Your commitment to customer safety is noted, but we still need to address the concealment issue. Internal documents suggest Payne Motors knew about these problems before the vehicles were sold.",
        choices: [
            { text: "Without admitting any wrongdoing, we're prepared to increase our offer to $700 million with the comprehensive recall and safety measures.", nextScene: "success" },
            { text: "Those documents are confidential and were illegally obtained. We refuse to discuss them, and if you mention them again, we'll terminate these negotiations immediately.", nextScene: "failure" }
        ]
    },
    // Scene 23: Public statement acknowledgment
    {
        speaker: "counterpart",
        text: "A public acknowledgment would be meaningful to my clients. It shows Payne Motors taking responsibility, which is an important aspect of rebuilding trust.",
        choices: [
            { text: "We'll issue a public statement acknowledging the issue, alongside the recall and a $630 million compensation program.", nextScene: "success" }
        ]
    },
    // Scene 24: $225M with loaners - negotiable
    {
        speaker: "counterpart",
        text: "I appreciate your focus on solutions. The loaner vehicles are essential, and $225 million is getting closer to an acceptable figure, though still below what my clients deserve.",
        choices: [
            { text: "We can increase our offer to $630 million with loaners and an expedited claims process. Would that address your clients' concerns?", nextScene: "success" }
        ]
    },
    // Scene 25: Full recall with limited compensation
    {
        speaker: "counterpart",
        text: "A full recall for all vehicles is appropriate, but limiting compensation to verified damages doesn't acknowledge the diminished value and risk exposure all owners have faced.",
        choices: [
            { text: "We understand. We'll offer a minimum compensation amount to all owners, with additional compensation for verified damages, totaling $700 million.", nextScene: "success" }
        ]
    },
    // Scene 26: Expanded recall with reasonable terms
    {
        speaker: "counterpart",
        text: "The expanded recall is appropriate, but what 'reasonable compensation terms' are you suggesting? My clients need specific figures to evaluate your proposal.",
        choices: [
            { text: "We're prepared to offer $630 million in total compensation with a structured distribution process based on documented damages.", nextScene: "success" }
        ]
    },
    // Scene 27: Prioritizing higher-risk vehicles
    {
        speaker: "counterpart",
        text: "Prioritizing high-risk vehicles makes practical sense, but all owners deserve prompt attention. What's your timeline for addressing all affected vehicles?",
        choices: [
            { text: "We can't commit to any specific timeline. Once we've handled the high-risk vehicles, we'll get to the others as our resources allow. And to be clear, our internal documents show no evidence of a widespread defect.", nextScene: "failure" }
        ]
    },
    // Scene 28: $250M with full recall
    {
        speaker: "counterpart",
        text: "The $580 million with full recall is moving in the right direction. If you're willing to include extended warranties and a public acknowledgment, we might have the basis for a settlement.",
        choices: [
            { text: "We can include both extended warranties and a public acknowledgment alongside the $580 million compensation and full recall.", nextScene: "success" }
        ]
    },
    // Scene 29: $275M with expedited process
    {
        speaker: "counterpart",
        text: "The $630 million figure with expedited claims is reasonable. Including loaner vehicles addresses the immediate safety concerns. This proposal has potential.",
        choices: [
            { text: "We're pleased to offer this comprehensive solution. Shall we proceed with drafting the settlement agreement?", nextScene: "success" }
        ]
    },
    // Scene 30: $300M with PR management
    {
        speaker: "counterpart",
        text: "The $700 million compensation is approaching an acceptable figure. Regarding PR, I can commit to fair and factual public statements about the settlement if it's reasonable.",
        choices: [
            { text: "That's all we ask. We'll proceed with the $700 million compensation, structured claims process, and full recall with loaners.", nextScene: "success" }
        ]
    },
    // Scene 31: $200M recovery offer
    {
        speaker: "counterpart",
        text: "You're kidding! I have an uncle who lives near there. Ah, I'm running out of time, but let's just split the difference? $700M compensation fund and public apology.",
        choices: [
            { text: "I appreciate that, but I can't do more than $230M. Can we make that work?", nextScene: "success" },
            { text: "Oh man, I'm so wasted right now. Yeah, sure, let's split down the middle. You ever tried a spit shake before?", nextScene: "failure" }
        ]
    },
    // Scene 32: $225M recovery offer
    {
        speaker: "counterpart",
        text: "Oh man, God bless Cohen and his pockets. New York will never be the same with Soto in town. You seem like a good guy, let's just make something happen here.",
        choices: [
            { text: "I'm with ya. Alright, $220M plus public apology, if you agree to lay off of Payne. Cool?", nextScene: "success" }
        ]
    },
    // Scene 33: $250M with extended warranties
    {
        speaker: "counterpart",
        text: "The extended warranties add significant value to your offer. Combined with the $580 million compensation fund, this shows a commitment to making things right for my clients.",
        choices: [
            { text: "We're committed to rebuilding trust with our customers. We'll implement this package promptly upon settlement.", nextScene: "success" }
        ]
    },
    // Scene 34: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "Your final offer is comprehensive and addresses the key concerns of my clients. With the compensation fund, recall provisions, and additional benefits, we have the basis for settlement.",
        choices: [
            { text: "Excellent. Let's proceed with finalizing the agreement details.", nextScene: "success" }
        ]
    },
    // Scene 35: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "After reviewing your proposal with my team, I believe we have the framework for a settlement that reasonably addresses the harms suffered by the class members.",
        choices: [
            { text: "We're pleased to have reached this resolution and look forward to implementing these remedies promptly.", nextScene: "success" }
        ]
    },
    // Scene 36: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "Your final proposal demonstrates Payne Motors' commitment to customer safety and fair compensation. This package addresses both immediate concerns and long-term value preservation.",
        choices: [
            { text: "We value our customers and want to make this right. Let's move forward with finalizing the settlement.", nextScene: "success" }
        ]
    },
    // Scene 37: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "The combined approach of monetary compensation, recall provisions, and additional benefits creates a settlement package that I can recommend to my clients with confidence.",
        choices: [
            { text: "We appreciate your constructive approach to resolving this matter. Let's finalize the details.", nextScene: "success" }
        ]
    },
    // Scene 38: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "After careful consideration of your comprehensive offer, I believe we've reached a fair resolution that balances the interests of all parties while prioritizing customer safety.",
        choices: [
            { text: "That's been our goal throughout these negotiations. We look forward to implementing the settlement.", nextScene: "success" }
        ]
    },
    // Scene 39: Placeholder for consistency
    {
        speaker: "counterpart",
        text: "Your final proposal meets the threshold of fairness and adequacy that would allow me to recommend this settlement to the class. We have a deal we can both support.",
        choices: [
            { text: "Excellent. We're committed to following through on all aspects of this agreement.", nextScene: "success" }
        ]
    },
    // Scene 40:
    {
        speaker: "counterpart",
        text: "The $470 million offer is still insufficient for a case of this magnitude. My clients have suffered significant damages and deserve fair compensation for both actual harm and diminished value.",
        choices: [
            { text: "We understand the seriousness of this issue. We can increase our offer to $700 million with full recall, loaners, and a public acknowledgment.", nextScene: "success" },
            { text: "$470 million is already generous considering how weak your case is. This settlement is a gift, not an obligation. I suggest you take it before we withdraw it.", nextScene: "failure" }
        ]
    },
    // Scene 41:
    {
        speaker: "counterpart",
        text: "The $525 million proposal with an independent administrator has merit. This structure would ensure fair distribution, but we need to discuss whether the total amount is sufficient.",
        choices: [
            { text: "We can increase the total to $630 million while maintaining the independent administration and expedited process.", nextScene: "success" },
            { text: "Why are you still pushing me? You'll make bank with this deal, just take it.", nextScene: "failure" }
        ]
    },
    // Success outcome
    {
        speaker: "counterpart",
        text: "Good job, Ms. Hastings! You successfully negotiated a settlement that protects Payne Motors' interests while addressing customer concerns. The board will fall to their knees in awe of your talent as a sharp interlocutor, and shareholders will smile softly to themselves in the far-off distance and whisper, 'That's my CEO.'",
        choices: [
            { text: "Play Again", nextScene: "restart" }
        ]
    },
    // Failure outcome
    {
        speaker: "counterpart",
        text: "Unfortunately, Ms. Hastings, you were unable to reach a settlement with Davis Parker. The case will now proceed to trial, exposing Payne Motors to the million-dollar circus which is litigation. You should've employed more tactical empathy and identified better integration opportunities. Dan taught you better than this.",
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

// Deal EV Calculator
function initializeDealCalculator() {
    console.log('Initializing Deal Calculator...');
    
    // DOM elements for the deal calculator
    const recallRadios = document.querySelectorAll('input[name="recall"]');
    const loanerVehiclesRadios = document.querySelectorAll('input[name="loanerVehicles"]');
    const loanerDaysField = document.querySelector('.loaner-days');
    const thirdPartyEvaluatorRadios = document.querySelectorAll('input[name="thirdPartyEvaluator"]');
    const publicStatementRadios = document.querySelectorAll('input[name="publicStatement"]');
    const apologyOption = document.querySelector('.apology-option');
    const calculateButton = document.getElementById('calculate-ev');
    const formSections = document.querySelectorAll('.form-section:not(:first-child)');
    
    // Function to toggle form fields based on recall selection
    function toggleFormFields(isSettlement) {
        // Get all form groups in the first section
        const formSection = document.querySelector('.form-section:first-child');
        const pawlsGroup = formSection.querySelector('.form-group:nth-of-type(2)');
        const loanerGroup = formSection.querySelector('.form-group:nth-of-type(3)');
        const loanerDaysGroup = formSection.querySelector('.loaner-days');
        
        console.log('Form groups:', {pawlsGroup, loanerGroup, loanerDaysGroup});
        
        // Toggle the rest of the form sections
        formSections.forEach(section => {
            if (isSettlement) {
                section.classList.remove('disabled-section');
                // Enable all form elements within the sections
                const formElements = section.querySelectorAll('input, button, select');
                formElements.forEach(element => {
                    element.disabled = false;
                });
            } else {
                section.classList.add('disabled-section');
                // Disable all form elements within the sections
                const formElements = section.querySelectorAll('input, button, select');
                formElements.forEach(element => {
                    element.disabled = true;
                });
            }
        });
        
        // Handle the pawls and loaner options separately
        if (isSettlement) {
            // Enable pawls options
            if (pawlsGroup) {
                pawlsGroup.classList.remove('disabled-section');
                const inputs = pawlsGroup.querySelectorAll('input');
                inputs.forEach(input => input.disabled = false);
            }
            
            // Enable loaner options
            if (loanerGroup) {
                loanerGroup.classList.remove('disabled-section');
                const inputs = loanerGroup.querySelectorAll('input');
                inputs.forEach(input => input.disabled = false);
            }
            
            // Enable loaner days field if visible
            if (loanerDaysGroup) {
                loanerDaysGroup.classList.remove('disabled-section');
                const input = loanerDaysGroup.querySelector('input');
                if (input) input.disabled = false;
            }
        } else {
            // Disable pawls options
            if (pawlsGroup) {
                pawlsGroup.classList.add('disabled-section');
                const inputs = pawlsGroup.querySelectorAll('input');
                inputs.forEach(input => input.disabled = true);
            }
            
            // Disable loaner options
            if (loanerGroup) {
                loanerGroup.classList.add('disabled-section');
                const inputs = loanerGroup.querySelectorAll('input');
                inputs.forEach(input => input.disabled = true);
            }
            
            // Disable loaner days field if visible
            if (loanerDaysGroup) {
                loanerDaysGroup.classList.add('disabled-section');
                const input = loanerDaysGroup.querySelector('input');
                if (input) input.disabled = true;
            }
        }
    }
    
    // Initialize form state based on initial recall selection
    const initialRecallValue = document.querySelector('input[name="recall"]:checked').value === 'yes';
    toggleFormFields(initialRecallValue);
    
    // Add event listeners to recall radios to toggle other fields
    recallRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const isSettlement = radio.value === 'yes';
            toggleFormFields(isSettlement);
        });
    });
    
    // Show/hide conditional fields based on selections
    loanerVehiclesRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            loanerDaysField.style.display = radio.value === 'yes' ? 'block' : 'none';
        });
    });
    
    publicStatementRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            apologyOption.style.display = radio.value === 'yes' ? 'block' : 'none';
        });
    });
    
    // Calculate EV on button click
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateExpectedValues);
    } else {
        console.error('Calculate button not found');
    }
}

// Calculate EVs based on form inputs
function calculateExpectedValues() {
    console.log('Calculating EVs...');
    
    // Get all form values
    const formData = {
        recall: document.querySelector('input[name="recall"]:checked').value === 'yes',
        payForPawls: document.querySelector('input[name="payForPawls"]:checked').value === 'yes',
        loanerVehicles: document.querySelector('input[name="loanerVehicles"]:checked').value === 'yes',
        loanerDays: parseInt(document.querySelector('input[name="loanerDays"]').value) || 7,
        compensationPerOwner: parseInt(document.querySelector('input[name="compensationPerOwner"]').value) || 0,
        compensationPerAccident: parseInt(document.querySelector('input[name="compensationPerAccident"]').value) || 0,
        thirdPartyEvaluator: document.querySelector('input[name="thirdPartyEvaluator"]:checked').value === 'yes',
        publicStatement: document.querySelector('input[name="publicStatement"]:checked').value === 'yes',
        apology: document.querySelector('input[name="apology"]:checked').value === 'yes',
        favorableComment: document.querySelector('input[name="favorableComment"]:checked').value === 'yes',
        wildfireStatement: document.querySelector('input[name="wildfireStatement"]:checked').value === 'yes',
        safetyRegulators: document.querySelector('input[name="safetyRegulators"]:checked').value === 'yes',
        waiveFutureClaims: document.querySelector('input[name="waiveFutureClaims"]:checked').value === 'yes',
    };
    
    console.log('Form data:', formData);
    
    // Define constants from the case
    const totalHydras = 1000000;
    const defectiveHydras = 100000;
    let accidentHydras = 111100;
    const recallCostPerDefectiveVehicle = 140; // $140 per vehicle ($40 parts + $100 labor)
    const recallCostPerFunctionalVehicle = 30; // $50 per vehicle ($0 parts + $30 labor)
    const baseLoanerCostPerDay = 50; // $50 per vehicle per day
    const courtCostPayneMotors = 900000000; // $900M if going to court
    const courtWinningsPlaintiffs = 800000000; // $800M winnings in court (assuming Payne spends $100M on lawyers, etc.)
    const prDamageCost = 100000000; // $100M estimated PR damage cost
    const costPerEvaluation = 500; // $500 for third party to investigate 1 accident claim
    
    // Lawyer's parameters
    const lawyerFeePercentage = 0.30; // 30% of settlement or judgment
    const lawyerWinProbability = 0.75; // 75% chance of winning at trial
    
    // Calculate costs
    let totalCost = 0;
    let plaintiffEV = 0;
    let payneEV = 0;
    let lawyerEV = 0;
    
    if (formData.recall) {
        const recallCost = formData.payForPawls ? (totalHydras-defectiveHydras) * recallCostPerFunctionalVehicle + defectiveHydras * recallCostPerDefectiveVehicle : 0;
        totalCost += recallCost;
        payneEV -= recallCost;
        plaintiffEV += recallCost;
        lawyerEV += recallCost * 0.2; // makes him look good
        
        // Loaner vehicle costs
        if (formData.loanerVehicles) {
            const loanerCost = defectiveHydras * baseLoanerCostPerDay * formData.loanerDays;
            totalCost += loanerCost;
            payneEV -= loanerCost;
            plaintiffEV += loanerCost;
            lawyerEV += loanerCost * 0.2; // makes him look good
        }

         // Third-party evaluator costs
         if (formData.thirdPartyEvaluator) {
            const evaluatorTotalCost = accidentHydras * costPerEvaluation;
            totalCost += evaluatorTotalCost;
            payneEV -= evaluatorTotalCost;
            accidentHydras *= 0.2; // cut 80%, the unrelated accidents, out
        }
        
        // Compensation costs
        const ownerCompensation = defectiveHydras * formData.compensationPerOwner;
        const accidentCompensation = accidentHydras * formData.compensationPerAccident;
        const totalCompensation = ownerCompensation + accidentCompensation;
        totalCost += totalCompensation;
        payneEV -= totalCompensation;
        lawyerEV = totalCompensation * lawyerFeePercentage; // Lawyer gets 30% of the monetary compensation
        plaintiffEV = totalCompensation * (1 - lawyerFeePercentage); // Plaintiffs get the remaining 70% of the compensation
        
        // PR impact
        if (formData.publicStatement) {
            let prCostReduction = 0;
            if (formData.apology) {
                prCostReduction = formData.favorableComment ? 0.1 : 0.7; 
                lawyerEV += 8000000; // really benefits from forcing public apology
            } else {
                prCostReduction = 0.5; // without favorable comment, actually worse to apologize
            }
            payneEV -= prDamageCost * prCostReduction;
            lawyerEV += 2000000; // benefits from forcing any public statement
            plaintiffEV += 10000000; // benefit from hearing about pawls through statement (maybe they missed direct comms)
        } else {
            payneEV += 20000000;
            lawyerEV -= 30000000; 
            plaintiffEV -= 50000000;
        }
        
        // Favorable comments by Parker
        if (formData.favorableComment) {
            lawyerEV += 3000000; // he can say he got a good settlement and seem like a trustworthy negotiation partner
        }
        
        // Wildfire statement (not integrative)
        if (formData.wildfireStatement) {
            payneEV += 30000000; // really good for making them look better (though not off the hook entirely)
            lawyerEV -= 100000000; // VERY bad for case and reputation
        }
        
        // Future claim waivers (integrative between lawyer and payne)
        if (formData.waiveFutureClaims) {
            payneEV += 100000000; // $100M saved in potential future claims
            lawyerEV -= 30000000; // loses out on $30M future claims
            plaintiffEV -= 70000000; // loses out on $70M future
        } 
        
        // Safety regulator commitment (not integrative)
        if (formData.safetyRegulators) {
            payneEV -= 20000000; // $20M cost of regulators
            plaintiffEV += 10000000; // $10M value to plaintiffs for increased safety
            lawyerEV += 5000000; // looks good to clients
        }
    }
    else {        
        payneEV = -(courtCostPayneMotors) - prDamageCost; // Court cost + PR damage
        
        // Lawyer's cut is 30% of the court outcome
        lawyerEV = courtWinningsPlaintiffs * lawyerFeePercentage * lawyerWinProbability;
        
        // Plaintiffs get the remaining 70% of the expected court outcome
        plaintiffEV = courtWinningsPlaintiffs * lawyerWinProbability * (1 - lawyerFeePercentage);
        
        totalCost = courtWinningsPlaintiffs;
    }
        
    // Display the results
    document.getElementById('payne-ev').textContent = formatCurrency(payneEV);
    document.getElementById('plaintiff-ev').textContent = formatCurrency(plaintiffEV);
    document.getElementById('lawyer-ev').textContent = formatCurrency(lawyerEV);
    document.getElementById('total-cost').textContent = formatCurrency(totalCost);
    
    // Calculate trial values for comparison (BATNA)
    const trialPayneEV = -courtCostPayneMotors - prDamageCost;
    const trialLawyerEV = courtWinningsPlaintiffs * lawyerFeePercentage * lawyerWinProbability;
    const trialPlaintiffEV = courtWinningsPlaintiffs * lawyerWinProbability * (1 - lawyerFeePercentage);
    
    // Calculate integrative value created (if elements exist)
    if (document.getElementById('total-ev-deal') && 
        document.getElementById('total-ev-trial') && 
        document.getElementById('value-created')) {
        
        const totalEVDeal = payneEV + plaintiffEV + lawyerEV;
        const totalEVTrial = trialPayneEV + trialLawyerEV + trialPlaintiffEV;
        const valueCreated = totalEVDeal - totalEVTrial;
        
        // Display integrative value results
        document.getElementById('total-ev-deal').textContent = formatCurrency(totalEVDeal);
        document.getElementById('total-ev-trial').textContent = formatCurrency(totalEVTrial);
        document.getElementById('value-created').textContent = formatCurrency(valueCreated);
        
        // Change color based on whether value was created or destroyed
        const valueCreatedElement = document.getElementById('value-created');
        if (valueCreated > 0) {
            valueCreatedElement.style.color = '#27ae60'; // Green for positive value
        } else {
            valueCreatedElement.style.color = '#c0392b'; // Red for negative value
        }
    }

    // Create breakdown tables for each decision's impact on the parties
    createEVBreakdownTable(formData, trialPayneEV, trialPlaintiffEV, trialLawyerEV);

    // So we can soon update preference display
    const payneIncentivized = document.querySelector('.payne-incentivized');
    const payneNotIncentivized = document.querySelector('.payne-not-incentivized');
    const lawyerIncentivized = document.querySelector('.lawyer-incentivized');
    const lawyerNotIncentivized = document.querySelector('.lawyer-not-incentivized');
        
    // Use the trial values we calculated earlier
    const lawyerPrefersTrial = lawyerEV < trialLawyerEV;
    const paynePrefersTrial = payneEV < trialPayneEV;

    const lawyerNotIncentivizedLabel = document.querySelector('.lawyer-not-incentivized-label');
    const payneNotIncentivizedLabel = document.querySelector('.payne-not-incentivized-label');

    if (!formData.recall) {
        // No settlement: always show X and red for both
        lawyerNotIncentivizedLabel.textContent = "✗ Lawyer prefers not to go to trial";
        payneNotIncentivizedLabel.textContent = "✗ Payne Motors prefers not to go to trial";

        lawyerIncentivized.style.display = 'none';
        lawyerNotIncentivized.style.display = 'flex';
        payneIncentivized.style.display = 'none';
        payneNotIncentivized.style.display = 'flex';
        
    } else {
        if (!lawyerPrefersTrial) {
            lawyerIncentivized.style.display = 'flex';
            lawyerNotIncentivized.style.display = 'none';
        } else {
            lawyerIncentivized.style.display = 'none';
            lawyerNotIncentivized.style.display = 'flex';
        }
        
        if (!paynePrefersTrial) {
            payneIncentivized.style.display = 'flex';
            payneNotIncentivized.style.display = 'none';
        } else {
            payneIncentivized.style.display = 'none';
            payneNotIncentivized.style.display = 'flex';
        }
    }

    // Update settlement summary
    const settlementSummary = document.querySelector('.settlement-summary');
    const settlementStatus = document.getElementById('settlement-status');
    
    if (paynePrefersTrial || lawyerPrefersTrial) {
        settlementSummary.style.display = 'flex';
        
        if (paynePrefersTrial && lawyerPrefersTrial) {
            settlementStatus.textContent = "Both parties prefer to go to trial";
            settlementStatus.style.color = "#d94e4e";
        } else if (paynePrefersTrial) {
            settlementStatus.textContent = "Payne Motors prefers trial";
            settlementStatus.style.color = "#d9994e";
        } else {
            settlementStatus.textContent = "The lawyer prefers trial";
            settlementStatus.style.color = "#d9994e";
        }
    } else {
        settlementSummary.style.display = 'flex';
        settlementStatus.textContent = "Both parties prefer to settle";
        if (formData.recall){
            settlementStatus.style.color = "#4ed94e";    
        } else {
            settlementStatus.style.color = "#d94e4e";
        }
        
    }
    
    // Show the results container
    document.getElementById('ev-results').style.display = 'block';
}

// Format currency values
function formatCurrency(value) {
    const absValue = Math.abs(value);
    let formatted;
    
    if (absValue >= 1000000000) {
        formatted = '$' + (absValue / 1000000000).toFixed(2) + 'B';
    } else if (absValue >= 1000000) {
        formatted = '$' + (absValue / 1000000).toFixed(2) + 'M';
    } else if (absValue >= 1000) {
        formatted = '$' + (absValue / 1000).toFixed(2) + 'K';
    } else {
        formatted = '$' + absValue.toFixed(2);
    }
    
    return value < 0 ? '-' + formatted : formatted;
}

// Function to create EV breakdown table for decisions
function createEVBreakdownTable(formData, trialPayneEV, trialPlaintiffEV, trialLawyerEV) {
    // Remove any existing breakdown
    const existingBreakdown = document.getElementById('ev-breakdown');
    if (existingBreakdown) {
        existingBreakdown.remove();
    }
    
    // Constants used in EV calculation
    const totalHydras = 1000000;
    const defectiveHydras = 100000;
    let accidentHydras = 111100;
    const recallCostPerDefectiveVehicle = 140; // $140 per vehicle ($40 parts + $100 labor)
    const recallCostPerFunctionalVehicle = 30; // $50 per vehicle ($0 parts + $30 labor)
    const baseLoanerCostPerDay = 50; // $50 per vehicle per day
    const courtCostPayneMotors = 900000000; // $900M if going to court
    const courtWinningsPlaintiffs = 800000000; // $800M winnings in court (assuming Payne spends $100M on lawyers, etc.)
    const prDamageCost = 100000000; // $100M estimated PR damage cost
    const costPerEvaluation = 500; // $500 for third party to investigate 1 accident claim
    const lawyerFeePercentage = 0.30; // 30% of settlement or judgment

    // Create breakdown container
    const breakdownDiv = document.createElement('div');
    breakdownDiv.id = 'ev-breakdown';
    breakdownDiv.className = 'ev-breakdown';
    
    // Add header
    const header = document.createElement('h3');
    header.textContent = 'EV Formula Breakdown';
    breakdownDiv.appendChild(header);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'ev-breakdown-table';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Decision', 'Payne Motors', 'Plaintiffs', 'Lawyer'];
    
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows with EV impact calculations for each decision
    if (formData.recall) {
        // Calculate recall costs
        if (formData.payForPawls) {
            const recallCost = (totalHydras-defectiveHydras) * recallCostPerFunctionalVehicle + defectiveHydras * recallCostPerDefectiveVehicle;
            addRow(tbody, 'Recall with paid pawl replacement', 
                   formatCurrency(-recallCost), 
                   formatCurrency(recallCost), 
                   '$0');
        } else {
            addRow(tbody, 'Recall without paid pawl replacement', 
                   formatCurrency(-105000000), // max penalties for illegal activity 
                   formatCurrency(-recallCost), 
                   '$0');
        }
        
        // Loaner vehicle costs
        if (formData.loanerVehicles) {
            const loanerCost = defectiveHydras * baseLoanerCostPerDay * formData.loanerDays;
            addRow(tbody, `Loaner vehicles (${formData.loanerDays} days)`, 
                   formatCurrency(-loanerCost), 
                   formatCurrency(loanerCost), 
                   formatCurrency(loanerCost * 0.2));
        }
        
        // Third-party evaluator
        if (formData.thirdPartyEvaluator) {
            const evaluatorTotalCost = accidentHydras * costPerEvaluation;
            addRow(tbody, 'Third-party evaluator', 
                   formatCurrency(-evaluatorTotalCost), 
                   '$0', 
                   '$0');
            
            // Reduce accident claims by 80% when using evaluator
            accidentHydras = Math.round(accidentHydras * 0.2);
            addRow(tbody, 'Reduced accident claims (80% reduction)', 
                   '$0', 
                   '$0', 
                   '$0');
        }
        
        // Compensation costs
        const ownerCompensation = defectiveHydras * formData.compensationPerOwner;
        if (ownerCompensation > 0) {
            addRow(tbody, `Compensation to owners ($${formData.compensationPerOwner.toLocaleString()} each)`, 
                   formatCurrency(-ownerCompensation), 
                   formatCurrency(ownerCompensation * (1 - lawyerFeePercentage)), 
                   formatCurrency(ownerCompensation * lawyerFeePercentage));
        }
        
        const accidentCompensation = accidentHydras * formData.compensationPerAccident;
        if (accidentCompensation > 0) {
            addRow(tbody, `Compensation for accidents ($${formData.compensationPerAccident.toLocaleString()} each)`, 
                   formatCurrency(-accidentCompensation), 
                   formatCurrency(accidentCompensation * (1 - lawyerFeePercentage)), 
                   formatCurrency(accidentCompensation * lawyerFeePercentage));
        }
        
        // PR impact
        if (formData.publicStatement) {
            let prCostReduction = 0;
            if (formData.apology) {
                prCostReduction = formData.favorableComment ? 0.1 : 0.7;
                addRow(tbody, 'Public statement with apology', 
                       formatCurrency(-prDamageCost * prCostReduction), 
                       formatCurrency(10000000), 
                       formatCurrency(formData.favorableComment ? 8000000 + 2000000 : 8000000));
            } else {
                prCostReduction = 0.5;
                addRow(tbody, 'Public statement without apology', 
                       formatCurrency(-prDamageCost * prCostReduction), 
                       formatCurrency(10000000), 
                       formatCurrency(2000000));
            }
        }
        
        // Favorable comments
        // if (formData.favorableComment && !formData.publicStatement) {
        //     addRow(tbody, 'Favorable comments by Parker', 
        //            '$0', 
        //            '$0', 
        //            formatCurrency(3000000));
        // }
        
        // Wildfire statement
        if (formData.wildfireStatement) {
            addRow(tbody, 'Wildfire statement', 
                   formatCurrency(30000000), 
                   '$0', 
                   formatCurrency(-100000000));
        }
        
        // Future claim waivers
        if (formData.waiveFutureClaims) {
            addRow(tbody, 'Waive future claims', 
                   formatCurrency(100000000), 
                   formatCurrency(-70000000), 
                   formatCurrency(-30000000));
        }
        
        // Safety regulator commitment
        if (formData.safetyRegulators) {
            addRow(tbody, 'Safety regulator commitment', 
                   formatCurrency(-20000000), 
                   formatCurrency(10000000), 
                   formatCurrency(5000000));
        }
    } else {
        // No settlement - going to trial
        addRow(tbody, 'No settlement (going to trial)', 
               formatCurrency(trialPayneEV), 
               formatCurrency(trialPlaintiffEV), 
               formatCurrency(trialLawyerEV));
    }
    
    table.appendChild(tbody);
    breakdownDiv.appendChild(table);
    
    // Add the breakdown after the Total Settlement Cost
    const resultsContainer = document.getElementById('ev-results');
    resultsContainer.appendChild(breakdownDiv);
    
    // Add CSS for the breakdown table
    const style = document.createElement('style');
    style.textContent = `
        .ev-breakdown {
            margin-top: 20px;
            background-color: #f0f9ff;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .ev-breakdown h3 {
            color: #2980b9;
            border-bottom: 1px solid #bde0fe;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 15px;
        }
        
        .ev-breakdown-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .ev-breakdown-table th, .ev-breakdown-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .ev-breakdown-table th {
            background-color: #e8f4fc;
            font-weight: bold;
            color: #2980b9;
        }
        
        .ev-breakdown-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .ev-breakdown-table tr:hover {
            background-color: #eaf7ff;
        }
        
        .ev-breakdown-table td:first-child {
            font-weight: bold;
        }
        
        .ev-breakdown-table td.positive {
            color: #27ae60;
        }
        
        .ev-breakdown-table td.negative {
            color: #c0392b;
        }
    `;
    
    document.head.appendChild(style);
}

// Helper function to add a row to the EV breakdown table
function addRow(tbody, decision, payneImpact, plaintiffImpact, lawyerImpact) {
    const row = document.createElement('tr');
    
    const decisionCell = document.createElement('td');
    decisionCell.textContent = decision;
    row.appendChild(decisionCell);
    
    const payneCell = document.createElement('td');
    payneCell.textContent = payneImpact;
    if (payneImpact.includes('-')) {
        payneCell.className = 'negative';
    } else if (payneImpact !== '$0') {
        payneCell.className = 'positive';
    }
    row.appendChild(payneCell);
    
    const plaintiffCell = document.createElement('td');
    plaintiffCell.textContent = plaintiffImpact;
    if (plaintiffImpact.includes('-')) {
        plaintiffCell.className = 'negative';
    } else if (plaintiffImpact !== '$0') {
        plaintiffCell.className = 'positive';
    }
    row.appendChild(plaintiffCell);
    
    const lawyerCell = document.createElement('td');
    lawyerCell.textContent = lawyerImpact;
    if (lawyerImpact.includes('-')) {
        lawyerCell.className = 'negative';
    } else if (lawyerImpact !== '$0') {
        lawyerCell.className = 'positive';
    }
    row.appendChild(lawyerCell);
    
    tbody.appendChild(row);
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // Initialize the tabs
    initializeTabs();
    
    // Initialize the deal calculator
    initializeDealCalculator();
    
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