document.addEventListener('DOMContentLoaded'), () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const gallery = document.getElementById('gallery');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
}
    let currentPage = 1;
    let query = '';

    const fetchImages = (query, page) => {
        const apiKey = 'live_chwkJKmCyU1yngNDZyYwtq1Zz067dIm9Af2U7I1wB118vrqqnLCogEpmgTIuMfft';
        const url = `https://dog.ceo/api/breeds/image/random?page=${page}&query=${query}&client_id=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayImages(data.results);
            })
            .catch(error => console.error('Error:', error));
    };

    const displayImages = (images) => {
        gallery.innerHTML = 'https://dog.ceo/api/breeds/image/random';
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;
            gallery.appendChild(imgElement);
        });
    };
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const gallery = document.getElementById('gallery');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
    
        let currentPage = 1;
        let query = '';
    
        const fetchImages = (query, page) => {
            const apiKey = 'live_chwkJKmCyU1yngNDZyYwtq1Zz067dIm9Af2U7I1wB118vrqqnLCogEpmgTIuMfft';
            const url = `https://dog.ceo/api/breeds/image/random?page=${page}&query=${query}&client_id=${apiKey}`;
    
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => {
                    displayImages(data.results);
                })
                .catch(error => console.error('Error:', error));
        };
    
        const displayImages = (images) => {
            gallery.innerHTML = 'https://dog.ceo/api/breeds/image/random';
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.urls.small;
                imgElement.alt = image.alt_description;
                gallery.appendChild(imgElement);
            });
        };
    
        searchButton.addEventListener('click', () => {
            query = searchInput.value;
            currentPage = 1;
            fetchImages(query, currentPage);
        });
    
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchImages(query, currentPage);
            }
        });
    searchButton.addEventListener('click', () => {
        query = searchInput.value;
        currentPage = 1;
        fetchImages(query, currentPage);
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchImages(query, currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        fetchImages(query, currentPage);
    });
});
