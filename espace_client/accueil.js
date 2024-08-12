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
// Gestion du carrousel d'images sur la page d'accueil

// Sélection des éléments nécessaires pour le carrousel d'images
const prevButton = document.querySelector('.carousel-control-prev');  // Bouton pour faire défiler les images vers la gauche
const nextButton = document.querySelector('.carousel-control-next');  // Bouton pour faire défiler les images vers la droite
const carouselInner = document.querySelector('.carousel-inner');  // Conteneur des images dans le carrousel
const carouselItems = document.querySelectorAll('.carousel-item');  // Toutes les images du carrousel
let currentIndex = 0;  // Index de l'image actuellement affichée
let autoScrollInterval;  // Intervalle pour le défilement automatique

// Vérification que tous les éléments nécessaires sont présents
if (prevButton && nextButton && carouselInner && carouselItems.length > 0) {

    // Fonction pour afficher l'image correspondant à l'index donné
    function showSlide(index) {
        // Si l'index dépasse le nombre d'images, revenir à la première image
        if (index >= carouselItems.length) {
            currentIndex = 0;  // Revenir à la première image
        // Si l'index est inférieur à 0, revenir à la dernière image
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1;  // Revenir à la dernière image
        } else {
            currentIndex = index;  // Mettre à jour l'index actuel
        }
        // Déplacer le carrousel pour afficher l'image correspondant à l'index actuel
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Fonction pour afficher l'image suivante dans le carrousel
    function nextSlide() {
        showSlide(currentIndex + 1);  // Afficher l'image suivante
    }

    // Fonction pour démarrer le défilement automatique des images
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 4000);  // Passer à l'image suivante toutes les 4 secondes
    }

    // Fonction pour arrêter le défilement automatique des images
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);  // Arrêter l'intervalle de défilement automatique
    }

    // Ajouter des écouteurs d'événements pour les boutons de navigation du carrousel
    nextButton.addEventListener('click', () => {
        stopAutoScroll();  // Arrêter d'abord le défilement automatique
        nextSlide();  // Passer à l'image suivante
        startAutoScroll();  // Redémarrer le défilement automatique
    });

    prevButton.addEventListener('click', () => {
        stopAutoScroll();  // Arrêter d'abord le défilement automatique
        showSlide(currentIndex - 1);  // Passer à l'image précédente
        startAutoScroll();  // Redémarrer le défilement automatique
    });

    // Démarrer le défilement automatique dès le chargement de la page
    startAutoScroll();
} else {
    console.error('Un ou plusieurs éléments nécessaires pour le carrousel sont manquants.');  // Afficher un message d'erreur en console si des éléments sont manquants
}

// Initialisation des attributs data-text pour les titres des cartes dès le chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    var headings = document.querySelectorAll(".card h3");  // Sélectionner tous les titres des cartes
    headings.forEach(function(heading) {
        heading.setAttribute("data-text", heading.textContent);  // Ajouter un attribut data-text à chaque titre, contenant son texte
    });
});

// Gestion du carrousel de cartes sur la page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');  // Conteneur des cartes
    const cards = Array.from(track.children);  // Toutes les cartes du carrousel
    const prevButton2 = document.querySelector('.prev');  // Bouton pour faire défiler les cartes vers la gauche
    const nextButton2 = document.querySelector('.next');  // Bouton pour faire défiler les cartes vers la droite
    const cardWidth = cards[0].getBoundingClientRect().width;  // Largeur d'une seule carte
    const cardsToShow = 3;  // Nombre de cartes affichées simultanément
    const totalCards = cards.length;  // Nombre total de cartes
    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;  // Index maximum pour le défilement complet

    let currentIndex2 = 0;  // Index actuel pour le carrousel de cartes

    // Fonction pour déplacer le carrousel à l'index spécifié
    function moveToSlide(index) {
        const amountToMove = -index * cardWidth * cardsToShow;  // Calculer la distance à déplacer
        track.style.transform = `translateX(${amountToMove}px)`;  // Appliquer la transformation pour déplacer le carrousel
        console.log(`Déplacement du carrousel à l'index ${index}, transformation: ${track.style.transform}`);  // Afficher dans la console l'information sur le déplacement
    }

    // Gestionnaire d'événement pour le bouton "suivant"
    nextButton2.addEventListener('click', () => {
        console.log('Bouton "suivant" cliqué.');
        if (currentIndex2 < maxIndex) {  // Vérifier si l'index actuel est inférieur à l'index maximum
            currentIndex2++;  // Incrémenter l'index
            moveToSlide(currentIndex2);  // Déplacer le carrousel vers la droite
        } else {
            console.log('Impossible d\'avancer, dernière carte atteinte.');  // Message en console si la dernière carte est atteinte
        }
    });

    // Gestionnaire d'événement pour le bouton "précédent"
    prevButton2.addEventListener('click', () => {
        console.log('Bouton "précédent" cliqué.');
        if (currentIndex2 > 0) {  // Vérifier si l'index actuel est supérieur à 0
            currentIndex2--;  // Décrémenter l'index
            moveToSlide(currentIndex2);  // Déplacer le carrousel vers la gauche
        } else {
            console.log('Impossible de reculer, première carte atteinte.');  // Message en console si la première carte est atteinte
        }
    });
});





/****************************************************************************************/
// Gestion de la page d'aide

// Fonction pour filtrer le contenu de la page d'aide en fonction de la recherche de l'utilisateur
function filterContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();  // Récupérer la valeur du champ de recherche et la convertir en minuscules
    const helpItems = document.querySelectorAll('.help-item');  // Sélectionner tous les éléments d'aide sur la page

    helpItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();  // Récupérer les mots-clés associés à l'élément d'aide
        if (keywords.includes(input)) {
            item.style.display = 'block';  // Afficher l'élément si les mots-clés correspondent à la recherche
        } else {
            item.style.display = 'none';  // Masquer l'élément si les mots-clés ne correspondent pas à la recherche
        }
    });
}







/****************************************************************************************/
// gestion de la page messages

// Lorsque le DOM est complètement chargé, exécuter la fonction principale
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments HTML nécessaires pour la gestion des thèmes de mariage
    const themeSelect = document.getElementById('theme-select');  // Sélecteur de thème
    const newThemeInput = document.getElementById('new-theme');  // Champ d'entrée pour un nouveau thème
    const addThemeButton = document.getElementById('add-theme');  // Bouton pour ajouter un nouveau thème
    const submitButton = document.getElementById('submit2');  // Bouton pour soumettre les informations du mariage

    // Fonction pour ajouter un nouveau thème à la liste déroulante
    addThemeButton.addEventListener('click', function() {
        const newTheme = newThemeInput.value.trim();  // Récupérer et nettoyer la valeur entrée par l'utilisateur
        if (newTheme) {
            const option = document.createElement('option');  // Créer un nouvel élément <option> pour le thème
            option.value = newTheme.toLowerCase().replace(/\s+/g, '-');  // Définir la valeur de l'option, formatée en minuscules et avec des tirets
            option.textContent = newTheme;  // Définir le texte affiché de l'option
            themeSelect.appendChild(option);  // Ajouter la nouvelle option à la liste déroulante
            themeSelect.value = option.value;  // Sélectionner automatiquement la nouvelle option
            newThemeInput.value = '';  // Réinitialiser le champ d'entrée
        }
    });

    // Fonction pour soumettre les choix de l'utilisateur
    submitButton.addEventListener('click', function() {
        // Récupérer les valeurs sélectionnées ou entrées par l'utilisateur
        const selectedTheme = themeSelect.value;
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;
        const tertiaryColor = document.getElementById('tertiary-color').value;

        // Validation basique : vérifier que le thème est sélectionné
        if (!selectedTheme) {
            alert('Veuillez choisir un thème.');
            return;
        }

        // Afficher un message avec les choix de l'utilisateur
        alert(`Thème sélectionné: ${selectedTheme}\nCouleur principale: ${primaryColor}\nCouleur secondaire: ${secondaryColor}\nCouleur tertiaire: ${tertiaryColor}`);
    });
});

// Fonction pour ajouter une nouvelle tâche à la liste
function addTask() {
    // Demander à l'utilisateur d'entrer le texte de la nouvelle tâche
    const taskText = prompt("Entrez le texte de la nouvelle tâche:");
    
    // Si l'utilisateur a entré un texte, ajouter la tâche à la liste
    if (taskText) {
        const newTask = document.createElement('li');  // Créer un nouvel élément de liste <li>
        newTask.textContent = taskText;  // Définir le texte de la tâche
        document.getElementById('task-list-new').appendChild(newTask);  // Ajouter la tâche à la liste des tâches
    }
}

// Lorsque le DOM est complètement chargé, ajouter des écouteurs d'événements pour chaque tâche
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter des écouteurs de clics pour chaque liste de tâches, afin de gérer les déplacements entre listes
    addClickListeners('task-list-new', 'task-list-in-progress');
    addClickListeners('task-list-in-progress', 'task-list-done');
    addClickListeners('task-list-done', null);
});

// Fonction pour ajouter des écouteurs d'événements aux tâches d'une liste source et les déplacer vers une liste cible
function addClickListeners(sourceListId, targetListId) {
    const sourceList = document.getElementById(sourceListId);  // Récupérer la liste source
    const targetList = targetListId ? document.getElementById(targetListId) : null;  // Récupérer la liste cible, si elle existe

    // Ajouter un écouteur d'événement pour détecter les clics sur les éléments <li> de la liste source
    sourceList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            showPopup(event.target, targetList, sourceList);  // Afficher une popup pour gérer la tâche cliquée
        }
    });
}

// Fonction pour afficher une popup permettant de déplacer ou supprimer une tâche
function showPopup(task, targetList, sourceList) {
    const popup = document.getElementById('popup');  // Récupérer l'élément popup
    const overlay = document.getElementById('overlay');  // Récupérer l'élément overlay
    const message = document.getElementById('popup-message');  // Récupérer le message de la popup
    const moveBtn = document.getElementById('move-btn');  // Récupérer le bouton de déplacement

    overlay.style.display = 'block';  // Afficher l'overlay
    popup.style.display = 'block';  // Afficher la popup

    if (targetList) {
        message.textContent = "Que voulez-vous faire avec cette tâche ?";  // Message pour déplacement
        moveBtn.style.display = 'inline-block';  // Afficher le bouton de déplacement
        moveBtn.onclick = function() {
            targetList.appendChild(task);  // Déplacer la tâche vers la liste cible
            hidePopup();  // Cacher la popup
        };
    } else {
        message.textContent = "Voulez-vous supprimer cette tâche ?";  // Message pour suppression
        moveBtn.style.display = 'none';  // Cacher le bouton de déplacement
    }

    document.getElementById('delete-btn').onclick = function() {
        sourceList.removeChild(task);  // Supprimer la tâche de la liste source
        hidePopup();  // Cacher la popup
    };

    document.getElementById('cancel-btn').onclick = function() {
        hidePopup();  // Cacher la popup sans effectuer d'action
    };
}

// Fonction pour cacher la popup et l'overlay
function hidePopup() {
    const popup = document.getElementById('popup');  // Récupérer l'élément popup
    const overlay = document.getElementById('overlay');  // Récupérer l'élément overlay
    overlay.style.display = 'none';  // Cacher l'overlay
    popup.style.display = 'none';  // Cacher la popup
}

// Fonction pour ajouter une nouvelle tâche avec un écouteur de clic
function addTask() {
    const task = prompt('Entrez une nouvelle tâche:');  // Demander à l'utilisateur de saisir une nouvelle tâche
    if (task) {
        const newTask = document.createElement('li');  // Créer un nouvel élément <li> pour la tâche
        newTask.textContent = task;  // Définir le texte de la tâche
        const taskListNew = document.getElementById('task-list-new');  // Récupérer la liste "Nouvelle tâche"
        taskListNew.appendChild(newTask);  // Ajouter la nouvelle tâche à la liste
        newTask.addEventListener('click', function() {  // Ajouter un écouteur de clic à la nouvelle tâche
            showPopup(newTask, document.getElementById('task-list-in-progress'), taskListNew);  // Afficher la popup pour gérer la tâche
        });
    }
}

// Fonction pour compter et afficher le nombre de tâches dans chaque liste
function countTasks() {
    const newTasks = document.querySelectorAll('#task-list-new li');  // Récupérer toutes les tâches dans la liste "Nouvelle tâche"
    const inProgressTasks = document.querySelectorAll('#task-list-in-progress li');  // Récupérer toutes les tâches en cours
    const doneTasks = document.querySelectorAll('#task-list-done li');  // Récupérer toutes les tâches terminées
    
    const totalTasks = newTasks.length + inProgressTasks.length + doneTasks.length;  // Calculer le nombre total de tâches
    const completedTasks = doneTasks.length;  // Calculer le nombre de tâches terminées
    
    const h1Element = document.querySelector('#task h1');  // Récupérer l'élément <h1> pour l'affichage des résultats
    h1Element.textContent = `${completedTasks}/${totalTasks}`;  // Mettre à jour le texte du <h1> avec le nombre de tâches terminées/total
}

// Appel de la fonction de comptage des tâches toutes les 5 secondes
setInterval(countTasks, 5000);

// Appel initial de la fonction de comptage dès que la page est chargée
document.addEventListener('DOMContentLoaded', countTasks);







// Fonction pour générer un PDF avec les informations de mariage
async function generatePDF() {
    const { jsPDF } = window.jspdf;  // Récupérer la bibliothèque jsPDF
    const brideName = document.getElementById('brideName').value;  // Récupérer le nom de la mariée
    const groomName = document.getElementById('groomName').value;  // Récupérer le nom du marié
    const date = document.getElementById('date').value;  // Récupérer la date du mariage
    const venue = document.getElementById('venue').value;  // Récupérer le lieu du mariage
    const time = document.getElementById('time').value;  // Récupérer l'heure du mariage
    const customText = document.getElementById('customText').value;  // Récupérer le texte personnalisé
    const backgroundImage = document.getElementById('backgroundImage').files[0];  // Récupérer l'image d'arrière-plan

    // Validation pour vérifier que tous les champs sont remplis
    if (!brideName || !groomName || !date || !venue || !time || !backgroundImage) {
        alert('Veuillez remplir tous les champs et sélectionner une image.');
        return;
    }

    // Créer un nouveau PDF en format A4
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const reader = new FileReader();  // Créer un lecteur de fichier

    reader.onload = function(e) {

        /*il faut intégrer la police: (avec un jsPDF Font Converter )
        @font-face {
            font-family: 'NomDeVotrePolice2';
            src: url('../font/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }*/
        const imgData = e.target.result;  // Récupérer les données de l'image
    
        applyBlurToImage(imgData, function(blurredImgData) {
            // Créer un PDF et ajouter l'image floutée en arrière-plan
            const pdf = new jsPDF('p', 'mm', 'a4'); // Créez un nouvel objet jsPDF
            pdf.addImage(blurredImgData, 'JPEG', 0, 0, 210, 297);  // Dimensions A4 en mm
    
            // Ajouter l'en-tête avec les noms des mariés
            pdf.setFontSize(50);
            pdf.setFont("PlayfairDisplay", "normal"); // Utiliser la police personnalisée
            const headerText = `${brideName} & ${groomName}`;
            const headerY = (pdf.internal.pageSize.getHeight() / 2) - 60;
    
            // Ajouter le texte principal par-dessus l'ombre
            pdf.setTextColor(255, 255, 255);  // Couleur du texte: Blanc
            pdf.text(headerText, pdf.internal.pageSize.getWidth() / 2, headerY, { align: 'center' });
    
            // Ajouter le corps du texte avec les informations du mariage
            pdf.setFontSize(16);
            pdf.setFont("PlayfairDisplay", "normal"); // Utiliser la police personnalisée
            const bodyText = `Sont heureux de vous inviter à leur mariage\n` +
                              `qui se déroulera au ${venue}\n` +
                              `le ${date} à ${time}.\n` +
                              `En espérant vous voir présent.`;
            const bodyY = pdf.internal.pageSize.getHeight() / 2;
    
            // Ajouter le texte principal par-dessus l'ombre
            pdf.setTextColor(255, 255, 255);  // Couleur du texte: Blanc
            pdf.text(bodyText, pdf.internal.pageSize.getWidth() / 2, bodyY, { align: 'center', maxWidth: 190 });
    
            // Ajouter un pied de page avec le texte personnalisé
            pdf.setFontSize(14);
            pdf.setFont("PlayfairDisplay", "normal"); // Utiliser la police personnalisée
            const footerY = (pdf.internal.pageSize.getHeight() / 2) + 60;
    
            // Ajouter le texte principal par-dessus l'ombre
            pdf.setTextColor(255, 255, 255);  // Couleur du texte: Blanc
            pdf.text(customText, pdf.internal.pageSize.getWidth() / 2, footerY, { align: 'center', maxWidth: 190 });
    
            // Sauvegarder le PDF sous le nom "faire-part.pdf"
            pdf.save('faire-part.pdf');
        });
    };
    

    reader.readAsDataURL(backgroundImage);  // Lire les données de l'image en tant qu'URL
}

// Fonction pour appliquer un flou à une image
function applyBlurToImage(imgData, callback) {
    const img = new Image();  // Créer un nouvel objet Image
    img.onload = function() {
        const canvas = document.createElement('canvas');  // Créer un élément canvas
        const ctx = canvas.getContext('2d');  // Récupérer le contexte du canvas
        canvas.width = img.width;  // Définir la largeur du canvas
        canvas.height = img.height;  // Définir la hauteur du canvas
        ctx.drawImage(img, 0, 0);  // Dessiner l'image sur le canvas

        // Appliquer un effet de flou au canvas
        ctx.filter = 'blur(13px)';
        ctx.drawImage(img, 0, 0);

        // Convertir le canvas en une image base64
        const blurredImgData = canvas.toDataURL('image/jpeg');
        callback(blurredImgData);  // Retourner l'image floutée via la fonction de rappel
    };
    img.src = imgData;  // Définir la source de l'image
}

// Fonction pour afficher ou masquer des sections du formulaire en fonction de la case à cocher
function toggleFormVisibility() {
    const checkbox = document.getElementById('customInviteCheckbox');  // Récupérer la case à cocher
    const formDetails = document.querySelectorAll('.non_perso');  // Récupérer toutes les sections du formulaire à afficher/masquer
    const rightSide = document.getElementById('rightSide');  // Récupérer la section droite du formulaire

    // Si la case est cochée, masquer les sections de formulaire; sinon, les afficher
    if (checkbox.checked) {
        formDetails.forEach(element => {
            element.style.display = 'none';  // Masquer chaque élément de la liste
        });
        rightSide.style.display = 'none';  // Masquer la section droite
    } else {
        formDetails.forEach(element => {
            element.style.display = 'flex';  // Afficher chaque élément de la liste
        });
        rightSide.style.display = 'flex';  // Afficher la section droite
    }
}
