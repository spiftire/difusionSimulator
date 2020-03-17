## Sannsynlighetsfordeling for bevegelse

Beveger seg høyre eller venstre = 20%

Beveger seg nedover = 30%

Beveger seg oppover = 5%

Står i ro = rest;

## Simuleringstekninkk

Valget av simuleringstekninkk kommer ann på hvor kjapp vi ønsker at simuleringen vil gå. Forholdet mellom antall seller og agenter vil i størt grad påvirket valget. 

Et glass med vann på 2 dl inneholder ca 11.1018595615 Mol som er ca 66.856960977 * 10²³ partikler. En dråpe med konditor farge vil inneholde betydelig mye mindre partikler enn dette. Dette vil da helle i favør av  velge agent bassert simulering.

Hvis vi derimot sier at hvert felt kan inneholde et sett med partikler med inntil 10²³ partikler. Vi kan da likevel simulere milionervis av partikler som beveger seg igjennom feltet. Det vil da være lurt å bruke cellomatron simulering. 

## Randvilkår

Ved randen vil det ikke være mulig å forflytte seg lenger. Sansynligheten vil da forandre seg. F.eks. hvis en partikkel ikke kan bevege seg lenger til høyre vil sannsynligheten for å bevege seg til høyre bli 0. Vi må da kompansere et eller annet sted. Det er da fristende å gjevne denne sansynligheten ut blandt de andre feltene. Dette kan gjøres i størrelse orden av gjeldene sannsynlighet. Dette er illustrert i tabellen under.

| HVA     | FØR  | ETTER |
| ------- | ---- | ----- |
| Høyre   | 20   | 0     |
| Venstre | 20   | 25    |
| Opp     | 5    | 6.25  |
| Ned     | 30   | 37.5  |
| I ro    | 25   | 31.25 |

Den nye sansnyligheten er regnet ut ved.
$$
total = p(venstre)+p(høyre)+p(opp)+p(ned)+p(i\space ro)\\
p(ny) = p(old)+p(old)\times p(høyre)\div total
$$

## Implementeringsplan

Jeg har en plan om å implementere denne simuleringen ved bruk av javaScript. Målet er å kunne simulere den i nettleser, men også kanskje å kunne lage den i en electron app.