# Changelog

All notable changes to CVIc are recorded in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

No version of CVIc has been tagged or released so far. The version in `package.json` has been 0.1.0 since
the first commit.

## [Unreleased]

### Added

- The citation file `CITATION.cff`, with the article in Environmental Modelling & Software
  ([doi:10.1016/j.envsoft.2025.106705](https://doi.org/10.1016/j.envsoft.2025.106705)) as the preferred
  citation.
- Unit tests of the calculation code, run with Vitest by `npm test`: the CVI and ICVI formulas, the
  classification of the index values, the ranking tables of the parameters, the division of a shoreline into
  segments, the geometry helpers, and the assignment and storage of values. Six tests are marked as
  expected failures; each records a known defect, which its comment describes.
- The workflow `Checks`, which runs the linter, the type check, the tests and the build on every push and
  every pull request.
- `CHANGELOG.md`, `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- The sections "How to cite" and "Development" of the README, and the badges of the checks and of the
  article.

### Changed

- The README no longer names the RCVI, the export to a shapefile, React-Leaflet, the script
  `deploy:github` and Node.js 16, none of which the code contains or supports. It names the segment length
  as the only setting of the segmentation, and lists the scripts as `package.json` defines them.
- Twelve lines that use the type `any` carry an ESLint comment that permits it, so that `npm run lint`
  passes. The code that runs is unchanged.

## History before the first release

The repository holds 37 commits from 19 April 2025 to 28 September 2025, and most of them have the subject
"+". The entries of this section are therefore reconstructed from the files that each commit added or
removed and from the few commit subjects that say more. Each entry gives the date of its commit. Changes
inside files that kept their names are not recorded here.

### Added

- 19 April 2025: the first commit. A React, TypeScript and Vite application with pages for the upload of
  a shoreline as a zipped shapefile, the segmentation, the segment table, the selection of parameters, the
  assignment of values and the results; sign-in through Firebase; storage in IndexedDB.
- 13 May 2025: the README.
- 15 May 2025: the upload of satellite images as GeoTIFF files, the selection of an area of interest, and
  the digitisation of a shoreline on an image. Two sample images.
- 28 May 2025: the HTML report and the charts of the results.
- 1 June 2025: index-specific parameters with their ranking tables, for three indices: CVI, RCVI and ICVI.
- 28 August 2025: a sample shoreline in `assets/shoreline/`.
- 2 September 2025: the calculators of the CVI and the ICVI in `src/calculators/`, and the registry of
  indices in `src/indices/`.
- 8 September 2025: the workflow that publishes the application on GitHub Pages.

### Changed

- 28 September 2025: the README lost the instructions for the environment set-up and for the deployment
  on Firebase.

### Removed

- 28 May 2025: the map pages built on OpenLayers, which had been added on 15 May 2025.
- 1 June 2025: the pages `MyResultsPage` and `ShorelineDigitizationPage`, the build scripts and the patch
  scripts of the proj4 library.
- 14 June 2025: the two workflows of the first commit.
- 2 September 2025: the sign-in and the hosting through Firebase, and the RCVI. The registry of indices
  holds the CVI and the ICVI.

### Fixed

- 14 June 2025: the file `LICENSE` holds the MIT licence again. It had held another licence text from
  28 May 2025 and had been empty from 11 June 2025.
- 8 September 2025: the loading of the proj4 library.
