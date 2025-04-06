'use strict';

// Récupérer les éléments du DOM
const headerElement = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const body = document.body;

// Gestion du menu mobile
if (menuToggle && navbar) {
  // Créer un overlay pour fermer le menu au clic en dehors
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  body.appendChild(overlay);

  // Fonction pour activer/désactiver le menu
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Empêcher le défilement du body quand le menu est ouvert
    if (navbar.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  // Ouvrir/fermer le menu au clic sur l'icône hamburger
  menuToggle.addEventListener('click', toggleMenu);

  // Fermer le menu au clic sur l'overlay
  overlay.addEventListener('click', toggleMenu);

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Fermer le menu au redimensionnement de la fenêtre (si on passe en mode desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navbar.classList.contains('active')) {
      toggleMenu();
    }
  });
}

window.addEventListener("scroll", function () {
  // Afficher le bouton seulement quand on scrolle vers le bas
  if (window.scrollY > 100) {
    goTopBtn.classList.add("active");
  } else {
    goTopBtn.classList.remove("active");
  }

  // Header toujours actif
  headerElement.classList.add("active");
});

// Gestion du scroll vers le haut
goTopBtn.addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Carousel automatique
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Démarre le carousel avec une transition toutes les 5 secondes
  setInterval(nextSlide, 5000);
});

// Ajustement dynamique de la marge
function updateHeroMargin() {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  if (header && hero) {
    const headerHeight = header.offsetHeight;
    hero.style.marginTop = `${headerHeight}px`;
    hero.style.minHeight = `calc(60vh - ${headerHeight}px)`;
  }
}

// Mise à jour initiale
updateHeroMargin();

// Mise à jour lors du redimensionnement
window.addEventListener('resize', updateHeroMargin);

// Mise à jour lors des changements de classe du header
new MutationObserver(updateHeroMargin).observe(document.querySelector('.header'), {
  attributes: true,
  attributeFilter: ['class']
});

// Gestion du Show More/Less pour l'équipe
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenMembers = document.querySelectorAll('.hidden-member');
  let isExpanded = false;

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      hiddenMembers.forEach(member => {
        if (isExpanded) {
          member.style.display = 'block';
          setTimeout(() => {
            member.classList.add('active');
          }, 10);
        } else {
          member.classList.remove('active');
          setTimeout(() => {
            member.style.display = 'none';
          }, 300);
        }
      });

      // Mettre à jour le texte et l'icône du bouton
      this.classList.toggle('active');
      this.querySelector('.btn-text').textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  }
});

// Ajoutez ce code pour la filtration des projets
document.addEventListener('DOMContentLoaded', function() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const projectCards = document.querySelectorAll('.project-card');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Retirer la classe active de tous les boutons
      categoryBtns.forEach(b => b.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');

      const category = this.dataset.category;

      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// Gestion améliorée des modals
document.addEventListener('DOMContentLoaded', function() {
  const projectLinks = document.querySelectorAll('.project-link');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  function openModal(modalId) {
    const modalContainer = document.querySelector('.modal-container');
    const modal = document.getElementById(modalId);
    
    modalContainer.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    const activeModal = document.querySelector('.project-modal.active');
    
    if (activeModal) {
      activeModal.classList.remove('active');
    }
    
    setTimeout(() => {
      modalContainer.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });
  
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
});

// Gestion du filtrage des versions
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser MicroModal
  MicroModal.init({
    openTrigger: 'data-modal-trigger',
    closeTrigger: 'data-micromodal-close',
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  });

  // Gestion des versions dans les modals
  document.querySelectorAll('.version-container').forEach(container => {
    const versionBtns = container.querySelectorAll('.version-btn');
    const groupItems = container.querySelectorAll('.group-item');
    
    versionBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        versionBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const version = this.dataset.version;
        
        groupItems.forEach(item => {
          if (version === 'all' || item.dataset.version === version) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  });
});

// Gestion des versions
function changeVersion(btn, versionNum) {
  // Empêcher la propagation de l'événement
  event.stopPropagation();
  
  // Trouver le conteneur parent
  const wrapper = btn.closest('.version-wrapper');
  
  // Désactiver tous les boutons
  wrapper.querySelectorAll('.ver-btn').forEach(b => {
    b.classList.remove('ver-active');
  });
  
  // Cacher tous les contenus
  wrapper.querySelectorAll('.ver-content').forEach(c => {
    c.classList.remove('ver-show');
  });
  
  // Activer le bouton cliqué
  btn.classList.add('ver-active');
  
  // Afficher le contenu correspondant
  const content = wrapper.querySelector(`#ver${versionNum}`);
  if (content) {
    content.classList.add('ver-show');
  }

  // Empêcher la fermeture de la modal
  return false;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Activer la première version par défaut
  document.querySelector('.tab-content').classList.add('active');
  document.querySelector('.tab-btn').classList.add('active');
});

// Gestion du show more pour les groupes
document.addEventListener('DOMContentLoaded', function() {
  const showMoreBtn = document.getElementById('showMoreGroups');
  const hiddenGroups = document.querySelectorAll('.hidden-group');
  let isExpanded = false;

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      hiddenGroups.forEach(group => {
        if (isExpanded) {
          group.style.display = 'block';
          setTimeout(() => {
            group.classList.add('active');
          }, 10);
        } else {
          group.classList.remove('active');
          setTimeout(() => {
            group.style.display = 'none';
          }, 300);
        }
      });

      this.classList.toggle('active');
      this.querySelector('.btn-text').textContent = isExpanded ? 'Show Less' : 'Show More';
    });
  }
});

// Gestion des modals
function showProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    initCarousels(); // Initialiser les carrousels
  }
}

function closeProjectModal() {
  const modals = document.querySelectorAll('.project-modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  document.body.style.overflow = '';
}

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// Gestion du switch entre les groupes
document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.project-modal');
  
  modals.forEach(modal => {
    const switchBtns = modal.querySelectorAll('.switch-btn');
    const groupItems = modal.querySelectorAll('.group-item');
    
    switchBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Désactiver tous les boutons
        switchBtns.forEach(b => b.classList.remove('active'));
        // Activer le bouton cliqué
        this.classList.add('active');
        
        const groupNum = this.dataset.group;
        
        // Cacher tous les groupes
        groupItems.forEach(item => {
          if(item.dataset.group === groupNum) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      });
    });
  });
});

// Garder uniquement cette fonction pour l'envoi direct
function sendEmailLocal(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // Envoyer directement le message
  fetch('https://formspree.io/f/mdkazyqn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      message: message
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Message envoyé avec succès!');
      document.getElementById('contactForm').reset();
    } else {
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
  });
}

// Fonction pour gérer le carrousel
function initCarousels() {
  const carousels = document.querySelectorAll('.project-carousel');
  
  carousels.forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoplayInterval;
    
    // Fonction pour afficher un slide spécifique
    function showSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      
      container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Fonction pour le déplacement automatique
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 3000); // Change d'image toutes les 3 secondes
    }
    
    // Arrêter l'autoplay lors du hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    // Reprendre l'autoplay après le hover
    carousel.addEventListener('mouseleave', () => {
      startAutoplay();
    });
    
    // Événements pour les boutons
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(autoplayInterval); // Arrêter l'autoplay lors du clic
        showSlide(currentSlide - 1);
        startAutoplay(); // Redémarrer l'autoplay
      });
      
      nextBtn.addEventListener('click', () => {
        clearInterval(autoplayInterval); // Arrêter l'autoplay lors du clic
        showSlide(currentSlide + 1);
        startAutoplay(); // Redémarrer l'autoplay
      });
    }
    
    // Initialisation du premier slide et démarrage de l'autoplay
    showSlide(0);
    startAutoplay();
  });
}

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animation au scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observer les sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Header sticky
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    headerElement.classList.remove('scroll-up');
    return;
  }

  if (currentScroll > lastScroll && !headerElement.classList.contains('scroll-down')) {
    headerElement.classList.remove('scroll-up');
    headerElement.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && headerElement.classList.contains('scroll-down')) {
    headerElement.classList.remove('scroll-down');
    headerElement.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Animation des cartes d'atelier
document.querySelectorAll('.workshop-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('hover');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('hover');
  });
});

// Gestion du défilement horizontal pour le programme
document.addEventListener('DOMContentLoaded', function() {
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const scheduleGrid = document.querySelector('.schedule-grid');
  
  if (scrollLeftBtn && scrollRightBtn && scheduleGrid) {
    const scrollAmount = 320; // Largeur approximative d'une carte + marge
    
    scrollLeftBtn.addEventListener('click', function() {
      scheduleGrid.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    scrollRightBtn.addEventListener('click', function() {
      scheduleGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }
});

// Gestion des onglets pour la section Ateliers et Conférences
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Retirer la classe active de tous les boutons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');
      
      // Masquer tous les contenus
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Afficher le contenu correspondant
      const target = this.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
});



