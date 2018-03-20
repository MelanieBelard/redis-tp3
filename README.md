# TP 3 - Redis

TP réalisé par Mélanie BÉLARD et Marius LEMONNIER. (I4 2017-2018)

## Faire fonctionner le projet

Ce projet tourne sous NodeJS. Il sera donc nécessaire d'avoir NodeJS installé sur votre machine pour pouvoir le faire tourner. De plus, l'application écoute sur le port 12345.

### Téléchargement

Vous pouvez cloner le projet depuis GitHub ou bien dézipper le dossier .zip que je vous ai envoyé par mail.

### Architecture de l'application

Au dossier source : index.js (programme principal) et le dossier node_modules qui contient plusieurs modules nous permettant de faire fonctionner l'application comme [NodeRedis](http://redis.js.org/#redis-commands) qui nous a permis de développer les requêtes vers Redis.

### Lancer l'application

Localisez-vous dans le dossier source de l'application et lancez la commande :

```
node index.js
```

Ceci étant fait, vous pouvez exécuter vos requêtes curl depuis un autre terminal.

### GET

Les méthodes get fonctionnent sur la page d'accueil (localhost:12345) et sur l'URI /notes (localhost:12345/notes). De plus, il est possible d'obtenir un note grâce à son ID (un nombre).
Cependant, sur l'URI /notes, l'application ne retourne rien suite à la requête. Par contre, il est possible de voir les résultats dans la console de l'application. Si vous exécutez :

```
curl localhost:12345/notes
```

Vous obtiendez un résultat du style :

```
    note2: coucou
    note3: ça va ?
    note1: blabla
```

Nous ne sommes pas parvenus à retourner cet ensemble de résultats. Nous avons mis un commentaire dans le code pour expliquer notre problème (ligne 28 et 29 de index.js).

Par contre, si vous avez au préalable ajoutez des valeurs sur Redis ayant pour key "note" suivi d'un nombre, un get sur une URI du style localhost:12345/notes/1 fonctionnera. Comme par exemple :

```
melanie@Tonton-Vladimir:~/Documents/EPSI/NoSQL/redis-tp3$ curl localhost:12345/notes/1
> blabla
```

De plus, si vous faites un get sur une URI inconnu, un message vous sera retourné.

### POST

Notre application reconnaît une méthode POST car elle retourne la phrase suivante lorsqu'elle détecte une POST sur l'URI /notes :

```
melanie@Tonton-Vladimir:~/Documents/EPSI/NoSQL/redis-tp3$ curl -H "Content-Type:text/plain" --data 'Penser au pain' http://localhost:12345/notes
> Vous nous envoyez une note
```

Cependant, l'application n'arrive pas à récupérer les données du POST et indique en console un objet vide :

```
melanie@Tonton-Vladimir:~/Documents/EPSI/NoSQL/redis-tp3$ node index.js 
{}
```

Par contre, si l'on fait une requête de la forme :

```
curl -d "Penser au pain" -X POST http://localhost:12345/notes
```

La console nous affichera le POST envoyé : 

```
melanie@Tonton-Vladimir:~/Documents/EPSI/NoSQL/redis-tp3$ node index.js 
{ 'Penser au pain': '' }
```

Malheureusement, nous n'avons pas réussi à incrémenter les identifiants des notes pour créer les clés note1, note2, note3, etc... Donc notre application n'enregistre pas de nouvelle note.