# Direction UI/UX — Église Règne de Dieu

## Positionnement
Site public d’une communauté chrétienne à Kolwezi, pour les membres, les visiteurs et les personnes qui souhaitent suivre les cultes. La présence visuelle doit inspirer confiance et accueil, sans paraître institutionnelle à l’excès ni artificiellement luxueuse.

**Personnalité :** accueillante, digne, contemporaine.

## Principes
- **Éditorial et lisible :** titres sérif sobres, texte courant sans sérif, lignes de lecture mesurées et hiérarchie simple.
- **Ancré dans la communauté :** privilégier les photos authentiques et les informations pratiques réelles; ne pas fabriquer de chiffres, d’avis ou de preuves sociales.
- **Sobriété chaleureuse :** espace généreux, détails or discrets, surfaces ivoire et bleu profond; éviter les effets décoratifs gratuits.
- **Accessible et rapide :** HTML sémantique, navigation clavier, focus visible, cibles de commande confortables, images dimensionnées et mouvement réduit respecté.

## Palette sémantique
Ces couleurs reprennent les tokens déjà présents dans le CSS du site; les références marines et dorées restent la signature RDD.

| Rôle | Valeur | Usage |
|---|---|---|
| Marine / texte principal | `#17243A` | Titres, navigation, bandeaux foncés |
| Or | `#D39A22` | Accent, bouton principal, repères visuels |
| Texte secondaire | `#465268` | Descriptions et informations secondaires |
| Ivoire | `#FBF9F4` | Fond général |
| Surface douce | `#F2EEE5` | Alternance de sections |
| Blanc | `#FFFFFF` | Cartes et zones de lecture |
| Filet | `#E8E2D6` | Séparateurs et contours discrets |

Conserver un texte sombre sur l’or pour le contraste. Utiliser l’or comme texte sur fond clair uniquement dans sa variante foncée déjà définie par le site (`#986406`).

## Typographie
- **Titres :** Georgia / Times New Roman, en graisse modérée; conserver une forme de caractère éditorial.
- **Corps et interface :** pile système `system-ui`, sans chargement externe, corps de 16 px minimum.
- **Mesure :** limiter les paragraphes longs à environ 60–65 caractères par ligne; équilibrer les titres lorsque le navigateur le permet.

## Mise en page
- Largeur de lecture maximale autour de 1 200 px avec marges fluides.
- Grilles de trois colonnes sur grand écran, deux à largeur intermédiaire, une sur téléphone.
- Images de culte, affiches et portraits conservent leur ratio et restent entièrement visibles lorsque la lecture du visuel est importante.
- Les horaires et la prochaine rencontre restent prioritaires sur la page des cultes.

## Composants et interactions
- Boutons rectangulaires à coins modestes, hauteur minimale de 44–48 px et libellés explicites; éviter les formes de pilule comme style dominant.
- Cartes peu ombrées; état de survol perceptible sans déplacement de la mise en page.
- Navigation mobile native et prévisible; état courant annoncé par `aria-current`.
- Diaporama accessible avec commandes précédent/suivant et pause; suspendre l’animation automatique selon la préférence de mouvement réduit.
- Conserver les liens externes explicites, les labels de formulaire et les anneaux de focus visibles.

## Mouvement
Transitions de couleur et d’opacité discrètes, typiquement 180–240 ms. Pas de révélation de contenu qui le rendrait invisible sans JavaScript; aucune animation non essentielle lorsque `prefers-reduced-motion: reduce` est actif.

## À éviter
Palette violette générique, dégradés décoratifs, métriques ou témoignages inventés, accumulation de badges/pilules, carrousels sans arrêt accessible, polices web bloquant le chargement, animations qui déplacent le contenu.
