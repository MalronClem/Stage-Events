/****************************************************************************************/
//gestion de la page invité (à terminer avec une réelle base de données mysql -> intégration de php nécessaire<)
document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour charger la liste des invités depuis localStorage
    function loadInvites() {
        const ul = document.getElementById('invite_list');
        if (ul) {
            const invites = JSON.parse(localStorage.getItem('invites')) || [];
            ul.innerHTML = ''; // Vider la liste actuelle

            invites.forEach(function(invite) {
                const li = document.createElement('li');
                li.textContent = invite;
                ul.appendChild(li);
            });
            console.log('Invites loaded:', invites);
        } else {
            console.error('invite_list element not found');
        }
    }

    // Fonction pour sauvegarder la liste des invités dans localStorage
    function saveInvites(invites) {
        localStorage.setItem('invites', JSON.stringify(invites));
        console.log('Invites saved:', invites);
    }

    // Fonction pour ajouter un invité à la liste
    function addInviteToList(invite) {
        const ul = document.getElementById('invite_list');
        if (ul) {
            const li = document.createElement('li');
            li.textContent = invite;
            ul.appendChild(li);
            saveInvites(getAllInvites()); // Sauvegarder après ajout
            console.log('Invite added:', invite);
        } else {
            console.error('invite_list element not found');
        }
    }

    // Fonction pour supprimer un invité de la liste
    function removeInviteFromList(inviteToRemove) {
        const ul = document.getElementById('invite_list');
        if (ul) {
            const items = Array.from(ul.children);
            const itemToRemove = items.find(item => item.textContent === inviteToRemove);
            if (itemToRemove) {
                ul.removeChild(itemToRemove);
                saveInvites(getAllInvites()); // Sauvegarder après suppression
                console.log('Invite removed:', inviteToRemove);

                // Mettre à jour les tables après suppression
                updateTablesAfterInviteRemoval(inviteToRemove);

                // Rafraîchir la liste des invités dans l'interface
                displayInvites();
            } else {
                alert("L'invité n'a pas été trouvé dans la liste.");
                console.warn('Invite not found:', inviteToRemove);
            }
        } else {
            console.error('invite_list element not found');
        }
    }

    // Fonction pour récupérer tous les invités actuels
    function getAllInvites() {
        const ul = document.getElementById('invite_list');
        if (ul) {
            return Array.from(ul.children).map(li => li.textContent);
        } else {
            console.error('invite_list element not found');
            return [];
        }
    }

    // Fonction pour afficher la liste des invités dans l'interface
    function displayInvites() {
        const ul = document.getElementById('invite_list');
        if (ul) {
            const invites = getAllInvites();
            ul.innerHTML = ''; // Vider la liste actuelle

            invites.forEach(function(invite) {
                const li = document.createElement('li');
                li.textContent = invite;
                ul.appendChild(li);
            });
            console.log('Invites displayed:', invites);
        } else {
            console.error('invite_list element not found');
        }
    }

    // Fonction pour mettre à jour les tables après la suppression d'un invité
    function updateTablesAfterInviteRemoval(inviteToRemove) {
        const tables = JSON.parse(localStorage.getItem('tables')) || [];

        // Mettre à jour chaque table pour supprimer l'invité
        tables.forEach(table => {
            const index = table.invites.indexOf(inviteToRemove);
            if (index !== -1) {
                table.invites.splice(index, 1); // Supprimer l'invité de la table
            }
        });

        // Sauvegarder les tables mises à jour dans le localStorage
        localStorage.setItem('tables', JSON.stringify(tables));

        // Rafraîchir la liste des tables dans l'interface
        displayTables();
    }

    // Fonction pour afficher les tables dans l'interface
    function displayTables() {
        const ul = document.getElementById('table_liste');
        if (ul) {
            const tables = JSON.parse(localStorage.getItem('tables')) || [];
            ul.innerHTML = ''; // Vider la liste actuelle

            tables.forEach(function(table) {
                const li = createTableElement(table.name, table.invites);
                ul.appendChild(li);
            });
            console.log('Tables displayed:', tables);
        } else {
            console.error('table_liste element not found');
        }
    }

    // Fonction utilitaire pour créer un élément de table
    function createTableElement(tableName, invites = []) {
        const li = document.createElement('li');
        li.textContent = `${tableName}: ${invites.join(', ')}`;
        return li;
    }

    // Gestion de l'ajout d'un invité via un bouton
    document.getElementById('btn_add_invite').addEventListener('click', function() {
        const invite = prompt("Entrez le nom de l'invité à ajouter:");
        if (invite) {
            addInviteToList(invite);
        }
    });

    // Gestion de la suppression d'un invité via un bouton
    document.getElementById('btn_remove_invite').addEventListener('click', function() {
        const inviteToRemove = prompt("Entrez le nom de l'invité à supprimer:");
        if (inviteToRemove) {
            removeInviteFromList(inviteToRemove);
        }
    });

    // Charger les invités à l'ouverture de la page
    loadInvites();

    // Gestion des tables

    // Fonction pour charger et afficher les tables à l'ouverture de la page
    function loadTables() {
        const ul = document.getElementById('table_liste');
        if (ul) {
            const tables = JSON.parse(localStorage.getItem('tables')) || [];
            ul.innerHTML = ''; // Vider la liste actuelle

            tables.forEach(function(table) {
                const li = createTableElement(table.name, table.invites);
                ul.appendChild(li);
            });
            console.log('Tables loaded:', tables);
        } else {
            console.error('table_liste element not found');
        }
    }

    // Fonction pour sauvegarder les tables dans localStorage
    function saveTables(tables) {
        localStorage.setItem('tables', JSON.stringify(tables));
        console.log('Tables saved:', tables);
    }

    // Gestion de l'ajout d'une table via un bouton
    document.getElementById('btn_add_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à ajouter:");
        if (tableName) {
            const ul = document.getElementById('table_liste');
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                }));

                if (tables.some(table => table.name === tableName)) {
                    alert("Une table avec ce nom existe déjà.");
                    console.warn('Table already exists:', tableName);
                    return;
                }

                const newTable = {
                    name: tableName,
                    invites: []
                };

                tables.push(newTable);
                ul.appendChild(createTableElement(newTable.name, newTable.invites));
                saveTables(tables); // Sauvegarder après ajout
                console.log('Table added:', tableName);
            } else {
                console.error('table_liste element not found');
            }
        }
    });

    // Gestion de la suppression d'une table via un bouton
    document.getElementById('btn_remove_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à supprimer:");
        if (tableName) {
            const ul = document.getElementById('table_liste');
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                }));

                const tableIndex = tables.findIndex(table => table.name === tableName);
                if (tableIndex !== -1) {
                    ul.removeChild(ul.children[tableIndex]);
                    tables.splice(tableIndex, 1);
                    saveTables(tables); // Sauvegarder après suppression
                    console.log('Table removed:', tableName);
                } else {
                    alert("La table n'a pas été trouvée dans la liste.");
                    console.warn('Table not found:', tableName);
                }
            } else {
                console.error('table_liste element not found');
            }
        }
    });

    document.getElementById('btn_modifie_table').addEventListener('click', function() {
        const tableName = prompt("Entrez le nom de la table à modifier:");
        if (tableName) {
            const ul = document.getElementById('table_liste');
            if (ul) {
                const tables = Array.from(ul.children).map(item => ({
                    name: item.textContent.split(':')[0].trim(),
                    invites: item.textContent.split(':')[1].trim().split(',').map(invite => invite.trim())
                }));
    
                const tableToModify = tables.find(table => table.name === tableName);
                if (tableToModify) {
    
                    const newInvitesInput = prompt("Entrez les invités de la table (séparés par des virgules):", tableToModify.invites.join(', '));
                    const newInvites = newInvitesInput ? newInvitesInput.split(',').map(invite => invite.trim()) : [];
    
                    // Utiliser un ensemble (Set) pour vérifier les invitations uniques
                    const uniqueInvites = [...new Set(newInvites)];
    
                    // Vérifier les invitations déjà présentes dans d'autres tables
                    const existingInvites = uniqueInvites.filter(invite => {
                        // Vérifier si l'invité est déjà présent dans une autre table, mais pas dans la table actuelle
                        return isInviteAlreadyAdded(tables.flatMap(table => table.invites), invite) && !tableToModify.invites.includes(invite);
                    });
    
                    if (existingInvites.length > 0) {
                        alert(`Les invités suivants sont déjà présents dans d'autres tables: ${existingInvites.join(', ')}`);
                        console.warn('Duplicate invites:', existingInvites);
                        return;
                    }                    
    
                    tableToModify.invites = uniqueInvites;
    
                    // Mettre à jour l'élément HTML correspondant
                    const liToModify = Array.from(ul.children).find(item => item.textContent.startsWith(tableName));
                    if (liToModify) {
                        liToModify.textContent = `${tableName}: ${uniqueInvites.join(', ')}`;
                    }
    
                    saveTables(tables); // Sauvegarder après modification
                    console.log('Table modified:', tableName, uniqueInvites);
                } else {
                    alert("La table n'a pas été trouvée dans la liste.");
                    console.warn('Table not found:', tableName);
                }
            } else {
                console.error('table_liste element not found');
            }
        }
    });
    
    function isInviteAlreadyAdded(allInvites, inviteToCheck) {
        return allInvites.includes(inviteToCheck);
    }
    // Charger les tables à l'ouverture de la page
    loadTables();

});







/****************************************************************************************/
//gestion de la nav et du changement de page

document.addEventListener('DOMContentLoaded', function() {
    // Mettre en pause et cacher toutes les vidéos au chargement
    document.querySelectorAll('main video').forEach(video => {
        video.pause();
        video.currentTime = 0; // Réinitialiser la vidéo au début
        video.style.display = 'none';
    });

    // Ajouter des écouteurs de clic à chaque <li>
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer la valeur de data-content
            const content = this.getAttribute('data-content');

            // Cacher tous les divs du <main>
            document.querySelectorAll('main > div').forEach(div => {
                div.style.display = 'none';
            });

            // Mettre en pause et cacher toutes les vidéos
            document.querySelectorAll('main video').forEach(video => {
                video.pause();
                video.currentTime = 0; // Réinitialiser la vidéo au début
                video.style.display = 'none';
            });

            // Afficher le div correspondant à data-content
            const divToShow = document.getElementById(content);
            if (divToShow) {
                divToShow.style.display = 'flex';
                const videoToPlay = divToShow.querySelector('video');
                if (videoToPlay) {
                    videoToPlay.style.display = 'block';
                    videoToPlay.play();
                }
            }
        });
    });
});









/****************************************************************************************/
//gestion de la page logo


const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let autoScrollInterval;

function showSlide(index) {
    if (index >= carouselItems.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = carouselItems.length - 1;
    } else {
        currentIndex = index;
    }
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}
function nextSlide() {
    showSlide(currentIndex + 1);
}
function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 4000); 
}
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}
nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoScroll();
    startAutoScroll();
});
prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    stopAutoScroll();
    startAutoScroll();
});
startAutoScroll(); 










/****************************************************************************************/
//gestion de la page aide

function filterContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const helpItems = document.querySelectorAll('.help-item');

    helpItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
} 





/****************************************************************************************/
//gestion de la page messages


/****************************************************************************************/
//gestion de la page prestataires

