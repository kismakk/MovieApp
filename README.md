# Elokuvasivusto web-projekti

#### Avainsanat: Web-ohjelmointi, fullstack, frontend, backend, database, API, UI/UX wireframe, Node.js, React, JavaScript, PostgreSQL, Render, VS Code, Postman

Tervetuloa tutustumaan elokuvasivustoon, jonka ovat tehneet toisen vuoden tieto- ja viestintätekniikan ohjelmistokehityspuolen opiskelijat Oulun ammattikorkeakoulusta. Projektin tarkoitus on oppia fullstack-ohjelmointia, tekemällä Web-ohjelmoinnin sovellusprojekti (15 op), jonka lopputulos on elokuvasivusto.

Projektia ovat tehneet Lara Laamanen, Jaakko Kauppila, Paula Ervasti, Teemu Yritys ja Sami Köngäs. Ryhmässä jokainen on tehnyt fullstack-ohjelmointia, mutta jokaiselle jaettiin erilliset vastuualueet, jotka vastaavat osioiden etenemisestä. Köngäs on vastannut backendista, Kauppila sekä Yritys databasesta, Laamanen viestinnästä ja Ervasti frontendistä sekä wireframesta.

## Projektin kuvaus

Elokuvasivusto on fullstack web-sovellus, joka antaa käyttäjälle mahdollisuuden tutustua elokuvamaailmaan. Se yhdistää saumattomasti React-frontendin ja Node.js-backendin. Sivusto tarjoaa laajan valikoiman elokuvia sekä sarjoja, käyttäjäystävällisen käyttöliittymän sekä tehokkaan hakutoiminnon. Sivuston perusideana käyttäjä voi jättää erilaisia arvosteluja elokuvien ja sarjojen alle, keskustella niistä omissa ryhmissä ja tutkia tarjontaa niin uutisten kuin toisten jättämien arvostelujen muodossa. Käyttäjälle sovellus tarjoaa sosiaalisten ominaisuuksien lisäksi myös erilaisia kustomoituja ominaisuuksia, jolloin hän voi etsiä ja suodattaa mieluista tarjontaa erilaisten hakusuodatuksien avulla. 

## Teknologiat

### Frontend

Sovelluksen käyttöliittymäpuoli (frontend) on toteutettu käyttäen moderneja web-tekniikoita, kuten React-kirjastoa työkaluineen. Reactin avulla saadaan tehokas ja dynaaminen käyttöliittymä, jonka tilanmuutoksia on helppo hallita. Sovellus käyttää myös React Router Dom-kirjastoa reititykseen, mikä mahdollistaa eri näkymien hallinnan ja siirtymisen sovelluksen sisällä. Lisäksi kokonaisuuden rakentamisessa hyödynnetään myös ulkopuolisia kirjastoja, esimerkiksi kommunikointi palvelinpuolen kanssa onnistuu Axiosta hyödyntäen. Ulkoasun tyylittelyssä on hyödynnetty Styled Componenst-kirjastoa, joka mahdollistaa CSS:n kirjoittamisen suoraan React-komponentteihin, mikä taas helpottaa komponenttien tyylien hallintaa, eristämistä ja organisoimista. Sivun ja komponenttien responsiivisuus on toteutettu klassisella media queryllä, esimerkiksi navigointipalkin paikka ja tyyli mukautuvat näytön koon mukaan.

Frontendin arkkitehtuuri noudattaa komponenttipohjaista lähestymistapaa. App.js-tiedosto toimii keskeisenä reititystiedostona, jonka avulla sovellus navigoi eri näkymien välillä, joiden sisään on sisällytetty erikseen rakennettuja ja uudelleenkäytettäviä komponentteja. Yhteinen tekijä komponenttien ja näkymien välillä on niitä koskevat globaalit tyylit. Tämä on nopeuttanut sovelluksen kehitystä, sillä vain poikkeustapauksissa tyylittely tulee määritellä erikseen komponentteja ja näkymiä rakentaessa. Näkymät on eroteltu omiin pages- ja components-kansioihin, jolloin frontendin rakentaminen ja organisointi pysynyt tehokkaana ja helposti lähestyttävänä.

Sovellus on integroitu kolmannen osapuolen API:n kanssa. Tärkeänä osana on The Movie Database (TMDB)-rajapinta, joka sisältää muun muassa sarjoja, elokuvia ja niiden tietoja. Esimerkiksi MediaList-komponentti kutsuu API:a, esittää viisi elokuvaa kerrallaan, tyylittelee sekä tiivistää saadun informaation käyttäjälle sopivalla tavalla. Details-osio taas avaa tietoja laajemmin, mikäli käyttäjä tahtoo tietää enemmän. Toinen API sisältää Finnkinon uutisia, joka puolestaan tuo sivustolle monimuotoisuutta ja parantaa käyttäjäkokemusta. 

### Backend

Sovelluksen palvelinpuoli (backend) on kehitetty Javascriptin Node.js-ajoympäristössä Express-kirjastoa hyödyntäen. Node.js tarjoaa ajoympäristön Javascript-ohjelmoinnille palvelinpuolella, kun taas Express tekee palvelimen reitityksestä ja konfiguroinnista sekä HTTP-pyyntöjen käsittelystä helppoa ja selkeää. Node.js:n mukana tulevalla paketinhallintajärjestelmä NPM:llä, on toteutettu projektin, tarvittavien kirjastojen sekä muiden pakettien alustus, projektin riippuvuuksien lisääminen sekä kaikkien näiden päivittäminen.

