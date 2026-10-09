# Refonte immersive RDD — brouillon PR #10

La retouche éditoriale précédente n’était pas assez visible. Cette passe répond aux références visuelles et vidéos fournies : expérience cinématographique, profondeur, grands caractères et mouvement clairement perceptible.

## Direction
- Marine de nuit et ivoire, lueurs d’or en signature; aucun remplacement des photos authentiques par des personnes générées.
- Titres Cormorant Garamond servis localement avec repli Georgia; interface en police système.
- Accueil presque plein écran, titre central sur la photo, composition en plusieurs plans et éléments photographiques flottants sur grand écran.
- Trois valeurs en panneaux photographiques profonds; horaires éditoriaux prioritaires; communauté et invitation en séquences alternées claires et foncées.
- Parallaxe modérée au défilement, profondeur liée au pointeur sur les visuels non interactifs de bureau, entrées animées et points lumineux discrets. Aucun défilement détourné.
- Lecture automatique en boucle sans commandes visibles, selon la dernière demande utilisateur. Pas d’arrêt au survol ou au focus; la préférence système de mouvement réduit reste prioritaire.
- Le titre demeure sur la photo en mobile. Les images de contenu et affiches restent entières. Rien d’essentiel ne dépend du mouvement ou du JavaScript.

Le direct de la page Cultes devient un espace cinéma prioritaire, immédiatement sous le héros : écran 16:9 jusqu’à 1 600 px sur fond sombre, presque pleine largeur sur téléphone, sans rediffusions à côté. Le plein écran utilise l’API du navigateur avec repli vers les contrôles YouTube; aucun démarrage forcé de la vidéo. Les rediffusions sont conservées dans une section indépendante plus bas. La disponibilité du direct dépend de la chaîne YouTube existante.

## Structure
- `index.html` : composition d’accueil et contenus existants réorganisés.
- `assets/css/site.css` : base commune historique et styles du diaporama.
- `assets/css/immersive.css` : langage visuel, composants, responsive et états de mouvement.
- `assets/js/site.js` : menu, compte à rebours et diaporama existants.
- `assets/js/immersive.js` : préférence d’effets, parallaxe, profondeur et particules; JS natif sans bibliothèque lourde.
- `assets/fonts/` : police locale et licence libre.
- `design-system/rdd/MASTER.md` : décisions de référence pour la suite.

## Limites conservées
Aucun changement de coordonnées, horaires, source des photos, mode de dons ou politique CSP. Après revue, la biographie est allégée des études, les descriptions fournies sont intégrées et les détails d’édition des événements sont retirés. Les fonds photographiques utilisent des dérivés recadrés sans bandeaux. Aucun paiement, aucune publication permanente et aucune fusion; mise à jour de la PR brouillon uniquement.

## Ordre de lecture de la page Cultes

Après la dernière revue, le compte à rebours est placé entre « Nos rencontres » et le lecteur direct. La section des cultes précédents suit immédiatement le direct. Les descriptions et horaires des trois cultes, puis la galerie dominicale, viennent ensuite. Les lecteurs, la chaîne et le calcul du décompte sont conservés; la PR reste en brouillon.

## Attente RDD TV

Un logo transparent extrait du symbole fourni remplace l’écran YouTube indisponible pendant l’attente, avec rotation CSS et les deux messages demandés. Le script du direct observe les états de l’API IFrame officielle pour retirer ou rétablir l’attente, et conserve l’accès manuel au lecteur en cas de réponse insuffisante. Le contrôle côté client n’interroge pas un statut indépendant de la chaîne et ne peut garantir une bascule infaillible. Aucun démarrage sonore automatique; la préférence système de mouvement réduit reste prioritaire.

## Coordonnées officielles et témoignages

L’adresse regnededieuchurch@gmail.com est affichée dans les contacts et tous les pieds de page. L’action « Envoyer mon témoignage par e-mail » ouvre la messagerie du fidèle avec ce destinataire et l’objet « Mon témoignage — Église Règne de Dieu »; aucun message n’est envoyé automatiquement et la publication d’un témoignage reste soumise à son accord. La position officielle fournie, https://maps.app.goo.gl/auCexUBLsVgvCBBv7, est reliée depuis la carte d’adresse et les pieds de page. Le lien a été vérifié et pointe vers les coordonnées -10.745585, 25.511682. Adresse postale et téléphone inchangés, PR en brouillon.

## Trois diaporamas de foi partagée

La section « Un temps de foi partagé » conserve ses trois blocs dans leur ordre : louange et prédication, enseignement de la Parole, prière et foi vécues en communauté. Les photos 8801, 8799 et 8805 illustrent la louange; 8804, 8803 et 8802 (les trois dernières fournies) illustrent l’écoute, la prise de notes et l’enseignement; 8800 et 8806 illustrent la prière. Chaque bloc dispose d’un diaporama indépendant, à fondu de 1,6 seconde et rotation lente de 8 à 10,8 secondes, sans commandes visibles selon le choix précédent. Les photos restent entières avec object-fit: contain; les légendes restent fixes. WebP pleine taille et variantes mobiles, chargement différé, aucun nouvel hébergement ni dépendance. Mouvement réduit respecté et première photo disponible sans JavaScript. Direct, coordonnées, décompte et ordre des sections conservés, PR en brouillon.
