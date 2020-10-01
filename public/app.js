document.addEventListener('DOMContentLoaded', () => {

  $(document).ready(function() {
    /// Model
    let snippetModel = {};
    let currentFilter = '';
    let currentCategory ='';
    let currentCriteria ='';
    let idFromRow, creatorFromRow, languageFromRow, descriptionFromRow, SnippetFromRow;

    function initializeModel() {
      $('#category').val(0);
      $('.sort-no-filter').show();
      $('.sort-filter').hide();
      $.getJSON("/snippets", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    };

    // Views
    $('#db-modal').modal({backdrop: "static", keyboard: false, show:false}).on('show.bs.modal', function() {
      idFromRow = $(event.target).closest('tr').data('id');
      creatorFromRow = $(event.target).closest('tr').data('creator');
      languageFromRow = $(event.target).closest('tr').data('language');
      descriptionFromRow = $(event.target).closest('tr').data('description');
      SnippetFromRow = $(event.target).closest('tr').data('snippet');
      buildModalFromTable(this);

      function buildModalFromTable(table_this) {

        $(table_this).find('.modal-header').html($(' <h2> Viewing ID # ' + idFromRow + '</h2> '));
        $(table_this).find('.modal-body').html($('<p> Creator: ' + creatorFromRow + '</p><p> Language: ' + languageFromRow + '</p><p> Description: ' + descriptionFromRow + '</p><p>  Snippet: </p><code>' + SnippetFromRow + '</code>'));
      }
    });

    $('#dd-creator-asc-filter-order').click(function() {
      if(currentCategory =='Lang') {
        $.getJSON("/snippets?filterOn=Lang&" + currentFilter + "&sortOn=Creator&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Description') {
        $.getJSON("/snippets?filterOn=Description&" + currentFilter + "&sortOn=Creator&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Creator&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-creator-desc-filter-order').click(function() {
      if(currentCategory =='Lang') {
        $.getJSON("/snippets?filterOn=Lang&" + currentFilter + "&sortOn=Creator&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Description') {
        $.getJSON("/snippets?filterOn=Description&" + currentFilter + "&sortOn=Creator&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Creator&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-description-asc-filter-order').click(function() {
      if(currentCategory =='Lang') {
        $.getJSON("/snippets?filterOn=Lang&" + currentFilter + "&sortOn=Description&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Creator') {
        $.getJSON("/snippets?filterOn=Creator&" + currentFilter + "&sortOn=Description&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Description&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-description-desc-filter-order').click(function() {
      if(currentCategory =='Lang') {
        $.getJSON("/snippets?filterOn=Lang&" + currentFilter + "&sortOn=Description&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Creator') {
        $.getJSON("/snippets?filterOn=Creator&" + currentFilter + "&sortOn=Description&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Description&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-language-asc-filter-order').click(function() {
      if(currentCategory =='Description') {
        $.getJSON("/snippets?filterOn=Description&" + currentFilter + "&sortOn=Lang&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Creator') {
        $.getJSON("/snippets?filterOn=Creator&" + currentFilter + "&sortOn=Lang&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Lang&order=ASC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-language-desc-filter-order').click(function() {
      if(currentCategory =='Description') {
        $.getJSON("/snippets?filterOn=Description&" + currentFilter + "&sortOn=Lang&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else if (currentCategory == 'Creator') {
        $.getJSON("/snippets?filterOn=Creator&" + currentFilter + "&sortOn=Lang&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }else{
        $.getJSON("/snippets?filterOn=Code&" + currentFilter + "&sortOn=Lang&order=DESC", function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-creator-asc').click(function() {
      $.getJSON("/snippets?sortOn=creator&order=ASC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-creator-desc').click(function() {
      $.getJSON("/snippets?sortOn=creator&order=DESC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-asc').click(function() {
      $.getJSON("/snippets?sortOn=Lang&order=ASC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-desc').click(function() {
      $.getJSON("/snippets?sortOn=Lang&order=DESC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-asc').click(function() {
      $.getJSON("/snippets?sortOn=description&order=ASC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-desc').click(function() {
      $.getJSON("/snippets?sortOn=description&order=DESC", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    });

    // User input
    $("#register-submit").click(function() {
      submitRegistration();
      clearRegistration();
    });

    $(document).on('submit', '#register-form', function() {
      submitRegistration();
      clearRegistration();
    });

    function submitRegistration() {
      let fname = $('#first-name-text:text').val();
      let lname = $('#last-name-text:text').val();
      let email = encodeURIComponent($('#email-text:text').val());
      let password = encodeURIComponent($('#pwd-text:password').val());
      $.getJSON("/register?firstname=" + fname + "&lastname=" + lname + "&email=" + email + "&password=" + password, function(data) {
        console.log("requesting add user");
      });
    }

    function clearRegistration() {
      $('#first-name-text:text').val("");
      $('#last-name-text:text').val("");
      $('#email-text:text').val("");
      $('#pwd-text:password').val("");
    }

    // Search & Clear Search
    $(document).on('submit', '#search', function() {
      if ($('#criteria').val() == "" || $('#criteria').val() == null || $('#category').val() == 0 || $('#category').val() == null) {
        clearSearch();
      } else {
        submitForm();
        return false;
      }
      return false;
    });

    function submitForm() {
      $.getJSON(buildFilterQueryString(), function(data) {
        $('.sort-no-filter').hide();
        $('.sort-filter').show();
        // SORT BUTTON CONTROL BASED ON CATEGORY
        if(currentCategory == 'Creator'){
          $('#sort-creator-dropdown-filter').hide();
        }else if (currentCategory == 'Lang'){
          $('#sort-language-dropdown-filter').hide();
        }else if (currentCategory == 'Description'){
          $('#sort-description-dropdown-filter').hide();
        }
        snippetModel = data.result;
        buildTableTR();
      });
    }

    // BUILD FILTER QUERY
    function buildFilterQueryString(){
      currentCategory = $("#category").val();
      currentCriteria = $("#criteria").val();
      currentFilter = 'filter=' + encodeURIComponent(currentCriteria);
      $("div #current-filter").text(currentCategory + "=" + currentCriteria);
      let queryString = "/snippets?filterOn=" + $("#category").val() + "&" + currentFilter;
      return queryString;
    }

    $("#clear-search").click(function() {
      if(currentFilter != '') {
        clearSearch();
      }
    });

    function clearSearch() {
      $('#category').val(0);
      wipeFilter();
      initializeModel();
    }

    function wipeFilter(){
      $('#criteria').val('');
      currentFilter = '';
      currentCategory = '';
      currentCriteria = '';
      $("#current-filter").text('');
      $('.sort-no-filter').show();
    }

    // Helper Functions
    function buildTableTR(data){
      $('#my-table tbody').empty();
      for (let i = 0; i < snippetModel.length; i++) {
        let tr = $('<tr data-toggle="modal" data-id="' + snippetModel[i].Id +'" data-target="#db-modal" data-backdrop="static" data-keyboard="false" data-creator="' + snippetModel[i].Creator + '" data-language="' + snippetModel[i].Language + '" data-description="' + snippetModel[i].Description + '" data-snippet="' + snippetModel[i].Snippet + '">');
        $(tr).append("<th scope='row'>" + snippetModel[i].Id + "</th>");
        $(tr).append("<td>" + snippetModel[i].Creator + "</td>");
        $(tr).append("<td>" + snippetModel[i].Language + "</td>");
        $(tr).append("<td>" + snippetModel[i].Description + "</td>");
        $(tr).append("<td><code>" + snippetModel[i].Snippet + "</code></td>");
        $(tr).append("</tr>");
        $('#my-table tbody').append(tr);
      }
    };
    initializeModel();
  });
});
