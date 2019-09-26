# Cartoon Chronology
An interactive web page that chronicles my favorite animated TV shows.

Click on a picture to learn more about each cartoon and see which ones have influenced me over the years!

### Create your own chronology
Download or clone this repository to begin your own chronology. Then, create your list by simply editing the Excel file!

### Features
- Search bar to look up show titles
- Filters to narrow down shows by genre and/or network
- Buttons to watch a show's trailer (if it exists, of course)

#### How each show is displayed
Each cartoon is represented by its own modal. Data from each cartoon comes from an Excel file, which is then converted to a JSON file in `scripts.js` and added into the appropriate modal.

#### Languages Used
- JavaScript
  - [SheetJS js-xlsx](https://github.com/SheetJS/js-xlsx) (to parse Excel files)
- HTML
- CSS

#### Original Template Credit
The original framework for Cartoon Chronology stemmed from this [Studio Ghibli App](https://github.com/taniarascia/sandbox/tree/master/ghibli) by [taniarascia](https://github.com/taniarascia).
