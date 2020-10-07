document.addEventListener('DOMContentLoaded', () => {

  $(document).ready(function() {
    /// Model
    let snippetModel = {};
    let currentFilter = '';
    let currentCategory ='';
    let currentCriteria ='';
    let sorted = false;
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
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-creator-desc').click(function() {
      $.getJSON("/snippets?sortOn=creator&order=DESC", function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-asc').click(function() {
      $.getJSON("/snippets?sortOn=Lang&order=ASC", function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-desc').click(function() {
      $.getJSON("/snippets?sortOn=Lang&order=DESC", function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-asc').click(function() {
      $.getJSON("/snippets?sortOn=description&order=ASC", function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-desc').click(function() {
      $.getJSON("/snippets?sortOn=description&order=DESC", function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    // User input
    $("#register-submit").click(function() {
      if (validateForm() == true) {
        submitRegistration();
        clearRegistration();
        $('#modal-login-form').modal('hide');
      } else{
        return;
      }
    });

    $("#signin-submit").click(function() {	//Dylan edit
      if (validateForm() == true) {
        submitRegistration();
        signIn();
        $('#modal-signin-form').modal('hide');
	//$('#register-btn').hide();
      } else{
        return;
      }
    });

    $(document).on('submit', '#register-form', '#signin-submit', function() {
      if (validateForm() == true) {
        submitRegistration();
        clearRegistration();
        $('#modal.login-form').modal('hide');
      } else {
        return;
      }
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

    function validateForm() {
      let fname = $('#first-name-text:text').val();
      let lname = $('#last-name-text:text').val();
      let email = $('#email-text:text').val();
      let password = $('#pwd-text:password').val();
      let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (fname == null || fname == "") {
        alert("You must enter a first name.");
        return false;
      } else if (lname == null || lname == "") {
        alert("You must enter a last name.");
        return false;
      } else if (email == null || email == "") {
        alert("You must enter an email address.");
        return false;
      } else if (!email.match(mailFormat)) {
        alert("Invalid Email Format");
        return false;
      } else if (password == null || password == "") {
        alert("You must enter a password.");
        return false;
      } else if (!password.match(passwordFormat)) {
        alert("Invalid password format. Must contain letters >= 1, numbers >= 1, and whole password >= 8 characters.");
        return false;
      } else {
        return true;
      }
    }

    function alert(outputString) {
      $('#register-alert-text').text(outputString);
    }

    function signIn() {		//Dylan Edit
      let username = $('#username-text:text').val();
      let password = encodeURIComponent($('#pwd-text:password').val());
      $.getJSON("/login?username=" + username + "&password=" + password, function(data) {
        console.log("logging in user");
      });
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
      if(currentFilter != '' || sorted == true) {
        clearSearch();
        sorted = false;
      }
      return false;
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
