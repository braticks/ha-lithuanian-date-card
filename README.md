# Lietuviško Kalendoriaus Kortelė Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

Ši kortelė rodo lietuvišką kalendoriaus informaciją, gautą iš day.lt integracijos, gražiai suformatuotą Home Assistant aplinkoje.

## Reikalavimai

Prieš įdiegiant šią kortelę, būtina turėti įdiegtą [Day.lt integraciją](https://github.com/braticks/hass-daylt).

## Diegimas

### Per HACS (Rekomenduojama)
1. Įsitikinkite, kad turite įdiegtą [HACS](https://hacs.xyz/)
2. Įdiekite [Day.lt integraciją](https://github.com/braticks/hass-daylt) per HACS
3. HACS aplinkoje pridėkite šią kortelės repozitoriją:
   - Eikite į HACS → Frontend
   - Spauskite tris taškus viršutiniame dešiniajame kampe
   - Pasirinkite "Custom repositories"
   - Įveskite šios kortelės URL
   - Pasirinkite kategoriją "Lovelace"
4. Įdiekite kortelę per HACS
5. Perkraukite Home Assistant


## Naudojimas

Pridėkite kortelę į savo skydelį (dashboard):
```yaml
type: 'custom:ha-lithuanian-date-card'
entity: sensor.daylt_info
```



## Rodoma Informacija

- Einamoji data lietuvišku formatu
- Vardadieniai
- Saulės informacija:
  - Tekėjimas
  - Leidimasis
  - Dienos ilgis
- Mėnulio informacija:
  - Fazė
  - Mėnulio diena
- Savaitės diena
- Šventės
- Dienos patarlė
- Raudonos dienos indikatorius
- Zodiako ženklas

## Ekrano Nuotraukos

![Lietuviško Kalendoriaus Kortelė - Tamsi tema](https://github.com/braticks/ha-lithuanian-date-card/blob/main/images/Ekrano%20nuotrauka%202024-12-25%20113257.png?raw=true)

![Lietuviško Kalendoriaus Kortelė - Šviesi tema](https://github.com/braticks/ha-lithuanian-date-card/blob/main/images/Ekrano%20nuotrauka%202024-12-25%20113335.png?raw=true)

## Pagalba Tobulinimui

Jeigu radote klaidą arba turite pasiūlymų kaip patobulinti kortelę, galite sukurti "issue" arba "pull request" GitHub platformoje.

