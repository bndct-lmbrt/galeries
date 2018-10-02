# Olifish-tofs

## Dimensions des photos
- thumb 300*200
- img 1200*800

## Pour le menu sur la page d'accueil
- Pour retrouver les galeries, il faut que les photos soient identifiés avec une meta-data re-formatée. Il existe un champ dédié : 'Caption-Abstract' (location) pour stocker le titre de la galerie.

- Pour formater une nom il faut convertir :

1- les majuscules en minuscules
2- les lettre accentuées en lettres sans accent
3- les espaces en tirets

Ex.  
Puerto del Carmen => puerto-del-carmen  
Cerbère => cerbere

- mot cle avec "Lat: " ,"Fr: ","Juv: ","Net: "

http://photoswipe.com

# Organisation des données

# Organisation du dépôt

# Travis

Un *push* sur *master* déclenche le script *push-data.sh*

Le script va effectuer deux actions :

## Générer un Json avec les métas des photos

Le script va générer un fichier : *data.json*

Ce fichier représente l'ensemble des photos sour le format suivant :

```json
{
  "keywords":["Lieux"],
  "Fr":"sole ROMBOU",
  "Lat":"Bothus podas",
  "Loc":"Lanzarote",
  "fileName":{
    "thumbnail":"./img/thumbs/thumb-592.jpg",
    "img":"./img/img-592.jpg"
  },
  "dateCreated":"2010-01-01T00:00:00.000Z",
  "location":"egypte-coraya-baie-mai-2017",
  "model":"Canon EOS 6D"}
```

## Optimiser les images


## Génération de la home

Le script *cli/createHome.js* prends en charge la composition de la home page.

Le bloc des galleries est composé à partir du fichier *config.json*.

Exemple de contenu du fichier *config.json*
```bash
[
  {
    "title": "Coraya baie mai 2017",
    "description": "Égypte",
    "img": "57.jpg"
  },
  {
    "title": "Lanzarote",
    "description": "Les îles Canaries",
    "img": "24.jpg"
  }
]
```

À partir de ces données le script compose le html :

```html
<figure class=img>
    <a href=# class=gallery>
        <img src=./light-thumbs/thumb-24.jpg alt=Lanzarote>
    </a>
    <figcaption itemprop="caption description">Les îles Canaries</figcaption>
    <h3>Lanzarote</h3>
</figure>
<figure class=img>
    <a href=# class=gallery>
        <img src=./light-thumbs/thumb-57.jpg alt="Coraya baie mai 2017">
    </a>
    <figcaption itemprop="caption description">Égypte</figcaption>
    <h3>Coraya baie mai 2017</h3>
</figure>
```

## Génération des pages galeries

Elles sont générées par deux scripts qui fabriquent des pages html pour chaque gallerie présentent dans le fichier config.json.

## Todo

- Réduire et fixer la bio
- remplacer div par main
- fr + latin dans photoswipe