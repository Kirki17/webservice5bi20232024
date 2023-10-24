# 5biwebservice2023
## Appunti randomici
ALT+96 per la backtips 

## Docker 

### Network webservice - mysql
```
docker network create ws-sql-net
```

### web service server
Avvio del container node per lo sviluppo dell'applicazione
```
docker run -d -it --name wsserver -p  3000:3000 --network ws-sql-net -v /workspaces/5biwebservice2023/wsserver/:/app -w /app node:latest
```

### mysql container 
Avvio del container sql per lo sviluppo dell'applicazione
```
docker run -d --name sqlserver -p 3350:3306 -e MYSQL_ROOT_PASSWORD=root --network ws-sql-net mysql:latest
```

Visualizzazione container in eseguzione
```
docker ps
```

Visualizzazione container docker, anche spenti
```
docker ps -a
```

Avviare un container spento
```
docker start 'nomeContainer'
``` 

**WEB SERVICE**
Un web service è un sistema software che permette a due applicazioni di comunicare tra loro attraverso una rete. L'obiettivo principale di un web service è fornire un'interfaccia standardizzata che consenta a diverse applicazioni di scambiare dati e informazioni in un formato strutturato.

**WEB SERVICE RESTFUL**
I Web Service RESTful (Representational State Transfer) sono un tipo di architettura per la creazione di servizi web che utilizza principi fondamentali, come le risorse e le operazioni HTTP standard (GET, POST, PUT, DELETE), per gestire le richieste e le risposte. I Web Service RESTful sono noti per essere leggeri, scalabili e facili da implementare.

**PROTOCOLLO HTTP → Hypertext Transfer Protocol**

HTTP è il protocollo di comunicazione utilizzato per il trasferimento di dati tra un client e un server. Nel contesto dei web service, HTTP viene utilizzato per inviare richieste da un client a un server e per ricevere risposte dal server.

\- **GET:** Utilizzato per recuperare dati da una risorsa specifica sul server.

\- **POST:** Utilizzato per inviare dati al server per essere elaborati o memorizzati.

\- **PUT:** Utilizzato per aggiornare una risorsa esistente sul server.

\- **DELETE:** Utilizzato per eliminare una risorsa dal server.

**XML**

é un linguaggio di markup che viene spesso utilizzato come formato dati nei web service RESTful. È una scelta comune perché è leggibile sia dalle macchine che dagli esseri umani ed è altamente flessibile. Un documento XML è composto da tag che definiscono la struttura dei dati e dai dati stessi.

Nei web service RESTful, i dati vengono spesso scambiati in formato XML tra il client e il server. Il client invia una richiesta HTTP al server, che risponde con dati strutturati in formato XML. Questo facilita l'interoperabilità tra diverse applicazioni e piattaforme.

In conclusione, i web service sono un mezzo fondamentale per consentire la comunicazione tra diverse applicazioni. I web service RESTful si basano sui principi HTTP e spesso utilizzano XML come formato dati per scambiare informazioni in modo strutturato e leggibile. 

**ARCHITETTURA MULTI-TIER**

L'architettura multi-tier è un approccio comune alla progettazione dei sistemi software Questo tipo di architettura divide l'applicazione in più componenti o livelli distinti, ognuno dei quali ha un ruolo specifico e una responsabilità chiaramente definita. L'obiettivo principale dell'architettura multi-tier è migliorare la modularità, la manutenibilità e la scalabilità del sistema. Ecco una panoramica dei tipi di livelli comuni in un'architettura multi-tier:

**1. Livello di Presentazione (Presentation Layer):**

`   `- Questo è il livello più esterno e si occupa dell'interfaccia utente.

`   `- Solitamente, include l'interfaccia grafica, la presentazione dei dati e la gestione degli input dell'utente.

`   `- Spesso coinvolge tecnologie come HTML, CSS, JavaScript e framework front-end.

**2. Livello di Applicazione (Application Layer):**

`   `- Questo livello gestisce la logica di business dell'applicazione.

`   `- Contiene codice che elabora le richieste degli utenti, processa i dati e prende decisioni aziendali.

`   `- Può includere servizi, controller, gestione delle transazioni e business logic.

**3. Livello di Dati (Data Layer):**

`   `- Questo livello è responsabile della gestione e dell'accesso ai dati.

`   `- Spesso coinvolge database, archivi di dati o servizi di memorizzazione dati.

`   `- Può includere operazioni CRUD (Create, Read, Update, Delete) e gestione dei dati persistenti.

A seconda delle esigenze specifiche del progetto, un'architettura multi-tier può avere ulteriori livelli intermedi o sottolivelli. Ad esempio, in un'applicazione web, è comune avere un livello di Servizi Web (Web Services Layer) che fornisce un'interfaccia per l'accesso ai dati e alle funzionalità dell'applicazione da parte di client diversi (ad esempio, applicazioni mobili o applicazioni desktop).

**Vantaggi dell'architettura multi-tier includono:**

\- **Modularità:** I diversi livelli sono separati e indipendenti, il che facilita la manutenzione e l'aggiornamento di parti specifiche dell'applicazione.

\- **Scalabilità:** È possibile scalare in modo flessibile ciascun livello separatamente per soddisfare i requisiti di carico.

\- **Sicurezza:** La separazione dei livelli consente di implementare misure di sicurezza specifiche a ciascun livello per proteggere l'applicazione.

\- **Riuso del codice:** I componenti all'interno di ciascun livello possono essere riutilizzati in diverse parti dell'applicazione o in applicazioni diverse.

**DI COSA ABBIAMO BISOGNO:**
- container con MY SQL(porta 3306) 
- container con NODE
  - tra di loro devono essere connessi con una Lan privata di docker 
- per il momento andiamo a pubblicare (binder della porta 3306 usiamo la 3350)
- container con WEBAPP 
- container con node per angular node no binder porta lo fa in automatico sulla porta 4002
- container con nginx → pubblicato su rete scuola porta 8080

```
 /docker-entrypoint-initdb.d
```
Aggiungendo questo pezzo al percorso messo con -v, quando viene lanciato un container docker, manda in esecuzione anche tutti gli script che trova nella cartella di creazione

## SQL
**VAR(10)**: In memoria vengono salvati 10 caratteri, anche se ne uso meno
es:  P I N O _ _ _ _ _ _ 

**VARCHAR(10)**: In memoria vengono salvati solo i caratteri usati, ma non posso usare più di (in questo caso) 10 caratteri
es:  P I N O 


```
docker run --name sqlserver -d -e MYSQL_ROOT_PASSWORD=root -v  C:\Lavoro-Temp\webservice-nodejs-mysql-Kirki17\db-server\:/docker-entrypoint-initdb.d --network ws-sql-net -p 3350:3306 mysql:latest
```

OBO= Object Relational Objects

prima operazione da fare quando creo un applicazione node:
```
npm init
```

## AUTOMATIZZARE LA CREAZIONE DEI CONTAINER
Per evitare di dover ogni volta ricreare i container e le network andiamo a creare un docker-compose.yaml con cui basterà digitare
```
docker-compose up
``` 
per creare e attivare i container e le network