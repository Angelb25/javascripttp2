// Fonction principale pour charger les données JSON
function chargerProfil() {
  fetch('infos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du profil");
      }
      return response.json(); // Convertit le JSON en objet JS
    })
    .then(profil => {
      afficherCV(profil);
    })
    .catch(error => {
      console.error("Erreur :", error);
      document.body.textContent = "Erreur de chargement du CV ";
    });
}

// Fonction qui génère le CV dynamiquement
function afficherCV(profil) {
  const cv = document.createElement('div');
  cv.id = 'cv';

  // Titre principal
  const title = document.createElement('h1');
  title.id = 'title';
  title.textContent = profil.nom;
  cv.appendChild(title);

  // Sous-titre
  const subtitle = document.createElement('h2');
  subtitle.id = 'subtitle';
  subtitle.textContent = profil.poste;
  cv.appendChild(subtitle);

  // Profile
  const profile = document.createElement('div');
  profile.id = 'profile';
  profile.textContent = profil.profile;
  cv.appendChild(profile);

  // Infos
  const infos = document.createElement('div');
  infos.id = 'infos';
  infos.textContent = profil.infos;
  cv.appendChild(infos);

  // Summary
  const summary = document.createElement('div');
  summary.id = 'summary';
  summary.textContent = profil.summary;
  cv.appendChild(summary);

  // Compétences
  const skills = document.createElement('ul');
  skills.id = 'skills';
  profil.competences.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skills.appendChild(li);
  });
  cv.appendChild(skills);

  // Ajout au body
  document.body.appendChild(cv);
}
// Fonction pour charger les infos GitHub
function chargerGithub(username) {
  console.log(" Chargement des données GitHub...");

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Impossible de charger les infos GitHub");
      }
      return response.json();
    })
    .then(data => {
      console.log(" Données GitHub :", data);
      afficherBlocGithub(data);
    })
    .catch(error => {
      console.error(" Erreur GitHub :", error);
    });
}

// Fonction pour afficher le bloc GitHub dans le CV
function afficherBlocGithub(data) {
  // Création du bloc principal
  const githubDiv = document.createElement('div');
  githubDiv.id = 'github';
  githubDiv.style.marginTop = "20px";
  githubDiv.style.padding = "15px";
  githubDiv.style.borderTop = "2px solid #007bff";

  // Titre
  const titre = document.createElement('h3');
  titre.textContent = "Profil GitHub";
  githubDiv.appendChild(titre);

  // Nom d’utilisateur
  const nom = document.createElement('p');
  nom.innerHTML = `<strong>Utilisateur :</strong> ${data.login}`;
  githubDiv.appendChild(nom);

  // Nombre de dépôts publics
  const repos = document.createElement('p');
  repos.innerHTML = `<strong>Dépôts publics :</strong> ${data.public_repos}`;
  githubDiv.appendChild(repos);


  // Ajout du bloc au CV existant
  const cv = document.getElementById('cv');
  if (cv) {
    cv.appendChild(githubDiv);
  } else {
    console.warn("CV non trouvé, impossible d’ajouter le bloc GitHub.");
  }
}

chargerGithub("Angelb25");

// Lancement du chargement
chargerProfil();
