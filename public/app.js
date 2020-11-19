document.addEventListener('DOMContentLoaded', () => {

  $(document).ready(function() {
    let userModel = {};
    let snippetModel = {};
    let currentFilter = '';
    let currentCategory ='';
    let currentCriteria ='';
    let changePassModel = {};
    let languageModel = {};
    let sorted = false;
    let idFromRow, creatorFromRow, languageFromRow, descriptionFromRow, snippetFromRow;
    let editSnippetId = "none";

    $('#logout-btn').hide();
    $.getJSON('/getLanguages', function(data) {
      for (i = 0; i < data.result.length; i++) {
        languageModel = data.result;
        $('#add-snippet-select-lang').append(new Option(data.result[i].Language, i + 1));
      }
    });

    $.getJSON('/who', function(data) {
      if (data.result.user) {
        userModel = data.result;
        $('#welcome-user').text('Welcome ' + userModel.user.username + '!');
        $('#register-btn').hide();
        $('#login-btn').hide();
        $('#logout-btn').show();
        $('#add-snippet-label').show();
        $('#add-snippet-btn').show();
      } else {
        $('#welcome-user').text(data.result.noUser);
        userModel = {};
        $('#add-snippet-label').hide();
        $('#add-snippet-btn').hide();
      }
    });

    function initializeModel() {
      $('#category').val(0);
      editSnippetId = "none";
      $('.sort-no-filter').show();
      $('.sort-filter').hide();
      $.getJSON('/snippets', function(data) {
        snippetModel = data.result;
        buildTableTR();
      });
    };

    $('#db-modal').modal({backdrop: "static", keyboard: false, show:false}).on('show.bs.modal', function(e) {

      idFromRow = $(event.target).closest('tr').data('id');
      creatorFromRow = $(event.target).closest('tr').data('creator');
      emailFromRow = $(event.target).closest('tr').data('email');
      languageFromRow = $(event.target).closest('tr').data('language');
      descriptionFromRow = $(event.target).closest('tr').data('description');
      snippetFromRow = $(event.target).closest('tr').data('snippet');
      let snippetCodeFromRow = snippetFromRow;
      let snippetCodeFromRowReplaced = snippetCodeFromRow.replace(/&/g,'&amp;').replace(/</g, "&lt;").replace(/>/g, "&gt;");

      buildModalFromTable(this);

      function buildModalFromTable(table_this) {
        $(table_this).find('.modal-header').html($(' <h2> Viewing ID # ' + idFromRow + '</h2> '));
        $(table_this).find('.modal-body').html($('<p> Creator: ' + creatorFromRow + ' &lt' + emailFromRow + '&gt' + '</p><p> Language: ' + languageFromRow + '</p><p> Description: ' + descriptionFromRow + '</p><p>  Snippet: </p><code>' + snippetCodeFromRowReplaced + '</code>'));
      }
    });

    $('#dd-creator-asc-filter-order').click(function() {
      if (currentCategory =='Language') {
        $.getJSON('/snippets?filterOn=Language&' + currentFilter + '&sortOn=Creator&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Description') {
        $.getJSON('/snippets?filterOn=Description&' + currentFilter + '&sortOn=Creator&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Creator&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-creator-desc-filter-order').click(function() {
      if (currentCategory == 'Language') {
        $.getJSON('/snippets?filterOn=Language&' + currentFilter + '&sortOn=Creator&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Description') {
        $.getJSON('/snippets?filterOn=Description&' + currentFilter + '&sortOn=Creator&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Creator&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-description-asc-filter-order').click(function() {
      if (currentCategory == 'Language') {
        $.getJSON('/snippets?filterOn=Language&' + currentFilter + '&sortOn=Description&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Creator') {
        $.getJSON('/snippets?filterOn=Creator&' + currentFilter + '&sortOn=Description&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Description&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-description-desc-filter-order').click(function() {
      if (currentCategory == 'Language') {
        $.getJSON('/snippets?filterOn=Language&' + currentFilter + '&sortOn=Description&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Creator') {
        $.getJSON('/snippets?filterOn=Creator&' + currentFilter + '&sortOn=Description&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Description&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-language-asc-filter-order').click(function() {
      if (currentCategory == 'Description') {
        $.getJSON('/snippets?filterOn=Description&' + currentFilter + '&sortOn=Language&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Creator') {
        $.getJSON('/snippets?filterOn=Creator&' + currentFilter + '&sortOn=Language&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Language&order=ASC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-language-desc-filter-order').click(function() {
      if (currentCategory == 'Description') {
        $.getJSON('/snippets?filterOn=Description&' + currentFilter + '&sortOn=Language&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else if (currentCategory == 'Creator') {
        $.getJSON('/snippets?filterOn=Creator&' + currentFilter + '&sortOn=Language&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      } else {
        $.getJSON('/snippets?filterOn=Code&' + currentFilter + '&sortOn=Language&order=DESC', function(data) {
          snippetModel = data.result;
          buildTableTR();
        });
      }
    });

    $('#dd-creator-asc').click(function() {
      $.getJSON('/snippets?sortOn=Creator&order=ASC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-creator-desc').click(function() {
      $.getJSON('/snippets?sortOn=Creator&order=DESC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-asc').click(function() {
      $.getJSON('/snippets?sortOn=Language&order=ASC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-language-desc').click(function() {
      $.getJSON('/snippets?sortOn=Language&order=DESC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-asc').click(function() {
      $.getJSON('/snippets?sortOn=description&order=ASC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    $('#dd-description-desc').click(function() {
      $.getJSON('/snippets?sortOn=description&order=DESC', function(data) {
        sorted = true;
        snippetModel = data.result;
        buildTableTR();
      });
    });

    //************** REGISTER *************/
    $('#register-submit').click(function() {
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
      let userName = $('#registration-modal-username-text:text').val();
      let encodedEmail = encodeURIComponent($('#registration-modal-email-text:text').val());
      let password = $('#registration-modal-pwd-text:password').val();
      let encodedPassword = encodeURIComponent($('#registration-modal-pwd-text:password').val());
      let question1 = $('#registration-modal-security-question1').val();
      let question2 = $('#registration-modal-security-question2').val();
      let encodedQuestion1Ans = encodeURIComponent($('#registration-modal-security-question1-ans:text').val());
      let encodedQuestion2Ans = encodeURIComponent($('#registration-modal-security-question2-ans:text').val());
      $.getJSON('/register?username=' + userName + '&email=' + encodedEmail + '&password=' + encodedPassword + '&question1=' + question1 + '&question1Ans=' + encodedQuestion1Ans + '&question2=' + question2 + '&question2Ans=' + encodedQuestion2Ans, function(data) {
        console.log("requesting add user");
        if (data.error) {
          registerAlert("" + data.error);
        } else {
          $('#login-modal-username-text:text').val(userName);
          $('#login-modal-pwd-text:password').val(password);
          submitLogin();
          $('#welcome-user').text('Welcome ' + userName + '!');
          $('#register-btn').hide();
          $('#login-btn').hide();
          $('#logout-btn').show();
          clearRegistration();
        }
      });
    }

    function clearRegistration() {
      $('#registration-modal-username-text:text').val('');
      $('#registration-modal-email-text:text').val('');
      $('#registration-modal-pwd-text:password').val('');
      $('#register-modal-alert-text').text('');
      $('#registration-modal-security-question1').val(0);
      $('#registration-modal-security-question2').val(0);
      $('#registration-modal-security-question1-ans:text').val('');
      $('#registration-modal-security-question2-ans:text').val('');
      $('#modal-register-form').modal('hide');
    }

    function validateRegistrationForm() {
      let uname = $('#registration-modal-username-text:text').val();
      let email = $('#registration-modal-email-text:text').val();
      let password = $('#registration-modal-pwd-text:password').val();
      if (uname == null || uname == "") {
        registerAlert('You must enter a username.');
        return false;
      } else if (email == null || email == "") {
        registerAlert('You must enter an email address.');
        return false;
      } else if (password == null || password == "") {
        registerAlert('You must enter a password.');
        return false;
      } else {
        return true;
      }
    }

    function registerAlert(outputString) {
      $('#register-modal-alert-text').text(outputString);
    }
    //////////////////// LOG IN //////////////////
    $('#login-submit').click(function() {
      if (validateLoginForm() == true) {
        submitLogin();
        return false;
      } else {
        return false;
      }
    });

    $('#login-close').click(function() {
      clearLogin();
    });

    $('form').on('submit', '#login-form', function() {
      if (validateLoginForm() == true) {
        submitLogin();
        buildTableTR();
        return false;
      } else {
        return false;
      }
    });

    function submitLogin() {
      let username = $('#login-modal-username-text:text').val();
      let password = encodeURIComponent($('#login-modal-pwd-text:password').val());
      $.getJSON('/login?username=' + username + '&password=' + password, function(data) {
        userModel = data.result;
        if (userModel.error) {
          $('#login-modal-alert-text').text('Username or password is incorrect.');
        } else {
          $('#welcome-user').text('Welcome ' + userModel.user.username + '!');
          $('#register-btn').hide();
          $('#login-btn').hide();
          $('#logout-btn').show();
          $('#add-snippet-label').show();
          $('#add-snippet-btn').show();
          clearLogin();
          buildTableTR();
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
      $('#login-modal-username-text:text').val('');
      $('#login-modal-pwd-text:password').val('');
      $('#login-modal-alert-text').text('');
      $('#modal-login-form').modal('hide');
    }

    function loginAlert(outputString) {
      $('#login-modal-alert-text').text(outputString);
    }

    $(document).on('keyup', function(event) {
      if(event.key == 'Escape') {
        clearRegistration();
        clearLogin();
        $('#db-modal').modal('hide');
      }
    });

    $('#forgot-password').click(function() {
      clearLogin();
      $('#modal-enter-email-form').modal('show');
    })

    ////////// Enter Email Modal //////////
    $('#enter-email-submit').click(function() {
      submitEmailForm();
      return false;
    })

    $('form').on('submit', '#enter-email-form', function() {
      submitEmailForm();
      return false;
    });

    function submitEmailForm() {
      changePassModel = {};
      let email = $('#enter-email-modal-email-text:text').val();
      $.getJSON('/getQuestions?email=' + email, function(data) {
        if (data.result.error) {
          let errorMessage = data.result.error;
          $('#enter-email-modal-alert-text').text(errorMessage);
        } else {
          changePassModel = data.result;
          clearEnterEmail();
          clearResetPass();
          $('#modal-reset-password-form').modal('show');
          $('#reset-modal-question1').text('Q1: ' + changePassModel.question1);
          $('#reset-modal-question2').text('Q2: ' + changePassModel.question2);
        }
      });
    };

    $('#enter-email-close').click(function() {
      clearEnterEmail();
    });

    function clearEnterEmail() {
      $('#enter-email-modal-email-text:text').val('');
      $('#enter-email-modal-alert-text').text('Enter the email associated with your account.');
      $('#modal-enter-email-form').modal('hide');
    };

    ////////// Validate Q and Change Password Modal /////////
    $('#reset-password-submit').click(function() {
      validateQsAndResetPass();
      return false;
    });

    $('form').on('submit', '#forgot-password-form', function() {
      validateQsAndResetPass();
      return false;
    });

    function validateQsAndResetPass() {
      let q1a = $('#reset-modal-question1-ans').val();
      let q2a = $('#reset-modal-question2-ans').val();
      let newPassword = $('#reset-modal-pwd-test').val();
      let newPasswordCheck = $('#reset-modal-pwd-check').val();
      let user = changePassModel.user;
      $.getJSON('/verifyQuestions?username=' + user + '&question1Ans=' + q1a + '&question2Ans=' + q2a + '&password=' + newPassword + '&passwordCheck=' + newPasswordCheck, function(data) {
        if (data.result.success) {
          $('#welcome-user').text('Password Changed.');
          clearResetPass();
        } else if (data.result.error || data.error) {
          if (data.error) {
            $('#reset-modal-alert').text(data.error);
          } else {
            $('#reset-modal-alert').text(data.result.error);
          }
        } else {
          $('#reset-modal-alert').text('Error changing password.');
        }
      });
    };

    $('#reset-password-close').click(function() {
      clearResetPass()
    });

    function clearResetPass() {
      $('#reset-modal-alert').text('');
      $('#reset-modal-question1-ans').val('');
      $('#reset-modal-question2-ans').val('');
      $('#reset-modal-pwd-test').val('');
      $('#reset-modal-pwd-check').val('');
      $('#modal-reset-password-form').modal('hide');
    }

    ////////// LOG OUT ////////////
    $('#logout-btn').click(function() {
      $.getJSON('/logout', function(data) {
        userModel = {};
        $('#welcome-user').text(data.message);
        $('#register-btn').show();
        $('#login-btn').show();
        $('#logout-btn').hide();
        $('#add-snippet-label').hide();
        $('#add-snippet-btn').hide();
        buildTableTR();
      });
      return false;
    });

    $('body').click(function() {
      if (!$(event.target).closest('.modal').length && !$(event.target).is('.modal')) {
        clearRegistration();
        clearLogin();
        clearAddSnippet();
      }
    });

    /////////// Search & Clear Search //////////
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

    /////////////// BUILD FILTER QUERY /////////////////
    function buildFilterQueryString(){
      currentCategory = $('#category').val();
      currentCriteria = $('#criteria').val();
      currentFilter = 'filter=' + encodeURIComponent(currentCriteria);
      $('div #current-filter').text(currentCategory + "=" + currentCriteria);
      let queryString = '/snippets?filterOn=' + $('#category').val() + '&' + currentFilter;
      return queryString;
    }

    $('#clear-search').click(function() {
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
      $('#current-filter').text('');
      $('.sort-no-filter').show(); 
    }

    ///////////// Add Snippet ////////////////
    $('#add-snippet-submit').click(function(e) {
      e.preventDefault();
      addSnippet();
      return false;
    });

    $('form').on('submit', '#add-snippet-form', function(e) {
      e.preventDefault();
      addSnippet();
      return false;
    });

    $('#add-snippet-close').click(function() {
      clearAddSnippet();
    });

    function addSnippet() {
      let lang = $('#add-snippet-select-lang').val();
      let desc = $('#add-desc').val();
      let code = $('#add-code').val();
      let edited = false;
      if (editSnippetId != "none") {
        edited = true;
      }

      $.getJSON('/addSnippet?newLang=' + lang + '&newDesc=' + desc + '&newCode=' + encodeURIComponent(code) + '&snippetId=' + editSnippetId, function(data) {
        if (data.Success) {
          if (edited == false) {
            $('#welcome-user').text('Snippet has been added.');
          } else {
            $('#welcome-user').text('Snippet has been edited.');
          }
          clearAddSnippet();
          initializeModel();
        } else if (data.error1) {
          $('#welcome-user').text(data.error1);
          clearAddSnippet();
        } else if (data.error2) {
          $('#add-snippet-text').text(data.error2);
        }
      });
    }

    function clearAddSnippet() {
      $('#modal-add-snippet-form').modal('hide');
      $('#add-snippet-select-lang').val(0);
      $('#add-desc').val('');
      $('#add-code').val('');
      $('#add-snippet-title').text("Add Snippet");
    }

    $('body').on('click', '.table-button-edit', function(e) {
      e.stopPropagation();
      // get values
      editSnippetId = $(event.target).closest('tr').data('id');
      languageFromRow = $(event.target).closest('tr').data('language');
      descriptionFromRow = $(event.target).closest('tr').data('description');
      snippetFromRow = $(event.target).closest('tr').data('snippet');

      // populate Modal
      for (i = 0; i < languageModel.length; i++) {
        if (languageFromRow == languageModel[i].Language) {
          console.log(languageModel[i])
          $('#add-snippet-select-lang').val(i+1);
        }
      }
      $('#add-snippet-title').text("Edit Snippet");
      $('#add-desc').val(descriptionFromRow);
      $('#add-code').val(snippetFromRow);
      $("#modal-add-snippet-form").modal();
    })

    $('body').on('click', '.table-button-delete', function(e) {
      e.stopPropagation();
      editSnippetId = $(event.target).closest('tr').data('id');
      $.getJSON('/deleteSnippet?snippetId=' + editSnippetId, function(data) {
        if (data.Success) {
          $('#welcome-user').text('Snippet has been deleted.');
          initializeModel();
        } else {
          $('#welcome-user').text('Error deleting snippet.');
        }
      });
    })

    ///////////// Build snippet Table ////////////

    function buildTableTR(data){
      $('#my-table tbody').empty();
      if (userModel.user) {
        for (let i = 0; i < snippetModel.length; i++) {
          let tr = $('<tr data-toggle="modal" data-id="' + snippetModel[i].Id +'" data-target="#db-modal" data-backdrop="static" data-keyboard="false" data-creator="' + snippetModel[i].Creator + '"data-email="' + snippetModel[i].Email + '" data-language="' + snippetModel[i].Language + '" data-description="' + snippetModel[i].Description + '" data-snippet="' + snippetModel[i].Snippet + '">');
          $(tr).append("<th scope='row'>" + snippetModel[i].Id + "</th>");
          $(tr).append("<td>" + snippetModel[i].Creator + "</td>");
          $(tr).append("<td>" + snippetModel[i].Language + "</td>");
          $(tr).append("<td>" + snippetModel[i].Description + "</td>");
          let snippetCode = "" + snippetModel[i].Snippet;
          let snippetCodeReplaced = snippetCode.replace(/&/g,'&amp;').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "\"");
          $(tr).append("<td><code>" + snippetCodeReplaced + "</code></td>");
          if (snippetModel[i].Creator == userModel.user.username) {
            $(tr).append("<td><div class='edit-delete-div'><button type='button' id=e-" + i + "' class='btn btn-primary custom-button table-button-edit'>Edit</button><button id=d-" + i + "' type='button' class='btn btn-danger custom-button table-button-delete'>Delete</button></div></td>");
          } else {
            $(tr).append("<td></td>");
          }
          $(tr).append("</tr>");
          $('#my-table tbody').append(tr);
        }
      } else {
        for (let i = 0; i < snippetModel.length; i++) {
          let tr = $('<tr data-toggle="modal" data-id="' + snippetModel[i].Id +'" data-target="#db-modal" data-backdrop="static" data-keyboard="false" data-creator="' + snippetModel[i].Creator + '"data-email="' + snippetModel[i].Email + '" data-language="' + snippetModel[i].Language + '" data-description="' + snippetModel[i].Description + '" data-snippet="' + snippetModel[i].Snippet + '">');
          $(tr).append("<th scope='row'>" + snippetModel[i].Id + "</th>");
          $(tr).append("<td>" + snippetModel[i].Creator + "</td>");
          $(tr).append("<td>" + snippetModel[i].Language + "</td>");
          $(tr).append("<td>" + snippetModel[i].Description + "</td>");
          let snippetCode = "" + snippetModel[i].Snippet;
          let snippetCodeReplaced = snippetCode.replace(/&/g,'&amp;').replace(/</g, "&lt;").replace(/>/g, "&gt;");
          $(tr).append("<td><code>" + snippetCodeReplaced + "</code></td>");
          $(tr).append("<td></td>");
          $(tr).append("</tr>");
          $('#my-table tbody').append(tr);
        }
      }
    };
    initializeModel();
  });
});
