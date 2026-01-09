layout: post
title: "Interactive Image Editor"
permalink: /interactive-image-editor/

date: 2021-07-01 12:00:00
start_date: 2021-07-20 12:00:00
end_date: 2021-12-20 12:00:00
image: https://ayushchoudhary-dev.github.io/mw/assets/images/Ime.jpg
headerImage: true
projects: true
tag:
- 
category: project
externalLink: false
number: "1. "
---

<h3>Let's Play With Pixels! The Idea</h3>
<p>Ever wanted to quickly try out image filters like blur or edge detection without firing up heavy software? That was the inspiration for this project! I envisioned a fun, interactive web app where anyone could upload a picture and experiment with common (and some not-so-common!) image processing techniques, seeing the results instantly right in their browser.</p>

<h3>Behind the Scenes: Tech Blend for Speed</h3>
<p>
To bring this editor to life, I architected a full-stack solution that blended different technologies for the best results. The website itself, handling uploads and user interactions, was built with Django (using Python). But for the real magic – the actual image transformations – we unleashed the power of C++ and the OpenCV library. This C++ backend handled the heavy calculations for effects like:
</p>
<ul>
    <li>
        <strong>Filters (Gaussian Blur, Sharpen, Edge Detect, Emboss):</strong><br>
        - Core Logic: The <code>applyConvolution</code> function in C++ performs the 2D convolution using a 5x5 kernel.<br>
        - Specific Filters: Kernels for Box Blur, Edge Detection, Sharpening, Embossing, and Gaussian Blur were defined based on user choice.<br>
        - Integration: Django views (like <code>GaussianBlurView</code>) used <code>os.system</code> to call the compiled C++ code, passing the correct filter choice.
    </li>
    <br>
    <li>
        <strong>Resizing (Bilinear/Bicubic Interpolation):</strong><br>
        - Core Logic: The C++ <code>scale</code> function mapped target pixels to source coordinates and applied either <code>linear_interpolate</code> (Bilinear) or <code>Bicubic</code> interpolation.<br>
        - Integration: The Django <code>ResizedView</code> called the compiled C++ code via <code>os.system</code>, providing the scaling factors and selecting the interpolation mode.
    </li>
    <br>
    <li>
        <strong>Rotation:</strong><br>
        - Core Logic: The C++ <code>rotateImage</code> function calculated source coordinates using inverse rotation math and applied bilinear/bicubic interpolation.<br>
        - Integration: The Django <code>RotatedView</code> called the compiled C++ code via <code>os.system</code> with the specified rotation degree.
    </li>
    <br>
    <li>
        <strong>Custom DCT-based Image Compression:</strong><br>
        - Core Logic: The C++ <code>compressImg</code> function implemented the compression pipeline (YCbCr conversion, DCT, Quantization, Zigzag scan, RLE, Huffman coding). The <code>decompressImg</code> function reversed these steps.<br>
        - Integration: The Django <code>CompressedView</code> called the C++ encoder and decoder executables via <code>os.system</code>, passing the user-selected quality factor.
    </li>
    <br>
    <li>
        <strong>Custom Convolution Kernels:</strong><br>
        - UI: An HTML form allowed users to input a 5x5 kernel.<br>
        - Integration: The Django <code>CustomedView</code> retrieved these 25 values and passed them as arguments (choice '6') to the C++ convolution executable via <code>os.system</code>.<br>
        - Core Logic: The C++ code specifically handled choice '6' by reading the kernel values from command-line arguments.
    </li>
</ul>
<p>
A key challenge was making sure the powerful C++ processing felt snappy and responsive within the web interface, which required careful design and performance troubleshooting.
</p>

<h3>Seeing is Believing: Interactive Results & Teamwork</h3>
<p>The goal was always instant visual feedback. After applying an effect, the app neatly displayed the original image right next to the transformed version. This made it super easy and intuitive to see exactly what each image processing technique does. Bringing this all together involved leading a cross-functional team, where clear communication was key to integrating the different parts and delivering a smooth user experience.</p>

<p><strong>Addressing Performance/Responsiveness Challenge:</strong></p>
<ul>
    <li><strong>Architectural Choice:</strong> The speed came from a deliberate split:
        <ul>
            <li>Django (<code>views.py</code>) handled the lightweight web requests and task orchestration.</li>
            <li><code>os.system(...)</code> calls in Django delegated the heavy lifting to pre-compiled C++ executables.</li>
            <li>The C++ code (<code>.cpp</code> files) used OpenCV and direct pixel operations, generally faster for these tasks than pure Python.</li>
        </ul>
    </li>
    <li><strong>Troubleshooting Focus:</strong> Involved optimizing the C++ code (where possible) and minimizing the overhead from calling external processes and disk I/O for the "instant feedback" goal.</li>
</ul>

<p><strong>Key Technologies Used:</strong> Django, Python (with Pillow likely), C++, OpenCV.</p>
Want to see the nitty-gritty? Check out the code on
[Image Editor](https://github.com/srz0tfr/Image-Editor)
<hr class="rounded">

