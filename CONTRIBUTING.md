# Przewodnik Kontrybucji (Contributing Guide)

## Model pracy z gałęziami

- **main**: Gałąź produkcyjna, zawsze stabilna (podłączona do Vercel). Bezpośrednie zmiany (push) są zablokowane.
- **develop**: Główna gałąź integracyjna. Gromadzi nowości przed wdrożeniem na produkcję.
- *_feature/_ **: Gałęzie dla nowych funkcjonalności i poprawek (tworzone zawsze z `develop`).

## Główna zasada pracy

**Jedna gałąź = jeden deweloper lub jeden agent AI.**
Nigdy dwóch ludzi ani dwóch agentów (lub człowiek i agent) nie powinno pracować nad tą samą gałęzią jednocześnie, aby zapobiec nadpisywaniu zmian i konfliktom.

## Konwencja nazewnictwa gałęzi

Gałęzie powinny mieć jasne, opisowe nazwy:

- Dla ludzi: `feature/nazwa-funkcji`
- Dla agentów AI: `feature/nazwa-funkcji-nazwa-agenta` (np. `feature/systemy-claude`)

## Proces deweloperski

1. Zaktualizuj i przejdź na `develop` (`git checkout develop`).
2. Utwórz nową gałąź (`git checkout -b feature/nazwa-funkcji`).
3. Pracuj i twórz commity (`commit`).
4. Wypchnij zmiany na serwer (`push`).
5. Utwórz **Pull Request** z twojej gałęzi do gałęzi `develop`.
6. Po zatwierdzeniu (code review) następuje **merge** do `develop`.

## Kiedy develop trafia do main

Gałąź `develop` jest łączona z `main` dopiero po dokładnym przetestowaniu wszystkich zmian w środowisku testowym (Vercel preview). Połączony kod na `main` automatycznie wdraża się na produkcję.

## Wymagania przed złączeniem (Merge)

Wymóg bezwzględny: zadania `build` i `lint` muszą przechodzić pomyślnie. Jeśli automatyczne sprawdzenia (GitHub Actions) zakończą się błędem, Pull Request nie może zostać włączony.
