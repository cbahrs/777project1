
$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 100; // Calculate the top offset

  $('#mapCanvas').css('height', (h - offsetTop));
}).resize();

$(function() {

  SearchableMapLib.initialize({
    filePath: 'data/FY2018_2022.csv',
    fileType: 'csv',
    recordName: 'SAR Case',
    recordNamePlural: 'Search and Rescue Cases',
    map_centroid: [43.7, -86.75],
    defaultZoom:  6.5,
    defaultRadius: 1610,
    debug: false,
  });

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));
  var modalURL;

  $('#btnSearch').click(function(){
    // Temporary fix for map load issue: set show map as default.
    if ($('#mapCanvas').is(":visible")){
      SearchableMapLib.doSearch();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#mapCanvas').show();
      $('#listCanvas').hide();
      SearchableMapLib.doSearch();
    }
  });

  $(':checkbox').click(function(){
    SearchableMapLib.doSearch();
  });

  $(':radio').click(function(){
    SearchableMapLib.doSearch();
  });

  $('#btnViewMode').click(function(){
    if ($('#mapCanvas').is(":visible")){
      $('#btnViewMode').html("<i class='fa fa-map-marker'></i> Map view");
      $('#listCanvas').show();
      $('#mapCanvas').hide();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#listCanvas').hide();
      $('#mapCanvas').show();
    }
  });

  $("#search-address, #search-name").keydown(function(e){
      var key =  e.keyCode ? e.keyCode : e.which;
      if(key == 13) {
          $('#btnSearch').click();
          return false;
      }
  });

  $(".close-btn").on('click', function() {
    $.address.parameter('modal_id', null)
  });





});

const tbody = document.getElementById("results-list");

// Helper function for sorting on a given column, with a given comparator
function tableSort(colNum, cmp) {
  let rows = [...tbody.rows];
  rows.sort((a, b) => cmp(a.cells[colNum].textContent, b.cells[colNum].textContent))
      .map(row => tbody.appendChild(row));
}
function sortMISLEAscending() {
  tableSort(0, (a, b) => a - b); // assuming that school column has number representations
}

function sortMISLEDescending() {
  tableSort(0, (a, b) => b - a); // assuming that school column has number representations
}


// function sortDTGAscending() {
//   tableSort(2, (a, b) => a - b); // assuming that school column has number representations
// }
//
// function sortDTGDescending() {
//   tableSort(2, (a, b) => b - a); // assuming that school column has number representations
// }

