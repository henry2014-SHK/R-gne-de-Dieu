# Activation des dons Mobile Money

## État livré

La page dons.html prépare un transfert manuel Airtel Money vers 0975254743 (format international +243975254743), numéro communiqué par le responsable du projet. Aucun paiement n’est initié par le code; la copie du numéro est la seule interaction locale. Le titulaire affiché par Airtel Money n’a pas été vérifié et aucun nom de portefeuille n’est inventé. Le donateur doit vérifier le bénéficiaire avant validation. Les modalités M-Pesa et Orange Money ne sont pas présentées comme opérationnelles sur ce numéro.

## Solution privilégiée : MaishaPay LinkPay

Sources officielles consultées : https://www.maishapay.net/ (offre RDC : Airtel Money, M-Pesa et Orange Money, commission affichée 3,5 % par opérateur) et https://www.maishapay.net/linkpay (lien à montant fixe ou libre pour les dons, personnalisation et page de retour). Ces indications commerciales ne remplacent pas le contrat marchand.

Inscription officielle : https://marchand.maishapay.online/register ; connexion : https://marchand.maishapay.online/login. Le formulaire demande nom et prénom du marchand, e-mail professionnel, mot de passe et acceptation des conditions. Le titulaire réel doit être identifié par l’utilisateur. Aucun formulaire n’a été envoyé, aucun mot de passe créé ni aucune condition acceptée.

Pour activation, obtenir l’acceptation du compte de l’église, la disponibilité effective des trois opérateurs, les devises, les frais complets et le calendrier de reversement. Le numéro 0975254743 est le destinataire souhaité : il ne peut pas être considéré comme une instruction de reversement active tant que le prestataire ne l’a pas confirmé.

Une fois le compte validé, générer un lien de don à montant libre, au nom de l’église, avec un retour vers le site. Vérifier le titulaire et la destination des fonds sur le compte marchand. Insérer uniquement ce lien HTTPS véritable en bouton « Faire un don en ligne » dans dons.html. Le bouton doit préciser que le paiement s’ouvre sur la page sécurisée du prestataire. Ne pas intégrer le formulaire dans un iframe sans support officiel documenté.

Ne pas afficher une confirmation de paiement sur la simple page de retour : seuls le reçu et le statut vérifié côté prestataire constituent la preuve. Si le service hébergé est ajouté, harmoniser la note de bas de page (qui affirme actuellement que le site ne traite pas de paiement) pour expliquer que les paiements sont gérés par le prestataire.

## Si un formulaire intégré est choisi ensuite

L’API MaishaPay est documentée à https://documenter.getpostman.com/view/22376672/2sAYQXnCU4. Un backend persistant distinct de GitHub Pages sera nécessaire pour les secrets, l’initiation des transactions et leur statut vérifié. Ne pas inventer de routes, de schémas API ou de paramètres de reversement. Confirmer les spécifications officielles du compte, le mécanisme de notification, l’authentification, la vérification de signature éventuelle, les requêtes idempotentes, les montants et références. Ne jamais mettre de clés secrètes dans HTML, JavaScript, Git ou un fichier public.

Les tests ne doivent pas exécuter de paiement réel à l’insu de l’utilisateur. Aucun PIN n’est collecté par RDD. Une éventuelle procédure OTP doit suivre le parcours officiel documenté du prestataire, jamais un envoi en conversation.

## Blocage actuel

Le compte marchand et le lien de paiement réel ne sont pas disponibles dans cette session. Les paiements automatiques multi-opérateurs ne sont donc pas activés. La préparation est conservée dans une branche et une PR brouillon; le site public reste inchangé.
