title: "Credit Scoring"
layout: post
permalink: /credit-scoring/
date: 2023-09-01 12:10:00
start_date: 2023-09-01 12:10:00
end_date: 2024-04-30 18:00:00
image: https://ayushchoudhary-dev.github.io/mw/assets/images/ProjectCS.jpg
headerImage: true
tag:
- Credit Scoring
- Machine Learning
- Transformer Models
- XGBoost
- Financial Risk Prediction
projects: true
category: project
externalLink: false
number: "5. "
---


- Built custom credit dataset with feature engineering and augmentation.

- Used Bi-Directional Transformers and XGBoost to classify credit scores.

<hr class="rounded">
<h3>Abstract</h3>

<p>The focus of this study is to refine credit scoring models by integrating bidirectional transformer networks with boosting techniques. Traditional credit evaluation methods often overlook the intricate nuances in financial data, leading to suboptimal risk assessments..</p>

<p> This research leverages advanced deep learning architectures to capture complex patterns, enhancing the accuracy and fairness of credit predictions</p>

<h3>Scope of the Project</h3>
<p>The project aims to enhance the precision of credit scoring by integrating bidirectional transformer models with XGBoost, offering a robust alternative to legacy scoring systems. This approach captures deeper relationships within financial data, improving the classification of creditworthiness.</p>

<p>It also explores the model's potential to scale across varied datasets, making it suitable for real-world financial applications. By addressing biases and limitations in traditional methods, the project supports more inclusive and equitable credit evaluation.</p> 

<h3>Results</h3>
<p>The model achieved a ROC-AUC score of 0.89, demonstrating strong classification performance across credit score categories.</p>
<p>Precision-Recall AUC helped improve detection of underrepresented classes, and the optimized F1 score ensured balanced accuracy for Good, Standard, and Poor credit profiles.</p>

<img src="https://ayushchoudhary-dev.github.io/mw/assets/images/training-results.png" alt="Training Accuracy, Loss, and Confusion Matrices" style="width:100%; max-width:900px;">

<p>The training graphs show a consistent decrease in loss and a steady rise in accuracy across 200+ epochs, indicating effective model learning without overfitting. Validation metrics closely follow training trends, reflecting good generalization.</p>

<p>The confusion matrices highlight the model's classification strength. The top matrix (before tuning) shows room for improvement in classifying the third category, while the bottom matrix (after tuning) demonstrates significant gains in accuracy across all three credit score categories.</p>