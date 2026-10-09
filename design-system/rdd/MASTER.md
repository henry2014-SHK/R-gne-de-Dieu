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

La commande « Animations » arrête ces effets et la rotation automatique du diaporama. La préférence système de mouvement réduit reste prioritaire. La pause du diaporama seul est indépendante. La rotation se suspend également lorsque le clavier est dans la scène ou que le pointeur survole ses commandes; le survol du décor ne bloque pas constamment la lecture sur bureau.

## Conservation
Les images OneDrive, Rct, Pvk et le portrait réel du pasteur sont conservés. Les horaires (dimanche 9 h–12 h 30; mardi et jeudi 17 h–19 h 20), coordonnées et mode de dons ne changent pas. Les affiches et images de contenu restent entières sur petits écrans. Aucune dépendance React, GSAP ou bibliothèque de particules n’est ajoutée au site statique.

Après la revue du brouillon, les sept présentations de programmes et leurs objectifs sont remplacés par les textes annexés par l’utilisateur. Le culte dominical est ajouté immédiatement après le jeudi dans Événements. Son affiche du 22 février 2026 (9 h–11 h 30) reste distincte de l’horaire régulier. La nouvelle présentation « Qui sommes-nous ? » est intégrée avant les sections vision, mission et versets, conservées. Les études scolaires et universitaires du pasteur sont retirées sans modifier sa famille ni ses autres engagements.

## Accessibilité et robustesse
Liens et boutons natifs, cibles de 44 px minimum pour les commandes principales, focus visible et texte contrasté. Pas de défilement détourné, écran de chargement bloquant, navigation remplacée par une animation ou contenu essentiel caché. Sans JavaScript, le contenu reste lisible et la scène fixe. Avec mouvement réduit, aucune particule animée, rotation automatique, parallaxe ou apparition n’est active. La PR reste un brouillon; aucune publication n’est autorisée par cette refonte.
