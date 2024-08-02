/****************************************************************************************/
// gestion de la page invité

// Fonction exécutée lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour charger la liste des invités depuis localStorage
    function loadInvites() {
        const ul = document.getElementById('invite_list'); // Sélectionne l'élément UL pour les invités
        if (ul) {
            const invites = JSON.parse(localStorage.getItem('invites')) || []; // Récupère la liste des invités depuis localStorage ou initialise un tableau vide
            ul.innerHTML = ''; // Vide la liste actuelle pour éviter les duplications

            invites.forEach(function(invite) {
                const li = document.createElement('li'); // Crée un élément LI pour chaque invité
                li.textContent = invite;
                ul.appendChild(li); // Ajoute l'élément LI à la liste UL
            });
            console.log('Invites loaded:', invites); // Affiche les invités chargés dans la console
        } else {
            console.error('invite_list element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction pour sauvegarder la liste des invités dans localStorage
    function saveInvites(invites) {
        localStorage.setItem('invites', JSON.stringify(invites)); // Sauvegarde les invités dans localStorage
        console.log('Invites saved:', invites); // Affiche les invités sauvegardés dans la console
    }

    // Fonction pour ajouter un invité à la liste
    function addInviteToList(invite) {
        const ul = document.getElementById('invite_list'); // Sélectionne l'élément UL pour les invités
        if (ul) {
            const li = document.createElement('li'); // Crée un nouvel élément LI
            li.textContent = invite;
            ul.appendChild(li); // Ajoute l'élément LI à la liste UL
            saveInvites(getAllInvites()); // Sauvegarde les invités après ajout
            console.log('Invite added:', invite); // Affiche l'invité ajouté dans la console
        } else {
            console.error('invite_list element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction pour supprimer un invité de la liste
    function removeInviteFromList(inviteToRemove) {
        const ul = document.getElementById('invite_list'); // Sélectionne l'élément UL pour les invités
        if (ul) {
            const items = Array.from(ul.children); // Convertit les enfants de UL en un tableau
            const itemToRemove = items.find(item => item.textContent === inviteToRemove); // Trouve l'élément LI correspondant à l'invité à supprimer
            if (itemToRemove) {
                ul.removeChild(itemToRemove); // Supprime l'élément LI de la liste UL
                saveInvites(getAllInvites()); // Sauvegarde les invités après suppression
                console.log('Invite removed:', inviteToRemove); // Affiche l'invité supprimé dans la console

                // Met à jour les tables après la suppression d'un invité
                updateTablesAfterInviteRemoval(inviteToRemove);

                // Rafraîchit la liste des invités dans l'interface
                displayInvites();
            } else {
                alert("L'invité n'a pas été trouvé dans la liste."); // Alerte si l'invité n'est pas trouvé
                console.warn('Invite not found:', inviteToRemove); // Affiche un avertissement dans la console
            }
        } else {
            console.error('invite_list element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction pour récupérer tous les invités actuels
    function getAllInvites() {
        const ul = document.getElementById('invite_list'); // Sélectionne l'élément UL pour les invités
        if (ul) {
            return Array.from(ul.children).map(li => li.textContent); // Convertit les éléments LI en un tableau de noms d'invités
        } else {
            console.error('invite_list element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
            return [];
        }
    }

    // Fonction pour afficher la liste des invités dans l'interface
    function displayInvites() {
        const ul = document.getElementById('invite_list'); // Sélectionne l'élément UL pour les invités
        if (ul) {
            const invites = getAllInvites(); // Récupère tous les invités
            ul.innerHTML = ''; // Vide la liste actuelle pour éviter les duplications

            invites.forEach(function(invite) {
                const li = document.createElement('li'); // Crée un élément LI pour chaque invité
                li.textContent = invite;
                ul.appendChild(li); // Ajoute l'élément LI à la liste UL
            });
            console.log('Invites displayed:', invites); // Affiche les invités affichés dans la console
        } else {
            console.error('invite_list element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction pour mettre à jour les tables après la suppression d'un invité
    function updateTablesAfterInviteRemoval(inviteToRemove) {
        const tables = JSON.parse(localStorage.getItem('tables')) || []; // Récupère les tables depuis localStorage ou initialise un tableau vide

        // Met à jour chaque table pour supprimer l'invité
        tables.forEach(table => {
            const index = table.invites.indexOf(inviteToRemove); // Trouve l'index de l'invité dans la table
            if (index !== -1) {
                table.invites.splice(index, 1); // Supprime l'invité de la table
            }
        });

        // Sauvegarde les tables mises à jour dans le localStorage
        localStorage.setItem('tables', JSON.stringify(tables));

        // Rafraîchit la liste des tables dans l'interface
        displayTables();
    }

    // Fonction pour afficher les tables dans l'interface
    function displayTables() {
        const ul = document.getElementById('table_liste'); // Sélectionne l'élément UL pour les tables
        if (ul) {
            const tables = JSON.parse(localStorage.getItem('tables')) || []; // Récupère les tables depuis localStorage ou initialise un tableau vide
            ul.innerHTML = ''; // Vide la liste actuelle pour éviter les duplications

            tables.forEach(function(table) {
                const li = createTableElement(table.name, table.invites); // Crée un élément LI pour chaque table
                ul.appendChild(li); // Ajoute l'élément LI à la liste UL
            });
            console.log('Tables displayed:', tables); // Affiche les tables affichées dans la console
        } else {
            console.error('table_liste element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction utilitaire pour créer un élément de table
    function createTableElement(tableName, invites = []) {
        const li = document.createElement('li'); // Crée un nouvel élément LI
        li.textContent = `${tableName}: ${invites.join(', ')}`; // Définit le contenu de l'élément LI
        return li;
    }

    // Gestion de l'ajout d'un invité via un bouton
    document.getElementById('btn_add_invite').addEventListener('click', function() {
        const invite = prompt("Entrez le nom de l'invité à ajouter:"); // Affiche une boîte de dialogue pour entrer le nom de l'invité
        if (invite) {
            addInviteToList(invite); // Ajoute l'invité à la liste
        }
    });

    // Gestion de la suppression d'un invité via un bouton
    document.getElementById('btn_remove_invite').addEventListener('click', function() {
        const inviteToRemove = prompt("Entrez le nom de l'invité à supprimer:"); // Affiche une boîte de dialogue pour entrer le nom de l'invité à supprimer
        if (inviteToRemove) {
            removeInviteFromList(inviteToRemove); // Supprime l'invité de la liste
        }
    });

    // Charger les invités à l'ouverture de la page
    loadInvites();

    // Fonction pour charger et afficher les tables à l'ouverture de la page
    function loadTables() {
        const ul = document.getElementById('table_liste'); // Sélectionne l'élément UL pour les tables
        if (ul) {
            const tables = JSON.parse(localStorage.getItem('tables')) || []; // Récupère les tables depuis localStorage ou initialise un tableau vide
            ul.innerHTML = ''; // Vide la liste actuelle pour éviter les duplications

            tables.forEach(function(table) {
                const li = createTableElement(table.name, table.invites); // Crée un élément LI pour chaque table
                ul.appendChild(li); // Ajoute l'élément LI à la liste UL
            });
            console.log('Tables loaded:', tables); // Affiche les tables chargées dans la console
        } else {
            console.error('table_liste element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
        }
    }

    // Fonction pour sauvegarder les tables dans localStorage
    function saveTables(tables) {
        localStorage.setItem('tables', JSON.stringify(tables)); // Sauvegarde les tables dans localStorage
        console.log('Tables saved:', tables); // Affiche les tables sauvegardées dans la console
    }

    // Gestion de l'ajout d'une table via un bouton
    document.getElementById('btn_add_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à ajouter:"); // Affiche une boîte de dialogue pour entrer le nom de la table
        if (tableName) {
            const ul = document.getElementById('table_liste'); // Sélectionne l'élément UL pour les tables
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                })); // Convertit les éléments LI en un tableau de tables

                if (tables.some(table => table.name === tableName)) {
                    alert("Une table avec ce nom existe déjà."); // Alerte si une table avec ce nom existe déjà
                    console.warn('Table already exists:', tableName); // Affiche un avertissement dans la console
                    return;
                }

                const newTable = {
                    name: tableName,
                    invites: []
                };

                tables.push(newTable); // Ajoute la nouvelle table au tableau
                ul.appendChild(createTableElement(newTable.name, newTable.invites)); // Ajoute l'élément LI pour la nouvelle table
                saveTables(tables); // Sauvegarde les tables après ajout
                console.log('Table added:', tableName); // Affiche la table ajoutée dans la console
            } else {
                console.error('table_liste element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
            }
        }
    });

    // Gestion de la suppression d'une table via un bouton
    document.getElementById('btn_remove_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à supprimer:"); // Affiche une boîte de dialogue pour entrer le nom de la table à supprimer
        if (tableName) {
            const ul = document.getElementById('table_liste'); // Sélectionne l'élément UL pour les tables
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                })); // Convertit les éléments LI en un tableau de tables

                const tableIndex = tables.findIndex(table => table.name === tableName); // Trouve l'index de la table à supprimer
                if (tableIndex !== -1) {
                    ul.removeChild(ul.children[tableIndex]); // Supprime l'élément LI de la liste UL
                    tables.splice(tableIndex, 1); // Supprime la table du tableau
                    saveTables(tables); // Sauvegarde les tables après suppression
                    console.log('Table removed:', tableName); // Affiche la table supprimée dans la console
                } else {
                    alert("La table n'a pas été trouvée dans la liste."); // Alerte si la table n'est pas trouvée
                    console.warn('Table not found:', tableName); // Affiche un avertissement dans la console
                }
            } else {
                console.error('table_liste element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
            }
        }
    });

    // Gestion de la modification d'une table via un bouton
    document.getElementById('btn_modifie_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à modifier:"); // Affiche une boîte de dialogue pour entrer le nom de la table à modifier
        if (tableName) {
            const ul = document.getElementById('table_liste'); // Sélectionne l'élément UL pour les tables
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                })); // Convertit les éléments LI en un tableau de tables
    
                const tableToModify = tables.find(table => table.name === tableName); // Trouve la table à modifier
                if (tableToModify) {
    
                    const newInvitesInput = prompt("Entrez les invités de la table (séparés par des virgules):", tableToModify.invites.join(', ')); // Affiche une boîte de dialogue pour entrer les nouveaux invités
                    const newInvites = newInvitesInput ? newInvitesInput.split(',').map(invite => invite.trim()) : []; // Convertit la chaîne d'entrée en un tableau d'invités
    
                    // Utilise un ensemble (Set) pour vérifier les invitations uniques
                    const uniqueInvites = [...new Set(newInvites)];
    
                    // Vérifie les invitations déjà présentes dans d'autres tables
                    const existingInvites = uniqueInvites.filter(invite => {
                        // Vérifie si l'invité est déjà présent dans d'autres tables, mais pas dans la table actuelle
                        return isInviteAlreadyAdded(tables.flatMap(table => table.invites), invite) && !tableToModify.invites.includes(invite);
                    });
    
                    if (existingInvites.length > 0) {
                        alert(`Les invités suivants sont déjà présents dans d'autres tables: ${existingInvites.join(', ')}`); // Alerte si certains invités sont déjà présents dans d'autres tables
                        console.warn('Duplicate invites:', existingInvites); // Affiche un avertissement dans la console
                        return;
                    }                    
    
                    tableToModify.invites = uniqueInvites; // Met à jour les invités de la table
    
                    // Met à jour l'élément HTML correspondant
                    const liToModify = Array.from(ul.children).find(item => item.textContent.startsWith(tableName)); // Trouve l'élément LI correspondant à la table
                    if (liToModify) {
                        liToModify.textContent = `${tableName}: ${uniqueInvites.join(', ')}`; // Met à jour le contenu de l'élément LI
                    }
    
                    saveTables(tables); // Sauvegarde les tables après modification
                    console.log('Table modified:', tableName, uniqueInvites); // Affiche la table modifiée dans la console
                } else {
                    alert("La table n'a pas été trouvée dans la liste."); // Alerte si la table n'est pas trouvée
                    console.warn('Table not found:', tableName); // Affiche un avertissement dans la console
                }
            } else {
                console.error('table_liste element not found'); // Affiche une erreur si l'élément UL n'est pas trouvé
            }
        }
    });

    // Fonction pour vérifier si un invité est déjà présent
    function isInviteAlreadyAdded(allInvites, inviteToCheck) {
        return allInvites.includes(inviteToCheck); // Vérifie si l'invité est dans la liste
    }

    // Charger les tables à l'ouverture de la page
    loadTables();

});
















/****************************************************************************************/
// gestion de la nav et du changement de page

document.addEventListener('DOMContentLoaded', function() {
    // Met en pause et cache toutes les vidéos au chargement
    document.querySelectorAll('main video').forEach(video => {
        video.pause();
        video.currentTime = 0; // Réinitialise la vidéo au début
        video.style.display = 'none'; // Cache la vidéo
    });

    // Cache tous les divs du <main> sauf celui avec l'ID "accueil"
    document.querySelectorAll('main > div').forEach(div => {
        if (div.id !== 'accueil') {
            div.style.display = 'none'; // Cache les divs sauf celui avec l'ID "accueil"
        }
    });

    // Affiche le div avec l'ID "accueil"
    const accueilDiv = document.getElementById('accueil');
    if (accueilDiv) {
        accueilDiv.style.display = 'flex'; // Affiche le div "accueil"
    }

    // Ajouter des écouteurs de clic à chaque <li>
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer la valeur de data-content
            const content = this.getAttribute('data-content');

            // Cacher tous les divs du <main>
            document.querySelectorAll('main > div').forEach(div => {
                div.style.display = 'none'; // Cache tous les divs
            });

            // Met en pause et cache toutes les vidéos
            document.querySelectorAll('main video').forEach(video => {
                video.pause();
                video.currentTime = 0; // Réinitialise la vidéo au début
                video.style.display = 'none'; // Cache la vidéo
            });

            // Afficher le div correspondant à data-content
            const divToShow = document.getElementById(content);
            if (divToShow) {
                divToShow.style.display = 'flex'; // Affiche le div correspondant
                const videoToPlay = divToShow.querySelector('video');
                if (videoToPlay) {
                    videoToPlay.style.display = 'block'; // Affiche la vidéo
                    videoToPlay.play(); // Joue la vidéo
                }
            }
        });
    });
});










/****************************************************************************************/
// gestion page d'accueil

const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let autoScrollInterval;

// Vérifiez que tous les éléments nécessaires existent
if (prevButton && nextButton && carouselInner && carouselItems.length > 0) {

    // Fonction pour afficher le slide correspondant à l'index donné
    function showSlide(index) {
        if (index >= carouselItems.length) {
            currentIndex = 0; // Revenir au premier slide si l'index est trop élevé
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1; // Revenir au dernier slide si l'index est trop bas
        } else {
            currentIndex = index;
        }
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Fonction pour aller au slide suivant
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Fonction pour démarrer le défilement automatique
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 4000);
    }

    // Fonction pour arrêter le défilement automatique
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Ajouter des écouteurs d'événements pour les boutons de navigation
    nextButton.addEventListener('click', () => {
        stopAutoScroll(); // Arrêtez d'abord le défilement automatique
        nextSlide(); // Affichez le slide suivant
        startAutoScroll(); // Redémarrez le défilement automatique
    });

    prevButton.addEventListener('click', () => {
        stopAutoScroll(); // Arrêtez d'abord le défilement automatique
        showSlide(currentIndex - 1); // Affichez le slide précédent
        startAutoScroll(); // Redémarrez le défilement automatique
    });

    // Démarrer le défilement automatique au chargement de la page
    startAutoScroll();
} else {
    console.error('Un ou plusieurs éléments nécessaires pour le carousel sont manquants.');
}


// Initialiser les attributs data-text pour les titres des cartes
document.addEventListener("DOMContentLoaded", function() {
    var headings = document.querySelectorAll(".card h3");
    headings.forEach(function(heading) {
        heading.setAttribute("data-text", heading.textContent);
    });
});



// Gestion du carrousel de cartes
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const prevButton2 = document.querySelector('.prev');
    const nextButton2 = document.querySelector('.next');
    const cardWidth = cards[0].getBoundingClientRect().width;
    const cardsToShow = 3; // Nombre de cartes affichées simultanément
    const totalCards = cards.length;
    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;

    let currentIndex2 = 0;

    function moveToSlide(index) {
        const amountToMove = -index * cardWidth * cardsToShow;
        track.style.transform = `translateX(${amountToMove}px)`;
        console.log(`Déplacement du carrousel à l'index ${index}, transformation: ${track.style.transform}`);
    }

    nextButton2.addEventListener('click', () => {
        console.log('Bouton "suivant" cliqué.');
        if (currentIndex2 < maxIndex) {
            currentIndex2++;
            moveToSlide(currentIndex2);
        } else {
            console.log('Impossible d\'avancer, dernière carte atteinte.');
        }
    });

    prevButton2.addEventListener('click', () => {
        console.log('Bouton "précédent" cliqué.');
        if (currentIndex2 > 0) {
            currentIndex2--;
            moveToSlide(currentIndex2);
        } else {
            console.log('Impossible de reculer, première carte atteinte.');
        }
    });
});

/****************************************************************************************/
// gestion de la page aide

// Fonction pour filtrer le contenu de la page d'aide
function filterContent() {
    const input = document.getElementById('searchInput').value.toLowerCase(); // Récupère la valeur du champ de recherche et la convertit en minuscules
    const helpItems = document.querySelectorAll('.help-item'); // Sélectionne tous les éléments d'aide

    helpItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase(); // Récupère les mots-clés de l'élément et les convertit en minuscules
        if (keywords.includes(input)) {
            item.style.display = 'block'; // Affiche l'élément si les mots-clés contiennent la valeur de recherche
        } else {
            item.style.display = 'none'; // Cache l'élément si les mots-clés ne contiennent pas la valeur de recherche
        }
    });
}






/****************************************************************************************/
// gestion de la page messages

// (Il n'y a pas de code fourni pour la gestion de la page des messages)


// gestion de la page prestataires

// (Il n'y a pas de code fourni pour la gestion de la page des prestataires)




/****************************************************************************************/
// gestion de la page mariage

document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const newThemeInput = document.getElementById('new-theme');
    const addThemeButton = document.getElementById('add-theme');
    const submitButton = document.getElementById('submit2');

    // Fonction pour ajouter un nouveau thème à la liste déroulante
    addThemeButton.addEventListener('click', function() {
        const newTheme = newThemeInput.value.trim();
        if (newTheme) {
            const option = document.createElement('option');
            option.value = newTheme.toLowerCase().replace(/\s+/g, '-');
            option.textContent = newTheme;
            themeSelect.appendChild(option);
            themeSelect.value = option.value;
            newThemeInput.value = '';
        }
    });

    // Fonction pour soumettre les choix
    submitButton.addEventListener('click', function() {
        const selectedTheme = themeSelect.value;
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;
        const tertiaryColor = document.getElementById('tertiary-color').value;

        // Validation basique
        if (!selectedTheme) {
            alert('Veuillez choisir un thème.');
            return;
        }

        alert(`Thème sélectionné: ${selectedTheme}\nCouleur principale: ${primaryColor}\nCouleur secondaire: ${secondaryColor}\nCouleur tertiaire: ${tertiaryColor}`);
    });
});