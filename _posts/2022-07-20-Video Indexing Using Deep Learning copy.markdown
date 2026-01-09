layout: post
title: "Video Indexing Using Deep Learning"
permalink: /video-indexing-using-deep-learning/
date: 2022-07-20 12:10

start_date: 2022-02-10 12:00:00
end_date: 2022-07-21 12:00:00
image: https://ayushchoudhary-dev.github.io/mw/assets/images/v1.jpg
headerImage: true
projects: true
tag:
- 
category: project
externalLink: false
number: "1. "
---

<h3>Ever Wished You Could Fast-Forward (Intelligently)?</h3>
<p>Remember getting stuck scrubbing through a long tutorial video, desperately trying to find that one specific topic? It's a pain!  For my undergrad capstone project, I wanted to fix that. My goal was to build a tool that could automatically watch a slide-based instructional video and create a clickable "table of contents" with timestamps, letting viewers jump right to the info they need. Think YouTube chapters, but generated automatically using AI!</p>


<h3>Finding the "Headlines" in Video Slides</h3>
<p>
So, how do you get a computer to understand video topics? My approach focused on presentation slides. The core idea: find the title on each slide as it appears in the video. I dove into a couple of ways to do this:   
<br>
<br>
Attempt 1: Just Ask OCR (Tesseract): Using standard Optical Character Recognition (OCR) is great for reading text. But, it sometimes grabbed the wrong line (like a header) or only got part of a title if it spanned multiple lines.   



<br>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/fig7tessline.png" alt="fig7tessline">
<br>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/fig11segmentation.png" alt="fig11segmentation">
<br>
Attempt 2: Use Deep Learning Vision (Deeplab-v3+): This involved training a model to "see" the layout of the slide and identify the area where the title usually sits (called Page Segmentation). Pretty cool, but sometimes the predicted area wasn't precise enough for clean text extraction.
</p>
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/WorkflowDiagram.jpg" alt="WorkflowDiagram">


<h3>My Solution: The "Best-of-Both-Worlds" Hybrid Method</h3>

<p>The really exciting part was creating a Hybrid Method that combined the strengths of the first two approaches. Here’s the trick:
<br>
<br>
1.Let Tesseract do what it's good at: find all the text lines with accurate bounding boxes
<br>
2.Then, use the Deep Learning segmentation map (which knows the likely location of the title) to intelligently select which of Tesseract's boxes actually belong to the title. This fusion approach proved much better at handling tricky layouts and multi-line titles.
<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/fig15.png" alt="fig15">
<br>
Key Tech Used: Python, Deep Learning (Deeplab-v3+), Tesseract OCR
</p>
Want to see the nitty-gritty? Check out the code on
[VIndex](https://github.com/srz0tfr/Vindex)
<hr class="rounded">

