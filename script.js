/* =========================================================
   DATA ARRAYS (EDIT THESE TO UPDATE YOUR WEBSITE)
   ========================================================= */

// 1. GALLERY DATA (Now updated so EVERY item is an album)
const gallery = [
    { 
        title: "Classic Wedding", 
        category: "Wedding", 
        coverImage: "gallery/wedding-cover.jpg", // The image shown on the grid
        images: [ // The array of images shown inside the lightbox
            "gallery/wedding1.jpg", 
            "gallery/wedding2.jpg", 
            "gallery/wedding3.jpg"
        ]
    },
    { 
        title: "Pre-Wedding Shoot", 
        category: "Wedding", 
        coverImage: "gallery/prewedding-cover.jpg", // The image shown on the grid
        images: [ // The array of images shown inside the lightbox
            "gallery/prewedding1.jpg", 
            "gallery/prewedding2.jpg", 
            "gallery/prewedding3.jpg"
        ]
    },
    { 
        title: "18th Debut", 
        category: "Birthday", 
        coverImage: "gallery/debut-cover.jpg",
        images: [
            "gallery/debut1.jpg",
            "gallery/debut2.jpg"
        ]
    },
    // I updated your remaining items to follow the album format too! 
    // Just add more images to their arrays when you have them.
    { 
        title: "Barangay Fiesta", 
        category: "Festival", 
        coverImage: "gallery/fiesta-cover.jpg",
        crop: "center", // Custom crop for this album's cover image 
        images: ["gallery/fiesta1.jpg",
            "gallery/fiesta2.jpg",
            "gallery/fiesta3.jpg"
        ] 
    },
    { 
        title: "Pre-Debut", 
        category: "Prenup", 
        coverImage: "gallery/predebut-cover.jpg", 
        images: ["gallery/predebut1.jpg"] 
    },
    { 
        title: "Church Ceremony", 
        category: "Wedding", 
        coverImage: "gallery/photo5.jpg", 
        images: ["gallery/photo5.jpg"] 
    },
    { 
        title: "Kids Party", 
        category: "Birthday", 
        coverImage: "gallery/photo6.jpg", 
        images: ["gallery/photo6.jpg"] 
    }
];

// 2. VIDEOS DATA
const videos = [
    { 
        title: "Wedding SDE", 
        thumbnail: "videos/thumb1.jpg", 
        // PASTE THE FACEBOOK SRC LINK HERE:
        video: "https://www.facebook.com/share/v/169YhwGzAaP/" 
    },

    { 
        title: "Barangay Fiesta", 
        thumbnail: "videos/thumb2.jpg", 
        // PASTE THE FACEBOOK SRC LINK HERE:
        video: "https://www.facebook.com/share/v/1En1r7BL2X/" 
    },

    { 
        title: "Debut SDE", 
        thumbnail: "videos/thumb3.jpg", 
        // PASTE THE FACEBOOK SRC LINK HERE:
        video: "https://www.facebook.com/share/v/1EA1V2cv3v/" 
    }
];

// 3. TEAM DATA
const members = [
    { name: "Prince Harvy", role: "Member", image: "team/harvy.jpg", crop: "50% 10%" },
    { name: "Jaren Trasporto", role: "Creative Director", image: "team/jaren.jpg" },
    { name: "Matthew Candappa", role: "Member", image: "team/matt.jpg" },
    { name: "Sofia Mendiola", role: "Member", image: "team/sofia.jpg" },
    { name: "Dean Lopez", role: "Member", image: "team/dean.jpg" },
    { name: "Phillen Grijaldo", role: "Member", image: "team/phillen.jpg" },
    { name: "Juan Esteban", role: "Member", image: "team/juan.jpg" },
    { name: "Jasper Fabian", role: "Member", image: "team/jasper.jpg" },
    { name: "Noah Antonio", role: "Member", image: "team/noah.jpg" }
];

// 4. TESTIMONIALS DATA
const testimonials = [
    { name: "Sarah & Mark", message: "J&J Multimedia captured our wedding perfectly. The cinematic video made us cry!" },
    { name: "Emily D.", message: "Highly professional team. The drone shots for our company festival were breathtaking." },
    { name: "David R.", message: "They made my daughter's 18th birthday look like a movie. Highly recommended." }
];


/* =========================================================
   FUNCTIONALITY & LOGIC
   ========================================================= */

// --- 1. Sticky Navbar & Active Link Highlighting ---
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 2. Mobile Hamburger Menu ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// --- 3. Gallery Generator & Filter (UPDATED FOR ALBUMS) ---
const galleryContainer = document.getElementById('gallery-container');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery(filterCategory = 'All') {
    galleryContainer.innerHTML = ''; 

    gallery.forEach((item, index) => {
        if (filterCategory === 'All' || item.category === filterCategory) {
            
            // 1. Check if the album has a custom crop, otherwise use 'center'
            const imageCrop = item.crop || 'center'; 

            const htmlString = `
                <div class="gallery-item" onclick="openAlbum(${index})">
                    <img src="${item.coverImage}" style="object-position: ${imageCrop};" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300/161616/C8A96A?text=Album+Cover'">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category} (${item.images.length} Photos)</p>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += htmlString;
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        renderGallery(filterValue);
    });
});

renderGallery();

// --- 4. Video, Team, and Testimonials Generators ---

const videoContainer = document.getElementById('video-container');
videos.forEach(vid => {
    const htmlString = `
        <a href="${vid.video}" target="_blank" class="card video-card" style="text-decoration: none; color: inherit;">
            <img src="${vid.thumbnail}" alt="${vid.title}" onerror="this.src='https://via.placeholder.com/400x250/161616/C8A96A?text=Watch+Video'">
            <h3>${vid.title}</h3>
            <p>▶ Watch Now</p>
        </a>
    `;
    videoContainer.innerHTML += htmlString;
});

const teamContainer = document.getElementById('team-container');
members.forEach(member => {
    // Check if the member has a custom crop, if not, use 'center'
    const imageCrop = member.crop || 'center'; 

    const htmlString = `
        <div class="card team-card">
            <img src="${member.image}" style="object-position: ${imageCrop};" alt="${member.name}" onerror="this.src='https://via.placeholder.com/300x300/161616/C8A96A?text=Team+Member'">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        </div>
    `;
    teamContainer.innerHTML += htmlString;
});

const testimonialContainer = document.getElementById('testimonial-container');
testimonials.forEach(test => {
    const htmlString = `
        <div class="card testimonial-card">
            <p>"${test.message}"</p>
            <h4 style="margin-top: 15px; color: var(--accent-primary);">- ${test.name}</h4>
        </div>
    `;
    testimonialContainer.innerHTML += htmlString;
});

// --- 5. Modal Logic (UPDATED LIGHTBOX FOR ALBUMS) ---

// Variables to keep track of the currently opened album
let currentAlbum = [];
let currentIndex = 0;
let currentAlbumTitle = "";

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeLightbox = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');

// Opens the album
function openAlbum(albumIndex) {
    currentAlbum = gallery[albumIndex].images; 
    currentAlbumTitle = gallery[albumIndex].title;
    currentIndex = 0; 
    
    updateLightboxContent();
    lightbox.style.display = 'flex';
}

// Updates the image, text, and buttons
function updateLightboxContent() {
    lightboxImg.src = currentAlbum[currentIndex];
    
    lightboxImg.onerror = function() {
        this.src = 'https://via.placeholder.com/800x600/161616/C8A96A?text=Photo+Not+Found';
    };

    lightboxCaption.innerText = currentAlbumTitle;
    lightboxCounter.innerText = `${currentIndex + 1} / ${currentAlbum.length}`;
    
    if (currentIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (currentIndex === currentAlbum.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

// Navigation Button Clicks
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxContent();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < currentAlbum.length - 1) {
        currentIndex++;
        updateLightboxContent();
    }
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// --- 6. Video Modal Logic ---
const videoModal = document.getElementById('video-modal');
const modalVideoPlayer = document.getElementById('modal-video-player');
const closeVideo = document.getElementById('close-video');

function openVideoModal(videoSrc) {
    videoModal.style.display = 'flex';
    // This gives the iframe the Facebook link, which loads the video
    modalVideoPlayer.src = videoSrc; 
}

closeVideo.addEventListener('click', () => {
    videoModal.style.display = 'none';
    // This clears the link, which stops the video from playing in the background
    modalVideoPlayer.src = ""; 
});

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalVideoPlayer.src = ""; // Clear the link here too
    }
});