# WhichSkin?

Pour lancer l'app dans de bonne condition crée une BDD mysql appeler "whichskin" et importer le fichier "bdd.sql" dedans ensuite "bd.ts" changer au besoin les informations de login de BDD.
Si tout est bon vous devrez pouvoir lancer l'app via npm run dev.



> **Disclaimer**  
> Étant débutant en JavaScript et Next.js, développer une application complète comme celle-ci représentait un vrai défi. Certaines parties ont été plus abordables, d’autres beaucoup plus techniques, et j’ai parfois manqué d’expérience pour avancer sereinement.  
> Pour surmonter ces difficultés et continuer à progresser, j’ai fait appel à une IA comme outil d’assistance : pour m’aider à comprendre certaines notions, corriger des erreurs ou m’accompagner sur les parties les plus complexes.  
> J’ai toutefois pris soin de lire, comprendre et adapter le code, et une bonne partie de la logique a été écrite par moi-même.  
> La récupération automatique des patchs (scraping, parsing, insertion en base) a notamment été l’un des points les plus techniques du projet, et c’est là que l’assistance m’a été la plus utile.



WhichSkin? est une application Next.js permettant de parier des tokens sur l’arrivée de skins dans les prochains patchs de League of Legends.  
L’application inclut un système de paris, une analyse automatisée des patchs, une roue de gain de tokens, et diverses pages d’information.

---

## Fonctionnalités principales

- **Page d’accueil (`/`)** – Présente l’application, le dernier patch et l’accès rapide aux principales sections.  
- **Paris (`/bets`)** – Permet de créer un pari et d’afficher l’historique des mises.  
- **Résultats (`/result`)** – Montre si les paris sont gagnés ou perdus selon le patch suivant.  
- **Patchs (`/patches`)** – Liste les patchs récupérés automatiquement et leurs skins.  
- **Champions (`/champions`)** – Affiche tous les champions avec image et pick rate.  
- **Wheel of Fortune (`/wheel`)** – Donne des tokens gratuits via une roue toutes les 60 secondes.  
- **Connexion / Inscription (`/login`, `/register`)** – Permet de définir le pseudo utilisé sur l’application.

---

## Prérequis

Assurez-vous d’avoir :

- une base MySQL opérationnelle  
- un fichier `.env` contenant les informations de connexion  
- les tables nécessaires importées (`champions`, `bets`, `patches`, `patch_skins`)

Sans ces éléments, l’application ne pourra pas fonctionner correctement.

---

## Démarrage rapide

```bash
git clone https://github.com/ton-repo/WhichSkin
cd WhichSkin
npm install
npm run dev
