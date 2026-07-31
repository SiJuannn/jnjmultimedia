// Data Arrays
const gallery = [
    { 
        title: "Classic Wedding", 
        category: "Wedding", 
        coverImage: "gallery/wedding-cover.jpg", 
        images: [ 
            "gallery/wedding1.jpg", 
            "gallery/wedding2.jpg", 
            "gallery/wedding3.jpg"
        ]
    },
    { 
        title: "Pre-Wedding Shoot", 
        category: "Wedding", 
        coverImage: "gallery/prewedding-cover.jpg", 
        images: [ 
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
// ---------------------------
    { 
        title: "Barangay Fiesta", 
        category: "Festival", 
        coverImage: "gallery/fiesta-cover.jpg",
        crop: "center", 
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
        coverImage: "gallery/kids-cover.jpg", 
        images: ["gallery/kid1.jpg"] 
    }
];

// Video Data
const videos = [
    { 
        title: "Wedding SDE", 
        thumbnail: "videos/thumb1.jpg", 
        
        video: "https://www.facebook.com/share/v/169YhwGzAaP/" 
    },

    { 
        title: "Barangay Fiesta", 
        thumbnail: "videos/thumb2.jpg", 
        
        video: "https://www.facebook.com/share/v/1En1r7BL2X/" 
    },

    { 
        title: "Debut SDE", 
        thumbnail: "videos/thumb3.jpg", 
      
        video: "https://www.facebook.com/share/v/1EA1V2cv3v/" 
    }
];

// Team Data
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

// Reviews Data
const testimonials = [
    { name: "Sarah & Mark", message: "J&J Multimedia captured our wedding perfectly. The cinematic video made us cry!" },
    { name: "Andronica", message: "Ayyy perfect!" },
    { name: "David R.", message: "They made my daughter's 18th birthday look like a movie. Highly recommended." }
];

// ------------------------------------------------------

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

// --------------------------------
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

// --------------------------------------------
const galleryContainer = document.getElementById('gallery-container');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery(filterCategory = 'All') {
    galleryContainer.innerHTML = ''; 

    gallery.forEach((item, index) => {
        if (filterCategory === 'All' || item.category === filterCategory) {
            
            
            const imageCrop = item.crop || 'center'; 

            const htmlString = `
    <div class="gallery-item" onclick="openAlbum(${index})">
        <img src="${item.coverImage}" style="object-position: ${imageCrop};" alt="${item.title}" onerror="this.src='gallery/placeholder.png'">
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


const videoContainer = document.getElementById('video-container');
videos.forEach(vid => {
    const htmlString = `
        <a href="${vid.video}" target="_blank" class="card video-card" style="text-decoration: none; color: inherit;">
            <img src="${vid.thumbnail}" alt="${vid.title}" onerror="this.src='gallery/placeholder.png'">
            <h3>${vid.title}</h3>
            <p>▶ Watch Now</p>
        </a>
    `;
    videoContainer.innerHTML += htmlString;
});

const teamContainer = document.getElementById('team-container');
members.forEach(member => {

    const imageCrop = member.crop || 'center'; 

    const htmlString = `
        <div class="card team-card">
            <img src="${member.image}" style="object-position: ${imageCrop};" alt="${member.name}" onerror="this.src='gallery/placeholder.png'">
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


let currentAlbum = [];
let currentIndex = 0;
let currentAlbumTitle = "";


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeLightbox = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');


function openAlbum(albumIndex) {
    currentAlbum = gallery[albumIndex].images; 
    currentAlbumTitle = gallery[albumIndex].title;
    currentIndex = 0; 
    
    updateLightboxContent();
    lightbox.style.display = 'flex';
}


function updateLightboxContent() {
    lightboxImg.src = currentAlbum[currentIndex];
    
    lightboxImg.onerror = function() {
        this.src = 'gallery/placeholder.png';
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

