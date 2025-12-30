document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const results = document.getElementById('results');
    const diseaseName = document.getElementById('diseaseName');
    const diseaseDescription = document.getElementById('diseaseDescription');
    const recommendations = document.getElementById('recommendations');

    // Upload area click
    uploadArea.addEventListener('click', () => fileInput.click());

    // File input change handler
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
                analyzeBtn.disabled = false;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Drag & drop
    uploadArea.addEventListener('dragover', e => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });
    uploadArea.addEventListener('dragleave', e => {
        e.preventDefault();
        uploadArea.style.borderColor = '#a5d6a7';
    });
    uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
    });

    // Analyze button click
    analyzeBtn.addEventListener('click', async function() {
        if (!fileInput.files[0]) return;

        // Show loading
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        this.disabled = true;

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            // Show results
            diseaseName.textContent = data.prediction;
            diseaseDescription.textContent = 'This prediction comes from AI model.';
            recommendations.innerHTML = '<li>Follow recommended treatment plan for the disease.</li>';

            results.style.display = 'block';
            gsap.from(results, {duration: 1, y: 50, opacity: 0, ease: "power3.out"});
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to get prediction. Try again.');
        }

        // Reset analyze button
        this.innerHTML = '<i class="fas fa-search"></i> Analyze Image';
        this.disabled = false;
    });
});
