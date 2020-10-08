document.addEventListener('DOMContentLoaded', () => {

  $(document).ready(function() {
    /// Model
    let userModel = {};
    let snippetModel = {};
    let currentFilter = '';
    let currentCategory ='';
    let currentCriteria ='';
    let sorted = false;
    let idFromRow, creatorFromRow, languageFromRow, descriptionFromRow, SnippetFromRow;

    $('#logout-btn').hide();

    function initializeModel() {
      $('#category').val(0);
      $('.sort-no-filter').show();
      $('.sort-filter').hide();
      $.getJSON("/snippets", function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
      userModel.user = {};
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

    //************** REGISTER *************/
    $("#register-submit").click(function() {
      if (validateRegistrationForm() == true) {
        submitRegistration();
        return false;
      } else{
        return false;
      }
    });

    $('#register-close').click(function() {
      clearRegistration();
    });

    $('form').on('submit', '#register-form', function() {
      if (validateRegistrationForm() == true) {
        submitRegistration();
        return false;
      } else {
        return false;
      }
    });

    function submitRegistration() {
      let uname = $('#registration-modal-username-text:text').val();
      let email = encodeURIComponent($('#registration-modal-email-text:text').val());
      let password = encodeURIComponent($('#registration-modal-pwd-text:password').val());
      $.getJSON("/register?username=" + uname + "&email=" + email + "&password=" + password, function(data) {
        console.log("requesting add user");
        if (data.error) {
          registerAlert("" + data.error);
        } else {
          $('#welcome-user').text("User successfully added!");
          clearRegistration();
        }
      });
    }

    function clearRegistration() {
      $('#registration-modal-username-text:text').val("");
      $('#registration-modal-email-text:text').val("");
      $('#registration-modal-pwd-text:password').val("");
      $('#register-modal-alert-text').text("");
      $('#modal-register-form').modal('hide');
    }

    function validateRegistrationForm() {
      let uname = $('#registration-modal-username-text:text').val();
      let email = $('#registration-modal-email-text:text').val();
      let password = $('#registration-modal-pwd-text:password').val();
      if (uname == null || uname == "") {
        registerAlert("You must enter a username.");
        return false;
      } else if (email == null || email == "") {
        registerAlert("You must enter an email address.");
        return false;
      } else if (password == null || password == "") {
        registerAlert("You must enter a password.");
        return false;
      } else {
        return true;
      }
    }

    function registerAlert(outputString) {
      $('#register-modal-alert-text').text(outputString);
    }
// ****************** LOG IN ********************
    $("#login-submit").click(function() {
      if (validateLoginForm() == true) {
        submitLogin();
        return false;
      } else{
        return false;
      }
    });

    $('#login-close').click(function() {
      clearLogin();
    });

    $('form').on('submit', '#login-form', function() {
      if (validateLoginForm() == true) {
        submitLogin();
        return false;
      } else{
        return false;
      }
    });

    function submitLogin() {
      let username = $('#login-modal-username-text:text').val();
      let password = encodeURIComponent($('#login-modal-pwd-text:password').val());
      $.getJSON("/login?username=" + username + "&password=" + password, function(data) {
        console.log(username + " wants to log in.");
        userModel = data.result;
        if (userModel.error) {
          $('#login-modal-alert-text').text("Username or password is incorrect.");
        } else {
          $('#welcome-user').text("Welcome " + userModel.user.username + "!");
          $('#register-btn').hide();
          $('#login-btn').hide();
          $('#logout-btn').show();
          clearLogin();
        }
      });
    }

    function validateLoginForm() {
      let uname = $('#login-modal-username-text:text').val();
      let password = $('#login-modal-pwd-text:password').val();
      if (uname == null || uname == "") {
        loginAlert("You must enter a username.");
        return false;
      } else if (password == null || password == "") {
        loginAlert("You must enter a password.");
        return false;
      } else {
       return true;
      }
    }

    function clearLogin() {
      $('#login-modal-username-text:text').val("");
      $('#login-modal-pwd-text:password').val("");
      $('#modal-login-form').modal('hide');
    }

    function loginAlert(outputString) {
      $('#login-modal-alert-text').text(outputString);
    }

    $(document).on('keyup', function(event) {
      if(event.key == "Escape") {
        clearRegistration();
        clearLogin();
        $('#db-modal').modal('hide');
      }
    });

    $('body').click(function() {
      if (!$(event.target).closest('.modal').length && !$(event.target).is('.modal')) {
        clearRegistration();
        clearLogin();
      }
    });

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
