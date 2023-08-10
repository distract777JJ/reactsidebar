
    // Function to open the modal and display the zoomed image
    function zoomImage(imageSrc) {
        const zoomedImg = document.getElementById('zoomedImage');
        zoomedImg.src = imageSrc;
        
        // Set the maximum width and height for the zoomed image
        const maxWidth = window.innerWidth * 0.4; // Set the maximum width to 80% of the window width
        const maxHeight = window.innerHeight * 0.4; // Set the maximum height to 80% of the window height
        
        // Calculate the aspect ratio of the image
        const aspectRatio = zoomedImg.naturalWidth / zoomedImg.naturalHeight;
        
        // Determine the new width and height based on the aspect ratio and the maximum dimensions
        let newWidth, newHeight;
        if (aspectRatio > 1) {
          // Landscape-oriented image
          newWidth = Math.min(zoomedImg.naturalWidth, maxWidth);
          newHeight = newWidth / aspectRatio;
        } else {
          // Portrait-oriented image
          newHeight = Math.min(zoomedImg.naturalHeight, maxHeight);
          newWidth = newHeight * aspectRatio;
        }
        
        // Set the new width and height
        zoomedImg.style.width = `${newWidth}px`;
        zoomedImg.style.height = `${newHeight}px`;
      
        $('#imageModal').modal('show'); // Open the modal
      }

    async function fetchImageUrls() {
        try {
          const response = await fetch('API_URL'); // Replace with your API URL
          const data = await response.json();
          return data.urls; // Assuming the API response has a property "urls" containing the image URLs
        } catch (error) {
          console.error('Error fetching image URLs:', error);
          return [];
        }
      }
    
      // Function to dynamically load images from API
      async function loadImages() {
        const carouselInner = document.getElementById('carouselInner');
        const imageUrls = await fetchImageUrls();
    
        if (imageUrls && imageUrls.length > 0) {
          carouselInner.innerHTML = ''; // Clear existing images
    
          imageUrls.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Image ${index + 1}`;
            img.style.width = '100%';
            img.onclick = () => zoomImage(imageUrl);
    
            const item = document.createElement('div');
            item.classList.add('item');
            if (index === 0) {
              item.classList.add('active');
            }
            item.appendChild(img);
    
            carouselInner.appendChild(item);
          });
        }
      }