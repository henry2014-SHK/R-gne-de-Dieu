# RDD — direction immersive

## Intention
La première retouche éditoriale était trop discrète. Cette direction, choisie après les références DFFRNT et la vidéo de voyage fournies par l’utilisateur, met en scène la communauté avec une entrée cinématographique, des plans photographiques et des mouvements perceptibles. Les références inspirent la composition et les effets, jamais le contenu commercial, les cristaux ou les portraits artificiels.

## Signature
Marine nocturne `#080F1B`, surface marine `#111E31`, or lumineux `#F1CE81`, or de marque `#D39A22` et ivoire `#FBF9F4`. Les lueurs sont concentrées sur le héros; les plages ivoire conservent la lisibilité des horaires et des informations pratiques. Cormorant Garamond variable, servi localement sous licence OFL et avec `font-display: swap`, porte les titres. Le texte courant reste en police système.

Les angles sont légèrement arrondis : environ 14 px pour les cartes, les panneaux et les cadres photo, 10 px pour les boutons et commandes. Cette douceur n’implique pas de formes de pilule dominantes.

## Composition
L’accueil s’ouvre sur une scène photographique presque plein écran. Le titre « Règne de Dieu » et son message restent centrés sur la photo, y compris sur téléphone. Deux plans photo périphériques encadrent le titre sur bureau. Ils disparaissent sur les écrans étroits pour ne pas gêner la lecture. Les valeurs sont présentées en trois panneaux décalés sur fond de nuit; sur mobile les images des panneaux sont entières, suivies de leur texte. Les sections horaires, communauté et visite alternent ivoire et marine avec de grands titres et des cadres dorés décalés.

## Mouvement
Parallaxe de 22 px maximum sur les plans de contenu, déplacement de fond de 75 px maximum et profondeur au pointeur limitée à quelques degrés. Les apparitions sont ponctuelles, déclenchées par l’entrée dans la fenêtre et construites avec l’API Web Animations. Le contenu n’est jamais invisible par défaut. Les particules, au nombre de 36, sont de petits points lumineux et ne représentent ni des personnes ni des objets. Leur rendu est plafonné à environ 30 images/s et arrêté hors écran ou lorsque l’onglet est masqué.

Sur demande explicite après revue, les commandes d’animations et du diaporama sont retirées. Les onze photos tournent automatiquement en boucle toutes les 14 secondes, sans arrêt au survol ou au focus. La préférence système de mouvement réduit reste respectée; un onglet masqué suspend le travail inutile et reprend automatiquement lorsqu’il redevient visible. Les anciens choix d’arrêt stockés localement ne sont plus utilisés. Ce choix de présentation sans contrôle de pause visible s’écarte de la recommandation UI/UX d’arrêt manuel des carrousels; aucune conformité WCAG globale n’est revendiquée.

## Conservation
Les images OneDrive, Rct, Pvk et le portrait réel du pasteur sont conservés. Les horaires (dimanche 9 h–12 h 30; mardi et jeudi 17 h–19 h 20), coordonnées et mode de dons ne changent pas. Les affiches et images de contenu restent entières sur petits écrans. Aucune dépendance React, GSAP ou bibliothèque de particules n’est ajoutée au site statique.

Après la revue du brouillon, les sept présentations de programmes et leurs objectifs sont remplacés par les textes annexés par l’utilisateur. Le culte dominical est ajouté immédiatement après le jeudi dans Événements. Son affiche du 22 février 2026 (9 h–11 h 30) reste distincte de l’horaire régulier. La nouvelle présentation « Qui sommes-nous ? » est intégrée avant les sections vision, mission et versets, conservées. Les études scolaires et universitaires du pasteur sont retirées sans modifier sa famille ni ses autres engagements.

Les descriptions des trois cultes sont désormais posées sur leurs propres fonds décoratifs, recadrés pour retirer les mentions inférieures. Le mardi utilise le détail de Bible de son affiche, le jeudi le motif de prière et le dimanche l’affiche fournie sans dates ni adresse de bas de page. Les dérivés des photos d’accueil retirent également les bandeaux de bas d’image, sans modifier les fichiers d’origine. Les cinq paragraphes supplémentaires de fin de carte sur les dates, lieux et détails d’édition sont retirés des événements, à la demande de l’utilisateur; les descriptions et leurs objectifs restent complets.

## Accessibilité et robustesse
Liens et boutons natifs, cibles de 44 px minimum pour les commandes principales, focus visible et texte contrasté. Pas de défilement détourné, écran de chargement bloquant, navigation remplacée par une animation ou contenu essentiel caché. Sans JavaScript, le contenu reste lisible et la scène fixe. Avec mouvement réduit, aucune particule animée, rotation automatique, parallaxe ou apparition n’est active. La PR reste un brouillon; aucune publication n’est autorisée par cette refonte.

## Visionnage du direct

Le direct dispose de sa propre section cinéma sombre, placée après le compte à rebours, lui-même situé sous le héros « Nos rencontres ». Le lecteur conserve un ratio 16:9, s’étend jusqu’à 1 600 px sur grand écran et occupe presque toute la largeur du téléphone. Les rediffusions sont séparées et placées immédiatement après le direct, afin de ne pas réduire sa largeur. Le bouton « Plein écran » utilise l’API native lorsqu’elle est disponible; les contrôles de YouTube et le lien de secours restent accessibles. Ni lecture forcée, ni badge prétendant qu’un direct est actuellement en cours, ni nouvelle dépendance. Le lecteur conserve la chaîne configurée; sa disponibilité effective dépend de la diffusion YouTube.
