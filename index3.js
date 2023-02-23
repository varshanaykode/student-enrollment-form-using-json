var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stdDBName = "SCHOOL-DB";
var stdRelationName = "Student-table";
var connToken ='90932550|-31949277541076339|90949266';

$('#stdid').focus();

function saveRecNo2LS(jsonObj) {
         var lvdata = JSON.parse(jsonObj.data)
         localStorage.setItem('recno', lvdata.rec_no);
}


function getStdIdAsJsonObj() {
         var stdid = $('#stdid').val();
         var jsonStr = {
                id: stdid
         };
         returnJSON.stringify(jsonStr);
} 

function fillData(jsonObj) {
         saveRecNo2LS(jsonObj);
         var record = JSON.parse(jsonObj.data).record;
         $('#stdid').val(record.id);
         $('#stdname').val(record.name);
         $('#stdbday').val(record.birthdate);
         $('#stdclass').val(record.class);
         $('#stdadd').val(record.address);
         $('#stded').val(record.enrollmentdate);
}

function resetForm() {
         $('#stdid').val(" ");
         $('#stdname').val(" ");
         $('#stdclass').val(" ");
         $('#stdbday').val("");
         $('#stdadd').val(" ");
         $('#stded').val(" ");
         $('#stdid').prop('disabled', false);
         $('#save').prop('disabled', true);
         $('#update').prop('disabled', true);
         $('#reset').prop('disabled', true);
         $('#stdid').focus();
}

function validateData() {
         var stdid, stdname, stdclass, stdbday,stdadd, stded;
         stdid = $("#stdid").val();
         stdname = $("#stdclass").val();
         stdclass =$("#stdclass").val();
         stdbday = $("#stdadd").val();
         stdadd = $("#stdadd").val();
         stded =$("#stded").val();
         
         if (stdid === '  ') {
              alert('Student Roll No is missing');
              $('#stdid').focus();
              return " ";
         }
         if (stdname === '  ') {
              alert('Student Name is  missing');
              $('#stdname').focus();
              return " ";
         }
         if (stdclass === '  ') {
              alert('Student Class is missing');
              $('#stdclass').focus();
              return " ";
         }
         if (stdbday === '  ') {
              alert('Student Birthdate is missing');
              $('#stdbday').focus();
              return " ";
         }

         if (stdadd=== '  ') {
            alert('Student Address is missing');
            $('#stdadd').focus();
            return " ";
       }
         if (stded === '  ') {
              alert('Student Enrollment No is missing');
              $('#stded').focus();
              return " ";
         }
        
         var jsonStrObj = {
         id: stdid,
         name:stdname,
         class:stdclass,
         birthdate:stdbday,
         address:stdadd,
         enrollmentdate:stded

         };
         return JSON.stringify(jsonStrObj);
}

function getStd() {
         var stdidJsonObj = getStdIdAsJsonObj();
         var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdidJsonObj);
          jQuery.ajaxSetup({async: false});
         var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
          jQuery.ajaxSetup({async: true});
         if (resJsonObj.status === 400) {
             $("#save").prop('disabled', false);
             $("#reset").prop('disabled', false);
             $('#stdname').focus();
         }
         else if (resJsonObj.status ===200) {
             $('stdid').prop('disabled', true);
             fillData(resJsonObj);

             $("#update").prop('disabled', false);
             $("#reset").prop('disabled', false);
             $("#stdname").focus();
         }
}  





function saveData() {
         var jsonStrObj = validateData();
         if (jsonStrObj ==='  ') {
              return "  ";
         }
         var putRequest = createPUTRequest(connToken, jsonStrObj, School-DB, Student-table);
         jQuery.ajaxSetup({async: false});
         var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
         jQuery.ajaxSetup({async: true});
         resetForm();
         $('#stdid').focus();
}

function changeData() { 
        $('#change').prop('disabled', true);  
        jsonChg = validateData();
        var updateRequest = createUPDATERecordRequest(connToken, jsonChg, School-DB, Student-table, localstorage.getitem('recno'));
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
        jQuery.ajaxSetup({async: true});
        console.log(resJsonObj);
        resetForm();
        $('#stdid').focus();
}