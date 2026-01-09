layout: post
title: "Health Care Assistant"
permalink: /health-care-assistant/

date: 2021-01-01 12:00:00
start_date: 2021-01-10 12:00:00
end_date: 2021-05-15 12:00:00
image: https://ayushchoudhary-dev.github.io/mw/assets/images/HCA.png
headerImage: true
projects: true
tag:
- 
category: project
externalLink: false
number: "1. "
---

<h3>Your Pocket Health Buddy: An AI-Powered Web Assistant</h3>

<br>

<h3> Need Health Answers? There Should Be an App for That! (The Idea)</h3>
<p>
Ever felt overwhelmed trying to track your health, find reliable info quickly, or just needed someone (or something!) to talk to about health concerns, especially during the craziness of the pandemic? That's exactly why I built this <strong>Healthcare Assistant</strong>! The idea was to create a friendly, all-in-one web app where you could get quick symptom checks, chat about mental well-being, find nearby doctors, track your fitness goals, and keep medical reports handy – all in one easy-to-use place, right from your browser.
</p>
<p>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/LandingPage.jpg" alt="LandingPage">
</p>

<br>

<h3> Behind the Screens: Mixing Brains & Browser Tech</h3>
<p>
To make this health buddy smart and useful, I used a mix of technologies. The website interface you see is built with <strong><code>React</code></strong>, making it interactive and modern. For the backend smarts, like figuring out potential illnesses or understanding chat messages, <strong><code>Python</code></strong> came into play, likely using <strong><code>Flask</code></strong> to handle requests. <strong><code>Firebase</code></strong> securely handles user logins and stores data like health logs and uploaded reports.
</p>
<p>
The real intelligence comes from:
</p>
<ul>
  <li><strong>Disease Prediction:</strong> Using <strong><code>Scikit-learn</code></strong>, I trained a <strong>Decision Tree</strong> model on symptom data so the app can suggest possible conditions based on what the user inputs (up to 5 symptoms currently works!).</li>
  <li><strong>Mental Health Chatbot:</strong> Built using <strong><code>NLTK</code></strong> for understanding language and <strong><code>Keras/TensorFlow</code></strong> for the neural network brain, this chatbot tries to recognize emotions in the conversation and offer helpful responses or resources. It uses a custom <code>intents.json</code> file for training data.</li>
  <li><strong>Finding Help Nearby:</strong> Integrated <strong><code>Google Maps API</code></strong> lets users easily search for and locate hospitals or clinics.</li>
</ul>
<p>
A <strong>key challenge</strong> was making the chatbot truly understanding – the custom dataset (<code>intents.json</code>) needed for training worked for basic conversations but requires more data for deeper interactions. Another hurdle was implementing certain features like reminders, which feel more natural on a phone than a website – something noted for a potential future mobile version! Getting all the different parts (React frontend, Python backend, Firebase, ML models) to talk to each other seamlessly also required careful integration.
</p>

<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/WDH.jpg" alt="WDH">

<br>

<h3> Your Health Hub: Making Info Accessible</h3>
<p>
The goal was always to make health management less stressful. The app provides clear results – whether it's a potential disease match, a supportive chat response, visualized COVID data, your logged activities on a calendar, or easy access to your uploaded medical reports. It brings together tools that often live in separate apps into one central, accessible hub. (The project report lists Ayush Choudhary as the primary author - <strong>[Your Role - Replace if different]</strong>).
</p>

<br>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/Trackerlog.jpg" alt="Trackerlog">
<br>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/dispre.jpg" alt="dispre">
<br>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/chatbotinterface.jpg" alt="chatbotinterface">

<br>

<h3> Peek Under the Hood & Future Steps!</h3>
<p>
Curious about the code structure? You can explore the project files here github below. Key takeaways from building this were learning how to integrate ML models into a web app and managing user data securely with <code>Firebase</code>. Future ideas include expanding the chatbot's knowledge, improving the ML prediction models with more data, and potentially creating a dedicated mobile app version using <strong><code>React Native</code></strong> for an even better on-the-go experience!
</p>

<p><strong>Key Technologies Used:</strong> <code>React</code>, <code>Python</code>, <code>Flask</code>, <code>Firebase</code>, <code>Scikit-learn</code>, <code>NLTK</code>, <code>Keras</code>, <code>Google Maps API</code>.</p>
Want to see the nitty-gritty? Check out the code on [Health_CA](https://github.com/srz0tfr/Health_CA)

<hr class="rounded">

