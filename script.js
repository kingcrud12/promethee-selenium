document.addEventListener('DOMContentLoaded', () => {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const section = title.closest('.sidebar-section');
            const navList = section ? section.querySelector('.nav-list') : null;
            const icon = title.querySelector('i');

            if (navList) {
                const isClosed = window.getComputedStyle(navList).display === 'none';

                if (isClosed) {
                    navList.style.display = 'block';
                    if (icon) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                } else {
                    navList.style.display = 'none';
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        });
    });

    // Language toggle
    const translations = {
        'header.features': { en: 'Features', fr: 'Fonctionnalités' },
        'header.installation': { en: 'Installation', fr: 'Installation' },
        'header.quickStart': { en: 'Quick Start', fr: 'Démarrage rapide' },
        'header.download': { en: 'Download', fr: 'Télécharger' },
        'header.docs': { en: 'Docs', fr: 'Documentation' },
        'header.tutorial': { en: 'Tutorial', fr: 'Tutoriel' },
        'header.about': { en: 'About', fr: 'A propos' },

        'sidebar.home': { en: 'Home', fr: 'Accueil' },
        'sidebar.coreLibrary': { en: 'Core Library', fr: 'Bibliothèque principale' },
        'sidebar.pageObjectModel': { en: 'Page Object Model', fr: 'Modèle Page Object' },
        'sidebar.scaffolding': { en: 'Scaffolding', fr: 'Génération' },
        'sidebar.builtInUtilities': { en: 'Built-in Utilities', fr: 'Utilitaires intégrés' },
        'sidebar.environmentMgmt': { en: 'Environment Mgmt', fr: 'Gestion des environnements' },
        'sidebar.bilingualSupport': { en: 'Bilingual Support', fr: 'Support bilingue' },
        'sidebar.tutorialSection': { en: 'Tutorial', fr: 'Tutoriel' },
        'sidebar.tutorial': { en: 'Tutorial', fr: 'Tutoriel' },
        'sidebar.aboutSection': { en: 'About', fr: 'A propos' },
        'sidebar.about': { en: 'About', fr: 'A propos' },
        'sidebar.cliCommands': { en: 'CLI Commands', fr: 'Commandes CLI' },
        'sidebar.gettingStarted': { en: 'Getting Started', fr: 'Prise en main' },
        'sidebar.init': { en: 'init', fr: 'init' },
        'sidebar.docs': { en: 'docs', fr: 'docs' },

        'page.gettingStarted.title': { en: 'Getting Started', fr: 'Prise en main' },
        'page.gettingStarted.intro': { en: '<strong>Promethee-Selenium</strong> is a robust, Page Object Model (POM) based library for automated UI testing using Selenium and Pytest. It is designed to streamline your end-to-end testing workflow by providing a structured architecture, ensuring your tests are maintainable, scalable, and easy to read.', fr: '<strong>Promethee-Selenium</strong> est une bibliothèque robuste basée sur le pattern, Page Object Model (POM) pour les tests UI automatisés avec Selenium, Pytest et Selenium-ui-test-tool. Elle simplifie les workflows E2E en fournissant une architecture structurée.' },
        'page.gettingStarted.featuresTitle': { en: 'Features', fr: 'Fonctionnalités' },
        'page.gettingStarted.features.li1': { en: 'Page Object Model (POM): Enforces a clean separation between page interactions (locators, actions) and test logic (assertions, workflows).', fr: 'Page Object Model (POM) : Imposer une séparation claire entre les interactions de page (locators, actions) et la logique des tests (assertions, workflows).' },
        'page.gettingStarted.features.li2': { en: 'Interactive CLI: A user-friendly command-line interface to guide you through project initialization and documentation.', fr: 'CLI interactive : Une interface en ligne de commande conviviale pour guider l\'initialisation du projet et la documentation.' },
        'page.gettingStarted.features.li3': { en: 'Scaffolding: Quickly generate a production-ready project structure with promethee-selenium init.', fr: 'Génération (Scaffolding) : Générez rapidement une structure de projet prête pour la production avec promethee-selenium init.' },
        'page.gettingStarted.features.li4': { en: 'Built-in Utilities: A rich set of helper functions for common Selenium actions (clicking, typing, waiting).', fr: 'Utilitaires intégrés : Un ensemble de fonctions d\'aide pour les actions Selenium courantes (clic, saisie, attentes).' },
        'page.gettingStarted.features.li5': { en: 'Environment Management: Native support for managing test environments and credentials securely.', fr: 'Gestion des environnements : Support natif pour gérer les environnements de test et les credentials en toute sécurité.' },
        'page.gettingStarted.features.li6': { en: 'Bilingual Support: The CLI and documentation are available in both English and French.', fr: 'Support bilingue : Le CLI et la documentation sont disponibles en anglais et en français.' },
        'page.gettingStarted.installationTitle': { en: 'Installation', fr: 'Installation' },
        'page.gettingStarted.installationText': { en: 'Install the package easily via pip:', fr: 'Installez le package facilement via pip :' },
        'page.gettingStarted.quickStartTitle': { en: 'Quick Start', fr: 'Démarrage rapide' },
        'page.gettingStarted.step1Title': { en: '1. Launch the CLI', fr: '1. Lancer le CLI' },
        'page.gettingStarted.step1Text': { en: 'After installation, run the following command to access the interactive menu:', fr: 'Après l\'installation, exécutez la commande suivante pour accéder au menu interactif :' },
        'page.gettingStarted.step1Note': { en: 'You will be prompted to select your language (English/French) and then choose an action.', fr: 'Vous serez invité à choisir votre langue (Anglais/Français) puis à sélectionner une action.' },
        'page.gettingStarted.step2Title': { en: '2. Initialize a Project', fr: '2. Initialiser un projet' },
        'page.gettingStarted.step2Text': { en: 'Select the Init option from the menu or run:', fr: 'Sélectionnez l\'option Init depuis le menu ou exécutez :' },
        'page.gettingStarted.step2Note': { en: 'This creates a standard directory layout:', fr: 'Ceci crée une structure de répertoires standard :' },
        'page.gettingStarted.structure.li1': { en: '<code>scenarios/</code>: For your Page Object classes.', fr: '<code>scenarios/</code> : Pour vos classes Page Object.' },
        'page.gettingStarted.structure.li2': { en: '<code>tests/</code>: For your Pytest test scripts.', fr: '<code>tests/</code> : Pour vos scripts de tests Pytest.' },
        'page.gettingStarted.structure.li3': { en: '<code>data/</code>: For configuration files and test data.', fr: '<code>data/</code> : Pour les fichiers de configuration et les données de test.' },
        'page.gettingStarted.structure.li4': { en: '<code>utils/</code>: For project-specific utilities.', fr: '<code>utils/</code> : Pour les utilitaires spécifiques au projet.' },
        'page.gettingStarted.structure.li5': { en: '<code>conftest.py</code>: Pytest configuration with pre-configured fixtures.', fr: '<code>conftest.py</code> : Configuration Pytest avec fixtures pré-configurées.' },
        'page.gettingStarted.step3Title': { en: '3. Run Your Tests', fr: '3. Exécuter vos tests' },
        'page.gettingStarted.step3Text': { en: 'Execute your tests using pytest:', fr: 'Exécutez vos tests avec pytest :' },
        'toc.onThisPage': { en: 'On this Page', fr: 'Sur cette page' },

        // Tutorial page
        'page.tutorial.title': { en: 'Tutorials', fr: 'Tutoriels' },
        'page.tutorial.intro': { en: 'Below are a set of video tutorials to help you get started with Promethee-Selenium.', fr: 'Voici une série de vidéos tutoriels pour vous aider à démarrer avec Promethee-Selenium.' },
        'page.tutorial.videosTitle': { en: 'Tutorial Videos', fr: 'Vidéos tutoriels' },
        // About page
        'page.about.title': { en: 'About', fr: 'A propos' },
        'page.about.history': { en: '<strong>History</strong>: Promethee-Selenium started as an internal testing library to standardize UI automation patterns and later evolved into an open-source project to share best practices.', fr: '<strong>Historique</strong> : Promethee-Selenium a commencé comme une bibliothèque de tests interne pour standardiser les patterns d\'automatisation UI et a évolué ensuite en un projet open-source pour partager les bonnes pratiques.' },
        'page.about.purpose': { en: '<strong>Purpose</strong>: Provide a structured, maintainable and extensible Page Object Model framework to simplify end-to-end testing with Selenium and Pytest.', fr: '<strong>Raison d\'être</strong> : Fournir un framework Page Object Model structuré, maintenable et extensible pour simplifier les tests end-to-end avec Selenium et Pytest.' },
        'page.about.author': { en: 'Author: <a href="https://www.linkedin.com/in/yann-dipita-dev/" target="_blank" rel="noopener noreferrer"><strong>Yann Dipita</strong></a> — Python Developer & QA Engineer', fr: 'Auteur : <a href="https://www.linkedin.com/in/yann-dipita-dev/" target="_blank" rel="noopener noreferrer"><strong>Yann Dipita</strong></a> — Développeur Python et ingénieur QA' },

        // Page Object Model
        'page.pom.title': { en: 'Page Object Model (POM)', fr: 'Modèle Page Object (POM)' },
        'page.pom.intro': { en: 'The Page Object Model is a design pattern that creates an object repository for storing all web elements.', fr: 'Le Modèle Page Object est un patron de conception qui crée un répertoire d\'objets pour stocker tous les éléments web.' },
        'page.pom.concept': { en: 'The Concept', fr: 'Le Concept' },
        'page.pom.implementation': { en: 'Implementation', fr: 'Implémentation' },
        'page.pom.conceptText': { en: 'For each UI page of an application, a corresponding page class is created. This page class is responsible for finding the WebElements of that page and executing operations on them.', fr: 'Pour chaque page UI d\'une application, une classe de page correspondante est créée. Cette classe est responsable de trouver les WebElements et d\'exécuter les opérations.' },
        'page.pom.implementationText': { en: 'To implement your own page object, inherit from our Base class available in Promethee.', fr: 'Pour implémenter votre propre page object, héritez de la classe Base fournie par Promethee.' },
        'page.pom.benefits.li1': { en: 'Maintainability: Update the locator in the page class instead of replacing it in every test.', fr: 'Maintenabilité : Mettez à jour le locator dans la classe de page au lieu de modifier chaque test.' },
        'page.pom.benefits.li2': { en: 'Reusability: Write the code once to get the element or perform an action, and use it across multiple scripts.', fr: 'Réutilisabilité : Écrivez le code une fois et réutilisez-le dans plusieurs scripts.' },
        'page.pom.benefits.li3': { en: 'Readability: Test scripts read more like actual user scenarios.', fr: 'Lisibilité : Les scripts de test se lisent comme de vrais scénarios utilisateurs.' },
        'page.pom.example': { en: 'Example', fr: 'Exemple' },
        'page.pom.benefits': { en: 'Benefits', fr: 'Avantages' },

        // Scaffolding
        'page.scaffolding.title': { en: 'Scaffolding', fr: 'Génération' },
        'page.scaffolding.init': { en: 'The Init Command', fr: 'La commande Init' },
        'page.scaffolding.structure': { en: 'Standard Structure', fr: 'Structure standard' },
        'page.scaffolding.breakdown': { en: 'Directory Breakdown', fr: 'Détail des dossiers' }
        ,
        'page.scaffolding.intro': { en: 'Promethee-Selenium comes with powerful scaffolding capabilities, enabling you to bootstrap a complete automation project structure with a single CLI command.', fr: 'Promethee-Selenium propose de puissantes capacités de génération pour créer rapidement une structure de projet d\'automatisation via une seule commande CLI.' },
        'page.scaffolding.initText': { en: 'To initialize a new project, navigate to your desired directory and run:', fr: 'Pour initialiser un nouveau projet, placez-vous dans le répertoire souhaité puis exécutez :' },
        'page.scaffolding.structureText': { en: 'The CLI populates your directory with best-practices architecture tailored for Selenium and Pytest:', fr: 'Le CLI génère une structure conforme aux bonnes pratiques, adaptée à Selenium et Pytest :' },
        // Environment
        'page.environment.title': { en: 'Environment Mgmt', fr: 'Gestion des environnements' },
        'page.environment.intro': { en: 'Handle multile stages of delivery effortlessly. The Environment Management features let you run the same test suite cleanly against Local, Dev, Staging, and Production layers.', fr: 'Gérez facilement plusieurs environnements. Les fonctionnalités de gestion d\'environnements permettent d\'exécuter la même suite de tests contre Local, Dev, Staging et Production.' },
        // Bilingual support
        'page.bilingual.title': { en: 'Bilingual Support', fr: 'Support bilingue' },
        'page.bilingual.intro': { en: 'Promethee-Selenium breaks down language barriers. Enjoy complete framework interactions, documentation, and error handling natively in both English and French.', fr: 'Promethee-Selenium abolit les barrières linguistiques. Profitez d\'interactions complètes du framework, documentation et gestion d\'erreurs en natif en anglais et en français.' }
        ,
        // Built-in utilities
        'page.utils.title': { en: 'Built-in Utilities', fr: 'Utilitaires intégrés' },
        'page.utils.intro': { en: 'Speed up your development cycle with a curated set of robust utilities included in the Base class.', fr: 'Accélérez votre cycle de développement avec un ensemble d\'utilitaires robustes inclus dans la classe Base.' },
        'page.utils.coreMethods': { en: 'Core Methods', fr: 'Méthodes principales' },
        'page.utils.coreMethods.text': { en: 'Here are some of the most frequently used functions provided natively:', fr: 'Voici quelques-unes des fonctions les plus utilisées fournies nativement :' },
        'page.utils.clicking': { en: 'Clicking Elements', fr: 'Cliquer sur des éléments' },
        'page.utils.clicking.text': { en: 'Waits for an element to be clickable before performing the action:', fr: 'Attend qu\'un élément soit cliquable avant d\'exécuter l\'action :' },
        'page.utils.typing': { en: 'Typing Text', fr: 'Saisie de texte' },
        'page.utils.typing.text': { en: 'Clears the field and enters text after ensuring the input element is ready:', fr: 'Efface le champ et saisit le texte après vérification que l élément est prêt :' },
        'page.utils.assertions': { en: 'Assertions & Verification', fr: 'Assertions & Vérification' },
        'page.utils.assertions.text': { en: 'Quick checks to synchronize automation flows securely:', fr: 'Vérifications rapides pour synchroniser les flux d\'automatisation en toute sécurité :' },
        'page.utils.waits': { en: 'Advanced Waiting', fr: 'Attentes avancées' },
        'page.utils.waits.text': { en: "Selenium can be flaky; Promethee's utilities wrap standard WebDriverWaits efficiently to prevent stale elements and synchronization bugs.", fr: "Selenium peut être instable ; les utilitaires Promethee encapsulent WebDriverWait pour éviter les éléments obsolètes et les problèmes de synchronisation." },

        // CLI Commands
        'page.cliCommands.title': { en: 'CLI Commands', fr: 'Commandes CLI' },
        'page.cliCommands.intro': { en: 'Promethee-Selenium provides a powerful command-line interface to streamline your automation workflow. This guide covers all available commands and their usage.', fr: 'Promethee-Selenium fournit une interface en ligne de commande puissante pour optimiser votre flux de travail d\'automatisation. Ce guide couvre toutes les commandes disponibles et leur utilisation.' },
        'page.cliCommands.initTitle': { en: 'The init Command', fr: 'La commande init' },
        'page.cliCommands.initDesc': { en: 'The <code>promethee-selenium init</code> command scaffolds a complete, production-ready project structure with best-practice architecture. This is the fastest way to get started with Promethee-Selenium.', fr: 'La commande <code>promethee-selenium init</code> génère une structure de projet complète et prête pour la production avec une architecture conforme aux bonnes pratiques. C est le moyen le plus rapide de démarrer avec Promethee-Selenium.' },
        'page.cliCommands.initUsage': { en: 'Usage', fr: 'Utilisation' },
        'page.cliCommands.initUsageText': { en: 'Run the following command in your desired project directory:', fr: 'Exécutez la commande suivante dans le répertoire du projet souhaité :' },
        'page.cliCommands.initOptions': { en: 'Options', fr: 'Options' },
        'page.cliCommands.initExample': { en: 'Example', fr: 'Exemple' },
        'page.cliCommands.initOutput': { en: 'Generated Structure', fr: 'Structure générée' },
        'page.cliCommands.initOutputText': { en: 'After running <code>init</code>, your directory will contain:', fr: 'Après avoir exécuté <code>init</code>, votre répertoire contiendra :' },
        'page.cliCommands.docsTitle': { en: 'The docs Command', fr: 'La commande docs' },
        'page.cliCommands.docsDesc': { en: 'The <code>promethee-selenium docs</code> command opens the interactive documentation and quick-reference guide in your default browser.', fr: 'La commande <code>promethee-selenium docs</code> ouvre la documentation interactive et le guide de référence rapide dans votre navigateur par défaut.' },
        'page.cliCommands.docsUsage': { en: 'Usage', fr: 'Utilisation' },
        'page.cliCommands.docsUsageText': { en: 'Simply run:', fr: 'Exécutez simplement :' },
        'page.cliCommands.docsFeatures': { en: 'Features', fr: 'Fonctionnalités' },
        'page.cliCommands.docsFeature1': { en: 'Full HTML documentation with code examples and best practices', fr: 'Documentation HTML complète avec exemples de code et bonnes pratiques' },
        'page.cliCommands.docsFeature2': { en: 'Interactive Code Object Model (POM) guide', fr: 'Guide interactif du modèle Page Object (POM)' },
        'page.cliCommands.docsFeature3': { en: 'Built-in utilities reference', fr: 'Référence des utilitaires intégrés' },
        'page.cliCommands.docsFeature4': { en: 'Environment management guide', fr: 'Guide de gestion des environnements' },
        'page.cliCommands.docsFeature5': { en: 'Bilingual support (English and French)', fr: 'Support bilingue (anglais et français)' },
        'page.cliCommands.docsExample': { en: 'Example', fr: 'Exemple' },
        'page.cliCommands.docsExampleText': { en: 'This will automatically open <code>http://localhost:8000</code> in your default browser, displaying the full documentation site you are currently viewing.', fr: 'Cela ouvrira automatiquement <code>http://localhost:8000</code> dans votre navigateur par défaut, affichant le site de documentation complet que vous consultez actuellement.' },
        'page.cliCommands.docsOptions': { en: 'Tips', fr: 'Conseils' },
        'page.cliCommands.docsTip1': { en: 'Use the language toggle to switch between English and French', fr: 'Utilisez le bouton de langue pour basculer entre l\'anglais et le français' },
        'page.cliCommands.docsTip2': { en: 'Use the theme toggle to switch between light and dark modes', fr: 'Utilisez le bouton de thème pour basculer entre les modes clair et sombre' },
        'page.cliCommands.docsTip3': { en: 'Bookmark this page for quick reference during development', fr: 'Mettez cette page en signet pour une référence rapide pendant le développement' },
        'breadcrumb.home': { en: 'Home', fr: 'Accueil' }
        ,
        // Footer
        'footer.author': { en: 'Author: <a href="https://www.linkedin.com/in/yann-dipita-dev/" target="_blank" rel="noopener noreferrer"><strong>Yann Dipita</strong></a>', fr: 'Auteur : <a href="https://www.linkedin.com/in/yann-dipita-dev/" target="_blank" rel="noopener noreferrer"><strong>Yann Dipita</strong></a>' },
        'footer.libraries': { en: 'Libraries: <strong>pytest</strong>, <strong>selenium-ui-test-tool</strong>', fr: 'Bibliothèques : <strong>pytest</strong>, <strong>selenium-ui-test-tool</strong>' },

        // Landing Page
        'landing.hero.title': {
            en: '<span class="highlight">Promethee-Selenium</span> enables reliable web automation for testing, scripting, and AI agents.',
            fr: '<span class="highlight">Promethee-Selenium</span> permet une automatisation web fiable pour les tests, les scripts et les agents IA.'
        },
        'landing.hero.subtitle': {
            en: 'A robust, POM-based library designed to drive Chromium, Firefox, and WebKit — in your tests, your scripts, and your agent workflows.',
            fr: 'Une bibliothèque robuste basée sur POM conçue pour piloter Chromium, Firefox et Webkit — dans vos tests, vos scripts et vos workflows d\'agents.'
        },
        'landing.hero.getStarted': { en: 'Get started', fr: 'Commencer' },
        'landing.hero.star': { en: 'Star', fr: 'Star' },
        'landing.hero.github': { en: 'GitHub', fr: 'GitHub' },
        'landing.features.test.title': { en: 'Promethee Test', fr: 'Promethee Test' },
        'landing.features.test.desc': {
            en: 'Professional-grade automation library designed to eliminate Selenium flakiness while bringing a structured, industrial approach to UI testing.',
            fr: 'Bibliothèque d\'automatisation professionnelle conçue pour éradiquer l\'instabilité de Selenium tout en apportant une structure industrielle.'
        },
        'landing.features.test.docLink': { en: 'Testing documentation', fr: 'Documentation des tests' },
        'landing.features.cli.title': { en: 'Rapid Automation CLI', fr: 'CLI d\'automatisation rapide' },
        'landing.features.cli.desc': {
            en: 'Don\'t waste time with boilerplate. Bootstrap a complete, production-ready POM architecture in seconds using our interactive CLI.',
            fr: 'Ne perdez plus de temps sur la configuration. Générez une architecture POM complète et prête pour la production en quelques secondes.'
        },
        'landing.features.cli.docLink': { en: 'CLI documentation', fr: 'Documentation CLI' },
        'landing.features.ai.title': { en: 'Built for AI agents', fr: 'Conçu pour les agents IA' },
        'landing.features.ai.desc': {
            en: 'Framework-agnostic design providing structured accessibility context to AI agents for deterministic and robust web interactions.',
            fr: 'Conception agnostique au framework fournissant un contexte d\'accessibilité structuré aux agents IA pour des interactions déterministes.'
        },
        'landing.features.ai.docLink': { en: 'AI documentation', fr: 'Documentation IA' },

        // Detailed Sections
        'landing.testing.title': { en: 'Zero-Flakiness approach', fr: 'Approche Zéro-Instabilité' },
        'landing.testing.autowait.title': { en: 'Smart waiting mechanisms', fr: 'Mécanismes d\'attente intelligents' },
        'landing.testing.autowait.desc': {
            en: 'Promethee-Selenium implements smart waiting and robust interactions using the selenium-ui-test-tool. Your tests only fail when they should.',
            fr: 'Promethee-Selenium implémente des attentes intelligentes et des interactions robustes. Vos tests n\'échouent que lorsqu\'ils le doivent.'
        },
        'landing.testing.isolation.title': { en: 'Professional POM Structure', fr: 'Structure POM Professionnelle' },
        'landing.testing.isolation.desc': {
            en: 'Enforced clean separation of concerns. Page locators and actions are decoupled from test logic, making maintenance effortless and scalable.',
            fr: 'Séparation claire des responsabilités. Les sélecteurs et actions sont découplés de la logique de test, simplifiant la maintenance.'
        },
        'landing.testing.locators.title': { en: 'Rapid Scaffolding', fr: 'Scaffolding Rapide' },
        'landing.testing.locators.desc': {
            en: 'Run promethee-selenium init to generate a best-practice project structure instantly. From conftest.py to page objects, it\'s all there.',
            fr: 'Lancez promethee-selenium init pour créer instantanément une structure de projet respectant les meilleures pratiques.'
        },
        'landing.testing.parallel.title': { en: 'Bilingual by Design', fr: 'Bilingue par Conception' },
        'landing.testing.parallel.desc': {
            en: 'Both the CLI and the documentation are available natively in English and French, supporting global and local teams.',
            fr: 'Le CLI et la documentation sont disponibles nativement en anglais et en français, pour toutes les équipes.'
        },

        'landing.ai.title': { en: 'Built for AI agents', fr: 'Conçu pour les agents IA' },
        'landing.ai.accessibility.title': { en: 'Accessibility snapshots, not screenshots', fr: 'Snapshots d\'accessibilité, pas de captures d\'écran' },
        'landing.ai.accessibility.desc': {
            en: 'Agents interact with pages through structured accessibility trees — element roles, names, and refs. Deterministic and unambiguous, no vision models required.',
            fr: 'Les agents interagissent via des arbres d\'accessibilité structurés : rôles, noms et références d\'éléments. Déterministe et sans ambiguïté, aucun modèle de vision requis.'
        },
        'landing.ai.mcp.title': { en: 'MCP server', fr: 'Serveur MCP' },
        'landing.ai.mcp.desc': {
            en: 'Drop-in Model Context Protocol server for VS Code, Cursor, Claude Desktop, Windsurf, and any MCP client. Full browser control through standard tool calls.',
            fr: 'Serveur Model Context Protocol prêt à l\'emploi pour VS Code, Cursor, Claude Desktop, Windsurf et tout client MCP. Contrôle total du navigateur via appels d\'outils standard.'
        },
        'landing.ai.cli.title': { en: 'CLI for coding agents', fr: 'CLI pour les agents de codage' },
        'landing.ai.cli.desc': {
            en: 'Token-efficient command-line interface with installable skills. Purpose-built for Claude Code, GitHub Copilot, and similar coding agents that need to balance browser automation with large codebases.',
            fr: 'Interface CLI optimisée en tokens avec compétences installables. Dédié à Claude Code, GitHub Copilot et agents similaires gérant automatisation et larges codebases.'
        },
        'landing.ai.monitoring.title': { en: 'Session monitoring', fr: 'Monitoring de session' },
        'landing.ai.monitoring.desc': {
            en: 'Visual dashboard with live screencast previews of all running browser sessions. Click any session to zoom in and take control.',
            fr: 'Tableau de bord visuel avec aperçus live de toutes les sessions de navigation en cours. Cliquez sur une session pour zoomer et prendre le contrôle.'
        },

        'landing.tooling.title': { en: 'Powerful tooling', fr: 'Outils puissants' },
        'landing.tooling.generator.title': { en: 'Test generator', fr: 'Générateur de tests' },
        'landing.tooling.generator.desc': {
            en: 'Record your actions in the browser and Promethee writes the test code. Generate assertions from the recording toolbar. Pick locators by clicking on elements.',
            fr: 'Enregistrez vos actions et Promethee génère le code du test. Créez des assertions depuis la barre d\'outils. Choisissez vos locators en cliquant sur les éléments.'
        },
        'landing.tooling.trace.title': { en: 'Trace Viewer', fr: 'Trace Viewer' },
        'landing.tooling.trace.desc': {
            en: 'Full timeline of test execution with DOM snapshots, network requests, console logs, and screenshots at every step. Investigate failures without re-running.',
            fr: 'Chronologie complète de l\'exécution : snapshots DOM, requêtes réseau, logs console et captures à chaque étape. Enquêtez sans relancer les tests.'
        },
        'landing.tooling.vscode.title': { en: 'VS Code extension', fr: 'Extension VS Code' },
        'landing.tooling.vscode.desc': {
            en: 'Run, debug, and generate tests directly in the editor. Set breakpoints, live-inspect locators in the browser, and view full execution traces in the sidebar.',
            fr: 'Lancez, débuggez et générez vos tests directement dans l\'éditeur. Définissez des points d\'arrêt et inspectez les locators en direct dans la barre latérale.'
        },

        'landing.browsers.title': { en: 'Any browser. Any platform.', fr: 'Tout navigateur. Toute plateforme.' },
        'landing.browsers.desc': {
            en: 'Chromium, Firefox, and WebKit on Linux, macOS, and Windows. Headless and headed. Also available for Python, .NET, and Java.',
            fr: 'Chromium, Firefox et WebKit sur Linux, macOS et Windows. Headless ou avec interface. Disponible également pour Python, .NET et Java.'
        },

        'landing.companies.title': { en: 'Chosen by companies and open source projects', fr: 'Choisi par des entreprises et projets open source' },

        'landing.footer.learn': { en: 'Learn', fr: 'Apprendre' },
        'landing.footer.community': { en: 'Community', fr: 'Communauté' },
        'landing.footer.more': { en: 'More', fr: 'Plus' },
        'landing.footer.training': { en: 'Promethee Training', fr: 'Formation Promethee' },
        'landing.footer.videos': { en: 'Feature Videos', fr: 'Vidéos de fonctionnalités' },
        'landing.footer.blog': { en: 'Blog', fr: 'Blog' },
        'landing.footer.ambassadors': { en: 'Ambassadors', fr: 'Ambassadeurs' },
        'landing.footer.privacy': { en: 'Privacy Statement', fr: 'Déclaration de confidentialité' },
        'landing.footer.copyright': { en: 'Copyright © 2026 Marne Tech', fr: 'Copyright © 2026 Marne Tech' },
        'landing.contributors.title': { en: 'Contributors', fr: 'Contributeurs' },

        // Animation Showcase
        'animations.showcase.selenium.title': { en: 'Power of Selenium', fr: 'Puissance de Selenium' },
        'animations.showcase.selenium.desc': {
            en: 'Leverage the industry-standard Selenium engine with enhanced stability and modern APIs.',
            fr: 'Exploitez le moteur Selenium, standard de l\'industrie, avec une stabilité accrue et des APIs modernes.'
        },
        'animations.showcase.pom.title': { en: 'A POM Approach', fr: 'Une approche POM' },
        'animations.showcase.pom.desc': {
            en: 'Designed from the ground up for the Page Object Model pattern to ensure reusable and maintainable tests.',
            fr: 'Conçu dès le départ pour le pattern Page Object Model afin de garantir des tests réutilisables et maintenables.'
        },
        'animations.showcase.cli.title': { en: 'CLI Scaffolding', fr: 'Génération via CLI' },
        'animations.showcase.cli.desc': {
            en: 'Automated structure generation to bootstrap professional testing projects in seconds.',
            fr: 'Génération automatique de la structure pour initialiser des projets de test professionnels en quelques secondes.'
        }
    };

    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (themeToggle) themeToggle.textContent = '☀';
        } else {
            document.documentElement.classList.remove('light-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
        localStorage.setItem('promethee-theme', theme);
    }
    function applyLanguage(lang) {
        const els = document.querySelectorAll('[data-i18n]');
        els.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const entry = translations[key];
            if (entry && entry[lang]) {
                el.innerHTML = entry[lang];
            }
        });
        document.documentElement.lang = (lang === 'fr') ? 'fr' : 'en';
        if (langToggle) langToggle.textContent = (lang === 'fr') ? 'FR' : 'EN';
        localStorage.setItem('promethee-lang', lang);
    }

    // init language from localStorage or browser setting
    const saved = localStorage.getItem('promethee-lang') || (navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en');
    applyLanguage(saved);

    // Init theme from localStorage or prefers-color-scheme
    const savedTheme = localStorage.getItem('promethee-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const current = localStorage.getItem('promethee-lang') || 'en';
            const next = current === 'en' ? 'fr' : 'en';
            applyLanguage(next);
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = localStorage.getItem('promethee-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // Mobile menu toggle: create a hamburger button if not present
    (function () {
        console.log('🍔 Mobile menu IIFE starting...');

        const header = document.querySelector('.top-header');
        if (!header) {
            console.error('❌ Header not found');
            return;
        }
        console.log('✅ Header found:', header);

        let menuToggle = document.getElementById('menu-toggle');
        if (!menuToggle) {
            console.log('📝 Creating menu toggle button...');
            menuToggle = document.createElement('button');
            menuToggle.id = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle navigation');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            console.log('✅ Menu toggle button created');
        }

        const headerRight = header.querySelector('.header-right');

        console.log('headerRight:', headerRight ? '✅ found' : '❌ not found');

        // Insert toggle into header-right (at the beginning, before other buttons)
        if (headerRight && !headerRight.contains(menuToggle)) {
            headerRight.insertAdjacentElement('afterbegin', menuToggle);
            console.log('✅ Menu toggle inserted into header-right');
        } else {
            console.log('⚠️ MenuToggle already in DOM or no header-right found');
        }

        menuToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('mobile-nav-open');
            console.log('🔄 Toggle clicked, mobile-nav-open:', document.documentElement.classList.contains('mobile-nav-open'));
        });

        // Close mobile nav when clicking a nav link
        document.querySelectorAll('.header-middle a').forEach(a => {
            a.addEventListener('click', () => {
                // Small delay to allow navigation to start before closing
                setTimeout(() => {
                    document.documentElement.classList.remove('mobile-nav-open');
                }, 100);
            });
        });

        // Get header-middle
        const headerMiddle = document.querySelector('.header-middle');
        if (!headerMiddle) {
            console.error('❌ header-middle not found');
            return;
        }

        // Add nav-links section (if not already present)
        if (!headerMiddle.querySelector('.mobile-nav-links')) {
            console.log('📝 Adding navigation links section...');
            const navLinksSection = document.createElement('div');
            navLinksSection.className = 'mobile-nav-links';

            // Clone the nav links from header-middle that are already there
            // They should already be visible, so we don't need to re-add them
            console.log('✅ Navigation links already in header-middle');
        }

        // Clone sidebar sections into the mobile menu
        const leftSidebar = document.querySelector('.left-sidebar');
        if (leftSidebar) {
            console.log('📝 Cloning sidebar sections into mobile menu...');

            const sidebarSections = leftSidebar.querySelectorAll('.sidebar-section');
            sidebarSections.forEach(section => {
                const clonedSection = section.cloneNode(true);
                clonedSection.classList.add('mobile-sidebar-section');

                // Expand all sections on mobile (remove display: none from nav-list)
                const navLists = clonedSection.querySelectorAll('.nav-list');
                navLists.forEach(list => {
                    list.style.display = 'block';
                });

                // Add some spacing between sections
                clonedSection.style.marginTop = '1rem';
                clonedSection.style.paddingTop = '1rem';
                clonedSection.style.borderTop = '1px solid var(--border-color)';

                headerMiddle.appendChild(clonedSection);
            });
            console.log('✅ Sidebar sections cloned');
        }

        // Create mobile menu controls container (lang, theme toggles + download link)
        let mobileControls = document.querySelector('.mobile-menu-controls');
        if (!mobileControls) {
            console.log('📝 Creating mobile-menu-controls container...');
            mobileControls = document.createElement('div');
            mobileControls.className = 'mobile-menu-controls';
            mobileControls.style.marginTop = '1rem';
            mobileControls.style.paddingTop = '1rem';
            mobileControls.style.borderTop = '1px solid var(--border-color)';

            if (headerMiddle) {
                headerMiddle.appendChild(mobileControls);
                console.log('✅ mobile-menu-controls created');
            }
        }

        // Clone Discord social link to mobile menu
        const discordLink = document.querySelector('.social-link');
        if (discordLink && !mobileControls.querySelector('.mobile-social-link')) {
            const mobileDiscordLink = discordLink.cloneNode(true);
            mobileDiscordLink.classList.add('mobile-social-link');
            mobileDiscordLink.style.display = 'inline-flex';
            mobileDiscordLink.style.justifyContent = 'center';
            mobileDiscordLink.style.marginBottom = '0.5rem';
            mobileControls.appendChild(mobileDiscordLink);
            console.log('✅ Discord link cloned');
        }

        // Clone lang toggle to mobile menu (prevent duplicates)
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle && !mobileControls.querySelector('#mobile-lang-toggle')) {
            const mobileLangToggle = langToggle.cloneNode(true);
            mobileLangToggle.id = 'mobile-lang-toggle';
            mobileLangToggle.addEventListener('click', () => {
                langToggle.click();
            });
            mobileControls.appendChild(mobileLangToggle);
            console.log('✅ Lang toggle cloned');
        }

        // Clone theme toggle to mobile menu (prevent duplicates)
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle && !mobileControls.querySelector('#mobile-theme-toggle')) {
            const mobileThemeToggle = themeToggle.cloneNode(true);
            mobileThemeToggle.id = 'mobile-theme-toggle';
            mobileThemeToggle.addEventListener('click', () => {
                themeToggle.click();
            });
            mobileControls.appendChild(mobileThemeToggle);
            console.log('✅ Theme toggle cloned');
        }

        // Clone download button to mobile menu (prevent duplicates)
        const downloadBtn = document.querySelector('.btn-download');
        if (downloadBtn && !mobileControls.querySelector('.mobile-download-btn')) {
            const mobileDownloadBtn = downloadBtn.cloneNode(true);
            mobileDownloadBtn.className = 'mobile-download-btn btn-download';
            // Remove aria labels to avoid conflicts
            mobileDownloadBtn.removeAttribute('id');
            mobileControls.appendChild(mobileDownloadBtn);
            console.log('✅ Download button cloned');
        }

        console.log('🍔 Mobile menu IIFE complete!');
    })();

    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling;

            if (codeBlock) {
                const textToCopy = codeBlock.textContent;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-copy', 'fa-regular');
                        icon.classList.add('fa-check', 'fa-solid');

                        setTimeout(() => {
                            icon.classList.remove('fa-check', 'fa-solid');
                            icon.classList.add('fa-copy', 'fa-regular');
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    });

    // Feature Showcase Animation Logic
    (function () {
        const showcaseItems = document.querySelectorAll('.showcase-item');
        const visualContents = document.querySelectorAll('.visual-content');
        const controlDots = document.querySelectorAll('.control-dot');
        let currentShowcaseIndex = 0;
        let showcaseInterval;

        if (showcaseItems.length === 0) return;

        function updateShowcase(index) {
            showcaseItems.forEach(item => item.classList.remove('active'));
            visualContents.forEach(content => content.classList.remove('active'));
            controlDots.forEach(dot => dot.classList.remove('active'));

            showcaseItems[index].classList.add('active');
            visualContents[index].classList.add('active');
            controlDots[index].classList.add('active');
            currentShowcaseIndex = index;
        }

        function startShowcaseTimer() {
            stopShowcaseTimer();
            showcaseInterval = setInterval(() => {
                let nextIndex = (currentShowcaseIndex + 1) % showcaseItems.length;
                updateShowcase(nextIndex);
            }, 5000);
        }

        function stopShowcaseTimer() {
            if (showcaseInterval) clearInterval(showcaseInterval);
        }

        controlDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateShowcase(index);
                startShowcaseTimer(); // Reset timer on click
            });
        });

        startShowcaseTimer();

        // Pause on hover
        const container = document.querySelector('.showcase-container');
        if (container) {
            container.addEventListener('mouseenter', stopShowcaseTimer);
            container.addEventListener('mouseleave', startShowcaseTimer);
        }
    })();
});

// Safe Service Worker registration: only attempt in secure/local contexts
// Prevents errors when the site is opened inside VS Code webviews or file:// URLs
(function () {
    try {
        if (!('serviceWorker' in navigator)) return;

        const isSecureContext = window.isSecureContext || location.protocol === 'https:';
        const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        const isVSCodeWebview = (location.protocol && location.protocol.startsWith('vscode')) || (navigator.userAgent && navigator.userAgent.includes('vscode-webview'));

        if ((isSecureContext || isLocalhost) && !isVSCodeWebview) {
            navigator.serviceWorker.register('/service-worker.js').catch(err => {
                console.warn('Service worker registration failed (benign):', err);
            });
        } else {
            // Skip registration in insecure contexts (file://, VS Code webview, etc.)
            console.info('Service worker registration skipped: insecure or embedded context.');
        }
    } catch (e) {
        console.warn('Service worker guard threw an error:', e);
    }
})();
