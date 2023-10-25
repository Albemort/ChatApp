## Raportti: Chat-sovelluksen arkkitehtuuri ja toiminta

### Yleistä

Tämä raportti käsittelee yksinkertaisen chat-sovelluksen arkkitehtuuria ja toimintaa. Sovellus on toteutettu Reactilla ja se hyödyntää WebSocketteja reaaliaikaisen viestinnän mahdollistamiseksi. Lisäksi sovelluksessa on RESTful API, jolla haetaan palvelimelta vanhat viestit.

### Käyttöliittymä

Sovelluksen käyttöliittymä on jaettu kolmeen pääkomponenttiin:

1. **UsernamePopup**: Tämä komponentti näytetään, kun käyttäjä avaa sovelluksen ensimmäistä kertaa. Se pyytää käyttäjää syöttämään käyttäjänimensä. Kun käyttäjä on syöttänyt käyttäjänimensä, tämä komponentti sulkeutuu ja käyttäjän nimi tallennetaan tilaan.

2. **MessageList**: Tämä komponentti näyttää kaikki viestit. Se käyttää propsina annettuja viestejä ja renderöi ne näytölle.

3. **SendMessageForm**: Tämä komponentti sisältää tekstin syöttökentän ja lähetysnapin. Käyttäjä voi kirjoittaa viestin tekstin syöttökenttään ja lähettää sen painamalla lähetysnappia. Viesti lähetetään `onSendMessage`-propin kautta annetulle funktiolle.

### Backend

Sovelluksen backend on toteutettu Node.js:llä ja se käyttää WebSocketteja ja RESTful API:a kommunikaatioon frontendin kanssa.

1. **WebSocket**: Palvelin käyttää WebSocketteja reaaliaikaiseen kommunikaatioon frontendin kanssa. Kun käyttäjä lähettää viestin, se lähetetään palvelimelle WebSocketin kautta. Palvelin vastaanottaa viestin, tallentaa sen ja lähettää sen kaikille avoimille yhteyksille.

2. **RESTful API**: Palvelin tarjoaa RESTful API:n, jonka avulla frontend voi hakea vanhat viestit. Tämä tapahtuu sovelluksen käynnistyessä.

### Tila

Sovellus käyttää Reactin `useState`-hookia hallitakseen sovelluksen tilaa:

1. **messages**: Tämä tila sisältää kaikki viestit, sekä vanhat että uudet. Se alustetaan tyhjällä taulukolla ja päivitetään kun uusi viesti saapuu WebSocketin kautta tai kun vanhat viestit haetaan palvelimelta.

2. **username**: Tämä tila sisältää käyttäjän nimen. Se alustetaan tyhjällä merkkijonolla ja päivitetään kun käyttäjä on syöttänyt nimensä `UsernamePopup`-komponentissa.

3. **showPopup**: Tämä tila kertoo, näytetäänkö `UsernamePopup`-komponentti vai ei. Se alustetaan `true`:ksi ja päivitetään `false`:ksi kun käyttäjä on syöttänyt nimensä.

### useEffect

Sovellus käyttää `useEffect`-hookia kolmessa kohtaa:

1. Ensimmäisessä `useEffect`-hookissa kuunnellaan `messageResponse`-tapahtumaa WebSocketin kautta. Kun uusi viesti saapuu, se lisätään `messages`-tilaan.

2. Toisessa `useEffect`-hookissa haetaan vanhat viestit palvelimelta käynnistyessä ja ne muokataan sopivaan muotoon ja lisätään `messages`-tilaan.

3. Kolmannessa `useEffect`-hookissa tarkistetaan, onko viesti viimeinen listassa. Jos on, se siirtää käyttöliittymän näkymän niin, että viimeisin viesti on näkyvissä. Tämä tehdään scrollIntoView-metodilla, joka siirtää elementin näkyviin.

### Opitut asiat

Tämän sovelluksen tekeminen auttoi minua ymmärtämään paremmin Reactin peruskonseptit, kuten komponentit, propsit ja tilat. Sovelluksessa käytetyt Reactin 'useState' ja 'useEffect' -hookit antoivat kokemusta tilanhallintaan ja sivuvaikutusten käsittelyyn. Sovelluksen tekeminen antoi myös kokemusta WebSocket -protokollasta ja sen käytöstä. Sovelluksen rakentamiseen sisältyi komponenttien suunnittelua ja jaottelua pienempiin osiin. Tämä antoi kokemusta suunnittelusta ja sovelluksen jakamisesta loogisiin ja uudelleenkäytettäviin komponentteihin.
