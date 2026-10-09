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
